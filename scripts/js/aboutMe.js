$(document).ready(function(){
    
    // Calls the shared function to load the Navigation bar
    sharedFunctions.loadNavBar();

    /*  .get(String, Function)
            > Uses the jQuery get() function to get the JSON with the details for images
            > Sets the profile picture
    */
    $.get("/config/albumsJSON.json", function(payload){
        var profilePic = document.getElementById("profilePic");
        var profileObj = payload["profile"];
        profilePic.src = profileObj.coverImg;
    });

    /*  .get(String, Function)
            > Gets the text file with the about me paragraph(s)
            > Then, calls the shared function to fade in the text
    */
    $.get("/config/aboutMe.txt", function(results){
        $("#aboutMeParagraphs").append(results);
        sharedFunctions.displayDelayed();
    });
});