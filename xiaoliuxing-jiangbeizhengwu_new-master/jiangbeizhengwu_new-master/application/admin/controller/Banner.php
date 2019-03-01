<?php
/**
 * 轮播图管理
 * @author shengwx <shengwxde@sina.com>
 */

namespace app\admin\controller;

use app\admin\model\Attachments;
use app\common\model\Banners;
use tools\Attachment;

class Banner extends Base
{


    public function index()
    {
        $model = new Banners();

        $list = $model
            ->order('id desc')
            ->paginate($this->webData['list_rows'], false);

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

            $attachment = new Attachment();
            //入口导航图
            $image_file =  $attachment->upload('image', 'banner/');
            if($image_file['code']==1){
                $this->param['image'] = $image_file['data'];
            }

            $total = Banners::create($this->param);
            if ($total) {
                return $this->success();
            }
            return $this->error();
        }

        return $this->fetch();
    }

    //修改
    public function edit()
    {
        $info = Banners::get($this->id);
        if (!$info) {
            return $this->error('导航图不存在');
        }

        if ($this->request->isPost()) {

            $attachment = new Attachment();
            //入口导航图
            $image_file =  $attachment->upload('image', 'banner/');
            if($image_file['code']==1){
                $this->param['image'] = $image_file['data'];
            }

            if (false !== $info->save($this->param)) {
                return $this->success();
            }
            return $this->error();
        }

        $this->assign([
            'info'  => $info,
        ]);
        return $this->fetch('add');
    }


    //删除
    public function del()
    {
        $id     = $this->id;
        $result = Banners::destroy(function ($query) use ($id) {
            $query->whereIn('id', $id);
        });
        if ($result) {
            return $this->deleteSuccess();
        }

        return $this->error('删除失败');
    }
}

