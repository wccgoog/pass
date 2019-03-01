<?php
/**
 * 办事指南附件模型
 *
 * @author: shengwx shengwx@sina.com
 * Date: 2018/5/9
 * Time: 上午3:12
 */


namespace app\common\model;

class AffairFiles extends BaseModel
{
    protected $name = 'affair_file';

    protected $type = [
        1 => '流程图',
        2 => '办理结果形式',
        3 => '表格下载服务',
        4 => '办理材料目录',
        5 => '委托书',
    ];

    public function getFilePathAttr($file_path)
    {
        if (!$file_path) return ;
        $file_path_url = config('web_url') . $file_path;

        return $file_path_url;
    }

    /**
     * 获取流程图
     * @param $affair_id
     * @return array
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/6/28
     * Time: 上午12:35
     */
    public function getTreeImgInfo($affair_id, $field='*')
    {
        $model = $this->field($field)->where(['type'=>1, 'affair_id'=>$affair_id])->find();
        return $model;
    }

    /**
     * 获取委托书
     * @param $affair_id
     * @param string $field
     * @return array|false|\PDOStatement|string|\think\Model
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/7/2
     * Time: 下午11:00
     */
    public function getEntrustLetterInfo($affair_id, $field='*')
    {
        $model = $this->field($field)->where(['type'=>5, 'affair_id'=>$affair_id])->find();
        return $model;
    }

    /**
     * 获取表格服务
     * @param $affair_id
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/6/28
     * Time: 上午12:41
     */
    public function getTableDownServerList($affair_id, $field='*')
    {
        $list = $this->field($field)->where(['type'=>3, 'affair_id'=>$affair_id])->select();

//        if ($list)
//        {
//            foreach ($list as &$item)
//            {
//                $item['file_path'] = $item['file_path'] ? config('web_url') . $item['file_path'] : '';
//            }
//            unset($item);
//        }

        return $list;
    }

    /**
     * 获取办理结果形式
     * @param $affair_id
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/6/28
     * Time: 上午12:41
     */
    public function getResultTypeList($affair_id, $field='*')
    {
        $list = $this->field($field)->where(['type'=>2, 'affair_id'=>$affair_id])->select();

//        if ($list)
//        {
//            foreach ($list as &$item)
//            {
//                $item['file_path'] = $item['file_path'] ? config('web_url') . $item['file_path'] : '';
//            }
//            unset($item);
//        }

        return $list;
    }
}
