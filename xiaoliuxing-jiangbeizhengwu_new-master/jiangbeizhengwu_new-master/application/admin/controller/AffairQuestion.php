<?php
/**
 * 办事指南相关问题管理
 * @author shengwx <shengwxde@sina.com>
 */

namespace app\admin\controller;

use app\common\model\AffairQuestions;
use app\common\model\Affairs;

class AffairQuestion extends Base
{

    protected $showFormFooterResetButton=false;
    public function index()
    {
        $model = new AffairQuestions();

        $page_param = ['query' => []];
        if (isset($this->param['keywords']) && !empty($this->param['keywords'])) {

            $page_param['query']['keywords'] = $this->param['keywords'];

            $model->whereLike('name', "%" . $this->param['keywords'] . "%");

            $this->assign('keywords', $this->param['keywords']);
        }

        $affair_id = isset($this->param['affair_id']) && $this->param['affair_id'] ? (int)$this->param['affair_id'] : 0;

        if ($affair_id)
        {
            $model->where('affair_id', '=', $affair_id);

            $affair_info = Affairs::get($affair_id);

            $this->assign('affair_id', $affair_id);

            $this->assign('affair_info', $affair_info);
        }

        $list = $model
            ->order('no ASC,id DESC')
            ->paginate($this->webData['list_rows'], false, $page_param);

        $this->assign([
            'list' => $list,
            'page'  => $list->render(),
            'total' => $list->total(),
        ]);
        return $this->fetch();
    }

    //增加
    public function add()
    {
        if ($this->request->isPost()) {

            $result = $this->validate($this->param, 'AffairQuestion.add');
            if (true !== $result) {
                return $this->error($result);
            }

            $total = AffairQuestions::create($this->param);
            if ($total) {
                return $this->success();
            }
            return $this->error();
        }

        $affair_id = isset($this->param['affair_id']) && $this->param['affair_id'] ? (int)$this->param['affair_id'] : 0;

        if (!$affair_id)
        {
            return $this->error('请从办事指南列表进入');
        }

        $affair_info = Affairs::get($affair_id);

        $this->assign('affair_id', $affair_id);

        $this->assign('affair_info', $affair_info);

        return $this->fetch();
    }

    //修改
    public function edit()
    {
        $info = AffairQuestions::get($this->id);

        if (!$info) {
            return $this->error('问题不存在');
        }
        if ($this->request->isPost()) {
            $result = $this->validate($this->param, 'AffairQuestion.edit');
            if (true !== $result) {
                return $this->error($result);
            }

            if (false !== $info->save($this->param)) {
                return $this->success();
            }
            return $this->error();
        }
        $affair_info = Affairs::get($info->affair_id);

        $this->assign('affair_id', $info->affair_id);

        $this->assign('affair_info', $affair_info);

        $this->assign([
            'info'  => $info,
        ]);
        return $this->fetch('add');
    }


    //删除
    public function del()
    {
        $id     = $this->id;
        $result = AffairQuestions::destroy(function ($query) use ($id) {
            $query->whereIn('id', $id);
        });
        if ($result) {
            return $this->deleteSuccess();
        }

        return $this->error('删除失败');
    }


    public function select()
    {
        $model = new AffairQuestions();

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