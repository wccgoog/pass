<?php
/**
 * 窗口柜台
 *
 * @author: shengwx shengwx@sina.com
 * Date: 2018/5/9
 * Time: 上午3:12
 */


namespace app\common\model;

class Windows extends BaseModel
{
    protected $name = 'window';



    public function getInletOneImageAttr($inlet_one_image)
    {
        if (!$inlet_one_image) return ;
        $inlet_one_image_url = config('web_url') . $inlet_one_image;

        return $inlet_one_image_url;
    }

    public function getInletTweImageAttr($inlet_twe_image)
    {
        if (!$inlet_twe_image) return ;
        $inlet_twe_image_url = config('web_url') . $inlet_twe_image;

        return $inlet_twe_image_url;
    }
}
