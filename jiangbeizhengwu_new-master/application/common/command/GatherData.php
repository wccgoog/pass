<?php
/**
 * 采集数据
 * @author shengwx <shengwxde@sina.com>
 */

namespace app\common\command;

use app\admin\validate\Department;
use app\common\model\AffairFiles;
use app\common\model\AffairMaterials;
use app\common\model\Affairs;
use app\common\model\Departments;
use app\common\model\Totals;
use think\console\Command;
use think\console\Input;
use think\console\Output;
use tools\Attachment;
use tools\Collection;
use tools\Http;

class GatherData extends Command
{
    public $collection;

    protected function configure()
    {
        $this->setName('gatherData')->setDescription('采集数据');

        $this->collection = new Collection();
    }

    protected function execute(Input $input, Output $output)
    {
        $output->writeln('开始采集数据');

//        $url = 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=8f7674ae99fa4148ae387ac433220cae&iszx=';
//        $this->getYewu($url,$output);
//        die;

        //=======从网站全部获取
        $this->getDataBySite($output);

        $output->writeln('获取信息结束');
        die;

        //=======从固定数据获取
        //录入部门
//        $this->inserPartment($output);

        //循环源数据，获取数据
//        $this->getDataByArray($output);

//        $this->getPersonalTopic();
    }

    /**
     * 录入部门
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/6/20
     * Time: 下午11:26
     */
    public function inserPartment($output)
    {
        $list = [
            '宣传部',
            '综治',
            '科创',
            '经发',
            '财政',
            '规土',
            '建交',
            '环水',
            '社会事业局',
            '安监',
            '市监',
            '执法',
            '行政审批局',
            '行政审批局',
            '气象局',
            '公安局'
        ];

        $output->writeln('开始录入部门');

        foreach ($list as $item)
        {
            $output->write("【{$item}】录入中....");

            $departmentModel = Departments::get(['name'=>$item]);

            if (!$departmentModel)
            {
                $output->write('====开始录入');

                $departmentModel = new Departments();

                if ($departmentModel->create(['name'=>$item]))
                {
                    $output->writeln('-----录入成功');
                }
                else
                {
                    $output->writeln('-----录入失败');
                }
            }
            else
            {
                $output->writeln('-----已经存在');
            }
        }

    }

    /**
     * 从网站爬去数据
     * @param $output
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/6/24
     * Time: 下午2:14
     */
    public function getDataBySite($output)
    {
        //获取所有部门
        $department_list = $this->getAllDepartment($output);

        $this->getYewuByDep($output, $department_list);

    }


    function getYewuByDep($output, $department_list)
    {
        $pUrl = 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/frshowtype.do';
        foreach ($department_list as $department)
        {
            $dep_url = $department['url'];

            //获取页码
            $parseurl = parse_url($dep_url);

            $pageurl = $pUrl . '?' .$parseurl['query'] . '&pageno=1';

            $page = $this->getYewuPage($pageurl);

            if ($page > 1)
            {
                for ($i = 1; $i<=$page;$i++)
                {
                    $url = $pUrl . '?' .$parseurl['query'] . '&pageno=' . $i;

                    $this->getYewuList($url, $output, $department['id']);
                }
            }
            else
            {
                $url = $pUrl . '?' .$parseurl['query'] . '&pageno=1';
                $this->getYewuList($url, $output, $department['id']);
            }
        }
    }


    function getYewuList($url, $output, $department_id)
    {
        $content  = $this->getHtmlContent($url);

        preg_match_all('/<a class="r_tit_a" target="_blank" id="itemname" title="(.*)" style=[^>]*?onclick="showBszn\(\'([\d]*?)\',\'(.*)\',\'\'\)">.*<\/a>/i', $content, $match);

        if ($match[0])
        {
            $pUrl = 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do';
        }

        foreach ($match[2] as $key => $webId)
        {
            $yewuName = trim($match[1][$key]);

            $output->writeln("开始获取业务【{$yewuName}】的信息");

            $webId = trim($webId);

            $iddept_ql_inf = trim($match[3][$key]);

            $url = $pUrl . "?webId={$webId}&iddept_ql_inf={$iddept_ql_inf}&iszx=";

            $this->getYewu($url, $output, $department_id);
        }
    }

    /**
     * 获取部门业务页码数
     * @param $url
     * @return int|string
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/6/24
     * Time: 下午4:10
     */
    public function getYewuPage($url)
    {
        $content = $this->getHtmlContent($url);

        preg_match("/pages : '([\d]*?)',/i", $content, $pageMatch);

        if ($pageMatch[0])
        {
            return trim($pageMatch[1]);
        }
        return 1;
    }

    /**
     * 获取所有部门
     *
     * @param $output
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/6/24
     * Time: 下午3:07
     */
    public function getAllDepartment($output)
    {
        $url = 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/fr_index.do?webId=137&themid=&deptid=320195HB#fw_jump';

        $content = $this->getHtmlContent($url);

        preg_match('/<div class="left_list left_list_fwbm"[\s\S]*?<\/div>[\s\n]*?<\/div>/i', $content, $firstMatch);

        $department_list = [];

        if ($firstMatch[0])
        {
            preg_match_all('/<a class="left_list_sub"[^>]*?href="(.*)" title="(.*)">.*<\/a>/i', $firstMatch[0], $secondMatch);

            if ($secondMatch)
            {
                foreach ($secondMatch[2] as $key => $departmentName)
                {
                    $departmentName = trim($departmentName);

                    $output->write("开始处理部门【{$departmentName}】-----------");

                    $departmentModel = Departments::where(['name'=>$departmentName])->find();

                    if (!$departmentModel)
                    {
                        $model = new Departments();

                        $departmentModel = $model->create(['name'=>$departmentName]);

                        if ($departmentModel)
                        {
                            $department_list[] = [
                                'id' => $departmentModel->id,
                                'name' => $departmentModel->name,
                                'url' => trim($secondMatch[1][$key]),
                            ];
                            $output->writeln('录入成功');
                        }
                        else
                        {
                            $output->writeln('录入失败');
                        }
                    }
                    else
                    {
                        $department_list[] = [
                            'id' => $departmentModel->id,
                            'name' => $departmentModel->name,
                            'url' => trim($secondMatch[1][$key]),
                        ];
                        $output->writeln('已经存在');
                    }
                }
            }
        }
        else
        {
            $output->writeln('没有获取到部门');
        }

        return $department_list;
    }


