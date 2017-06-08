import serial, time, csv, math, os, pyproj, json

os.system('sudo gpsd /dev/ttyUSB0 -F /var/run/gpsd.sock')

ser = serial.Serial('/dev/ttyUSB0', 9600)

p1 = pyproj.Proj(init='epsg:24047')

while True:
    serial_line = ser.readline()
    if serial_line[0:6] == "$GPRMC":
    	# print serial_line
    	serial_list = serial_line.split(',')
    	lat = serial_list[3]
    	lng = serial_list[5]
    	lat = float(lat)/100
    	lng = float(lng)/100
    	lat_min = (lat - math.floor(lat))*100
    	lat_min = lat_min/60
    	lat = math.floor(lat)+ lat_min
    	lng_min = (lng - math.floor(lng))*100
    	lng_min = lng_min/60
    	lng = math.floor(lng)+ lng_min
    	print "Lat, Long: ", lat, lng,


        output_file = open("json/current_location_map.json",'w')
        output_file.write("["+str(lat)+","+str(lng)+"]")
        output_file.close()

        x,y = p1(lng,lat)
        print "x, y: ",x, y
        output_file = open("json/current_location_x.json",'w')
        output_file.write("["+str(x)+","+str(y)+"]")
        output_file.close()


    time.sleep(1) # sleep 1 second

    # Loop restarts once the sleep is finished

ser.close() # Only executes once the loop exits