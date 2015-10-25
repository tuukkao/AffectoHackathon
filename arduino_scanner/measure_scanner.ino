/**
 Author: Henrik Toivakka
 
 Arduino movement scanner. Sends results to web server.
*/

#include <SPI.h>
#include <Ethernet.h>

#define trigPin 5
#define echoPin 4
#define led 3
#define led2 2

// Set the MAC-address
byte mac[] = {0x00, 0xAB, 0x7A, 0xD4, 0x01};
// Set the IP-address
IPAddress ip(192,168,11,232);

char serverUrl[] = "tuukkao.net";
// Context path
String serverPath = "/register";

int serverPort = 4000;

EthernetClient client;

void setup() {
  Serial.begin (9600);
  Serial.println("Initializing application");
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(led, OUTPUT);
  pinMode(led2, OUTPUT);
  
  // DHCP connection
  if(!Ethernet.begin(mac)) {
    // Try with a hard-coded address
    Serial.println("Initialize ethernet connection with hard-coded address");
    Ethernet.begin(mac, ip);
  }
}

void loop() {
  measure();
}

void sendRequestToServer() {
  
  if(client.connect(serverUrl, serverPort)) {
    Serial.println("Sending POST request to the server.");
    client.println("POST " + serverPath + " HTTP/1.1");
    client.println("HOST: tuukkao.net:4000");
    client.println("Connection: close");
    client.println();
  } else {
     Serial.println("Unable to send a POST request to the server."); 
  }
  
  unsigned long lastRead = millis();
  
  while(client.connected() && ( millis() - lastRead < 1500 )) {
    if(client.available()) {
      char c = client.read();
      Serial.print(c);
      lastRead = millis();
    }
  }
 
  client.stop();
}

void measure() {
  long duration, distance;
  
  digitalWrite(trigPin, LOW);  // Added this line
  delayMicroseconds(2); // Added this line
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10); // Added this line
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);
  
  distance = ( duration / 2 ) / 29.1;
  
  if ( distance < 100 ) {  // This is where the LED On/Off happens
    digitalWrite(led, HIGH); 
    digitalWrite(led2, LOW);
  }
  else {
    digitalWrite(led, LOW);
    digitalWrite(led2, HIGH);
  }
  if ( distance >= 100 || distance <= 0 ){
    Serial.println("Nothing ever happens.");
  }
  else {
    Serial.print(distance);
    Serial.println(" cm");
    
    sendRequestToServer();
  }
  
  delay(700);
}
