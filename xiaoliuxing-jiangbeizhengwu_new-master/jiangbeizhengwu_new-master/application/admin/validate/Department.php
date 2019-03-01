<?php
/**
 * 部门管理验证类
 * @author shengwx <shengwxde@sina.com>
 */

namespace app\admin\validate;

class Department extends Admin
{
    protected $rule = [
        'name|部门名称'      => 'require|unique:department',
    ];

    protected $message = [
    ];

    protected $scene = [
        'add'   => ['name'],
        'edit'   => ['name'],
    ];
}