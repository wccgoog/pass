<?php
/**
 * 窗口管理验证类
 * @author shengwx <shengwxde@sina.com>
 */

namespace app\admin\validate;

class Window extends Admin
{
    protected $rule = [
        'name|窗口名称'      => 'require|unique:window',
    ];

    protected $message = [
    ];

    protected $scene = [
        'add'   => ['name'],
        'edit'   => ['name'],
    ];
}