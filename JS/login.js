LOG_IN="https://prod-04.eastus.logic.azure.com/workflows/374ab5ddd21d4258bd69f2230dc30b46/triggers/manual/paths/invoke/rest/v1/user?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8AceTMuk_-eUmK7tYUV8TDjWzv_nQXHUkAftw1iH_bc";
GET_USERS="https://prod-14.eastus.logic.azure.com/workflows/73dc43a943794a8b999724541a74c4d4/triggers/manual/paths/invoke/rest/v1/user?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WP-9vW01CioUjY2zuUq3qixkR5yd4rJUKdrX1R7Ut0c";

let userList;
$(document).ready(function() {
    
    $.getJSON(GET_USERS, function(data){
        userList=data;
    });

    $("#logIn").click(function(){
        logIn();
    }); 

    $('#showPassword').on('click', function(){
      var password=$("#password");
      if(password.attr('type')==='password')
        {
          password.attr('type','text');
      }else{
        password.attr('type','password');
      }
  })
  });

  function logIn(){
  var userObj = {
    Username: $('#userName').val(),
    Password: $('#password').val()
  }


  userObj = JSON.stringify(userObj);


  $.post({
    url: LOG_IN,
    data: userObj,
    contentType: 'application/json; charset=utf-8'
  }).done(function (response) {
        localStorage.setItem("userName", $('#userName').val());
        let user=userList.filter(user=>user.Username==localStorage.getItem("userName"))
        localStorage.setItem("Name", user[0].Name);
        window.location.href="timeline.html"
  })
  .fail(function (response) {
    alert("Log In failed. Please try again")
})
  }

