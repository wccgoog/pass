<?php
/**
 * 业务管理
 * @author shengwx <shengwxde@sina.com>
 */

namespace app\admin\controller;

use app\common\model\Totals;

class Total extends Base
{

    protected $showFormFooterResetButton=false;
    protected $level_list = [
        1 => '地区',
        2 => '县级',
        3 => '市级',
        4 => '省级',
    ];
    protected $type_list = [
        1 => '个人服务',
        2 => '法人办事',
    ];

    public function index()
    {
        $model = new Totals();
        $page_param = ['query' => []];
        if (isset($this->param['keywords']) && !empty($this->param['keywords'])) {
            $page_param['query']['keywords'] = $this->param['keywords'];

            $model->whereLike('name', "%" . $this->param['keywords'] . "%");
            $this->assign('keywords', $this->param['keywords']);
        }

        if (isset($this->param['type']) && in_array($this->param['type'],[1,2]))
        {
            $model->where('type', '=', $this->param['type']);
            $this->assign('type', $this->param['type']);
        }

        if (isset($this->param['level']) && in_array($this->param['level'],[1,2,3,4]))
        {
            $model->where('level', '=', $this->param['level']);
            $this->assign('level', $this->param['level']);
        }

        $list = $model
            ->order('id desc')
            ->paginate($this->webData['list_rows'], false, $page_param);

        $this->assign([
            'list' => $list,
            'page'  => $list->render(),
            'total' => $list->total(),
            'type_list' => $this->type_list,
            'level_list' => $this->level_list,
        ]);
        return $this->fetch();
    }

    //增加
    public function add()
    {
        if ($this->request->isPost()) {

            $result = $this->validate($this->param, 'Total.add');
            if (true !== $result) {
                return $this->error($result);
            }

            $total = Totals::create($this->param);
            if ($total) {
                return $this->success();
            }
            return $this->error();
        }

        $this->assign([
            'type_list' => $this->type_list,
            'level_list' => $this->level_list,
        ]);

        return $this->fetch();
    }

    //修改
    public function edit()
    {
        $info = Totals::get($this->id);

        if (!$info) {
            return $this->error('业务不存在');
        }
        if ($this->request->isPost()) {
            $result = $this->validate($this->param, 'Total.edit');
            if (true !== $result) {
                return $this->error($result);
            }

            if (false !== $info->save($this->param)) {
                return $this->success();
            }
            return $this->error();
        }

//        print_r($info->topic_info());

        $this->assign([
            'info'  => $info,
            'type_list' => $this->type_list,
            'level_list' => $this->level_list,
        ]);
        return $this->fetch('add');
    }


    //删除
    public function del()
    {
        $id     = $this->id;
        $result = Totals::destroy(function ($query) use ($id) {
            $query->whereIn('id', $id);
        });
        if ($result) {
            return $this->deleteSuccess();
        }

        return $this->error('删除失败');
    }


    public function select()
    {
        $model = new Totals();

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