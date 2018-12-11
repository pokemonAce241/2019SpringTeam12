SET location=%~dp0

:: start up the api (make sure that if not connected to NCSU network a connection to VPN is used)
:: look at Cisco VPN NCSU online for more details
start /MIN cmd.exe /k "cd %location%api && node app.js"
echo running api connection
start /MIN cmd.exe /k "cd %location%pollinator-garden && ng serve"
echo running angular application"