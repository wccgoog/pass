<?php
/**
 * 办事指南模型
 *
 * @author: shengwx shengwx@sina.com
 * Date: 2018/5/9
 * Time: 上午3:12
 */


namespace app\common\model;

class Affairs extends BaseModel
{
    protected $name = 'affair';


    public function getResultTypeAttr($result_type)
    {
        if (!$result_type) return ;
        $result_type_url = config('web_url') . $result_type;

        return $result_type_url;
    }

    public function getTableDownServerAttr($table_down_server)
    {
        if (!$table_down_server) return ;
        $table_down_server_url = config('web_url') . $table_down_server;

        return $table_down_server_url;
    }

    public function getEntrustLetterAttr($entrust_letter)
    {
        if (!$entrust_letter) return ;
        $entrust_letter_url = config('web_url') . $entrust_letter;

        return $entrust_letter_url;
    }

    public function getTreeImgAttr($tree_img)
    {
        if (!$tree_img) return ;
        $tree_img_url = config('web_url') . $tree_img;

        return $tree_img_url;
    }

    public function totalInfo()
    {
        $this->hasOne(
            'Totals',
            'id',
            'total_id'
        );
    }

    public function questionInfo()
    {
        $this->hasMany(
            'AffairQuestions',
            'affair_id',
            'id'
        );
    }

    public function fileInfo()
    {
        $this->hasMany(
            'AffairFiles',
            'affair_id',
            'id'
        );
    }
}
