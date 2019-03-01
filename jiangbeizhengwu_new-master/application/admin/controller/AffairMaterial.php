<?php
/**
 * 办事指南办理材料管理
 * @author shengwx <shengwxde@sina.com>
 */

namespace app\admin\controller;

use app\admin\model\Attachments;
use app\common\model\AffairFiles;
use app\common\model\AffairMaterials;
use app\common\model\Affairs;
use think\Db;
use think\Exception;
use tools\Attachment;

class AffairMaterial extends Base
{

    protected $showFormFooterResetButton=false;

    public function index()
    {
        $affair_id = isset($this->param['affair_id']) && $this->param['affair_id'] ? (int)$this->param['affair_id'] : 0;

        if (!$affair_id)
        {
            return $this->error('请从办事指南列表进入');
        }

        $model = new AffairMaterials();

        $page_param = ['query' => []];

        $page_param['query']['affair_id'] = $affair_id;

        if (isset($this->param['keywords']) && !empty($this->param['keywords'])) {

            $page_param['query']['keywords'] = $this->param['keywords'];

            $model->whereLike('name', "%" . $this->param['keywords'] . "%");

            $this->assign('keywords', $this->param['keywords']);
        }

        $model->where('affair_id', '=', $affair_id);

        $affair_info = Affairs::get($affair_id);

        if (!$affair_info)
        {
            return $this->error('办事指南不存在，请返回办事指南列表重试');
        }

        $this->assign('affair_id', $affair_id);

        $this->assign('affair_info', $affair_info);

        $list = $model
            ->order('id DESC')
            ->paginate($this->webData['list_rows'], false, $page_param);

        if ($list)
        {
            foreach ($list as &$item)
            {
                $fileInfo = AffairFiles::where([
                    'type' => 4,
                    'affair_id' => $affair_id,
                    'material_id'=>$item->id
                ])->find();
                $item->file_info = $fileInfo;
            }
            unset($item);
        }

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
        if ($this->request->isPost())
        {
            Db::startTrans();
            try
            {
                $affair_id = isset($this->param['affair_id']) && $this->param['affair_id'] ? (int)$this->param['affair_id'] : 0;

                if (!$affair_id)
                {
                    return $this->error('参数缺失');
                }

                $model = AffairMaterials::create($this->param);

                if (!$model) throw new Exception('添加失败');

                $attachment = new Attachment();

                $upload_file_res =  $attachment->upload('upload_file', "affair/{$affair_id}/material/");

                if ($upload_file_res['code'] == 1)
                {
                    //删除原来的附件数据
                    $fileListModel = AffairFiles::where(['type'=>4,'affair_id'=>$affair_id,'material_id'=>$model->id])->select();

                    if ($fileListModel)
                    {
                        foreach ($fileListModel as $fileInfo)
                        {
                            AffairFiles::destroy(['id'=>$fileInfo['id']]);
                        }
                    }

                    $file_param = [
                        'file_path' => $upload_file_res['data'],
                        'name' => $upload_file_res['original_name'],
                        'extension' => $upload_file_res['extension'],
                        'type' => 4,
                        'material_id' => $model->id,
                        'affair_id' => $affair_id,
                    ];

                    $fileModel = AffairFiles::create($file_param);

                    if (!$fileModel)
                    {
                        throw new Exception('文件存储失败');
                    }

                    if (!$model->save(['affair_file_id'=>$fileModel->id, 'material_sample'=>$upload_file_res['original_name']]))
                    {
                        throw new Exception('修改失败');
                    }
                }
                elseif($_FILES['upload_file']['name'] && $upload_file_res['code'] == 0)
                {
                    throw new Exception($upload_file_res['msg']);
                }
            }catch (\Exception $e)
            {
                Db::rollback();
                return $this->error($e->getMessage());
            }

            Db::commit();

            return $this->success();
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

        $info = AffairMaterials::get($this->id);

        if (!$info) {
            return $this->error('办事材料不存在');
        }
        if ($this->request->isPost())
        {
            Db::startTrans();
            try
            {
                $affair_id = isset($this->param['affair_id']) && $this->param['affair_id'] ? (int)$this->param['affair_id'] : 0;

                if (!$affair_id)
                {
                    return $this->error('参数缺失');
                }

                if (!$info->save($this->param)) throw new Exception('修改失败');

                $attachment = new Attachment();

                $upload_file_res =  $attachment->upload('upload_file', "affair/{$affair_id}/material/");

                if ($upload_file_res['code'] == 1)
                {
                    //删除原来的附件数据
                    $fileListModel = AffairFiles::where(['type'=>4,'affair_id'=>$affair_id,'material_id'=>$info->id])->select();

                    if ($fileListModel)
                    {
                        foreach ($fileListModel as $fileInfo)
                        {
                            AffairFiles::destroy(['id'=>$fileInfo['id']]);
                        }
                    }

                    $file_param = [
                        'file_path' => $upload_file_res['data'],
                        'name' => $upload_file_res['original_name'],
                        'extension' => $upload_file_res['extension'],
                        'type' => 4,
                        'material_id' => $info->id,
                        'affair_id' => $affair_id,
                    ];

                    $fileModel = AffairFiles::create($file_param);

                    if (!$fileModel)
                    {
                        throw new Exception('文件存储失败');
                    }

                    if (!$info->save(['affair_file_id'=>$fileModel->id, 'material_sample'=>$upload_file_res['original_name']]))
                    {
                        throw new Exception('修改失败');
                    }
                }
                elseif($_FILES['upload_file']['name'] && $upload_file_res['code'] == 0)
                {
                    throw new Exception($upload_file_res['msg']);
                }
            }catch (\Exception $e)
            {
                Db::rollback();
                return $this->error($e->getMessage());
            }

            Db::commit();

            return $this->success();
        }

        //获取附件信息
        $file_info = AffairFiles::where([
            'type' => 4,
            'affair_id' => $info->affair_id,
            'material_id'=>$info->id
        ])->find();

        $affair_info = Affairs::get($info->affair_id);

        $this->assign('affair_id', $info->affair_id);

        $this->assign('affair_info', $affair_info);

        $this->assign('file_info', $file_info);

        $this->assign([
            'info'  => $info,
        ]);
        return $this->fetch('add');
    }


    //删除
    public function del()
    {
        $id     = $this->id;
        $result = AffairMaterials()::destroy(function ($query) use ($id) {
            $query->whereIn('id', $id);
        });
        if ($result) {
            return $this->deleteSuccess();
        }

        return $this->error('删除失败');
    }
}