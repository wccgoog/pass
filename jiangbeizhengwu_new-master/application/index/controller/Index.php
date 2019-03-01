<?php
/**
 * 网站首页
 *
 */

namespace app\index\controller;

use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\QrCode;
use think\Config;

class Index extends Controller
{
    public function index()
    {
        return $this->redirect('/admin/index/index.html');
        return $this->fetch();
    }

    public function hello()
    {
        return 'hello';
    }
    
}