    /**
     * 从提供的数据中解析数据
     * @param $output
     * @throws \think\exception\DbException
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/6/24
     * Time: 下午2:14
     */
    public function getDataByArray($output)
    {
        $array = [
            '宣传部' => [
                '寺院、宫观、清真寺、教堂的设立审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=b595e3d154dc4ed39ce2c2183c7c2c2e&iszx=',
                '固定宗教活动处所的设立审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=a01d486d5a2c425d84eed08b6fbea970&iszx=',
                '宗教活动场所登记（含合并、分立、终止或者内容变更的登记）' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=8d0eae143b4a447081a1c6376f5d1972&iszx=',
                '在宗教活动场所内改建或者新建建筑物的审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=ae19520b997641ada22a562bc2f1257c&iszx=',
                '文化类民办非企业单位设立前置审查' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=cae7355b1cb44306ac55775d6f239f52&iszx=',
                '文物保护工程方案审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=65258d73690d47aaab4fd77e259c5d46&iszx=',
                '建设工程对文物保护单位实施原址保护的保护措施的批准	' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=bd8fc7500cce46029c57e0e276c0bb14&iszx=',
                '出版物印刷企业设立审批	' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=8ff1904e6c2d4e40b52aa9c429ff6eb3&iszx=',
                '一次性内部资料性出版物准印证核发' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=e14b1b6bfbd64139a0a1616c3e048e43&iszx=',
                '出版物批发单位设立审批	' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=26ca96e960124dd888048a3d8bc24307&iszx=',
                '单位和个人设置卫星地面接收设施审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=b079e48564c64191a900fa5777136d98&iszx=',
                '卫星地面接收设施安装服务审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=f2cabee5b71d46b282cfa583f25c9366&iszx=',
                '广播电视节目制作经营单位设立审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=79e815ab751c48d2b0007e7e572c05f0&iszx=',
                '体育类民办非企业单位申请登记审查' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=f3c38b7454684b5080060aff388dfb53&iszx=',
                '等级运动员称号授予' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=6726f0323bce42eb9d9bd81f2509cfb2&iszx=',
            ],
            '科创'=> [
                '新建、改建、扩建对地震监测设施和地震观测环境造成危害的项目批准' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=731e060fb26b4a9cae25a7a4a8a347c5&iszx=',
                '建设工程抗震设防要求确定' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=a7a3926ba5d746939bae0ac5866b3086&iszx=',
                '建设工程抗震设防要求竣工验收' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=436131e4da5745f481922e70c61369cf&iszx=',
                '地震应急预案备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=13b9c04ae253498d9d935338b272ae66&iszx=',
            ],
            '经发' => [
                '石油天然气管道受限制区域施工保护方案许可' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=841ba67d72574c10bd8891f17d88d2c1&iszx=',
                '石油天然气输送管道竣工测量图备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=f2cc5f581b224ae1a8874b4d9cfe1d0d&iszx=',
                '停止运行、封存、报废管道安全防护措施备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=0b62fd4fcf6c491db24e7ea3c6f68ffc&iszx=',
                '企业事业单位和社会团体使用政府性资金的建设项目竣工验收' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=ca38fae13caa4620b0cdee696fd2a33e&iszx=',
                '企业技术中心的认定与评价' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=f9fa490d931543c7956f09036ec006a4&iszx=',
                '现场使用袋装水泥、现场搅拌混凝土和砂浆的工场建设项目备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=fe3c86d4daf6423f8b439698acf94f32&iszx=',
                '种畜禽生产经营许可证核发' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=e4de456351574735a8fe394b88b598e0&iszx=',
                '食用菌菌种生产经营许可证的核发' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=87b645c972f4404b9cb9954a8a824fec&iszx=',
                '农作物种子生产经营许可证核发' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=b7c4298f626f414ca834d631698ce40a&iszx=',
                '兽用生物制品经营许可' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=bd631ffb3a7a4a809263e0c1d24c05a0&iszx=',
                '省间植物调运检疫' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=b1a5029b801e4966a2bc6b0deab0db7d&iszx=',
                '动物防疫条件合格证核发' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=c7d2d766a01143fab164b1db5d04f24a&iszx=',
                '兽药经营许可' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=ddaa946b00e14e9d8dfdc3a15246ec41&iszx=',
                '动物诊疗许可证核发' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=420a26796bc148c8920a02eaccac788f&iszx=',
                '农业植物检疫（产地检疫）' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=1196956e6dc54ff08896cdc3673c23fe&iszx=',
                '农业植物检疫（调运检疫）' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=06f2bd4ff50044a7af4148df2c32d071&iszx=',
                '农业机械维修技术合格证书核发' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=c7dcd59868434a73ac40fdc0f0d7b6b1&iszx=',
                '农机事故责任认定' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=0c5e09d763e449a39517ea3384170369&iszx=',
                '执业兽医师备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=bd7d7c290d414c73a9e8485e872bc9b5&iszx=',
                '普通林木种子生产经营许可证核发' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=51e0ecb698e04d129250a516167b9e76&iszx=',
                '森林植物检疫证书核发' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=2b90a64ae1604e5fb8ef35f905a9e803&iszx=',
                '产地检疫合格证核发' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=599d213dcc3a440481cb62f37136126b&iszx=',
                '出林区木材运输证核发' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=cace342a15914db49990089ef5b87ccb&iszx=',
                '江苏省重点保护陆生野生动物及其产品经营利用许可' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=35a5936e9a92440aa08d9743b6dc4664&iszx=',
                '非国家重点保护野生动物狩猎证的审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=9afb66b1c24445f5a3df4f60ee814d83&iszx=',
                '林木种子（含园林绿化草种）生产经营许可证核发' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=7ab218de03d34e3e85ba36f427f6b5e8&iszx=',
                '限额以下外商投资企业设立、变更、终止的审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=52092162119b4b809694a3d70abdce42&iszx=',
                '无线电频率占用费的征收' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=7e254585846d43c7ab5cde770e3703e8&iszx=',
            ],
            '规土' => [
                '建设项目用地预审' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=935840941dbf4b87acf3b5de8b977e5d&iszx=',
                '建设项目选址意见书的核发' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=06746b97cb3e4c109c6191c59dbf9338&iszx=',
                '建设用地规划许可证的核发' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=db2262bdd1fe43b69704406f144def41&iszx=',
                '建设工程规划类许可证核发' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=97ac128b45e54ae5a65d9cf3108d22d2&iszx=',
                '采矿权新立审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=e1250483e71c4d77b5a0a2bbea4631ad&iszx=',
                '采矿权延续审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=c52fdbfb64e14e1e9bf34c0d1355e79f&iszx=',
                '采矿权变更、转让审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=a1f972fcb85847b9a11c11c7d1c81c43&iszx=',
                '采矿权注销审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=26ba92d324be4dd59343a07285278ffb&iszx=',
                '改变土地用途审查' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=8a3873b80ac24713bc77e9a7f7208f80&iszx=',
                '临时用地审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=c9752ae1e6244309a6231647ce09cf6d&iszx=',
                '使用集体建设用地审查' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=d53d309273944a458b182251ef3ef148&iszx=',
                '划拨使用国有土地审查' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=1f958705e50b4608b78106f77e2193b8&iszx=',
                '有偿使用国有土地审查' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=edd97a4721614171a96eb4c4d64c9c91&iszx=',
                '土地出让金的征收' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=35a24916dcf741a886191aec18d68a0d&iszx=',
                '土地年租金的征收' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=99997bc3125d4d08b4683bbdf509eac1&iszx=',
                '土地闲置费的征收' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=4fef283958614aea816b525317c63e5a&iszx=',
                '对土地权属争议的调查和调解' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=37d7c5e9ad1243fdaa7743b3b124e6f1&iszx=',
                '规划条件和规划许可内容的核实' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=f3d6e17f161840c3ab6774657374948e&iszx=',
                '建设工程验线' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=5d6e85b3676148b1abe438f6ab4367a3&iszx=',
            ],
            '建交' => [
                '建设工程抗震设计审查' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=74f97619bcb643dfabedd14a4018be4b&iszx=',
                '商品房预售许可' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=c54a3353f517437f8bcb258b2858fb77&iszx=',
                '停止供气、更换气种、迁移供应站的审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=9891705afbd54ddabe12c2f71a0ff46c&iszx=',
                '燃气设施改装、迁移或者拆除审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=5249879a8c87428baa570dea98dfc1f8&iszx=',
                '燃气工程项目初步设计文件的审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=669daa9995754d32a3f533108a7ef34e&iszx=',
                '燃气经营许可证的核发' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=eaa2c7ab7d774e9eaa1ec79e862aed99&iszx=',
                '管道燃气特许经营许可' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=83571d8eb6ac47948418cfb27cd41366&iszx=',
                '人防工程平时使用（开发利用）审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=a3b12d6905a24f92bcd30b30db0fdfd5&iszx=',
                '对房屋建筑和市政基础设施工程质量的监督管理' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=d17179db41d74c2b82c8ade680b273dc&iszx=',
                '房屋建筑和市政基础设施工程竣工验收的备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=d17179db41d74c2b82c8ade680b273dc&iszx=',
                '房屋建筑和市政基础设施工程合同备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/bszn.do?webId=137&iddept_yw_inf=cc06ac263a0d4fc0a8d001f59ce1236d&ql_kind=10&iddept_ql_inf=9ad5b73e65b7445c9dd7bef7e353f7b1&iszx=',
                '勘察设计合同备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/bszn.do?webId=137&iddept_yw_inf=7008050b82434ede866b8ad52fbcd5ff&ql_kind=10&iddept_ql_inf=9ad5b73e65b7445c9dd7bef7e353f7b1&iszx=',
                '建设工程监理合同备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/bszn.do?webId=137&iddept_yw_inf=1ccbd86c8ad6498b948d84b08fb0c20c&ql_kind=10&iddept_ql_inf=9ad5b73e65b7445c9dd7bef7e353f7b1&iszx=',
                '施工起重机械和整体提升脚手架、模板等自升式架设设施登记备案及验收合格的登记及注销' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=bd5ac5840b374027817ec6e30461ff7d&iszx=',
                '对依法批准开工报告的建设工程保证安全施工措施的备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=cfac6248b2114803978e3bb0f61e1f3c&iszx=',
                '建设工程设计文件审查情况备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=b4a23531ac484f3daa6e27153ab787b7&iszx=',
                '燃气设施建设工程竣工验收情况备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=949b10fd5e8a4c7281207fc7027b2fd4&iszx=',
                '人民防空工程竣工验收备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/bszn.do?webId=137&iddept_yw_inf=b82281492a8a4f68a29812df176aec6d&ql_kind=10&iddept_ql_inf=0df60d4a986e44339f23b19700c08090&iszx=',
                '人民防空工程使用权变更备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=209a0ec7b314425b8a6083022ff8e3d4&iszx=',
            ],
            '环水' => [
                '危险废物经营许可（含贮存危险废物超过一年的批准）颁发' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=96e3026e664d4625b34862329d0ff687&iszx=',
                '危险废物经营许可（含贮存危险废物超过一年的批准）变更' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=930c7a1928284224ab706bf276b0f5a4&iszx=',
                '危险废物经营许可（含贮存危险废物超过一年的批准）贮存危险废物超过一年的批准' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=ba5329adea8b482bb7a914695c72a815&iszx=',
                '洪水影响评价类审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=7737f05a2e6a4929968c685df93e0fe8&iszx=',
                '取水许可及排污口审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=10a9edd4df1b41a094173a58d1b4aca5&iszx=',
                '河道（除长江）采砂、取土、淘金、弃置砂石或者淤泥，从事相关活动审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=0e6985cfa87d4c3483638ea076d11ccb&iszx=',
                '初步设计文件审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=4c61c442b7104d8aa3c424a9277dd223&iszx=',
                '占用农业灌溉水源、灌排工程设施审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=26cb38c9d3e4416abff532bfcae5226f&iszx=',
                '企业事业单位突发环境事件应急预案备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=06c2d10d539f4b8b97475fc180d6ba4d&iszx=',
                '城镇污水排入排水管网许可证核发' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=4b4edc55a9fa44d1855a2d8766d0c748&iszx=',
                '城市自来水供水企业停水审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=ef76f7d4642546caaa2cf222a5ce1a3b&iszx=',
            ],
            '社会事业局' => [
                '公共场所卫生许可' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=0b28b20321354d73afaf3ce3297ee32c&iszx=',
                '民办学校的设立、分立、合并变更、终止审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=b9f58fbaa08a4c27a84b7f646b53cb04&iszx=',
                '社会团体成立登记' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=4cbca89f96724b65b820f1de16ad69e3&iszx=',
                '民办非企业单位成立登记' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=07325a3eda6a48b091ddba2949a5718c&iszx=',
                '地名命名、更名、登记审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=f84b8642080e4d0094142cc739f95649&iszx=',
                '慈善组织成立登记' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=3a730dd740fc49538899ad6d6dad152e&iszx=',
                '公开募捐资格认定' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=ecb2352ad9004af7a834807a59b85dae&iszx=',
                '设立人力资源服务(人才中介服务、职业中介)机构许可' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=92a62264d6ca4b899f839df459564c2d&iszx=',
                '经营劳务派遣业务许可' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=79ba87fc19a94d3ab871e0f71d5c54f1&iszx=',
                '实行不定时工作制和综合计算工时工作制的审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=762ce5d7c0054c1a8694c677691bcd16&iszx=',
                '民办职业培训机构审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=91673d2fb4df4139b3d6ced96f926c1d&iszx=',
                '集体合同审查' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=e4574fd6720f4998a0a18bd4bea0164f&iszx=',
                '工伤认定' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=e07dabe8142343f69cf20c8665d4c554&iszx=',
                '企业经济性裁减人员备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=12243beb23534e6fa0689c892dd7bcdd&iszx=',
                '放射诊疗建设项目职业病危害预评价审核和放射防护设施竣工验收' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=a0afb12d7ab940cf882aa844d352614f&iszx=',
                '医师（执业医师、执业助理医师）执业注册（含多点）' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=c0e78e5c30e040b1b464852a0e08d796&iszx=',
                '医疗机构设置许可' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=a9bf52b43ecc4bfba5498168a3042cc7&iszx=',
                '医疗机构执业登记（含变更、注销、补办）' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=46b1cdaebc084aae9183bbfc0f3723a7&iszx=',
                '医疗机构校验' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=beef544206e844119dce2bb600261dc2&iszx=',
                '饮用水供水单位建设项目设计卫生审查' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=8ee3bef5f3d14cfc880eaab833282aeb&iszx=',
                '饮用水供水单位卫生许可' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=d4f82c1aea5944e6bd3c63dbeabc1537&iszx=',
            ],
            '安监' => [
                '危险化学品生产、储存建设项目安全条件审查' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=6e5bfcf211bc431a94220a06055356f3&iszx=',
                '危险化学品经营许可' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=54b3c685e0054a3ca5631c6d19b20171&iszx=',
                '重大危险源备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=92ce23ef0a264aa4a7159d618befcbe8&iszx=',
                '危险化学品安全评价报告以及整改方案的落实情况备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=be048342579f44d0b7e44d3d64ac2cea&iszx=',
                '剧毒化学品和储存数量构成重大危险源的其他危险化学品有关情况备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=d25e91eea2644d6ebdfefa21423da898&iszx=',
                '危险化学品生产装置、储存设施以及废弃危险化学品处置方案备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=fe8d583efe66402c90770f62f3ab93e8&iszx=',
                '生产、经营易制毒化学品备案' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=a21cd1baa01741eb9f3a7481c0e5e25d&iszx=',
            ],
            '市监' => [
                '计量标准器具核准' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=78590a3d95524655a2f7823e903e35b8&iszx=',
                '承担国家法定计量检定机构任务授权' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=17650caec42d4528a240355a2d53a1fd&iszx=',
                '特种设备使用登记' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=68554849c7e649049691365cfc43ffd9&iszx=',
                '特种设备安装、改造、修理施工和化学清洗书面告知' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=88e35ccb3db64eaa95083a2888cf8714&iszx=',
            ],
            '执法' => [
                '城市建筑垃圾处置核准' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=4e0d257bd9ca4be289334f626274136f&iszx=',
                '户外广告设置的审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=aac3cf85d9de4e74baf8ad37ca62d49f&iszx=',
                '建筑垃圾弃置场地设置审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=8c5780d7fe3049eab6d223b6ec5ff93f&iszx=',
                '从事城市生活垃圾经营性清扫、收集、运输、处置的企业停业、歇业的审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=ae0f784531b542edad55f21cce368cbb&iszx=',
            ],
            '行政审批局' => [
                '企业、事业单位、社会团体等投资建设的固定资产投资项目核准' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=36d6323c3015412ca217815035f5f7a2&iszx=',
                '固定资产投资项目节能评估和审查' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=4df7cddfa0d549b0a5f7bc6e6b84f97c&iszx=',
                '企业投资建设固定资产投资项目备案' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=9c94cb5bf9b44c7baea4a333c6c16979&iszx=',
                '企业投资技术改造项目核准' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=659ee34db0ae40dbbacb1f1cc6fc3978&iszx=',
                '企业技术改造项目备案' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=88f517a6240b4587849cdfc6aa44fa90&iszx=',
                '建设项目环境影响评价文件审批（不含入海排污口设置审批，不含辐射建设项目）' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=1e77b8c0f8e74c0b85c8700676457aa2&iszx=',
                '建设项目环境保护竣工验收审批' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=8d9fc51d96a7425d9daedd7c55aaddd3&iszx=',
                '建筑工程施工许可证的发放' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=65dd6034e2f44238ae004faf1f5ac360&iszx=',
                '不宜公开招标项目的批准' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=d41353fb3d2543628f2c41bfecabb482&iszx=',
                '应招标工程不招标的审批' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=007eb77d11cb44faa75646b8832c73e8&iszx=',
                '城市新建民用建筑防空地下室防护的设计审查' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=8fb731d551dc49afbd5b13eef6bc4031&iszx=',
                '城市及城市规划区内新建民用建筑建设防空地下室审批' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=77db16e5d7d34aa388f2b084efe83dc6&iszx=',
                '城市及城市规划区内新建民用建筑确因地质等条件限制不能修建防空地下室审批' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=2b23d4156c514ce4b3574018e1d4e38b&iszx=',
                '人民防空建设经费的征收' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=41cf7bd372b3416bab1034db992131cb&iszx=',
                '港口岸线许可' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=431b659e6b9b40489e3b1d5c9c135482&iszx=',
                '占用、挖掘城市道路审批' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=e09a9728ce424000ba0095a6e82488d2&iszx=',
                '城市道路挖掘修复费的征收' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=f8b317e7449b4b4c9dc653329fa3e44c&iszx=',
                '城市道路占用费的征收' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=818da8f42d7d4b3d86bc7652781ab7d6&iszx=',
                '临时占用城市绿地审批' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=8ab8571d95294c2191e8ee6e0ce5f424&iszx=',
                '砍伐城市树木、迁移古树名木审批' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=ef30a891d515433ea851867a6c2691cc&iszx=',
                '改变绿化规划、绿化用地的使用性质审批' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=dd5dfc76abb74cb28643e27c8b6c0dfa&iszx=',
                '城市绿化工程设计方案审批' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=b27ccc055c2c42118789972125330f8c&iszx=',
                '环境卫生设施拆迁方案的批准' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=5c36b13bba5c41f3abd4efc553bf981b&iszx=',
                '从事城市生活垃圾经营性清扫、收集、运输、处理服务审批' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=e9d3897ce8e74703b724b99ea29e9112&iszx=',
                '关闭、闲置或者拆除生活垃圾处置的设施、场所核准' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=3bd783a8ea904310a82a68360d08eeb2&iszx=',
                '餐厨废弃物收集、运输、处置许可' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=ad9333a386fc48be8ee07afe14c4ea7a&iszx=',
                '生产建设项目水土保持方案审批' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=e5f6f6bf854246369bbf34c168450a7f&iszx=',
                '绿化工程竣工验收备案' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=f2f59afa9cc54e62a547797855477620&iszx=',
                '临时占用林地' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=500540851df846318df166fd31bc539f&iszx=',
                '直接为林业生产服务的项目占用林地' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=149a38b996c845d6941372230dde978d&iszx=',
                '商品林和公益林采伐' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=eccb2bde21c74ba1933bacce900c84b0&iszx=',
                '疫区内未发生松材线虫病的乡镇需进行松木商品材采伐的审批' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=dee5b4ce2f1d4ffaa6141043c50c7406&iszx=',
                '因科学研究等特殊需要采伐珍贵树木的审批' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=b48ef07091e648aebce0ada39d035170&iszx=',
                '采伐和采集自然保护区以外的珍贵树木和林区内具有特殊价值的植物资源审批' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=40f4fc18c685471bb7c221e8d14797fa&iszx=',
                '森林植被恢复费的征收' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=88f9fdc7c04c4ab4ac07a76e7fc59c30&iszx=',
                '货物进出口许可证核准' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/bszn.do?webId=137&iddept_yw_inf=47ac10d3e6014a07b04383c974f2dd8b&ql_kind=01&iddept_ql_inf=60640f2054c04bf1afe76263153308f5&iszx=',
                '货物自动进口许可证核准' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=60640f2054c04bf1afe76263153308f5&iszx=',
                '成品油零售经营资格审批' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=ceff09950a364383a0599064a615acbe&iszx=',
                '典当行及分支机构设立、变更审批' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=c351d2936cca419d84d8889648d07292&iszx=',
                '地方企业在境外开办企业（金融企业除外）备案' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=885a49cc39904e809602cf74fdfd0b4c&iszx=',
                '单用途商业预付卡发卡企业的备案' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=4550a489783d40dbbebdfe4c4239d61c&iszx=',
                '对外贸易经营者备案登记' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=eefc30ae6c6f441a9b2a616c8c1551a0&iszx=',
                '外派劳务项目审查与人员招收备案' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/bszn.do?webId=137&iddept_yw_inf=ab17db25445a490886e87befee95f4b2&ql_kind=10&iddept_ql_inf=eefc30ae6c6f441a9b2a616c8c1551a0&iszx=',
                '对外劳务合作经营资格审批' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/bszn.do?webId=137&iddept_yw_inf=1842f93c9d134ee494c768d5320ee35b&ql_kind=10&iddept_ql_inf=eefc30ae6c6f441a9b2a616c8c1551a0&iszx=',
                '技术进出口合同登记' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/bszn.do?webId=137&iddept_yw_inf=6b8dbc7bdcbf48e39c1d65b0ca3fcce1&ql_kind=01&iddept_ql_inf=60640f2054c04bf1afe76263153308f5&iszx=',
                '国际货物运输代理企业备案' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/bszn.do?webId=137&iddept_yw_inf=c35f35f78e9d4213a582a41bbf6b3f27&ql_kind=01&iddept_ql_inf=60640f2054c04bf1afe76263153308f5&iszx=',
                '成品油经营企业资格年审' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/bszn.do?webId=137&iddept_yw_inf=9f7d0d0ca5b54253867508141346fa30&ql_kind=01&iddept_ql_inf=ceff09950a364383a0599064a615acbe&iszx=',
                '再生资源回收经营者备案' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=bf393ef20bba4855a82c4d6c25344673&iszx=',
                '内资企业登记' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=52ffb2eecd074af48410a7605f68f1af&iszx=',
                '农民专业合作社设立登记' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=0582e1bdeeef41aebdb56b3c6baa7bad&iszx=',
                '股权出质的设立' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=e67ab897d9274aa483d54555e37ddd20&iszx=',
                '企业的备案' =>'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=2ff20d8c68f64077af1df0e096a1b1b8&iszx=',
                '外国企业常驻代表机构外国（地区）企业有权签字人、外国（地区）企业的责任形式、资本（资产）、经营范围和代表的备案' =>'http://nj.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=2&iddept_ql_inf=ee94639621df4910bba790008763841f',
                '外商投资合伙企业的清算人（变动）备案、未涉及登记事项的合伙协议修改、外国合伙人法律文件送达接受人、设立分支机构的备案' =>'http://nj.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=2&iddept_ql_inf=a4e23947d33440668bdb7df51a263cac',
                '外商投资的公司境外股东、发起人法律文件送达接受人授权委托书的备案' =>'http://nj.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=2&iddept_ql_inf=82fa562d92be4ae7b80941ffab897347',
                '城市基础设施配套费的征收' =>'http://nj.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=2&iddept_ql_inf=bab79dc11c13445092154d745a966263',
            ],
            '气象局' => [
                '升放无人驾驶自由气球或者系留气球活动许可' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=e4b0d3339f814c339b52b48ad2b340f9&iszx=',
                '防雷装置设计审核' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=e8d13f141e9d4d94b5309e9fecea8519&iszx=',
                '气象探测资料审核' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=fb5557b782924025be7fac59e00ed57c&iszx=',
                '气象灾害性质等级确认' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=058ecceef1374521b71a5f7781b8a4da&iszx=',
                '组织气候可行性论证' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=77c9349bebed4e139534b907e213d3fa&iszx=',
                '雷灾调查与鉴定' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=5aa1bc59dd7247a2a9d30f76514c5b62&iszx=',
                '防雷装置竣工验收' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=5da45d061be0436eb811d75b496d232f&iszx=',
                '对外提供和使用气象资料审批' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/ywList.do?webId=137&iddept_ql_inf=eeb247cee4c0421d879a5f70610992aa&iszx=',
            ],
            '公安局' => [
                '第二类、第三类易制毒化学品购买备案证明' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/bszn.do?webId=137&iddept_yw_inf=8a2bd768ab5843f19bba2510df34aff5&ql_kind=01&iddept_ql_inf=8cd66d3decc3484e91bd60190d7dfaa9&iszx=',
                '第三类易制毒化学品运输备案证明' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/bszn.do?webId=137&iddept_yw_inf=491766b8502b4956862aa762016f41f8&ql_kind=01&iddept_ql_inf=8cd66d3decc3484e91bd60190d7dfaa9&iszx=',
                '第二类易制毒化学品运输许可证' => 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/bszn.do?webId=137&iddept_yw_inf=6e52ef8dcd154881822813201f996b17&ql_kind=01&iddept_ql_inf=8cd66d3decc3484e91bd60190d7dfaa9&iszx='
            ],
        ];

        foreach ($array as $bumen => $childArr)
        {
            $bumen = trim($bumen);

            $departmentModel = Departments::get(['name'=>$bumen]);

            $output->writeln("开始操作部门【{$departmentModel->name}】");

            foreach ($childArr as $keyname => $valurl)
            {
                $output->writeln("获取业务【{$keyname}】数据");
                $this->getYewu($valurl, $output, $departmentModel->id);
            }
        }
    }

