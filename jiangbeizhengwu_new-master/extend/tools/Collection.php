<?php
/**
 * Http类
 * 说明：从TP3.2.3中拷贝后修改
 */

namespace tools;

use finfo;

class Collection
{

    /**
     * 采集远程文件
     * @access public
     * @param string $remote 远程文件名
     * @param string $local 本地保存文件名
     * @return mixed
     */
    public function curlDownload($remote, $local)
    {
        $cp = curl_init($remote);
        $fp = fopen($local, "w");
        curl_setopt($cp, CURLOPT_FILE, $fp);
        curl_setopt($cp, CURLOPT_HEADER, 0);
        curl_exec($cp);
        curl_close($cp);
        fclose($fp);
    }

    /**
     * 使用 fsockopen 通过 HTTP 协议直接访问(采集)远程文件
     * 如果主机或服务器没有开启 CURL 扩展可考虑使用
     * fsockopen 比 CURL 稍慢,但性能稳定
     * @static
     * @access public
     * @param string $url 远程URL
     * @param array $conf 其他配置信息
     *        int   limit 分段读取字符个数
     *        string post  post的内容,字符串或数组,key=value&形式
     *        string cookie 携带cookie访问,该参数是cookie内容
     *        string ip    如果该参数传入,$url将不被使用,ip访问优先
     *        int    timeout 采集超时时间
     *        bool   block 是否阻塞访问,默认为true
     * @return mixed
     */
    public function fsockopenDownload($url, $conf = array())
    {
        $return = '';
        if (!is_array($conf)) return $return;

        $matches = parse_url($url);
        !isset($matches['host']) && $matches['host'] = '';
        !isset($matches['path']) && $matches['path'] = '';
        !isset($matches['query']) && $matches['query'] = '';
        !isset($matches['port']) && $matches['port'] = '';
        $host = $matches['host'];
        $path = $matches['path'] ? $matches['path'] . ($matches['query'] ? '?' . $matches['query'] : '') : '/';
        $port = !empty($matches['port']) ? $matches['port'] : 80;

        $conf_arr = array(
            'limit'   => 0,
            'post'    => '',
            'cookie'  => '',
            'ip'      => '',
            'timeout' => 15,
            'block'   => TRUE,
        );

        $post   = $conf_arr['post'];
        $cookie = $conf_arr['cookie'];
        $ip     = $conf_arr['ip'];
        $block  = $conf_arr['block'];
        $limit  = $conf_arr['limit'];

        foreach (array_merge($conf_arr, $conf) as $k => $v) ${$k} = $v;

        if ($post) {
            if (is_array($post)) {
                $post = http_build_query($post);
            }
            $out = "POST $path HTTP/1.0\r\n";
            $out .= "Accept: */*\r\n";
            //$out .= "Referer: $boardurl\r\n";
            $out .= "Accept-Language: zh-cn\r\n";
            $out .= "Content-Type: application/x-www-form-urlencoded\r\n";
            $out .= "User-Agent: $_SERVER[HTTP_USER_AGENT]\r\n";
            $out .= "Host: $host\r\n";
            $out .= 'Content-Length: ' . strlen($post) . "\r\n";
            $out .= "Connection: Close\r\n";
            $out .= "Cache-Control: no-cache\r\n";
            $out .= "Cookie: $cookie\r\n\r\n";
            $out .= $post;
        } else {
            $out = "GET $path HTTP/1.0\r\n";
            $out .= "Accept: */*\r\n";
            //$out .= "Referer: $boardurl\r\n";
            $out .= "Accept-Language: zh-cn\r\n";
            $out .= "User-Agent: $_SERVER[HTTP_USER_AGENT]\r\n";
            $out .= "Host: $host\r\n";
            $out .= "Connection: Close\r\n";
            $out .= "Cookie: $cookie\r\n\r\n";
        }
        $fp = @fsockopen(($ip ? $ip : $host), $port, $errno, $errstr, $timeout);
        if (!$fp) {
            return '';
        } else {
            stream_set_blocking($fp, $block);
            stream_set_timeout($fp, $timeout);
            @fwrite($fp, $out);
            $status = stream_get_meta_data($fp);
            if (!$status['timed_out']) {
                while (!feof($fp)) {
                    if (($header = @fgets($fp)) && ($header == "\r\n" || $header == "\n")) {
                        break;
                    }
                }

                $stop = false;
                while (!feof($fp) && !$stop) {
                    $data = fread($fp, ($limit == 0 || $limit > 8192 ? 8192 : $limit));
                    $return .= $data;
                    if ($limit) {
                        $limit -= strlen($data);
                        $stop = $limit <= 0;
                    }
                }
            }
            @fclose($fp);
            return $return;
        }
    }

