<?php
/**
 * 窗口办事指南管理
 * @author shengwx <shengwxde@sina.com>
 */

namespace app\admin\controller;

use app\common\model\WindowAffairs;
use app\common\model\Affairs;
use app\common\model\Windows;
use think\Db;

class WindowAffair extends Base
{

    protected $showFormFooterResetButton=false;

    public function index()
    {
        $model = new WindowAffairs();

        $page_param = ['query' => []];
        if (isset($this->param['keywords']) && !empty($this->param['keywords'])) {

            $page_param['query']['keywords'] = $this->param['keywords'];

            $affairIdList = Affairs::whereLike('name', "%" . $this->param['keywords'] . "%")->column('id');

            if ($affairIdList)
            {
                $affairIdStr = implode(', ', $affairIdList);
            }
            $model->where('affair_id', "in" , "{$affairIdStr}");

            $this->assign('keywords', $this->param['keywords']);
        }

        $window_id = isset($this->param['window_id']) && $this->param['window_id'] ? (int)$this->param['window_id'] : 0;

        if (!$window_id) return $this->error('请从窗口管理中进入此页面');

        if ($window_id)
        {
            $model->where('window_id', '=', $window_id);

            $window_info = Windows::get($window_id);

            $this->assign('window_id', $window_id);

            $this->assign('window_info', $window_info);
        }

        $page_param['query']['window_id'] = $window_id;

        $list = $model
            ->order('id DESC')
            ->paginate($this->webData['list_rows'], false, $page_param);

//        foreach ($list as &$item)
//        {
//            $affairInfo = Affairs::column('name')->get(['id'=>$item->affair_id]);
//
//        }
        unset($item);

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

            $window_id = isset($this->param['window_id']) && $this->param['window_id'] ? (int)$this->param['window_id'] : '';
            if (!$window_id)
            {
                return $this->error('窗口ID丢失');
            }


            if (!isset($this->param['affair_id']) || empty($this->param['affair_id']))
            {
                return $this->error('请选择办事指南');
            }

            $affair_id_list = $this->param['affair_id'];

            foreach ($affair_id_list as $affair_id) {
                $result = WindowAffairs::where([
                    'window_id' => $window_id,
                    'affair_id' => $affair_id,
                ])->find();

                if ($result)
                {
                    $errorMsg = "窗口【{$result->windowInfo->name}】已经与办事指南【{$result->affairInfo->name}】绑定了";
                    return $this->error($errorMsg);
                }
            }

            // 启动事务
            Db::startTrans();
            try{

                foreach ($affair_id_list as $affair_id) {

                    $result = WindowAffairs::create([
                        'window_id' => $window_id,
                        'affair_id' => $affair_id,
                    ]);

                    if (!$result)
                    {
                        throw new Exception('操作失败');
                    }

                }
                // 提交事务
                Db::commit();
            } catch (\Exception $e) {
                // 回滚事务
                Db::rollback();

                return $this->error($e->getMessage());
            }

            return $this->success();
        }

        $window_id = isset($this->param['window_id']) && $this->param['window_id'] ? (int)$this->param['window_id'] : 0;

        if ($window_id)
        {
            $window_info = Windows::get($window_id);

            $this->assign('window_id', $window_id);

            $this->assign('window_info', $window_info);
        }

        return $this->fetch();
    }

    //修改
//    public function edit()
//    {
//        $info = WindowAffairs::get($this->id);
//
//        if (!$info) {
//            return $this->error('问题不存在');
//        }
//        if ($this->request->isPost()) {
//            $result = $this->validate($this->param, 'AffairQuestion.edit');
//            if (true !== $result) {
//                return $this->error($result);
//            }
//
//            if (false !== $info->save($this->param)) {
//                return $this->success();
//            }
//            return $this->error();
//        }
//        $window_info = Affairs::get($info->window_id);
//
//        $this->assign('window_id', $info->window_id);
//
//        $this->assign('window_info', $window_info);
//
//        $this->assign([
//            'info'  => $info,
//        ]);
//        return $this->fetch('add');
//    }


    //删除
    public function del()
    {
        $id     = $this->id;
        $result = WindowAffairs::destroy(function ($query) use ($id) {
            $query->whereIn('id', $id);
        });
        if ($result) {
            return $this->deleteSuccess();
        }

        return $this->error('删除失败');
    }


    public function select()
    {
        $model = new WindowAffairs();

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