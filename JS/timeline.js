GET_COMMENTS="https://prod-39.eastus.logic.azure.com/workflows/30a9b7f0e31a4713b024b4cc07900bbe/triggers/manual/paths/invoke/rest/v1/comment?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hoijUWRUAtHcYv_gnoUehkAj8E31bJ24RlS0fEftbPM";
GET_FOLLOWS="https://prod-54.eastus.logic.azure.com/workflows/954e682d02874b4bbd99e7a885f32181/triggers/manual/paths/invoke/rest/v1/follows?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=tsWFI8Um10PxM2UTpaK5uD1ozP3XMeYMufEH0EGrLcs";
GET_POSTS="https://prod-20.eastus.logic.azure.com/workflows/27cb9529c0e54af6b0d3048647ba03fc/triggers/manual/paths/invoke/rest/v1/post?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=S78CQBphXRWwBcIafK5tfQahpXKWgu6soeBbj5edap4";
GET_LIKES="https://prod-46.eastus.logic.azure.com/workflows/9516c3a204cd4085a9d470c4e9c5ab2f/triggers/manual/paths/invoke/rest/v1/post_like?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ECgWBvheRiPhOa2zcD5sjq7Vx6DPRlBT8flqcCfL7OQ";
GET_TIMELINE="https://prod-18.eastus.logic.azure.com:443/workflows/82b2af450c0c459981f151d48271f389/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LXifVVjclkGofLWCkTcrDKrAis-2hC89Jfear0sRDow";
LIKE_POST="https://prod-73.eastus.logic.azure.com/workflows/dcc7e6d837eb477aac638ea0bbf241dd/triggers/manual/paths/invoke/rest/v1/post_like?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UHlwUkCXBYMLOYwnrVLQCQhz9YtJbzEGNlH4hsijnuo";
POST_COMMENT="https://prod-86.eastus.logic.azure.com/workflows/dfc3e9ef4c9c494a879d746b63c55112/triggers/manual/paths/invoke/rest/v1/comment?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=kMHwcGr5V9Yc7_BzUSzCL0P2cYN__iQu7NJoBv-Z23U";

BLOB_ACCOUNT="https://srennymoncw2blobstorage.blob.core.windows.net";


var commentList=[];
var followingList=[];
var postFollowingList=[]
var likedPostList=[];
var postFollowingUserList=[];

$(document).ready(function() {
    $.getJSON(GET_FOLLOWS, function(data){
        $.each( data, function( key, val ) {
            if(localStorage.getItem('userName')===val["Follower"]){
                followingList.push(val["Following"]);
            }
        });
    });

    $.getJSON(GET_POSTS, function(data){
        $.each( data, function( key, val ) {
            if(followingList.includes(val["Username"])){
                postFollowingList.push(val["PostID"]);
            }
        });
    });


    $.getJSON(GET_LIKES, function(data){
        $.each( data, function( key, val ) {
            if(localStorage.getItem("userName")===val["Username"]){
                likedPostList.push(val["PostID"]);
            }
        });
    })

    $.getJSON(GET_COMMENTS, function(data){
        $.each(data, function( key, val ) {
            commentList.push(val);
        })
    });
    getTimeline();
  });

  function getTimeline(){
    $.getJSON(GET_TIMELINE, function(data){
        var timeline=[];

        $.each( data, function( key, val ) {
            if(postFollowingList.includes(val["id"])){
                id=val["id"];
                val["userName"]=atob(val["userName"].$content);
                var comments=[];
                timeline.push( "<hr  />");
                timeline.push(val["userName"] + "<br/>")
                timeline.push("<img src='"+BLOB_ACCOUNT + val["filePath"]  +"' height=200 /> <br />")
                if(likedPostList.includes(val["id"])){
                    timeline.push('<button type="button" class="btn btn-danger">Liked</button> <br/>');
                }
                else{
                    timeline.push('<button type="button" id="likePost" class="btn btn-danger" onClick="likePost(\'' + val["id"] + '\',\'' + localStorage.getItem('userName')+ '\')">Like</button> <br/>')
                }
                timeline.push('Comments: <br/>')
                $.each(commentList,function(key,val){
                    if(val["PostID"]===id){
                        comments.push(val);
                    }
                })
                $.each(comments,function(key,val){
                    timeline.push(val["Username"]+":" + val["Comment"] + "<br/>");
                })
                timeline.push("<br/>")
                timeline.push('<textarea id="'+val["id"]+'" name="Comment" rows="4" cols="50">Comment</textarea> <br/>');
            
                timeline.push('<button type="button" id="postComment" class="btn btn-danger" onClick="postComment(\'' + val["id"] + '\',\'' + localStorage.getItem('userName')+ '\')">Comment</button>')
                timeline.push( "<hr  />");
            }

            

              
   
        });
        $('#Timeline').empty();  
        $( "<ul/>", {
            "class": "my-new-list",
            html: timeline.join( "" )
          }).appendTo( "#Timeline" );
    });
  }

  function likePost(postID,username){
    var likeObj={
        "PostID":postID,
        "Username":username
    }

    likeObj=JSON.stringify(likeObj);

    $.post({
        url: LIKE_POST,
        data: likeObj,
        contentType: 'application/json; charset=utf-8'
      }).done(function (response) {
        window.location.href = window.location.href;
        location.reload();
      }).fail(function(){
        alert("Error liking post");
      });
  }

  function postComment(postID,username){
    var comment=$("#" + postID).val();
    var commentObj={
        "PostID":postID,
        "Username":username,
        "Comment":comment
    }

    commentObj=JSON.stringify(commentObj);

    $.post({
        url: POST_COMMENT,
        data: commentObj,
        contentType: 'application/json; charset=utf-8'
      }).done(function (response) {
        window.location.href = window.location.href;
        location.reload();
      })
      .fail(function(response){
        alert("Failed to Post. please try again. Refrain from usisng profanity");
      });
      
  }
