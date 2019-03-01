<?php
/**
 * 业务模型
 * @author: shengwx shengwx@sina.com
 * Date: 2018/5/9
 * Time: 上午3:12
 */


namespace app\common\model;

class Totals extends BaseModel
{
    protected $name = 'total';

    //关联部门数据
    public function departmentInfo()
    {
        return $this->hasOne(
            'Departments',
            'id',
            'department_id'
        );
    }

    public function topicInfo(){
        return $this->hasOne(
            'Topics',
            'id',
            'topic_id'
        );
    }

}
