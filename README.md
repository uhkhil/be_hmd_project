# MARGANA - HMD Project
The software for a Raspberry Pi-enabled Head mounted display (HMD) which shows navigational guides along with live streaming and audio transmission.



### Hardware:
The Raspberry Pi is the HMD and a laptop is the HQ (Head quarters). A Mobile Hotspot is used as the network. The following hardware was used. Follow the official guide/link for installation.
1) Raspberry Pi 3 B [https://www.raspberrypi.org/products/raspberry-pi-3-model-b/]
2) 3.2 inch Waveshare TFT display [http://www.waveshare.com/3.2inch-rpi-lcd-b.htm]
3) Adafruit Ultimate GPS (interfaced using USB to TTL cable) [https://www.adafruit.com/product/746]
4) NoIR Camera v2 [https://www.raspberrypi.org/products/pi-noir-camera-v2/]
5) GY-87 IMU 10 DOF (6 axis used in our case) [https://github.com/RTIMULib/RTIMULib2]

Note: The IMU has to be soldered on from the back of the Pi, since the black headers are taken up by the display.



### Setup the system:
HMD:
1) SSH onto the HMD from the HQ [ssh pi@192.168.43.142]
2) Go into 'hmd' directory [cd Git/be_hmd_project/hmd]
3) Run the tmux script [sh tmux.sh]
4) Install missing packages using apt (or apt-get) [sudo apt install <package-name>]
5) Install missing python packages using pip [sudo pip -h install <python-package-name>]
6) Open hmd/index.html using Firefox on the Pi

HQ:
1) Go into 'hq' directory [cd Git/be_hmd_project/hq]
2) python audio.py
3) python destination.py



### Overview of the project file structure:
1) hmd/gps.py - Keeps taking the current location of the user.
2) hmd/direction.py - Fetches the directions from Maps API, parses it, transforms it into a 3D map, and stores the output to overlay.json.
3) hmd/camera_position_updater.py - Updates the current position of user wrt the intial location.
4) hmd/current_location.py - Finds the current map coordinates and converts into cartesian to various json files.
5) hmd/index.html : The webportal where a user can see the livefeed alongwith the navigational guides. Use firefox.
6) hq/audio.py : Keeps the audio transmission running from the HQ to HMD.
7) hq/destination.py : Transfers the destination from the HQ to HMD.
8) json/ : Contains various json files containing directions.
9) js/ : Contains the scripts for index.html.
