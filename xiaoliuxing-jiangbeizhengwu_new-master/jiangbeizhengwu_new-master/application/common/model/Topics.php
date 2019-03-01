<?php
/**
 * 主题模型
 *
 * @author: shengwx shengwx@sina.com
 * Date: 2018/5/9
 * Time: 上午3:12
 */


namespace app\common\model;

class Topics extends BaseModel
{
    protected $name = 'topic';


    public function getLogoAttr($logo)
    {
        $logo_url = config('web_url') . $logo;

        return $logo_url;
    }
}
