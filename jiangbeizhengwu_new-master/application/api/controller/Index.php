<?php
namespace app\api\controller;

use app\common\model\AffairFiles;
use app\common\model\AffairMaterials;
use app\common\model\Affairs;
use app\common\model\Departments;
use app\common\model\Topics;
use app\common\model\Totals;

class Index extends Api
{
    protected $needAuth = false;

    /**
     *   首页
     * @ param
     * @DateTime   2018-05
     * @UpdateAt
     * @Author  wzs
     */
    public function index()
    {
        $type = isset($this->param['type']) ? $this->param['type'] : 0;

        if (!is_numeric($type))
        {
            return $this->error('参数错误');
        }

        //获取首页主题
        $topic = Topics::where(['type'=>$type])->field('id,intro,name,logo')->limit(6)->order('sort_order ASC,id desc')->select();

        foreach ($topic as $key => $value)
        {
            $topic[$key]['sid'] = 't'.$value['id'];
        }

        //获取部门
        $department = Departments::field('id,name,logo')->limit(12)->order('sort_order ASC,id desc')->select();
        foreach ($department as $key => $value)
        {
            $department[$key]['sid'] = 'd'.$value['id'];
        }
        $data = array();
        $data['topic'] = $topic;
        $data['department'] = $department;
        return $this->success($data, '获取成功');
    }

    /**
     * 获取主题列表
     *
     * @param int $type 1、个人  2、法人/企业
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/6/27
     * Time: 下午11:04
     */
    public function topicList()
    {
        $model = new Topics();
        $type = isset($this->param['type']) && $this->param['type'] ? $this->param['type'] : 1;

        $topic_list = $model->where('type', $type)
            ->field('id,name,logo,intro')
            ->order('sort_order', 'asc')
            ->select();

        return $this->success($topic_list, '获取成功');
    }

    /**
     *
     * 获取部门列表
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/6/27
     * Time: 下午11:28
     */
    public function departmentList()
    {
        $model = new Departments();

        $department_list = $model->field('id,name')
            ->order('sort_order', 'asc')
            ->select();

        return $this->success($department_list, '获取成功');
    }

    /**
     * 搜索列表页
     * @ param
     * @DateTime   2018-05
     * @UpdateAt
     * @Author  wzs
     */
    public function searchAffList()
    {

        $ke = isset($this->param['key']) ? $this->param['key'] : 0;



        $map = array();
        if ($ke) 
        {
            $map['name'] = array('like',"%$ke%");
        }

        //获取首页主题
        $topic = Topics::field('id,intro,name,logo')->limit(6)->order('sort_order ASC,id desc')->where($map)->select();

        foreach ($topic as $key => $value)
        {
            $topic[$key]['sid'] = 't'.$value['id'];
        }

        //获取部门
        $department = Departments::field('id,name,logo')->limit(12)->order('sort_order ASC,id desc')->where($map)->select();
        foreach ($department as $key => $value)
        {
            $department[$key]['sid'] = 'd'.$value['id'];
        }
        $data = array();
        $data['topic'] = $topic;
        $data['department'] = $department;
        return $this->success($data, '获取成功');

    }

    /**
     * 列表页
     * @ param
     * @DateTime   2018-05
     * @UpdateAt
     * @Author  wzs
     */
    public function affList()
    {
        $sid = isset($this->param['sid']) ? $this->param['sid'] : 0;
        $type = isset($this->param['type']) ? $this->param['type'] : 0;

        if (!$sid) return $this->error('参数错误');

        //拼接标题
        $title = $type==1 ? '个人服务' : '法人办事';

        $map = [];

        if (strpos($sid,'d') !== false)
        {
            //根据部门查询
            $department_id = intval(str_replace("d","",$sid));

            $map['department_id'] = $department_id;

            $obj = Departments::find(['id'=>$department_id]);

        }else
        {
            //根据主题查询
            $topic_id = intval(str_replace("t","",$sid));

            $map['topic_id'] = $topic_id;

            $obj = Topics::find(['id'=>$topic_id]);
        }

        $title = $title.'>'.$obj->name;
        //查询
        $list = Totals::where($map)->field('id,name,type,no,im_sub,level,im_bas')->order('id desc')->select();

        return $this->success([
            'title' => $title,
            'list' => $list,
        ], '查询成功');


    }

