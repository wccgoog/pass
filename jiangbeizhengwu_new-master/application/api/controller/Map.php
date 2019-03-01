<?php
namespace app\api\controller;

use app\common\model\Affairs;
use app\common\model\Departments;
use app\common\model\Topics;
use app\common\model\Totals;
use app\common\model\WindowAffairs;
use app\common\model\Windows;

class Map extends Api
{
    protected $needAuth = false;

    /**
     *  获取导航图
     * @ param
     * @DateTime   2018-05
     * @UpdateAt
     * @Author  wzs
     */
    public function getMap()
    {
    	// dump(1);exit;
//        $in = isset($this->param['in']) ? $this->param['in'] : 1;
//        $arrive = isset($this->param['arrive'])?$this->param['arrive']:'';
//
//        if (!is_numeric($arrive))
//        {
//            return $this->error('参数错误');
//        }
//        $map = array();
//        $map['affair_id'] = $arrive;
//        $a = db('window_affair')->where($map)->find();
//        if (!$a)
//        {
//        	return $this->error('该事件暂未配置导航，请至服务台咨询，敬请谅解！');exit;
//        }
//
//        //获取首页主题
//        $map = array();
//        $map['id'] = $a['window_id'];
//        $da = WindowAffairs::where($map)->find();
//        if ($in == 1)
//        {
//            $da['img'] = 'https://'.$_SERVER['HTTP_HOST'].'/'.$da['inlet_one_image'];
//        }else
//        {
//            $da['img'] = 'https://'.$_SERVER['HTTP_HOST'].'/'.$da['inlet_twe_image'];
//        }
//
//        $data = array();
//        $data['data'] = $da;
//        return $this->success($data, '获取成功');


        //位置ID  1、一号门   2、二号门
        $in     = isset($this->param['in']) ? $this->param['in'] : 1;

        //需要办理的办事指南
        $affair_id = isset($this->param['affair_id'])?$this->param['affair_id']:'';

        if (!$affair_id)
        {
            return $this->error('请选中办事指南');
        }

        $windowAffairInfo = WindowAffairs::where(['affair_id'=>$affair_id])->find();

        if (!$windowAffairInfo)
        {
            return $this->error('该办事指南暂未配置导航，请至服务台咨询，敬请谅解！');
        }

        //获取首页主题
        $windowInfo = Windows::where(['id'=>$windowAffairInfo['window_id']])->find();
        if ($in == 1)
        {
            $windowInfo['img'] = $windowInfo['inlet_one_image'];
        }else
        {
            $windowInfo['img'] = $windowInfo['inlet_twe_image'];
        }

        $data = array();
        $data['data'] = $windowInfo;
        return $this->success($data, '获取成功');
    }

    /**
     * 列表页
     * @ param
     * @DateTime   2018-05
     * @UpdateAt
     * @Author  wzs
     */
    public function getAffair()
    {
        $bid = isset($this->param['bid']) ? $this->param['bid'] : 0;

        if (!$bid) return $this->error('参数错误');
        //获取首页主题
        $map = array();
        $map['id'] = $bid;
        $map['is_delete'] = 1;
        $da = db('bar')->where($map)->select();
        $list = array();
       	foreach ($da as $key => $value) 
       	{
       		$map = array();
       		$map['id'] = $value['d_id'];
       		$map['is_delete'] = 1;
       		$list[$key] = db('affair')->where($map)->field('id,name')->find();

       	}

        $data = array();
        $data['data'] = $list;
        $data['in'] = $da['name'];

        return $this->success($data, '获取成功');


    }

    /**
     * 列表详情页
     * @ param
     * @DateTime   2018-05
     * @UpdateAt
     * @Author  wzs
     */
    public function total()
    {
        $id = isset($this->param['id']) ? $this->param['id'] : '';

        if (!is_numeric($id)) return $this->error('参数错误');

        $detail = Totals::field('id,name,type,no,im_sub,level,im_bas')->find(['id'=>$id]);

        if (!$detail) return $this->error('查询事项不存在');

        $detail['second_list'] = Affairs::where(['total_id'=>$detail->id])->order('id DESC')->select();

        return $this->success($detail, '获取成功');
    }

    /**
     * 详情页
     * @ param
     * @DateTime   2018-05
     * @UpdateAt
     * @Author  wzs
     */
    public function detail()
    {
        $id = isset($this->param['id']) ? $this->param['id'] : '';

        if (!is_numeric($id)) return $this->error('参数错误');

        $detail = Affairs::find(['id'=>$id]);

        if(!$detail)
        {
            return $this->error('该事项不存在');
        }

        return $this->success($detail);
    }
}
