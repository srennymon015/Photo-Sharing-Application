SIGN_UP="https://prod-05.eastus.logic.azure.com/workflows/5870780b2ce34ea4855b12776d74518d/triggers/manual/paths/invoke/rest/v1/users?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=B7XvxidD9jCQGBe4kB1veaclbdetyBvI0s8CSZ98u7M";

//Handlers for button clicks
$(document).ready(function() {
    $("#signUp").click(function(){

        //Run the sign up function
        signUp();
  
    }); 
  });

  function signUp(){

    //Construct JSON Object for new user
  var userObj = {
    Username: $('#userName').val(),
    Name: $('#name').val(),
    Password: $('#password').val()
  }

  //Convert to a JSON String
  userObj = JSON.stringify(userObj);

  //Post the JSON string to the endpoint, note the need to set the content type header
  $.post({
    url: SIGN_UP,
    data: userObj,
    contentType: 'application/json; charset=utf-8'
  }).done(function (response) {
        alert("Sign Up Successful")
        localStorage.setItem("userName", $('#userName').val());
        localStorage.setItem("Name", $('#name').val());
        window.location.href="users.html"
  }).fail(function(response){
    alert("Sign Up failed")
  });


  }