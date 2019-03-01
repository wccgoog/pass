<?php
/**
 * 主题管理管理验证类
 * @author shengwx <shengwxde@sina.com>
 */

namespace app\admin\validate;

class Topic extends Admin
{
    protected $rule = [
        'name|主题名称'      => 'require|unique:topic,name^type',
    ];

    protected $message = [
    ];

    protected $scene = [
        'add'   => ['name'],
        'edit'   => ['name'],
    ];
}