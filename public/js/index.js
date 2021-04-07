const config = {
    apikey: "AIzaSyDEazShXaW5bPDCF8agfJZgORqMfJX8U7I",
    authDomin:"smartparking-90c9e.firebaseapp.com",
    databaseURL:"https://smartparking-90c9e.firebaseio.com",
    storageBucket:"smartparking-90c9e.appspot.com",
}

    firebase.initializeApp(config);

    const dbRefObject = firebase.database().ref().child()
    dbRefObject.on('value',snap => snap.val());
    