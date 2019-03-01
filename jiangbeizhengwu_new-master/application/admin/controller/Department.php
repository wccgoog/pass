<?php
/**
 * 部门管理
 * @author shengwx <shengwxde@sina.com>
 */

namespace app\admin\controller;

use app\common\model\Departments;
use tools\Attachment;

class Department extends Base
{

    protected $showFormFooterResetButton=false;
    public function index()
    {
        $model = new Departments();
        $page_param = ['query' => []];
        if (isset($this->param['keywords']) && !empty($this->param['keywords'])) {
            $page_param['query']['keywords'] = $this->param['keywords'];

            $model->whereLike('name', "%" . $this->param['keywords'] . "%");
            $this->assign('keywords', $this->param['keywords']);
        }

        $list = $model
            ->order('sort_order ASC,id desc')
            ->paginate($this->webData['list_rows'], false, $page_param);

        $this->assign([
            'list' => $list,
            'page'  => $list->render(),
            'total' => $list->total()
        ]);
        return $this->fetch();
    }

    //增加
    public function add()
    {
        if ($this->request->isPost()) {

            $result = $this->validate($this->param, 'Department.add');
            if (true !== $result) {
                return $this->error($result);
            }

            $this->param['sort_order'] = isset($this->param['sort_order']) && $this->param['sort_order'] ? $this->param['sort_order'] : 125;

            $attachment = new Attachment();
            $file =  $attachment->upload('logo', 'department/logo/');
            if($file['code']==1){
                $this->param['logo'] = $file['data'];
            }

            if (Departments::create($this->param)) {
                return $this->success();
            }
            return $this->error();
        }

        return $this->fetch();
    }

    //修改
    public function edit()
    {
        $info = Departments::get($this->id);
        if (!$info) {
            return $this->error('部门不存在');
        }

        if ($this->request->isPost()) {
            $result = $this->validate($this->param, 'Department.edit');
            if (true !== $result) {
                return $this->error($result);
            }

            $this->param['sort_order'] = isset($this->param['sort_order']) && $this->param['sort_order'] ? $this->param['sort_order'] : 125;

            $attachment = new Attachment();
            $file =  $attachment->upload('logo', 'department/logo/');
            if($file['code']==1){
                $this->param['logo'] = $file['data'];
            }


            if (false !== $info->save($this->param)) {
                return $this->success();
            }
            return $this->error();
        }

        $this->assign([
            'info'  => $info
        ]);
        return $this->fetch('add');
    }


    //删除
    public function del()
    {
        $id     = $this->id;
        $result = Departments::destroy(function ($query) use ($id) {
            $query->whereIn('id', $id);
        });
        if ($result) {
            return $this->deleteSuccess();
        }

        return $this->error('删除失败');
    }

    public function select()
    {
        $model = new Departments();

        $id = isset($this->param['id']) && !empty($this->param['id']) ? $this->param['id']: 0;

        if (isset($this->param['keywords']) && !empty($this->param['keywords'])) {
            $model->whereLike('name', "%" . $this->param['keywords'] . "%");
        }

        if ($id)
        {
            $model->where('id', '<>', $id);
        }

        $lists = $model
            ->order('id desc')
            ->field('id, name as text')
            ->limit(20)
            ->select();

        return $this->success('获取成功', '', $lists);
    }
}