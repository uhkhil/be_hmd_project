echo "Running gps...."
sudo python gps.py
sleep 5
python direction.py
sleep 2
python camera_position_updater.py