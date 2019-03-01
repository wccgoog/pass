<?php
namespace app\api\controller;

use app\common\model\Affairs;
use app\common\model\Departments;
use app\common\model\Topics;
use app\common\model\Totals;
use app\common\model\WindowAffairs;
use app\common\model\Windows;

class Window extends Api
{
    protected $needAuth = false;

    public function affairList()
    {
        $window_id = isset($this->param['window_id']) && $this->param['window_id'] ? $this->param['window_id'] : 0;

        if (!$window_id) return $this->error('请提供窗口ID');

        $windowInfo = Windows::get(['id'=>$window_id]);

        if (!$windowInfo) return $this->error('窗口未配置');

        $winAffList = WindowAffairs::where(['window_id'=>$window_id])->select();

        $affairList = [];

        foreach ($winAffList as $item)
        {
            $affairInfo = Affairs::find(['id'=>$item['affair_id']]);

            $affairList[] = $affairInfo;
        }

        $returnData = [
            'window_info' => $windowInfo,
            'list' => $affairList,
        ];

        return $this->success($returnData, '获取成功');
    }
}
