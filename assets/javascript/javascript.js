
    
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBA6zdquP4z4N_QdaFhyd0QI6YbRBDePcc",
    authDomain: "class-assignment-662d6.firebaseapp.com",
    databaseURL: "https://class-assignment-662d6.firebaseio.com",
    projectId: "class-assignment-662d6",
    storageBucket: "",
    messagingSenderId: "933685290814"
  };

  firebase.initializeApp(config);  
    
var database = firebase.database();


    $("#enter").on("click", function() {
     
      event.preventDefault();
   
      var tname = $("#name-input").val();
      var tdestination = $("#destination-input").val();
      var ttime = moment($("#time-input").val().trim() * 1000, "hmm").format("X");
      var tfrequency = $("#frequency-input").val();
      var trainInfo = {
              name: tname,
              destination: tdestination,
              time: ttime,
              frequency: tfrequency
              };

     database.ref().push(trainInfo);

     console.log(trainInfo.name);
     console.log(trainInfo.destination);
     console.log(trainInfo.time);
     console.log(trainInfo.frequency);
     // console.log(trainInfo.start);

     $("#name-input").val("");
     $("#destination-input").val("");
     $("#time-input").val("");
     $("#frequency-input").val("");
     // $("#start-input").val("");
});

     database.ref().on("child_added", function (childSnapshot, prevChildkey){
      console.log(childSnapshot.val());

      var tname = childSnapshot.val().name;
      var tdestination = childSnapshot.val().destination;
      var ttime = childSnapshot.val().time;
      var tfrequency = childSnapshot.val().frequency;

      var now = new Date();
console.log(now.toString().substr(16,8));
//        var now = new Date().toLocaleTimeString();
// console.log("this is current time" + now);

      console.log(tname);
      console.log(tdestination);
      console.log(ttime);
      console.log(tfrequency);

      var timepretty = moment.unix(ttime).format("HH:mm");
      var trtime = moment().diff(moment.unix(ttime, "X"), "HH:mm");
      var divided = trtime / tfrequency;
      console.log("here is trtime " + divided);

      var firstTimeConverted = moment(ttime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tfrequency;
    console.log("Remainder: " + tRemainder);

    // Minutes Away
    var minutesAway = tfrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train Arrival
    var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("HH:mm"));

      // // console.log(now.format("HH:mm"));
      // // var timetill = (now-ttime);
      // // var nextt = timetill/tfrequency;
      // // console.log("this is nexxt " + nextt);
      // var timetill = moment().diff(moment.unix(now-ttime, "X"), "hours");
      // // var secondStep = timetill/60;
      // console.log("this is the time till " + timetill);

     $("#employee-table > tbody").append("<tr><td>" + tname + "</td><td>" + tdestination + "</td><td>" +
  timepretty + "</td><td>" + tfrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});

      
  