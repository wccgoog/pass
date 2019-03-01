<?php
/**
 * 主题管理
 * @author shengwx <shengwxde@sina.com>
 */

namespace app\admin\controller;

use app\common\model\Topics;
use tools\Attachment;

class Map extends Base
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
		$res = db('navigation')->where($map)->paginate(10);
        $list = db('navigation')->where($map)->order('id desc')->page($page,10)->select();
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
        $de = db('window')->where($map)->select();
        $this->assign('de',$de);

        return $this->fetch();
    }
     //增加
    public function addMap()
    {
        $attachment = new Attachment();
        $file =  $attachment->upload('avatar');
        $data = array();
        if($file['code']==1){
           $data['img'] = $file['data'];
        }
        $in = input('post.in');
        $arrive = input('post.arrive');
    
        
        $data['in'] = $in;
        $data['arrive'] = $arrive;
        $data['addtime'] = date('Y-m-d H:i:s',time());
        $res = db('navigation')->insert($data);
        if ($res) 
        {
            return $this->success();
        }else
        {
            return $this->error();
        }

    }
}

