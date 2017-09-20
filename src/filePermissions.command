#!/bin/bash

echo -e '>> Setting the correct file permissions ... \n>> You may need to enter your password.'
sudo chmod 666 /Library/WebServer/Documents/JF_Photography/config/*.txt
echo -e '>> Processing ...'
sleep 5
echo -e '>> Done.'
# killall Terminal