    /**
     * 获取业务
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/6/19
     * Time: 下午9:17
     */
    public function getYewu($url='',$output, $department_id='')
    {
        $content = $this->getHtmlContent($url);

        //业务名称
        preg_match('/<div class="qlsx_tit_main">(.*)<\/div>/i', $content, $nameMatch);

        if (!$nameMatch) return ;
            $name = trim($nameMatch[1]);

        $output->writeln("开始获取业务【{$name}】");

        //类别
        preg_match('/<td[^>]*?>类别<\/td>[^<]*?<td[^>]*?>(.*)<\/td>/i', $content, $categoryMatch);
        if ($categoryMatch) $category = trim($categoryMatch[1]);

        //权力基本编码
        preg_match('/<td[^>]*?>权力基本编码<\/td>[^<]*?<td[^>]*?>(.*)<\/td>/i', $content, $noMatch);
        if ($noMatch) $no = trim($noMatch[1]);

        //实施主体
        preg_match('/<td[^>]*?>实施主体<\/td>[^<]*?<td[^>]*?>(.*)<\/td>/i', $content, $im_subMatch);
        if ($im_subMatch) $im_sub = trim($im_subMatch[1]);

        //行使层级
        preg_match('/<td[^>]*?>行使层级<\/td>[^<]*?<td[^>]*?>(.*)<\/td>/i', $content, $levelMatch);
        if ($levelMatch) $level = trim($levelMatch[1]);


        //实施依据
        preg_match('/<td[^>]*?>实施依据<\/td>[^<]*?<td[^>]*?>([\s\S]*?)<\/td>/iS', $content, $im_basMatch);

        if ($im_basMatch) $im_bas = trim($im_basMatch[1]);

        //备注
        preg_match('/<td[^>]*?>备注<\/td>[^<]*?<td[^>]*?>(.*)<\/td>/is', $content, $remarksMatch);

        if ($remarksMatch) $remarks = trim($remarksMatch[1]);

        $totalModel = Totals::get(['name'=>$name]);

        $params = [
            'name' => $name,
            'category' => $category,
            'no' => $no,
            'im_sub' => $im_sub ? $im_sub : '',
            'level' => $level ? $level : '',
            'im_bas' => $im_bas ? $im_bas : '',
            'remarks' => $remarks ? $remarks : '',
            'department_id' => $department_id,
        ];

        if (!$totalModel)
        {
            $output->writeln('开始录入主题');

            $totalModel = Totals::create($params);
        }
        else
        {
            if ($totalModel->save($params))
            {
                $output->writeln('修改成功');
            }
            else
            {
                $output->writeln('修改失败');
            }

        }

        $output->writeln('开始获取办事指南列表');

        preg_match_all('/<div class="list_sub">[\s\S]*?<a class="c2" onclick="showYwList\(\'([\d]*?)\',\'(.*?)\',\'([\d]*?)\', \'.*?\'[\s\S]*?<div class=\"c3\">/i', $content, $matchAll);

        if ($matchAll)
        {
            $webUrl = 'http://njjbxq.jszwfw.gov.cn';

            $affairstaticUrl = '/jszwfw/bscx/itemlist/bszn.do?webId=';

            foreach ($matchAll[1] as $key => $webId) {
                $affairParam = [];

                $affairParam['total_id'] = $totalModel->id;

                $webId = trim($webId);

                $iddept_yw_inf = trim($matchAll[2][$key]);

                $ql_kind = trim($matchAll[3][$key]);

                $affairUrl = $webUrl . $affairstaticUrl . $webId . '&iddept_yw_inf=' . $iddept_yw_inf . '&ql_kind=' . $ql_kind;

                $affairContent = $this->getHtmlContent($affairUrl);

                //办事指南名称
                preg_match('/<div class="blsj_11">(.*)<\/div>/i', $affairContent, $affairNameMatch);

                if (!$affairNameMatch[1]) continue;

                $affairName = trim($affairNameMatch[1]);

                $affairParam['name'] = $affairName;

                $output->writeln("开始获取指南【{$affairName}】");

                //办理时间和地点
                preg_match('/<div class="main_right_12"[^>]*?>([\s\S]*?)<\/div>/i', $affairContent, $didianMatch);

                if ($didianMatch[1])
                {
                    $didian = trim($didianMatch[1]);

                    $affairParam['place_time'] = $didian;
                }

                preg_match('/<ul class="section_13 clearfloat">([\s\S]*?)<div class="section_12">/i', $affairContent, $jichuMatch);

                if (!$jichuMatch[1]) continue;

                preg_match_all('/<li>([\s\S]*?)：[\n\s]*?<span>([\s\S]*?)<\/span>/i', $jichuMatch[1], $affairArrMatch);

                if (!$affairArrMatch[1]) continue;

                foreach ($affairArrMatch[1] as $affairKey => $affairVal) {

                    $affairVal = trim($affairVal);

                    $affairColum = $affairArrMatch[2] ? trim($affairArrMatch[2][$affairKey]) : '';

                    switch ($affairVal) {
                        case '行使层级':
                            $affairParam['level'] = $affairColum;
                            break;
                        case '办件类型':
                            $affairParam['transact_type'] = $affairColum;
                            break;
                        case '数量限制':
                            $affairParam['num_limit'] = $affairColum;
                            break;
                        case '决定机构':
                            $affairParam['dec_org'] = $affairColum;
                            break;
                        case '办理结果送达方式':
                            $affairParam['res_send_way'] = $affairColum;
                            break;
                        case '法定办结时限':
                            $affairParam['rule_do_day'] = $affairColum;
                            break;
                        case '承诺办结时限':
                            $affairParam['agree_do_day'] = $affairColum;
                            break;
                        case '办理进程及结果查询途径':
                            $affairParam['result_search_way'] = $affairColum;
                            break;
                        case '监督及投诉渠道':
                            $affairParam['complaint_channel'] = $affairColum;
                            break;
                        case '其他共同办理部门':
                            $affairParam['other_department'] = $affairColum;
                            break;
                        case '其他共同办理处室':
                            $affairParam['other_office'] = $affairColum;
                            break;
                        case '涉及的中介机构':
                            $affairParam['agency_involved'] = $affairColum;
                            break;
                        case '是否委托行使':
                            $affairParam['is_delegate'] = $affairColum;
                            break;
                        case '委托书':
                            $affairParam['entrust_letter'] = $affairColum;
                            break;
                    }
                }


                $pUrl = 'http://www.jszwfw.gov.cn';

                //设定依据
                preg_match('/<span class="section_51">设定依据<\/span>[\s\n]*?<div class="section_52">([\s\S]*?)<\/div>/i', $affairContent, $settingMatch);

                if ($settingMatch)
                {
                    $setting = trim($settingMatch[1]);

                    if ($setting) $affairParam['setting'] = $setting;
                }

                //办理条件
                preg_match('/<span class="section_51">办理条件<\/span>[\s\n]*?<div class="section_52">([\s\S]*?)<\/div>/i', $affairContent, $conditionMatch);

                if ($conditionMatch )
                {
                    $condition = trim($conditionMatch[1]);

                    if ($condition) $affairParam['condition'] = $condition;
                }

                $affairModel = Affairs::get(['name'=>$affairName]);

                if (!$affairModel)
                {
                    $model = new Affairs();

                    $affairModel = $model->create($affairParam);

                    if ($affairModel)
                    {
                        $output->writeln('录入成功');
                    }
                    else
                    {
                        $output->writeln('录入失败');
                    }
                }
                else
                {
                    $affairModel->save($affairParam);
                    $output->writeln('修改成功');
                }


                //办理材料目录
                preg_match('/<table width="890" class="section_42">[\s\S]*?<\/table>/is', $affairContent, $materialMatch);

                if ($materialMatch)
                {
                    //获取行
                    preg_match_all('/<tr>[\s\n]*?(<td>[\s\S]*?)<\/tr>/is', $materialMatch[0], $materialTrListMatch);

                    if ($materialTrListMatch[1])
                    {
                        //循环所有行
                        foreach ($materialTrListMatch[1] as $materialTr) {
                            //获取所有列
                            preg_match_all('/<td>([\s\S]*?)<\/td>/i', $materialTr, $materialTdListMatch);

                            $material_param = [];
                            if ($materialTdListMatch[1])
                            {
                                //材料名称
                                $materialName = trim($materialTdListMatch[1][0]);
                                $material_param['name'] = $materialName;

                                //来源渠道
                                $source_channel = trim($materialTdListMatch[1][2]);
                                $material_param['source_channel'] = $source_channel;

                                //纸质材料
                                $paper_material = trim($materialTdListMatch[1][3]);
                                $material_param['paper_material'] = $paper_material;

                                //是否需要电子材料
                                $is_need_electronic = trim($materialTdListMatch[1][4]);
                                $material_param['is_need_electronic'] = $is_need_electronic;

                                //材料必要性
                                $is_must = trim($materialTdListMatch[1][5]);
                                $material_param['is_must'] = $is_must;

                                //填报须知
                                $notice = trim($materialTdListMatch[1][6]);
                                $material_param['notice'] = $notice;

                                $material_param['affair_id'] = $affairModel->id;

                                //判断办理材料是否存在
                                $materialModel = AffairMaterials::where(['affair_id'=>$affairModel->id, 'name'=>$materialName])->find();

                                if (!$materialModel)
                                {
                                    $materialNullModel = new AffairMaterials();

                                    $materialModel = $materialNullModel->create($material_param);
                                }

                                //材料填写样本
                                $materialSample = trim($materialTdListMatch[1][1]);
                                preg_match('/<a[^>]*?onclick="downloadClyb\(\'(.*)\',\'(.*)\'\);">/i', $materialSample, $materialSampleMatch);

                                $materialSampleUrl = trim($materialSampleMatch[1]);

                                $materialSampleUrl = str_replace('/home/Oracle/Middleware', '', $materialSampleUrl);

                                $materialSampleUrl = $pUrl . trim($materialSampleUrl);

                                $materialSampleName = trim($materialSampleMatch[2]);

                                if (strpos($materialSampleName, '暂无样本') === FALSE)
                                {

                                    //存储文件相对路径和文件名
                                    $filepath = '/uploads/attachment/affair/' . $affairModel->id . '/material/';

                                    $pathinfo = pathinfo($materialSampleUrl);

                                    $downRs = $this->downFile($materialSampleUrl, $filepath);

                                    if ($downRs)
                                    {
                                        $fileModel = AffairFiles::get(['affair_id'=>$affairModel->id, 'name'=>$downRs['file_name'],'name'=>$downRs['file_name'],'type'=>4]);

                                        if (!$fileModel)
                                        {
                                            $staticFileModel = new AffairFiles();

                                            $fileModel = $staticFileModel->create([
                                                'affair_id' => $affairModel->id,
                                                'name' => $downRs['file_name'],
                                                'file_path' => $downRs['file_path'],
                                                'type' => 4,
                                                'source_file_path' => $materialSampleUrl,
                                                'extension' => $pathinfo['extension'],
                                                'material_id' => $materialModel->id,
                                            ]);

                                            if ($fileModel)
                                            {
                                                $output->writeln('存储材料目录成功');
                                            }
                                            else
                                            {
                                                $output->writeln('存储材料目录失败');
                                            }
                                        }
                                        else
                                        {
                                            $output->writeln('材料目录已经存储');
                                        }

                                        $materialModel->save([
                                            'affair_file_id'=>$fileModel->id,
                                            'material_sample' => $downRs['file_name']
                                        ]);
                                    }
                                }
                            }
                        }
                    }
                }

                //办理结果形式
                preg_match('/<li>[\s\n]*?办理结果形式：([\s\S]*?)<\/li>/i', $affairContent, $resultTypeMatch);

                $pUrl = 'http://www.jszwfw.gov.cn';
                if (isset($resultTypeMatch[1]) && $resultTypeMatch[1])
                {
                    preg_match_all('/<a[^>]*?onclick="downloadClyb\(\'(.*)\',\'(.*)\'\);">/i', $resultTypeMatch[1], $resultTypeMatch2);

                    foreach ($resultTypeMatch2[1] as $k => $resultTypeUrl)
                    {
                        $fileUrl = $pUrl . trim($resultTypeUrl);

                        //存储文件相对路径和文件名
                        $filepath = '/uploads/attachment/affair/' . $affairModel->id . '/result_type/';

                        $fileUrl = str_replace('/home/Oracle/Middleware', '', $fileUrl);

                        $pathinfo = pathinfo($fileUrl);

                        $downRs = $this->downFile($fileUrl, $filepath);

                        if ($downRs)
                        {
                            $fileModel = AffairFiles::get(['affair_id'=>$affairModel->id, 'name'=>$downRs['file_name'],'type'=>2]);

                            if (!$fileModel)
                            {
                                $staticFileModel = new AffairFiles();

                                $fileModel = $staticFileModel->create([
                                    'affair_id' => $affairModel->id,
                                    'name' => $downRs['file_name'],
                                    'file_path' => $downRs['file_path'],
                                    'type' => 2,
                                    'source_file_path' => $fileUrl,
                                    'extension' => $pathinfo['extension'],
                                ]);

                                if ($fileModel)
                                {
                                    $output->writeln('存储结果形式成功');
                                }
                                else
                                {
                                    $output->writeln('存储结果形式失败');
                                }
                            }
                            else
                            {
                                $output->writeln('结果形式已经存储');
                            }
                        }
                    }
                }

                //表格下载服务
                preg_match('/<li>[\s\n]*?表格下载服务：([\s\S]*?)<\/li>/i', $affairContent, $tableDownMatch);

                if (isset($tableDownMatch[1]) && $tableDownMatch[1])
                {
                    preg_match_all('/<a[^>]*?onclick="downloadClyb\(\'(.*)\',\'(.*)\'\);">/i', $tableDownMatch[1], $tableDownMatch2);

                    foreach ($tableDownMatch2[1] as $k => $tableDownUrl)
                    {
                        $fileUrl = $pUrl . trim($tableDownUrl);

                        //存储文件相对路径和文件名
                        $filepath = '/uploads/attachment/affair/' . $affairModel->id . '/table_down/';

                        $fileUrl = str_replace('/home/Oracle/Middleware', '', $fileUrl);

                        $pathinfo = pathinfo($fileUrl);

                        $downRs = $this->downFile($fileUrl, $filepath);

                        if ($downRs)
                        {
                            $fileModel = AffairFiles::get(['affair_id'=>$affairModel->id, 'name'=>$downRs['file_name'],'type'=>3]);

                            if (!$fileModel)
                            {
                                $staticFileModel = new AffairFiles();

                                $fileModel = $staticFileModel->create([
                                    'affair_id' => $affairModel->id,
                                    'name' => $downRs['file_name'],
                                    'file_path' => $downRs['file_path'],
                                    'type' => 3,
                                    'source_file_path' => $fileUrl,
                                    'extension' => $pathinfo['extension'],
                                ]);

                                if ($fileModel)
                                {
                                    $output->writeln('存储表格下载成功');
                                }
                                else
                                {
                                    $output->writeln('存储表格下载失败');
                                }
                            }
                            else
                            {
                                $output->writeln('表格下载已经存储');
                            }
                        }
                    }
                }

                //流程图
                preg_match('/<div class="box"[^<]*?<img src="(.*)" alt="" \/>/i', $affairContent, $liuchengMatch);

                if (isset($liuchengMatch) && $liuchengMatch)
                {

                    $liuchengUrl = trim($liuchengMatch[1]);

                    if (strpos($liuchengUrl, $pUrl) === FALSE)
                    {
                        $liuchengUrl = $pUrl . $liuchengUrl;
                    }

                    //存储文件相对路径和文件名
                    $filepath = '/uploads/attachment/affair/' . $affairModel->id . '/tree_img/';

                    $liuchengUrl = str_replace('/home/Oracle/Middleware', '', $liuchengUrl);

                    $pathinfo = pathinfo($liuchengUrl);

                    $liuchengRs = $this->downFile($liuchengUrl, $filepath);

                    if ($liuchengRs)
                    {
                        $fileModel = AffairFiles::get(['affair_id'=>$affairModel->id, 'name'=>$liuchengRs['file_name'],'type'=>1]);

                        if (!$fileModel)
                        {
                            $staticFileModel = new AffairFiles();

                            $fileModel = $staticFileModel->create([
                                'affair_id' => $affairModel->id,
                                'name' => $liuchengRs['file_name'],
                                'file_path' => $liuchengRs['file_path'],
                                'type' => 1,
                                'down_status' => 2,
                                'source_file_path' => $liuchengUrl,
                                'extension' => $pathinfo['extension'],
                            ]);

                            if ($fileModel)
                            {
                                $output->writeln('存储流程图成功');
                            }
                            else
                            {
                                $output->writeln('存储流程图失败');
                            }
                        }
                        else
                        {
                            $output->writeln('流程图已经存储');
                        }
                    }
                }
            }
        }
        else
        {
            $output->writeln('办事指南为空');
        }
    }

