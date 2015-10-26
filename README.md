# AffectoHackathon
Repository for team 6’s project work at the Tampere Smart City Hackathon.
## Description
This project implements a flexible, minimalist prototype system for collecting data about commuters getting off a bus. An arduino with a motion sensor and a gprs shield is installed on the bus’s doorway, detecting everyone who passes by the sensor. Then, it sends data to a server which records the time and place of the event, and in turn exposes an API call to a HTML5 frontend.

## Installation
    $cd backend
    $npm install

### Arduino
The Arduino board consists of a motion sensor and an ethernet shield. Pins 2-5 are used for leds and the motion sensor. The leds are optional for this project and were mainly used for debugging purposes. 

pin 2 = led 2
pin 3 = led 1
pin 4 = echo pin
pin 5 = trigger pin

After building the board, use the Arduino IDE to flash the program into the board. 

The program detects movement within one meter from the sensor and sends an HTTP request to the server when something is detected. The server URL can be changed in /arduino_scanner/measure_scanner.ino

### Backend
The backend is built on top of node.js and MongoDB.

The backend/dummyimport folder contains a set of dummy data and a script for importing it into a MongoDB database.

### Frontend
The backend server attempts to serve the frontend as well. Alternatively you can host the frontend on another server; just edit dist/js/http.js so that the api calls point to the backend server URL.
