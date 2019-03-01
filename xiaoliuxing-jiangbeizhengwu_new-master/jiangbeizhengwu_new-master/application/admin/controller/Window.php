<?php
/**
 * 窗口管理
 * @author shengwx <shengwxde@sina.com>
 */

namespace app\admin\controller;

use app\common\model\Windows;
use app\common\model\Totals;
use tools\Attachment;
use Endroid\QrCode\QrCode;

class Window extends Base
{

    protected $showFormFooterResetButton=false;
    protected $showDataHeader = true;

    public function index()
    {
        $model = new Windows();

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
            ->paginate($this->webData['list_rows'], false, $page_param)->each(function($item, $key){
    
                $item['qrcode'] = $this->QrCode($item['id']); //给数据集追加字段num并赋值
                return $item;
            });
      

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

            $result = $this->validate($this->param, 'Window.add');
            if (true !== $result) {
                return $this->error($result);
            }

            $attachment = new Attachment();
            //入口导航图
            $inlet_one_image_file =  $attachment->upload('inlet_one_image', 'window/');
            if($inlet_one_image_file['code']==1){
                $this->param['inlet_one_image'] = $inlet_one_image_file['data'];
            }

            $inlet_twe_image_file =  $attachment->upload('inlet_twe_image', 'window/');
            if($inlet_twe_image_file['code']==1){
                $this->param['inlet_twe_image'] = $inlet_twe_image_file['data'];
            }

            $total = Windows::create($this->param);
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
        $info = Windows::get($this->id);
        if (!$info) {
            return $this->error('窗口不存在');
        }

        if ($this->request->isPost()) {
            $result = $this->validate($this->param, 'Window.edit');
            if (true !== $result) {
                return $this->error($result);
            }

            $attachment = new Attachment();
            //入口导航图
            $inlet_one_image_file =  $attachment->upload('inlet_one_image', 'window/');
            if($inlet_one_image_file['code']==1){
                $this->param['inlet_one_image'] = $inlet_one_image_file['data'];
            }

            $inlet_twe_image_file =  $attachment->upload('inlet_twe_image', 'window/');
            if($inlet_twe_image_file['code']==1){
                $this->param['inlet_twe_image'] = $inlet_twe_image_file['data'];
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
        $result = Windows::destroy(function ($query) use ($id) {
            $query->whereIn('id', $id);
        });
        if ($result) {
            return $this->deleteSuccess();
        }

        return $this->error('删除失败');
    }

    public function QrCode2($id){
        $url = "https://jbzw.qimixi.net/static/img/".$id;
        $qrCode = new QrCode();
        $qrCode->setText($url);
        $qrCode->setSize(300);
//        $qrCode->setPadding(20);
//        $qrCode->setImageType('png');;
//        $qrCode->setImageType(QrCode::IMAGE_TYPE_PNG);;
//        header('Content-Type: '.$qrCode->getContentType());
        return $qrCode->getDataUri();
        exit;
       
    }

    public function QrCode($id)
    {
        $config = config('attchment');

        $file_path = $config['path'] . "window/{$id}.png";

        $file_url = config('web_url') . $config['url'] . "window/{$id}.png";

        $text = "https://jbzw.qimixi.net/static/img/".$id;
        if (file_exists($file_path))
        {
            return $file_url;
        }

        $qrCode = new QrCode($text);
        $qrCode->setSize(300);
        $qrCode->setWriterByName('png');
        $qrCode->setMargin(20);
        $qrCode->setEncoding('UTF-8');
        $qrCode->setLogoWidth(150);
        $qrCode->setValidateResult(false);
        $qrCode->writeFile($file_path);

        return $file_url;
    }
}