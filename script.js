
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCm9NqiI4heZ2J_huJdhayQ2Ge99-qDgVQ",
    authDomain: "trainscheduler-c370e.firebaseapp.com",
    databaseURL: "https://trainscheduler-c370e.firebaseio.com",
    projectId: "trainscheduler-c370e",
    storageBucket: "trainscheduler-c370e.appspot.com",
    messagingSenderId: "667533559830"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  // click event to add train info
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var fristTrain = $("#start-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    var newTrain = {
      name: trainName,
      destination: trainDestination,
      startTime: fristTrain,
      frequency: trainFrequency
    };
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.startTime);
    console.log(newTrain.frequency);

    alert("Train successully added");

    $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
  });