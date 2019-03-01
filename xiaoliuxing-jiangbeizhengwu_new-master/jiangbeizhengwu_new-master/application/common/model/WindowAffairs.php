<?php
/**
 * 窗口-事物绑定
 *
 * @author: shengwx shengwx@sina.com
 * Date: 2018/5/9
 * Time: 上午3:12
 */


namespace app\common\model;

class WindowAffairs extends BaseModel
{
    protected $name = 'window_affair';

    //关联办事指南
    public function affairInfo()
    {
        return $this->hasOne(
            'Affairs',
            'id',
            'affair_id'
        );
    }
    public function windowInfo()
    {
        return $this->hasOne(
            'Windows',
            'id',
            'window_id'
        );
    }
}
