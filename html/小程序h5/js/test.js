$(() => {
    $('body').prepend("<div>" + decodeURI(location.href) + "</div>");
    $("#faceVerify").click(function () {
        my.reLaunch({
            //跳转回支付宝小程序首页
            url: '/pages/faceVerify/faceVerify'
        })
    });
    $("#wechat").click(() => {
        wx.miniProgram.reLaunch({ url: '/pages/homePage/homePage' })
    })
})    