<?php
/**
 * 附件扩展
 * @author shengwx <shengwxde@sina.com>
 */

namespace tools;

use app\admin\model\Attachments;

class Attachment
{
    protected $config;

    public function __construct($config = null)
    {
        $this->config = config('attchment');
        if ($config != null) {
            $this->config = $config;
        }
    }

    /**
     * 上传
     * @param string $name 字段名
     * @param null|string $path 上传路径
     * @param array|null $validate 验证规则
     * @param int $user_id
     * @return array
     */
    public function upload($name, $path = '', $validate = [], $user_id = 0)
    {
        $result = [
            'code' => 0,
            'msg'  => 'fail',
            'data' => ''
        ];
        $file   = request()->file($name);

        if ($file) {
            $file_path = $this->config['path'] . $path;
            $file_url  = $this->config['url'] . $path;
            $validate  = array_merge($this->config['validate'], $validate);
            $info      = $file->validate($validate)->move($file_path);

            if ($info) {
                $file_info = [
                    'user_id'       => $user_id,
                    'original_name' => $info->getInfo('name'),
                    'save_name'     => $info->getFilename(),
                    'save_path'     => str_replace("\\", "/",$file_path . $info->getSaveName()),
                    'extension'     => $info->getExtension(),
                    'mime'          => $info->getInfo('type'),
                    'size'          => $info->getSize(),
                    'md5'           => $info->hash('md5'),
                    'sha1'          => $info->hash(),
                    'url'           => str_replace("\\", "/",$file_url . $info->getSaveName())
                ];

                $data = Attachments::create($file_info);
                if ($data) {
                    $result['extension'] = $file_info['extension'];
                    $result['original_name'] = $file_info['original_name'];
                    $result['code'] = 1;
                    $result['data'] = $file_info['url'];
                    $result['msg']  = '上传成功';
                } else {
                    $result['msg'] = '保存失败';
                }
            } else {
                $result['msg'] = '保存失败,错误信息:' . $file->getError();
            }
        } else {
            $result['msg'] = '无法获取文件';
        }
        return $result;
    }


    /**
     * 多图上传
     * @param string $name 字段名
     * @param null|string $path 上传路径
     * @param array|null $validate 验证规则
     * @param int $user_id
     * @return array
     */
    public function mulUpload($name, $path = '', $validate = [], $user_id = 0)
    {
        $result = [
            'code' => 0,
            'msg'  => 'fail',
            'data' => ''
        ];
        $files   = request()->file($name);

        if ($files) {

            $result = [];

            foreach ($files as $file)
            {

                $file_path = $this->config['path'] . $path;
                $file_url  = $this->config['url'] . $path;
                $validate  = array_merge($this->config['validate'], $validate);
                $info      = $file->validate($validate)->move($file_path);

                if ($info)
                {
                    $file_info = [
                        'user_id'       => $user_id,
                        'original_name' => $info->getInfo('name'),
                        'save_name'     => $info->getFilename(),
                        'save_path'     => str_replace("\\", "/",$file_path . $info->getSaveName()),
                        'extension'     => $info->getExtension(),
                        'mime'          => $info->getInfo('type'),
                        'size'          => $info->getSize(),
                        'md5'           => $info->hash('md5'),
                        'sha1'          => $info->hash(),
                        'url'           => str_replace("\\", "/",$file_url . $info->getSaveName())
                    ];

                    $data = Attachments::create($file_info);
                    if ($data) {
                        $return['extension'] = $file_info['extension'];
                        $return['original_name'] = $file_info['original_name'];
                        $return['code'] = 1;
                        $return['data'] = $file_info['url'];
                        $return['msg']  = '上传成功';
                    } else {
                        $return['msg'] = '保存失败';
                    }
                } else {
                    $return['msg'] = '保存失败,错误信息:' . $file->getError();
                }
            }
        } else {
            $result = false;
        }
        return $result;
    }

    /**
     * 下载
     */
    public static function download($remote, $local)
    {
        $local = ROOT_PATH. 'public'. $local;
        $cp = curl_init($remote);
        $fp = fopen($local, "w");
        curl_setopt($cp, CURLOPT_FILE, $fp);
        curl_setopt($cp, CURLOPT_HEADER, 0);
        curl_exec($cp);
        curl_close($cp);
        fclose($fp);
    }


    /**
     * 移动目录
     */
    public static function move()
    {

    }
}