    /**
     * 下载文件
     * 可以指定下载显示的文件名，并自动发送相应的Header信息
     * 如果指定了content参数，则下载该参数的内容
     * @static
     * @access public
     * @param string $filename 下载文件名
     * @param string $showname 下载显示的文件名
     * @param string $content 下载的内容
     * @param integer $expire 下载内容浏览器缓存时间
     * @return void
     */
    public function download($filename, $showname = '', $content = '', $expire = 180)
    {
        $length = 0;
        if (is_file($filename)) {
            $length = filesize($filename);
        } elseif (is_file(ROOT_PATH .'public'. $filename)) {
            $filename = ROOT_PATH .'public'.  $filename;
            $length   = filesize($filename);
        } elseif ($content != '') {
            $length = strlen($content);
        } else {
            exception($filename.'下载文件不存在！',404);
        }
        if (empty($showname)) {
            $showname = $filename;
        }
        $showname = basename($showname);
        if (!empty($filename)) {
            $finfo = new finfo(FILEINFO_MIME);
            $type  = $finfo->file($filename);
        } else {
            $type = "application/octet-stream";
        }
        //发送Http Header信息 开始下载
        header("Pragma: public");
        header("Cache-control: max-age=" . $expire);
        //header('Cache-Control: no-store, no-cache, must-revalidate');
        header("Expires: " . gmdate("D, d M Y H:i:s", time() + $expire) . "GMT");
        header("Last-Modified: " . gmdate("D, d M Y H:i:s", time()) . "GMT");
        header("Content-Disposition: attachment; filename=" . $showname);
        header("Content-Length: " . $length);
        header("Content-type: " . $type);
        header('Content-Encoding: none');
        header("Content-Transfer-Encoding: binary");
        if ($content == '') {
            readfile($filename);
        } else {
            echo($content);
        }
        exit();
    }

    /**
     * 显示HTTP Header 信息
     * @param string $header
     * @param bool $echo
     * @return string
     */
    function getHeaderInfo($header = '', $echo = true)
    {
        ob_start();
        $headers = getallheaders();
        if (!empty($header)) {
            $info = $headers[$header];
            echo($header . ':' . $info . "\n");;
        } else {
            foreach ($headers as $key => $val) {
                echo("$key:$val\n");
            }
        }
        $output = ob_get_clean();
        if ($echo) {
            echo(nl2br($output));
        } else {
            return $output;
        }

    }

    /**
     * HTTP Protocol defined status codes
     * @param $code
     * @internal param int $num
     */
    function sendHttpStatus($code)
    {
        $_status = array(
            // Informational 1xx
            100 => 'Continue',
            101 => 'Switching Protocols',

            // Success 2xx
            200 => 'OK',
            201 => 'Created',
            202 => 'Accepted',
            203 => 'Non-Authoritative Information',
            204 => 'No Content',
            205 => 'Reset Content',
            206 => 'Partial Content',

            // Redirection 3xx
            300 => 'Multiple Choices',
            301 => 'Moved Permanently',
            302 => 'Found',  // 1.1
            303 => 'See Other',
            304 => 'Not Modified',
            305 => 'Use Proxy',
            // 306 is deprecated but reserved
            307 => 'Temporary Redirect',

            // Client Error 4xx
            400 => 'Bad Request',
            401 => 'Unauthorized',
            402 => 'Payment Required',
            403 => 'Forbidden',
            404 => 'Not Found',
            405 => 'Method Not Allowed',
            406 => 'Not Acceptable',
            407 => 'Proxy Authentication Required',
            408 => 'Request Timeout',
            409 => 'Conflict',
            410 => 'Gone',
            411 => 'Length Required',
            412 => 'Precondition Failed',
            413 => 'Request Entity Too Large',
            414 => 'Request-URI Too Long',
            415 => 'Unsupported Media Type',
            416 => 'Requested Range Not Satisfiable',
            417 => 'Expectation Failed',

            // Server Error 5xx
            500 => 'Internal Server Error',
            501 => 'Not Implemented',
            502 => 'Bad Gateway',
            503 => 'Service Unavailable',
            504 => 'Gateway Timeout',
            505 => 'HTTP Version Not Supported',
            509 => 'Bandwidth Limit Exceeded'
        );
        if (isset($_status[$code])) {
            header('HTTP/1.1 ' . $code . ' ' . $_status[$code]);
        }
    }

    /**
     * CURL get访问
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/6/19
     * Time: 下午9:30
     */
    public function get($url, &$data=[])
    {
        //初始化
        $curl = curl_init();
        //设置抓取的url
        curl_setopt($curl, CURLOPT_URL, $url);
        //设置头文件的信息作为数据流输出
        curl_setopt($curl, CURLOPT_HEADER, 1);
        //设置获取的信息以文件流的形式返回，而不是直接输出。
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        //执行命令
        $data = curl_exec($curl);
        //关闭URL请求
        curl_close($curl);
        //显示获得的数据
//        return $data;
//        print_r($data);
        return 'fuck you 777';
    }

    /**
     * CURL post访问
     *
     * @author: shengwx <shengwx@sina.com>
     * Date: 2018/6/19
     * Time: 下午9:30
     */
    public function post($url, $post_data=[])
    {
        //初始化
        $curl = curl_init();
        //设置抓取的url
        curl_setopt($curl, CURLOPT_URL, $url);
        //设置头文件的信息作为数据流输出
        curl_setopt($curl, CURLOPT_HEADER, 1);
        //设置获取的信息以文件流的形式返回，而不是直接输出。
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        //设置post方式提交
        curl_setopt($curl, CURLOPT_POST, 1);
        //设置post数据
//        $post_data = array(
//            "username" => "coder",
//            "password" => "12345"
//        );
        if ($post_data) curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
        //执行命令
        $data = curl_exec($curl);
        //关闭URL请求
        curl_close($curl);
        //显示获得的数据
        print_r($data);
    }
}