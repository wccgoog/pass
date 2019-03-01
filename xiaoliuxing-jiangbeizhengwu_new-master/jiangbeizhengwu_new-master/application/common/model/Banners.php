<?php
/**
 * 轮播图模
 *
 * @author: shengwx shengwx@sina.com
 * Date: 2018/5/9
 * Time: 上午3:12
 */


namespace app\common\model;

class Banners extends BaseModel
{
    protected $name = 'banner';

    public function getImageAttr($image)
    {
        if (!$image) return ;
        $image_url = config('web_url') . $image;

        return $image_url;
    }
}