    function downFile($url, $filepath='', $localfilename='')
    {

        $pathinfo = pathinfo($url);

        $extension = $pathinfo['extension']; //文件扩展

        $basename = $pathinfo['basename']; //原文件名

        //本地存储路径
        $staticpath = ROOT_PATH . 'public';

        //存储文件相对路径和文件名
        if (!$filepath)
        {
            $filepath = '/uploads/attachment/affair/' . date('Ymd', time()) . '/';
        }

        if (!$localfilename)
        {
            $localfilename = md5($basename) . ".{$extension}" ; //本地文件名
        }

        $localfilepath = $staticpath . $filepath . $localfilename;

        $this->mkdirs($staticpath . $filepath);

        if (file_exists($localfilepath))
        {
            $return['file_name'] = $basename;

            $return['file_path'] = $filepath . $localfilename;

            return $return;
        }

        Http::curlDownload($url, $localfilepath);

        if (file_exists($localfilepath))
        {
            $return['file_name'] = $basename;

            $return['file_path'] = $filepath . $localfilename;;
        }
        else
        {
            return false;
        }
        return $return;
    }

    /**
     * 获取网页内容
     * @param $url
     * @return array|bool|mixed|string
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/6/24
     * Time: 下午2:16
     */
    function getHtmlContent($url)
    {
        //获取主题
        $filename = md5($url);

        $content = $this->getFile($filename);

        if (!$content)
        {
            $content = Http::get($url);
            $this->saveFile($filename, $content);
        }

        return $content;
    }

