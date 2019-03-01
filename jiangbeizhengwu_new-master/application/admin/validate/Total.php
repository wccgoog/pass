<?php
/**
 * 业务管理验证类
 * @author shengwx <shengwxde@sina.com>
 */

namespace app\admin\validate;

class Total extends Admin
{
    protected $rule = [
        'name|业务名称'      => 'require|unique:total',
    ];

    protected $message = [
    ];

    protected $scene = [
        'add'   => ['name'],
        'edit'   => ['name'],
    ];
}