<?php
/**
 * 办事指南管理
 * @author shengwx <shengwxde@sina.com>
 */

namespace app\admin\controller;

use app\common\model\AffairFiles;
use app\common\model\Affairs;
use app\common\model\Totals;
use app\common\model\WindowAffairs;
use think\Db;
use think\Exception;
use tools\Attachment;

class Affair extends Base
{

    protected $showFormFooterResetButton=false;
    protected $showDataHeader = false;
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
        $model = new Affairs();

        $page_param = ['query' => []];

        if (isset($this->param['keywords']) && !empty($this->param['keywords'])) {
            $page_param['query']['keywords'] = $this->param['keywords'];

            $model->whereLike('name', "%" . $this->param['keywords'] . "%");
            $this->assign('keywords', $this->param['keywords']);
        }

        $total_id = isset($this->param['total_id']) && $this->param['total_id'] ? (int)$this->param['total_id'] : 0;

        if ($total_id)
        {
            $total_info = Totals::get($total_id);

            $model->where('total_id', '=', $total_id);
            $this->assign('total_id', $this->param['total_id']);
            $this->assign('total_info', $total_info);
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

    //文件
    public function file()
    {
        $id = input('get.id');
        $map = array();
        $map['is_delete'] = 1;
        $map['a_id'] = $id;
        $page = input('get.page');
        $res = db('affair_file')->where($map)->paginate(10);
        $list = db('affair_file')->where($map)->order('id desc')->page($page,10)->select();
        $this->assign('page',$res->render());
        $this->assign('total',$res->total());
        $this->assign('list',$list);


        return $this->fetch();
    }

    //文件
    public function addfile()
    {
        $id = input('get.id');
        $this->assign('id',$id);
        return $this->fetch('addfile');
    }

     //增加
    public function fileAdd()
    {
        $attachment = new Attachment();
        $file =  $attachment->upload('avatar');
        $data = array();
        if($file['code']==1){
           $data['file'] = $file['data'];
        }
        $name = input('post.name');
        $id = input('post.id');
    
        
        $data['name'] = $name;
        $data['a_id'] = $id;
        $data['addtime'] = date('Y-m-d H:i:s',time());
        $res = db('affair_file')->insert($data);
        if ($res) 
        {
            return $this->success();
        }else
        {
            return $this->error();
        }

    }

    //增加
    public function add()
    {
        if ($this->request->isPost()) {

//            $result = $this->validate($this->param, 'Total.add');
//            if (true !== $result) {
//                return $this->error($result);
//            }


            try
            {
                Db::startTrans();

                $model = Affairs::create($this->param);
                if (!$model)
                {
                    return $this->error('保存失败');
                }

                $attachment = new Attachment();

                //流程图
                $tree_img_file =  $attachment->upload('tree_img', "affair/{$model->id}/tree_img/");

                if($tree_img_file['code']==1)
                {
                    //判断文件是否已经存储
                    $fileListModel = AffairFiles::where(['type'=>1,'affair_id'=>$model->id, 'name'=>$tree_img_file])->select();

                    if ($fileListModel)
                    {
                        foreach ($fileListModel as $fileInfo)
                        {
                            AffairFiles::destroy(['id'=>$fileInfo['id']]);
                        }
                    }

                    $fileParam = [
                        'file_path' => $tree_img_file['data'],
                        'name' => $tree_img_file['original_name'],
                        'extension' => $tree_img_file['extension'],
                        'type' => 1,
                        'affair_id' => $model->id,
                    ];

                    $staticFileModel = new AffairFiles();

                    if (!$staticFileModel->create($fileParam))
                    {
                        throw new Exception('存储流程图失败');
                    }
                }

                //委托书
                $entrust_letter_file =  $attachment->upload('entrust_letter', "affair/{$model->id}/entrust_letter/");

                if($entrust_letter_file['code']==1)
                {
                    //判断文件是否已经存储
                    $fileListModel = AffairFiles::where(['type'=>5,'affair_id'=>$model->id, 'name'=>$entrust_letter_file])->select();

                    if ($fileListModel)
                    {
                        foreach ($fileListModel as $fileInfo)
                        {
                            AffairFiles::destroy(['id'=>$fileInfo['id']]);
                        }
                    }

                    $fileParam = [
                        'file_path' => $entrust_letter_file['data'],
                        'name' => $entrust_letter_file['original_name'],
                        'extension' => $entrust_letter_file['extension'],
                        'type' => 5,
                        'affair_id' => $model->id,
                    ];

                    $staticFileModel = new AffairFiles();

                    if (!$staticFileModel->create($fileParam))
                    {
                        throw new Exception('存储委托书失败');
                    }
                }

            }catch (\Exception $e)
            {
                Db::rollback();
                return $this->error($e->getMessage());
            }

            Db::commit();
            return $this->success();
        }


        $total_id = isset($this->param['total_id']) && $this->param['total_id'] ? (int)$this->param['total_id'] : 0;
        $total_info = [];

        if ($total_id)
        {
            $total_info = Totals::get($total_id);
        }

        $this->assign([
            'total_id' => $total_id,
            'total_info' => $total_info,
            'type_list' => $this->type_list,
            'level_list' => $this->level_list,
        ]);

        return $this->fetch();
    }

    //修改
    public function edit()
    {
        $info = Affairs::get($this->id);

        if (!$info)
        {
            return $this->error('办事指南不存在');
        }

        if ($this->request->isPost())
        {
//            $result = $this->validate($this->param, 'Total.edit');
//            if (true !== $result) {
//                return $this->error($result);
//            }

            $info->startTrans();
            try
            {
                $attachment = new Attachment();

                //流程图
                $tree_img_file =  $attachment->upload('tree_img', "affair/{$info->id}/tree_img/");

                if($tree_img_file['code']==1){

                    //判断文件是否已经存储
                    $fileListModel = AffairFiles::where(['type'=>1,'affair_id'=>$info->id])->select();

                    if ($fileListModel)
                    {
                        foreach ($fileListModel as $fileInfo)
                        {
                            AffairFiles::destroy(['id'=>$fileInfo['id']]);
                        }
                    }

                    $fileParam = [
                        'file_path' => $tree_img_file['data'],
                        'name' => $tree_img_file['original_name'],
                        'extension' => $tree_img_file['extension'],
                        'type' => 1,
                        'affair_id' => $info->id,
                    ];

                    $staticFileModel = new AffairFiles();

                    if (!$staticFileModel->create($fileParam))
                    {
                        throw new Exception('存储流程图失败');
                    }
                }

                //流程图
                $entrust_letter_file =  $attachment->upload('entrust_letter', "affair/{$info->id}/entrust_letter/");

                if($entrust_letter_file['code']==1){

                    //判断文件是否已经存储
                    $fileListModel = AffairFiles::where(['type'=>1,'affair_id'=>$info->id])->select();

                    if ($fileListModel)
                    {
                        foreach ($fileListModel as $fileInfo)
                        {
                            AffairFiles::destroy(['id'=>$fileInfo['id']]);
                        }
                    }

                    $fileParam = [
                        'file_path' => $entrust_letter_file['data'],
                        'name' => $entrust_letter_file['original_name'],
                        'extension' => $entrust_letter_file['extension'],
                        'type' => 1,
                        'affair_id' => $info->id,
                    ];

                    $staticFileModel = new AffairFiles();

                    if (!$staticFileModel->create($fileParam))
                    {
                        throw new Exception('存储流程图失败');
                    }
                }

                if (false == $info->save($this->param)) {
                    throw new Exception();
                }

            }catch (\Exception $e)
            {
                $info->rollback();
                return $this->error($e->getMessage());
            }
            $info->commit();
            return $this->success();
        }

        $total_info = Totals::get($info->total_id);

        //流程图
        $treeImgModel = AffairFiles::where([
            'type' => 1,
            'affair_id'=>$info->id,
        ])->find();

        if ($treeImgModel)
        {
            $info->tree_img_file_name = $treeImgModel->name;
            $info->tree_img = $treeImgModel->file_path;
        }

        //委托书
        $entrustLetterModel = AffairFiles::where([
            'type' => 5,
            'affair_id'=>$info->id,
        ])->find();

        if ($entrustLetterModel)
        {
            $info->entrust_letter_file_name = $entrustLetterModel->name;
            $info->entrust_letter = $entrustLetterModel->file_path;
        }

        //表格下载服务
        $table_down_server_list = AffairFiles::where(['type'=>3, 'affair_id'=>$info->id])->select();

        //办理结果形式
        $result_type_list = AffairFiles::where(['type'=>2, 'affair_id'=>$info->id])->select();

        $this->assign([
            'total_info'  => $total_info,
            'info'  => $info,
            'type_list' => $this->type_list,
            'level_list' => $this->level_list,
            'result_type_list' => $result_type_list,
            'table_down_server_list' => $table_down_server_list,
        ]);
        return $this->fetch('add');
    }


    //删除
    public function del()
    {
        $id     = $this->id;
        $result = Affairs::destroy(function ($query) use ($id) {
            $query->whereIn('id', $id);
        });
        if ($result) {
            return $this->deleteSuccess();
        }

        return $this->error('删除失败');
    }


    public function select()
    {
        $model = new Affairs();

        $window_id = isset($this->param['window_id']) && $this->param['window_id'] ? (int)$this->param['window_id'] : 0;

        $keywords = isset($this->param['keywords']) && $this->param['keywords'] ? trim($this->param['keywords']) : '';

        //去除已经关联的办事指南
        if ($window_id)
        {
            $relList = WindowAffairs::where('window_id', '=', $window_id)->column('affair_id');

            $affair_list = array_column($relList, 'affair_id');

            if ($affair_list)
            {
                $affair_ids = implode(',', $affair_list);

                $model->where('affair_id', 'not in', $affair_ids);
            }
        }

        if ($keywords) {
            $model->whereLike('name', "%" . $this->param['keywords'] . "%");
        }

        $lists = $model
            ->order('id desc')
            ->field('id, name as text')
            ->limit(20)
            ->select();

        return $this->success('获取成功', '', $lists);
    }
}