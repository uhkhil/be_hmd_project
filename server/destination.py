import os

ip_address = '192.168.1.7'
os.system('scp ../json/destination.json pi@'+ip_address+':/home/pi/Git/be_hmd_project/json/destination.json')
