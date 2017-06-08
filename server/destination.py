import os, config

os.system('scp ../json/destination.json pi@'+config.pi_ip+':/home/pi/Git/be_hmd_project/json/destination.json')