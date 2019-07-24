$( document ).ready(function() {

console.log("this works");
var animals = ["dog", "cat", "bird", "cow"];
renderButtons();


function renderButtons() {
    for (let i = 0; i < animals.length; i++) {
        var a = $("<button>");
        a.addClass("animals");
        a.attr("data-animal", animals[i]);
        a.text(animals[i]);
        $("#buttons-go-here").append(a); 
    }
}


$("#submit").on("click", function () {
    if ($("#userInput").val() == "") {
        alert("please enter a value");
    } else {
    event.preventDefault();
    var userInput = $("#userInput").val().trim();
    animals.push(userInput);
    $("#userInput").val("");
    $("#buttons-go-here").empty();
    renderButtons();
}
});


$("#buttons-go-here").on("click", ".animals", function () {
    console.log("I should work")
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("this works too");
        console.log(response);
        var results = response.data;
       
        for (var i = 0; i < 10; i++) {
            var animalDiv = $("<div class='gifs'>");
            var newGIF = $("<p>").text(results[i].rating);
            var animalImage = $("<img>");

            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-state", "still");
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);


            animalDiv.append("Rating: ");
            animalDiv.append(newGIF);
        
            animalDiv.append(animalImage);
        
            $("#gifs-go-here").prepend(animalDiv);
            
     }

    });
});



function changeState() {
    
    var state = $(this).attr("data-state");
    //console.log(this);
    var animate = $(this).attr("data-animate");
    var still = $(this).attr("data-still");


    if (state == "still") {
        //console.log("I am still")
        $(this).attr("src", animate);
        $(this).attr("data-state", "animate");
        
    } else {
        //console.log("I am animated")
        $(this).attr("src", still);
        $(this).attr("data-state", "still");
        
    }

};

$("#gifs-go-here").on("click", ".gifs img",changeState);


});
