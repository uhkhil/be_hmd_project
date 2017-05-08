from gps3 import gps3
import pyproj
import json

gps_socket = gps3.GPSDSocket()
data_stream = gps3.DataStream()
gps_socket.connect()
gps_socket.watch()

initial_point_file = open('json/initial.json', 'r')
initial_point_json = json.load(initial_point_file)
x_init = initial_point_json[0]
y_init = initial_point_json[1]

temp_list = [0,0]
p1 = pyproj.Proj(init='epsg:24047')

for new_data in gps_socket:
    if new_data:
        data_stream.unpack(new_data)

        if (type(data_stream.TPV['lon']) == float):
		    temp_list[0] = data_stream.TPV['lon']
		    temp_list[1] = data_stream.TPV['lat']
		    x,y = p1(temp_list[0],temp_list[1])
		    print x-x_init, y-y_init
		    output_file = open("json/current_location.json", 'w')
		    output_file.write("["+str(temp_list[0])+","+str(temp_list[1])+"]")
		    output_file.close()