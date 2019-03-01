<?php
/**
 * 办事指南文件管理
 * @author shengwx <shengwxde@sina.com>
 */

namespace app\admin\controller;

use app\common\model\AffairFiles;
use app\common\model\Affairs;
use tools\Attachment;

class AffairFile extends Base
{

    protected $showFormFooterResetButton=false;

    /**
     * 表格下载服务
     * @return mixed|void
     * @throws \think\exception\DbException
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/6/27
     * Time: 上午1:04
     */
    public function tableDownIndex()
    {

        $affair_id = isset($this->param['affair_id']) && $this->param['affair_id'] ? (int)$this->param['affair_id'] : 0;

        if (!$affair_id)
        {
            return $this->error('请从办事指南列表进入');
        }
        $model = new AffairFiles();

        $model->where('type','=', 2);

        $page_param = ['query' => []];

        $page_param['query']['type'] = 2;

        if (isset($this->param['keywords']) && !empty($this->param['keywords'])) {

            $page_param['query']['keywords'] = $this->param['keywords'];

            $model->whereLike('name', "%" . $this->param['keywords'] . "%");

            $this->assign('keywords', $this->param['keywords']);
        }

        $page_param['query']['affair_id'] = $affair_id;

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

        $this->assign([
            'list' => $list,
            'page'  => $list->render(),
            'total' => $list->total(),
        ]);
        return $this->fetch();
    }

    /**
     * 结果返回形式
     * @return mixed|void
     * @throws \think\exception\DbException
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/6/27
     * Time: 上午1:04
     */
    public function resultTypeIndex()
    {
        $model = new AffairFiles();

        $model->where('type','=', 3);

        $page_param = ['query' => []];

        $page_param['query']['type'] = 3;

        if (isset($this->param['keywords']) && !empty($this->param['keywords'])) {

            $page_param['query']['keywords'] = $this->param['keywords'];

            $model->whereLike('name', "%" . $this->param['keywords'] . "%");

            $this->assign('keywords', $this->param['keywords']);
        }

        $affair_id = isset($this->param['affair_id']) && $this->param['affair_id'] ? (int)$this->param['affair_id'] : 0;

        if (!$affair_id)
        {
            return $this->error('请从办事指南列表进入');
        }

        $page_param['query']['affair_id'] = $affair_id;

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

            $affair_id = isset($this->param['affair_id']) && $this->param['affair_id'] ? (int)$this->param['affair_id'] : 0;

            $type = isset($this->param['type']) && $this->param['type'] ? (int)$this->param['type'] : 0;

            if (!$affair_id || !$type)
            {
                return $this->error('参数缺失');
            }

            if (!in_array($type, [2,3]))
            {
                return $this->error('参数异常');
            }

            if ($type == 2)
            {
                //表格下载服务
                $savePath = "affair/{$affair_id}/table_down_server/";
            }
            else
            {
                //结果返回形式
                $savePath = "affair/{$affair_id}/result_type/";
            }

            $upload_file_res =  $attachment->upload('upload_file', $savePath);

            if ($upload_file_res['code'] != 1)
            {
                return $this->error($upload_file_res['msg']);
            }

            $file_param = [
                'file_path' => $upload_file_res['data'],
                'name' => $upload_file_res['original_name'],
                'extension' => $upload_file_res['extension'],
                'type' => $type,
                'affair_id' => $affair_id,
            ];

            $model = new AffairFiles();

            if (!$model->create($file_param))
            {
                return $this->error('文件存储失败');
            }

            return $this->success();
        }

        $affair_id = isset($this->param['affair_id']) && $this->param['affair_id'] ? (int)$this->param['affair_id'] : 0;

        $type = isset($this->param['type']) && $this->param['type'] ? (int)$this->param['type'] : 0;

        if (!$affair_id || !$type)
        {
            return $this->error('参数缺失');
        }

        $affair_info = Affairs::get($affair_id);

        if (!$affair_info)
        {
            return $this->error('办事指南不存在，请返回办事指南列表重试');
        }

        $this->assign('affair_id', $affair_id);

        $this->assign('affair_info', $affair_info);

        $this->assign('type', $type);

        return $this->fetch();
    }

    //删除
    public function del()
    {
        $id     = $this->id;
        $result = AffairFiles::destroy(function ($query) use ($id) {
            $query->whereIn('id', $id);
        });
        if ($result) {
            return $this->deleteSuccess();
        }

        return $this->error('删除失败');
    }
}