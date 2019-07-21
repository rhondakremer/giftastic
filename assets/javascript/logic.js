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
    event.preventDefault();
    $("#buttons-go-here").empty();
    var userInput = $("#userInput").val().trim();
    animals.push(userInput);
    $("#userInput").val("");
    renderButtons();
});


$(".animals").on("click", function () {
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
       
        for (var i = 0; i < animals.length; i++) {
            var animalSpan = $("<span class='gifs'>");
            var newGIF = $("<p>").text(results[i].rating);
       
            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url);
            
            animalSpan.append("Rating: ");
            animalSpan.append(newGIF);
        
            animalSpan.append(animalImage);
        
            $("#gifs-go-here").prepend(animalSpan);
     }

    });
});




});