    /**
     * 业务详情-办事指南列表
     * @ param
     * @DateTime   2018-05
     * @UpdateAt
     * @Author  wzs
     */
    public function total()
    {
        $id = isset($this->param['id']) ? $this->param['id'] : '';

        if (!is_numeric($id)) return $this->error('参数错误');

        $detail = Totals::field('id,name,category,no,im_sub,level,im_bas,remarks')->find(['id'=>$id]);

        if (!$detail) return $this->error('查询事项不存在');

        $detail['second_list'] = Affairs::where(['total_id'=>$detail->id])->order('id DESC')->select();

        return $this->success($detail, '获取成功');
    }


    /**
     * 办事指南详情
     *
     * @throws \think\Exception
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/6/28
     * Time: 上午12:08
     */
    public function detail()
    {
        $id = isset($this->param['id']) ? $this->param['id'] : '';

        if (!is_numeric($id)) return $this->error('参数错误');

        $fields = 'id,type,name,place_time,level,transact_type,num_limit,dec_org,res_send_way,im_bas,rule_do_day,agree_do_day,contact_way,result_search_way,complaint_channel,other_department,other_office,agency_involved,is_delegate,arrive_count,setting,condition,outlay_criterion';

        $model = Affairs::field($fields)->where(['id'=>$id])->find();

        if(!$model)
        {
            return $this->error('该事项不存在');
        }


        $affairFileModel = new AffairFiles();

        //获取流程图
        $treeImgInfo = $affairFileModel->getTreeImgInfo($model->id, 'id,name,file_path,extension');

        $model->tree_img = $treeImgInfo;

        //委托书
        $entrustLetterInfo = $affairFileModel->getEntrustLetterInfo($model->id, 'id,name,file_path,extension');

        $model->entrust_letter = $entrustLetterInfo;

        //表格下载服务
        $table_down_srver_list = $affairFileModel->getTableDownServerList($model->id, 'id,name,file_path,extension');

        $model->table_down_srver_list = $table_down_srver_list;

        //结果返回形式
        $result_type_list = $affairFileModel->getResultTypeList($model->id, 'id,name,file_path,extension');

        $model->result_type_list = $result_type_list;

        //办理材料目录
        $materialModel = new AffairMaterials();

        $material_list = $materialModel->getList($model->id, 'id,name,material_sample,source_channel,paper_material,is_need_electronic,is_must,notice,affair_file_id');

        $model->affair_material_list = $material_list;

        return $this->success($model);
    }

    /**
     *   查询首页

     * @ param
     * @DateTime   2018-05
     * @UpdateAt
     * @Author  wzs
     */
    public function searchIndex()
    {
        $type = isset($this->param['type']) ? $this->param['type'] : 0;

        if (!is_numeric($type))
        {
            return $this->error('参数错误');
        }

        //获取首页主题
        $topic = Topics::where(['type'=>$type])->field('id,intro,name,logo')->limit(6)->order('sort_order ASC,id desc')->select();

        foreach ($topic as $key => $value)
        {
            $topic[$key]['sid'] = 't'.$value['id'];
        }

        //获取部门
        $department = Departments::field('id,name,logo')->limit(12)->order('sort_order ASC,id desc')->select();
        foreach ($department as $key => $value)
        {
            $department[$key]['sid'] = 'd'.$value['id'];
        }
        $data = array();
        $data['topic'] = $topic;
        $data['department'] = $department;
        return $this->success($data, '获取成功');
    }
}
