// Adds the timezone
moment.tz.add('America/New_York|EST EDT|50 40|0101|1Lz50 1zb0 Op0');
    
// Initialize Firebase
let config = {
    apiKey: "AIzaSyCm9NqiI4heZ2J_huJdhayQ2Ge99-qDgVQ",
    authDomain: "trainscheduler-c370e.firebaseapp.com",
    databaseURL: "https://trainscheduler-c370e.firebaseio.com",
    projectId: "trainscheduler-c370e",
    storageBucket: "trainscheduler-c370e.appspot.com",
    messagingSenderId: "667533559830"
};
firebase.initializeApp(config);

let database = firebase.database();
// click event to add train info
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    let trainName = $("#train-name-input").val().trim();
    let trainDestination = $("#destination-input").val().trim();
    let fristTrain = $("#start-input").val().trim();
    let trainFrequency = $("#frequency-input").val().trim();

    let newTrain = {
        name: trainName,
        destination: trainDestination,
        startTime: fristTrain,
        frequency: trainFrequency
    };
    // adds train info to the database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.startTime);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");

});
// pulls train info from the database and inserts into HTML table
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    // console.log(childSnapshot.val());
    // converts info from databse back into a variable
    let trainName = childSnapshot.val().name;
    let trainDestination = childSnapshot.val().destination;
    let fristTrain = childSnapshot.val().startTime;
    let trainFrequency = childSnapshot.val().frequency;
    // creates variable of firstTrain into a moment.js time (unix based)
    let firstTime = moment(fristTrain, "hhmm").format("HHmm");
        console.log(firstTime);
    // creates variable for current time (unix based)
    let currentTime = moment().format("minutes");
        console.log(currentTime);
    // sets varriable to difference in time etween currentTime and time first train arrives
    let timeDifference = moment().diff(moment(firstTime), "minutes");
        console.log(timeDifference);
    // sets var to determine time since last train using the modulus for the remainder of trainFrequency and the i
    let sinceLastTrain = timeDifference % trainFrequency 
        console.log(sinceLastTrain);
    // subtracts the frequency of each train from the time since the last train to give us the time till the next train
    let minutesTillTrain = trainFrequency - sinceLastTrain
        console.log(minutesTillTrain);
    //adds the minutes from minutes till the next train to current time unix based
    let nextTrainArrival = moment().add(minutesTillTrain, "minutes");
    // converts the next train arival from minutes to actual time
    let nextTrainArrivalTime =  moment(nextTrainArrival).format("hhmma");
    // let randomTime = fristTrain;
    // let timeFormat = "hhmm"
    // // converts 
    // let convertedTime = moment(randomTime, timeFormat);
    // // converts Military time to AM/PM
    // console.log(moment.tz(convertedTime, "America/New_York").format("hhmma"));
    //  appends the new train info to the table 
    $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + nextTrainArrivalTime +"</td><td> every   " + trainFrequency + " min. </td><td>" + minutesTillTrain + "</td><td>");
});