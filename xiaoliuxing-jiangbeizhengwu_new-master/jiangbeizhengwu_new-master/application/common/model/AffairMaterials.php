<?php
/**
 * 办事指南办理材料模型
 */


namespace app\common\model;

class AffairMaterials extends BaseModel
{
    protected $name = 'affair_material';

    public function materialFileInfo()
    {
        $this->hasOne(
            'AffairFiles',
            'id',
            'affair_file_id'
        );
    }

    /**
     * 获取办事指南材料目录
     *
     * @param $affair_id
     * @param string $field
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/6/28
     * Time: 上午1:10
     */
    public function getList($affair_id, $fields='*')
    {
        $list = $this->field($fields)->where('affair_id', $affair_id)->select();

        if ($list)
        {
            foreach ($list as &$item)
            {
                $fileModel = AffairFiles::field('file_path')->find($item['affair_file_id']);

                if ($fileModel)
                {
                    $item['file_path'] = $fileModel->file_path;
                }
            }
            unset($item);
        }

        return $list;
    }
}
