import os, time, config

laptop_ip = config.laptop_ip

while True:
	os.system("scp ../json/current_location_map.json akhil@"+laptop_ip+":/home/akhil/Git/be_hmd_project/json/current_location_map.json")
	time.sleep(1)
