<?php
/**
 * 轮播图API
 */
namespace app\api\controller;

use app\common\model\Banners;

class Banner extends Api
{
    protected $needAuth = false;

    public function bannerList()
    {
        $list = Banners::field('id, name,image')->order('sort_order', 'asc')->select();

        $returnData = [
            'list' => $list,
        ];

        return $this->success($returnData, '获取成功');
    }
}
