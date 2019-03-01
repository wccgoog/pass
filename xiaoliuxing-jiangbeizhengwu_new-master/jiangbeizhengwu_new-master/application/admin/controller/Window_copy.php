<?php
/**
 * 主题管理
 * @author shengwx <shengwxde@sina.com>
 */

namespace app\admin\controller;

use app\common\model\Topics;
use tools\Attachment;

class Window extends Base
{


    public function index()
    {
        $map = array();
        $keywords = input('get.keywords');
        if ($keywords)
        {
            $map['name'] = array('like',"%$keywords%");
        }

        // $map['order_type'] = 1;
        //   $map['pay_status'] = 1;
        $page = input('get.page');
        $res = db('bar')->where($map)->paginate(10);
        $list = db('bar')->where($map)->order('id desc')->page($page,10)->select();
        $this->assign('page',$res->render());
        $this->assign('total',$res->total());
        $this->assign('list',$list);
        return $this->fetch();
    }

    //增加
    public function add()
    {
        //获取部门
        $map = array();
        $map['is_delete'] = 1;
        $de = db('topic')->where($map)->select();
        $this->assign('de',$de);

        return $this->fetch();
    }
    //增加
    public function addWin()
    {
        // $attachment = new Attachment();
        // $file =  $attachment->upload('avatar');
        // if($file['code']==1){
        //    $data[''] = $file['data'];
        // }
        $name = input('post.name');
        $a_id = input('post.t_id');
        $d_id = input('post.d_id');
        $data = array();
        $data['name'] = $name;
        $data['d_id'] = $d_id;
        $data['a_id'] = $a_id;
        $data['addtime'] = date('Y-m-d H:i:s',time());
        $res = db('bar')->insert($data);
        if ($res)
        {
            return $this->success();
        }else
        {
            return $this->error();

        }

    }

    //获取事务
    public function getTotal()
    {
        $id = input('post.id');
        if (!$id)
        {
            $data = array();
            $data['txt'] = "数据错误！";
            $data['status'] = -200;
            return $data;
        }
        $map = array();
        $map['topic_id'] = $id;
        $list = db('total')->where($map)->select();
        if (!$list)
        {
            $data = array();
            $data['txt'] = "数据错误！";
            $data['status'] = -200;
            return $data;
        }
        // dump($data);exit;


        $data = array();
        $data['list'] = $list;
        $data['status'] = 200;
        return $data;

    }

    //获取事务
    public function getZhi()
    {
        $id = input('post.id');
        if (!$id)
        {
            $data = array();
            $data['txt'] = "数据错误！";
            $data['status'] = -200;
            return $data;
        }
        $map = array();
        $map['total_id'] = $id;
        $list = db('affair')->where($map)->select();
        if (!$list)
        {
            $data = array();
            $data['txt'] = "数据错误！";
            $data['status'] = -200;
            return $data;
        }
        // dump($data);exit;


        $data = array();
        $data['list'] = $list;
        $data['status'] = 200;
        return $data;

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

