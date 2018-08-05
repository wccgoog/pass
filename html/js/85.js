var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
var email = document.getElementById("email-input");
email.addEventListener("keyup",function(){
    email.value = email.value.replace(" ","");
});
