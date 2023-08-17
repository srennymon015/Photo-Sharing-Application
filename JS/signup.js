SIGN_UP="https://prod-05.eastus.logic.azure.com/workflows/5870780b2ce34ea4855b12776d74518d/triggers/manual/paths/invoke/rest/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=B7XvxidD9jCQGBe4kB1veaclbdetyBvI0s8CSZ98u7M";


$(document).ready(function() {
    $("#signUp").click(function(){
        signUp();
  
    }); 
  });

  function signUp(){
  var userObj = {
    Username: $('#userName').val(),
    Name: $('#name').val(),
    Password: $('#password').val()
  }

  userObj = JSON.stringify(userObj);

  $.post({
    url: SIGN_UP,
    data: userObj,
    contentType: 'application/json; charset=utf-8'
  }).done(function (response) {
        localStorage.setItem("userName", $('#userName').val());
        localStorage.setItem("Name", $('#name').val());
        window.location.href="users.html"
  }).fail(function(response){
    alert("Sign Up failed. Please try again")
  });


  }