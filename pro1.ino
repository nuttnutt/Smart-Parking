#include <ESP8266WiFi.h>

#include <FirebaseArduino.h>
#define FIREBASE_HOST "smartparking-90c9e.firebaseio.com"  //Your Firebase Project URL goes here without "http:" , "\" and "/"
#define FIREBASE_AUTH "Sd0OintjRKZfi3p2bThrxR952YLfDBJ1Diwqwjli"   //Your Firebase Database Secret goes here

#define WIFI_SSID "NuttNutt"                  //your WiFi SSID(Hotspot Name) for which your NodeMCU connects 
#define WIFI_PASSWORD "nuttnutt"           //Password of your wifi network 

#define trigPin1 16   //D0 (We Used GPIO Pin Number)
#define echoPin1 5    //D1
#define trigPin2 4    //D2
#define echoPin2 0    //D3
#define trigPin3 2    //D4
#define echoPin3 14   //D5
#define echoPin4 15   //D8
#define echoPin5 12   //D6
#define echoPin6 13   //D7

void setup() 
{
  Serial.begin(115200);            // Select the same baud rate if you want to see the datas on Serial Monitor
  pinMode(trigPin1, OUTPUT);
  pinMode(echoPin1, INPUT);
  pinMode(trigPin2, OUTPUT);
  pinMode(echoPin2, INPUT);
  pinMode(trigPin3, OUTPUT);
  pinMode(echoPin3, INPUT);
  pinMode(echoPin4, OUTPUT);
  pinMode(echoPin5, OUTPUT);
  pinMode(echoPin6, OUTPUT);
  
  WiFi.begin(WIFI_SSID,WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status()!=WL_CONNECTED)
  {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected:");
  Serial.println(WiFi.localIP());

  Firebase.begin(FIREBASE_HOST,FIREBASE_AUTH);
}

void firebasereconnect()
{
  Serial.println("Trying to reconnect");
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

void loop() 
{
  
  //Ultrasonic Sensor 1

  digitalWrite(trigPin1, LOW);
  delayMicroseconds(10);
  digitalWrite(trigPin1, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin1, LOW);
  long duration1 = pulseIn(echoPin1, HIGH);
  long inch1 = duration1 / 74 / 2;         // In Inch
  
  if(inch1 <=2)
  {
    Firebase.setInt("SmartParking/U1",1);
    Serial.println("U1 = 1");
    digitalWrite(echoPin4, 0);
  }
  else
  {
     Firebase.setInt("SmartParking/U1",0);
     Serial.println("U1 = 0");
     digitalWrite(echoPin4, 1);
  }
  
  //Ultrasonic Sensor 2

  digitalWrite(trigPin2, LOW);
  delayMicroseconds(10);
  digitalWrite(trigPin2, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin2, LOW);
  long duration2 = pulseIn(echoPin2, HIGH);
  long inch2 = duration2 / 74 / 2;         // In Inch

  if(inch2 <=2)
  {
   Firebase.setInt("SmartParking/U2",1);
    Serial.println("U2 = 1");
    digitalWrite(echoPin5, 0);
  }
  else
  {
     Firebase.setInt("SmartParking/U2",0);
     Serial.println("U2 = 0");
     digitalWrite(echoPin5, 1);
  }
  
  //Ultrasonic Sensor 3

  digitalWrite(trigPin3, LOW);
  delayMicroseconds(10);
  digitalWrite(trigPin3, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin3, LOW);
  long duration3 = pulseIn(echoPin3, HIGH);
  long inch3 = duration3 / 74 / 2;         // In Inch

  if(inch3 <=2)
  {
   Firebase.setInt("SmartParking/U3",1);
    Serial.println("U3 = 1");
    digitalWrite(echoPin6, 0);
  }
  else
  {
    Firebase.setInt("SmartParking/U3",0);
     Serial.println("U3 = 0");
     digitalWrite(echoPin6, 1);
  }
  
}
