
      var animals = [];


      function createButtons(){
        $("#animal-buttons").empty();

        for (var i = 0; i < animals.length; i++) {

            // var btn = $("<button>");

          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);

          // Providing the initial button text
          a.text(animals[i]);

          a.click(clicker);
          // Adding the button to the buttons-view div
          $("#animal-buttons").append(a);

        }
      };

      

        $("#add-animal").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var animall = $("#searchinput").val().trim();

        // The movie from the textbox is then added to our array
        animals.push(animall);

        $("#searchinput").val('');

        // Calling renderButtons which handles the processing of our movie array
        createButtons();

   

      });

       function gifclick() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

      }

      console.log("here i am")
    };



      createButtons();

  function clicker() {
      var animal = $(this).attr("data-name");
      var limit = $("#numberinput").val().trim();
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=" + limit;

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
      
        var results = response.data;
        
        console.log(results);


        for (var i = 0; i < results.length; i++) {
          var animalDiv = $('<div>');
          var p = $('<p>');

          p.text("Rating: " +  results[i].rating);

          var animalImage = $('<img>');

          animalImage.attr('src', results[i].images.fixed_height_still.url);
          animalImage.attr("data-state", "still");
          animalImage.attr("data-still", results[i].images.fixed_height_still.url);
          animalImage.attr("data-animate", results[i].images.fixed_height.url);
          animalImage.click(gifclick);
          animalDiv.append(p);
          animalDiv.append(animalImage);

          $("#gifs-appear-here").prepend(animalDiv);
        
        }

      });
    };