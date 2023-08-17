GET_USERS="https://prod-14.eastus.logic.azure.com/workflows/73dc43a943794a8b999724541a74c4d4/triggers/manual/paths/invoke/rest/v1/user?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WP-9vW01CioUjY2zuUq3qixkR5yd4rJUKdrX1R7Ut0c";
FOLLOW_USER="https://prod-66.eastus.logic.azure.com/workflows/534e2979d25241e49936bd2318e475e5/triggers/manual/paths/invoke/rest/v1/follows?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uTiJ4vmw4V0wTBR89y_p1EGCgSsZNY9W3un0R7p5u_A";
GET_FOLLOWS="https://prod-54.eastus.logic.azure.com/workflows/954e682d02874b4bbd99e7a885f32181/triggers/manual/paths/invoke/rest/v1/follows?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=tsWFI8Um10PxM2UTpaK5uD1ozP3XMeYMufEH0EGrLcs";

let followingList=[];

$(document).ready(function() {
    $.getJSON(GET_FOLLOWS, function(data){
        $.each( data, function( key, val ) {
            if(localStorage.getItem('userName')===val["Follower"]){
                followingList.push(val["Following"])
            }
        });
    });
    getAllUsers();


  });

  function getAllUsers(){

    $.getJSON(GET_USERS, function(data) {


    var users = [];
      

      $.each( data, function( key, val ) {
        if(localStorage.getItem('userName')!==val["Username"]){
          users.push( "Name: "+val["Name"]+"<br/>");
          users.push( "Username: " + val["Username"]+"<br/>");
          if(followingList.includes(val["Username"])){
              users.push('<button type="button" class="btn btn-danger">Following</button> <br/><br/>');
          }
          else{
              users.push('<button type="button" id="followUser" class="btn btn-danger" onClick="followUser(\'' + localStorage.getItem('userName') + '\',\'' + val["Username"] + '\')">Follow</button>');
          }
        }
        
      });

      $('#Users').empty();


      $( "<ul/>", {
        "class": "my-new-list",
        html: users.join( "" )
      }).appendTo( "#Users" );
    });

  }

  function followUser(follower,following){
    var followObj={
        "Follower":follower,
        "Following":following
    }

    followObj=JSON.stringify(followObj);

    $.post({
        url: FOLLOW_USER,
        data: followObj,
        contentType: 'application/json; charset=utf-8'
      }).done(function (response) {
        window.location.href = window.location.href;
        location.reload();
      });
    
}
