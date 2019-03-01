<?php
/**
 * 基类模型
 *
 * @author: shengwx shengwx@sina.com
 * Date: 2018/5/9
 * Time: 上午3:12
 */


namespace app\admin\model;

use think\Model;
use traits\model\SoftDelete;

class BaseModel extends Model
{
    //自动创建时间
    protected $autoWriteTimestamp = true;
    use SoftDelete;
}
