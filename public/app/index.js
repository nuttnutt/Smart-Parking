var checkdatafirebase = 1;
function startfirebase(){
const config = {
    apiKey: "AIzaSyDEazShXaW5bPDCF8agfJZgORqMfJX8U7I",
    authDomain:"smartparking-90c9e.firebaseapp.com",
    databaseURL:"https://smartparking-90c9e.firebaseio.com",
    storageBucket:"smartparking-90c9e.appspot.com"
    };

    firebase.initializeApp(config);

    const dbRefObject2 = firebase.database().ref().child('ControllPaking')
    dbRefObject2.on('value', snap => controllPaking(snap.val()));

    const dbRefObject = firebase.database().ref().child('SmartParking')
    dbRefObject.on('value', snap => firebasedata(snap.val()));
    
}


var checkU1;
var checkU2;
var checkU3;
var checkdatajson;
var datafirebase;

responsiveVoice.speak("hello world", "UK English Male");

function firebasedata(snap){
    startTimer(10)
    if(snap.U1 == "1"){
        var updatedata = {
            controllU1 : 1
        }
        updateData(updatedata)
    }
    if(snap.U2 == "1"){
        var updatedata = {
            controllU2 : 1
        }
        updateData(updatedata)
    }
    if(snap.U3 == "1"){
        var updatedata = {
            controllU3 : 1
        }
        updateData(updatedata)
    }
    if (checkdatafirebase == 1){
    datafirebase = snap
    var alldatafirebase = Object.keys(snap).length
    var datafirebasecheck = Object.keys(snap)
    var dataloop = 0;
    var index= 0;
    console.log(datafirebasecheck)
    for (var y in checkdatajson){
        var loopdata = checkdatajson[y]
        var datakeyjson = datafirebasecheck[index]
        index++
        console.log(datakeyjson)
        console.log(snap.U1)
        console.log(checkdatajson)
        if(loopdata == "1" && snap[datakeyjson] == 0){
            dataloop++
        }
    }
    if(checkU1 == "1" && datafirebase.U1 == "0"){
        $("#P1").text("P1");
        var updatedata = {
            controllU1 : 2
        }
        responsiveVoice.speak("นำรถไปจอดที่ช่อง P1","Thai Female");
        updateData(updatedata)
    }else if(checkU2 == "1" && datafirebase.U2 == "0"){
        $("#P1").text("P2"); 
        var updatedata = {
            controllU2 : 2
        }
        responsiveVoice.speak("นำรถไปจอดที่ช่อง P2","Thai Female");
        updateData(updatedata)
    }else if(checkU3 == "1" && datafirebase.U3 == "0"){
        $("#P1").text("P3");
        var updatedata = {
            controllU3 : 2
        }
        responsiveVoice.speak("นำรถไปจอดที่ช่อง P3","Thai Female");
        updateData(updatedata)
    }
    else{
        $("#P1").text("ไม่มีช่องจอดว่าง");
        responsiveVoice.speak("ไม่มีช่องจอดว่าง","Thai Female");
    }
    $("#P2").text(dataloop);
    $("#P3").text(alldatafirebase);
    checkdatafirebase = 0;
}

}
function controllPaking(data){
    console.log(data)
    checkdatajson = data
    checkU1 = data.controllU1;
    checkU2 = data.controllU2;
    checkU3 = data.controllU3;
}

function updateData(updatedata){
    var firebaseRef = firebase.database().ref().child('ControllPaking')
        firebaseRef.update(updatedata)
        console.log("Success!!!!!");
}

function startTimer(duration){
    var timer = duration,minutes,seconds;
    var myVar = setInterval(setTimeinterval , 1000);
    function setTimeinterval(){
        minutes  = parseInt(timer/60,10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        console.log(minutes+":"+seconds)
        var updatedata1 = {
            controllU1 : 1
        }
        var updatedata2 = {
            controllU2 : 1
        }
        var updatedata3 = {
            controllU3 : 1
        }

        if(--timer<0){
            clearInterval(myVar)
            updateData(updatedata1)
            updateData(updatedata2)
            updateData(updatedata3)

        }
    }
}
    