#!/bin/bash
SESSION=$USER

tmux -2 new-session -d -s $SESSION

# Setup a window for tailing log files
tmux new-window -t $SESSION:1 -n 'Logs'
tmux split-window -h
tmux select-pane -t 0
# tmux resize-pane -D 20
tmux send-keys "sudo python gps.py" C-m
tmux select-pane -t 1
tmux send-keys "python direction.py"
tmux split-window -h
tmux select-pane -t 2
tmux send-keys "python camera_position_updater.py" C-m
tmux split-window -v
tmux select-pane -t 3
tmux send-keys "python current_location.py" C-m


tmux select-pane -t 0
tmux split-window -v
tmux select-pane -t 1
tmux send-keys "python /home/pi/Git/RTIMULib2/Linux/python/tests/be_project.py" C-m


# Attach to session
tmux -2 attach-session -t $SESSION
