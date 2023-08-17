UPLOAD_POST="https://prod-03.eastus.logic.azure.com:443/workflows/aa8f1576f501472fbea901f706558292/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ETkGSksc4to-ZflK6xOrJarfQRmNEIaTSVuNiHDEKL8";

$(document).ready(function(){
    $("#uploadPostBtn").click(function(){
        uploadPost();
    })
})

function uploadPost(){
  uploadData = new FormData();

  uploadData.append('FileName', $("#UploadFile")[0].files[0].name);
  uploadData.append('userName', localStorage.getItem("userName"));
  uploadData.append('File', $("#UploadFile")[0].files[0]);
  
  $.ajax({
      url: UPLOAD_POST,
      data: uploadData,
      cache: false,
      enctype: 'multipart/form-data',
      contentType: false,
      processData: false,
      type: 'POST',
      success: function(data){
        alert("Upload Successful");
      },
      error: function(data){
        alert("Upload failed. Please try again. Inappropriate media will not be allowed.");
      }
  });

}