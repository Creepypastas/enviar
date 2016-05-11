$("#postTitle").focus(function(){
  $("#titleHelp").slideDown(500);
}).blur(function(){
  $("#titleHelp").slideUp(500);
});

$("#postContent").focus(function(){
  $("#contentHelp").slideDown(500);
}).blur(function(){
  $("#contentHelp").slideUp(500);
});
