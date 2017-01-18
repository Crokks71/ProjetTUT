#include <Wire.h>
#include <Adafruit_BMP085.h>
#include "DHT.h"
#include<SPI.h>
#include<RF24.h>

#define DHTPIN 2     
#define DHTTYPE DHT22  

DHT dht(DHTPIN, DHTTYPE);

RF24 radio(9, 10);

Adafruit_BMP085 bmp;
  
void setup() {
  radio.begin();
  radio.setPALevel(RF24_PA_MAX);
  radio.setChannel(0x76);
  radio.openWritingPipe(0xF0F0F0F0E1LL);
  radio.startListening();
  radio.enableDynamicPayloads();
  radio.powerUp();
  
  Serial.begin(9600);
  dht.begin();
  if (!bmp.begin()) {
	Serial.println("Impossible d'accéder au capteur BMP085!");
	while (1) {}
  }
}
  
void loop() {

  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float p = bmp.readPressure();
  float a = bmp.readAltitude();
  //Verification que nous pouvons accéder au capteur DHT22
  if (isnan(h) || isnan(t)) {
    Serial.println("Impossible d'accéder au capteur DHT22!!");
    return;
  }
  //Envoie de la Temperature, de l'Humidite et de la Presssion via le module NRF24L01
  char inbuffer[12];
  char outbuffer[32] = "";;
  strcat(outbuffer, dtostrf(t, 4, 2, inbuffer));
  strcat(outbuffer, ",");
  strcat(outbuffer, dtostrf(h, 4, 2, inbuffer));
  strcat(outbuffer, ",");
  strcat(outbuffer, dtostrf(p, 5, 0, inbuffer));
  strcat(outbuffer, ",");
  strcat(outbuffer, dtostrf(a, 3, 2, inbuffer));
  radio.stopListening();
  if (radio.write(outbuffer, strlen(outbuffer))) {
    Serial.print("Mesures envoyées !");
  } else {
    Serial.print("Mesures non envoyées !");
  }
  radio.startListening();
  delay(5000); //
  
}
