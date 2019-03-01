<?php
/**
 * 主题管理
 * @author shengwx <shengwxde@sina.com>
 */

namespace app\admin\controller;

use app\common\model\Topics;
use tools\Attachment;

class In extends Base
{


    public function index()
    {
    	
        return $this->fetch();
    }
}

