<?php
/**
 * 办事指南管理验证类
 * @author shengwx <shengwxde@sina.com>
 */

namespace app\admin\validate;

class Affair extends Admin
{
    protected $rule = [
        'name|指南名称'      => 'require|unique:affair',
    ];

    protected $message = [
    ];

    protected $scene = [
        'add'   => ['name'],
        'edit'   => ['name'],
    ];
}