<?php
/**
 * 主题管理
 * @author shengwx <shengwxde@sina.com>
 */

namespace app\admin\controller;

use app\common\model\Topics;
use tools\Attachment;

class Topic extends Base
{

    protected $showFormFooterResetButton=false;
    protected $type_list = [
        1 => '个人服务',
        2 => '法人办事',
    ];

    public function index()
    {
        $model = new Topics();
        $page_param = ['query' => []];
        if (isset($this->param['keywords']) && !empty($this->param['keywords'])) {
            $page_param['query']['keywords'] = $this->param['keywords'];

            $model->whereLike('name', "%" . $this->param['keywords'] . "%");
            $this->assign('keywords', $this->param['keywords']);
        }

        if (isset($this->param['type']) && $this->param['type'] > 0)
        {
            $model->where('type', '=', $this->param['type']);
            $this->assign('type', $this->param['type']);
        }

        $list = $model
            ->order('sort_order asc,id desc')
            ->paginate($this->webData['list_rows'], false, $page_param);

        $this->assign([
            'list' => $list,
            'page'  => $list->render(),
            'total' => $list->total(),
            'type_list' => $this->type_list,
        ]);
        return $this->fetch();
    }

    //增加
    public function add()
    {
        if ($this->request->isPost()) {

            $result = $this->validate($this->param, 'Topic.add');
            if (true !== $result) {
                return $this->error($result);
            }

            $this->param['sort_order'] = isset($this->param['sort_order']) && $this->param['sort_order'] ? $this->param['sort_order'] : 125;

            $attachment = new Attachment();
            $file =  $attachment->upload('logo', 'topic/logo/');
            if($file['code']==1){
                $this->param['logo'] = $file['data'];
            }

            $user = Topics::create($this->param);
            if ($user) {
                return $this->success();
            }
            return $this->error();
        }

        $this->assign([
            'type_list' => $this->type_list,
        ]);

        return $this->fetch();
    }

    //修改
    public function edit()
    {
        $info = Topics::get($this->id);
        if (!$info) {
            return $this->error('部门不存在');
        }

        if ($this->request->isPost()) {
            $result = $this->validate($this->param, 'Topic.edit');
            if (true !== $result) {
                return $this->error($result);
            }

            $attachment = new Attachment();
            $file =  $attachment->upload('logo', 'topic/logo/');
            if($file['code']==1){
                $this->param['logo'] = $file['data'];
            }

            $this->param['sort_order'] = isset($this->param['sort_order']) && $this->param['sort_order'] ? $this->param['sort_order'] : 125;

            if (false !== $info->save($this->param)) {
                return $this->success();
            }
            return $this->error();
        }

        $this->assign([
            'info'  => $info,
            'type_list' => $this->type_list,
        ]);
        return $this->fetch('add');
    }


    //删除
    public function del()
    {
        $id     = $this->id;
        $result = Topics::destroy(function ($query) use ($id) {
            $query->whereIn('id', $id);
        });
        if ($result) {
            return $this->deleteSuccess();
        }

        return $this->error('删除失败');
    }


    public function select()
    {
        $model = new Topics();

        $id = isset($this->param['id']) && !empty($this->param['id']) ? $this->param['id']: 0;

        if (isset($this->param['keywords']) && !empty($this->param['keywords'])) {
            $model->whereLike('name', "%" . trim($this->param['keywords']) . "%");
        }

        if ($id)
        {
            $model->where('id', '<>', $id);
        }

        $lists = $model
            ->order('id desc')
            ->field('id, name as text,type')
            ->limit(20)
            ->select();

        foreach ($lists as &$item)
        {
            if ($item->type ==1)
            {
                $item->text = '(个人)'.$item->text;
            }
            else
            {
                $item->text = '(法人)'.$item->text;
            }
        }
        unset($item);

        return $this->success('获取成功', '', $lists);
    }
}