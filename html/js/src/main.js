// require.config({
//     paths: {
//         "jquery": '../jquery-3.3.1.min',
//         "test2": '../test2'
//     }
// });
require(['../test2', '../jquery-3.3.1.min'], function (test2, $) {

    test2.test2("wcc")
    console.log("jquery引入成功", $)
    //通过此方式引入jquery才能使用$，接下来正常写jquery代码就好
})