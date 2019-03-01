<?php
/**
 * 搜索管理API
 */
namespace app\api\controller;

use app\common\model\Affairs;
use app\common\model\Departments;
use app\common\model\Topics;

class Search extends Api
{
    protected $needAuth = false;

    /**
     * 查询首页
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/7/14
     * Time: 下午4:28
     */
    public function searchIndex()
    {
        $type = isset($this->param['type']) ? $this->param['type'] : 1;

        if (!is_numeric($type))
        {
            return $this->error('参数错误');
        }

        if (!in_array($type, [1,2]))
        {
            return $this->error('未知的参数');
        }

        //获取首页主题
        $topic = Topics::where(['type'=>$type])
            ->field('id,intro,name,logo')
            ->order('sort_order ASC,id desc')
            ->select();

        foreach ($topic as $key => $value)
        {
            $topic[$key]['sid'] = 't'.$value['id'];
        }

        //获取部门
        $department = Departments::field('id,name,logo')
            ->order('sort_order ASC,id desc')
            ->select();

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
     * 搜索办事指南
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/7/14
     * Time: 下午3:03
     */
    public function AffairList()
    {

        $keywords = isset($this->param['keywords']) && $this->param['keywords'] ? trim($this->param['keywords']) : '';

        $limit = isset($this->param['limit']) && $this->param['limit'] ? (int)$this->param['limit'] : 10;

        $list = Affairs::where('name&condition','like',"%{$keywords}%")
            ->field('id,name')
            ->limit($limit)
            ->select();


        $data = ['list'=>$list];
        return $this->success($data, '获取成功');
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
    public function affairDetail()
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
}
