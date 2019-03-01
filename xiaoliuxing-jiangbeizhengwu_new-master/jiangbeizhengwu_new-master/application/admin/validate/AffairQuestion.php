<?php
/**
 * 业务管理验证类
 * @author shengwx <shengwxde@sina.com>
 */

namespace app\admin\validate;

class AffairQuestion extends Admin
{
    protected $rule = [
        'question|问题'      => 'require|unique:affair_question,question^affair_id',
        'answer|答案'      => 'require',
    ];

    protected $message = [
    ];

    protected $scene = [
        'add'   => ['question', 'answer'],
        'edit'   => ['question', 'answer'],
    ];
}