    /**
     * 获取所有个人主题
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/6/19
     * Time: 下午9:33
     */
    public function getPersonalTopic()
    {
        $url = 'http://njjbxq.jszwfw.gov.cn/jszwfw/bscx/itemlist/gr_index.do?webId=137&themid=B101&deptid=';
        $content = Http::get($url);

        print_r($content);
        preg_match_all('/<a class=\"left_list_sub" data="B[\d]*?\" href=\"(.*)\" [^>]*?title=".*"><span>(.*)<\/span><\/a>/', $content, $match);
//        preg_match("/<div class=\"left_list left_list_fwzt\"[\s\S.*]<td class=\"fuwu_right/iS", $content, $match);
        print_r($match);
    }

    function getFile($filename, $dir='')
    {
        $filepath = ROOT_PATH . 'runtime/zhengwuhtml';

        if ($dir) $filepath = $filepath . DS . $dir;

        $filepath = $filepath . DS . $filename . '.html';

        if (!file_exists($filepath)) return false;

        return file_get_contents($filepath);
    }

    function saveFile($filename,$result, $dir='')
    {
        $filepath = ROOT_PATH . 'runtime/zhengwuhtml';

        if ($dir) $filepath = $filepath . DS . $dir;

        $this->mkdirs($filepath);

        $filename = $filepath . DS. $filename .'.html';

        $this->writeFile($filename, $result);
    }

    public function mkdirs($dir, $mode = 0777)
    {
        if (is_dir($dir) || @mkdir($dir, $mode)) return TRUE;
        if (!mkdir(dirname($dir), $mode)) return FALSE;
        return @mkdir($dir, $mode);
    }

    function writeFile($filename, $content){
        $fp = fopen($filename, 'a');
        fwrite($fp, $content);
        fclose($fp);
    }
}