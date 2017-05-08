# be_hmd_project
The software for a Raspberry Pi-enabled Head mounted display (HMD) which shows navigational guides along with live streaming.

Overview of the project file structure:
1) direction.py - The python backend. It fetches the directions from Maps API, parses it, transforms it into a 3D map, and stores the output to overlay.json
2) current_location.py - This finds the current map coordinates and converts into cartesian to various json files.
2) index.html : The webportal where a user can see the livefeed alongwith the navigational guides. Use firefox.
3) json/ : Contains various json files containing directions.
4) js/ : Contains the scripts for index.html.

Dependencies:
1) The python code requires various modules. On linux (without quotes): pip install "modulename" 