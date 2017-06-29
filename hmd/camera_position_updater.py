import json, time

while True:
	initial = open('../json/initial.json', 'r').read()
	initial = json.loads(initial)
	current = open('../json/current_location_x.json', 'r').read()
	current = json.loads(current)

	print "["+str(current[0]-initial[0])+","+str(current[1]-initial[1])+"]"
	camera_position = open('../json/camera_position.json','w')
	camera_position.write("["+str(current[0]-initial[0])+","+str(current[1]-initial[1])+"]")
	camera_position.close()
	time.sleep(1)