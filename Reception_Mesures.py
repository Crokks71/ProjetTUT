import RPi.GPIO as GPIO
from lib_nrf24 import NRF24
import time
from time import gmtime, strftime
import spidev

GPIO.setmode(GPIO.BCM)
pipes = [[0xE8, 0xE8, 0xF0, 0xF0, 0xE1], [0xF0, 0xF0, 0xF0, 0xF0, 0xE1]]
radio = NRF24(GPIO, spidev.SpiDev())
radio.begin(0, 17)
radio.setPayloadSize(32)
radio.setChannel(0x76)
radio.setDataRate(NRF24.BR_1MBPS)
radio.setPALevel(NRF24.PA_MIN)
radio.setAutoAck(True)
radio.enableDynamicPayloads()
radio.enableAckPayload()
radio.openReadingPipe(1, pipes[1])
radio.printDetails()
radio.startListening()

i = 0
f = open("/root/Desktop/NRF24L01/Mesures.txt", "w")
while (i<=10):
        pipe = [0]
        t = strftime("%Y-%m-%d %H:%M:%S", gmtime())
        while not radio.available(0):
           time.sleep(1000/1000000.0)
           GPIO.cleanup()
        data = []
        radio.read(data)
        out = ''.join(chr(i) for i in data)
        a = out + "," + t
        f.write(a)
        f.write("\n")
        print("Mesures : {}".format(a))
        i = i + 1
f.close()