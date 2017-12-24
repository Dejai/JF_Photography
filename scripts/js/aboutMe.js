$(document).ready(function(){
    sharedFunctions.loadNavBar();
    $.get("/config/albumsJSON.json", function(payload){
        var profilePic = document.getElementById("profilePic");
        var profileObj = payload["profile"];
        profilePic.src = profileObj.coverImg;
    });
    $.get("/config/aboutMe.txt", function(results){
        $("#aboutMeParagraphs").append(results);
        sharedFunctions.displayDelayed();
    });
});