var today = new Date();
var thisMonth = today.getMonth() + 1;
var thisDate = today.getDate();
$("#subbtn").click(function(){
    var name = $("#form-username").val();
    var userBirthday = birthdayData[name];
    var userBirthdayMonth = parseInt(userBirthday.split('-')[0]);
    var userBirthdayDate = parseInt(userBirthday.split('-')[1]);
    if(thisMonth == userBirthdayMonth && thisDate == userBirthdayDate){
    window.open('birthday.html')
    }  
})