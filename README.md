# 2019SpringTeam12

Updated as of: April 30, 2019

This repository contains the following:
1. *api* directory: contains files related to the REST API
2. *pollinator-garden* directory: contains source and test files for the front-end and service (connection to API) files
3. *documents* directory: contains the Final Report (for Fall 2018's Senior Design Team), User's Guide, Developer's Guide, and Installation Manual
4. *dumps.zip*: dump file of the MySQL database the team created on the Windows VM provided by CSC IT
5. *run.bat* and *setup.bat*

## Pollinator Garden Windows Setup Guide
1) Clone repository from GitHub into local file system

2) Open project in Atom or Visual Studio Code
    - Atom
      - Select File → Add Project Folder → Select the cloned project
    - Visual Studio Code
      - Select File → Add Folder to Workspace → Select the cloned project

3) Verify Node.js is installed
    - Node.js (at least version 8.9.1) 
      - Check version by running `node -v` in terminal
    - Can be installed/updated through here https://nodejs.org/en/
    
4) Verify npm is installed
    - npm (at least version 5.6.0) 
      - Check version by running `npm -v` in terminal
    - Will typically be installed alongside Node.js
    
5) Verify Angular CLI is installed
    - Angular CLI (at least version 6.2.2)
      - Check version by running `ng -v` in terminal
    - To install for the first time, open terminal and run `npm install -g @angular/cli`
      - Verify install with `ng -v`

6) Verify MySQL is installed
    - MySQL (either >= v5.7.22 or some version of 8.0)
    - To check version:
      - Open MySQL Workbench and open a blank script file
      - Type `select version()` in the script file and run the script using the lightning bolt button
    - To update/install either use MySQL Installer or download a package from the website → https://dev.mysql.com/downloads/mysql/

7) Once these are all installed, head back to Visual Studio Code/Atom and open a new terminal in the root directory (e.g. 2019SpringTeam12)
    - Run the setup.bat file in the terminal
      `./setup.bat`
      
8) When this finishes, open the package.json file, located in the api director

9) The dependencies should look similar to this (version numbers may vary):

    ```
    "dependencies": {
        "body-parser": "^1.18.3",
        "express": "^4.16.4",
        "mysql": "^2.16.0"
    }
    ```
  
10) If some of these dependencies are missing, install them using npm in the terminal inside the api directory
      - e.g. `npm install body-parser`
    
11) Inside the api directory, open the db.js file. The connection should look like this:

    ```
    var connection = mysql.createConnection({
        host: 'sd-vm13.csc.ncsu.edu',
        user: 'admin',
        password: 'sdcTeam12',
        database: 'garden'
    });
    ```
    
12) Make sure you are in the api directory in terminal and then run `node app.js` to start the database
    - You should get a Connection Successful message in the terminal
      - If you go to http://localhost:3000/ it should say "Hello World!"
      - If you go to http://localhost:3000/plants it should show a json representation of the plants in the database
      
13) Leave the current terminal alone and open a new one inside the pollinator-garden directory

14) Run the application using `ng serve` in the terminal
    - When you get the Compiled Successfully message, head to http://localhost:4200/ to start using the application

## Pollinator Garden Mac/Linux Setup Guide
1) Clone repository from GitHub into local file system

2) Open project in Atom or Visual Studio Code
    - Atom
      - Select File → Add Project Folder → Select the cloned project
    - Visual Studio Code
      - Select File → Add Folder to Workspace → Select the cloned project

3) Verify Node.js is installed
    - Node.js (at least version 8.9.1) 
      - Check version by running `node -v` in terminal
    - Can be installed/updated through here https://nodejs.org/en/
    
4) Verify npm is installed
    - npm (at least version 5.6.0) 
      - Check version by running `npm -v` in terminal
    - Will typically be installed alongside Node.js
    
5) Verify Angular CLI is installed
    - Angular CLI (at least version 6.2.2)
      - Check version by running `ng -v` in terminal
    - To install for the first time, open terminal and run `npm install -g @angular/cli`
      - Verify install with `ng -v`
    - If after installing, your mac does not recognize the `ng` command, it is possible that the install was successful but that your computer doesn't know where to find ng when it is called. To solve this complete the following steps:
      - First local where Angular was installed on your machine. This should have happened in a hidden folder off of the root directory. Check that the "ng" folder exists in this location. For my machine the path I had to take was `~/.npm-global/bin`, this location should contain the "ng folder that was just installed
      - Once the path to the "ng" folder is found, run the command `alias ng="~/.npm-global/bin/ng"` in terminal with your path to the "ng" folder. This tells your computer where to find the commands when you use the keyphrase `ng` in the terminal
      - Verify that the path the install was successfully made by running `ng -v` in terminal. This command should bring up a screen that shows the current versions of all the components of Angular

6) Verify MySQL is installed
    - MySQL (either >= v5.7.22 or some version of 8.0)
    - To check version:
      - Open MySQL Workbench and open a blank script file
      - Type `select version()` in the script file and run the script using the lightning bolt button
    - To update/install either use MySQL Installer or download a package from the website → https://dev.mysql.com/downloads/mysql/

7) Once these are all installed, head back to Visual Studio Code/Atom and open a new terminal in the root directory (e.g. 2019SpringTeam12). In the terminal, navigate to the pollinator-garden directory
    - Run the commands `npm install && exit`, `npm link && exit`, `npm audit fix && exit`, and `npm audit && exit`
      
8) When this finishes, open the package.json file, located in the api director

9) The dependencies should look similar to this (version numbers may vary):

    ```
    "dependencies": {
        "body-parser": "^1.18.3",
        "express": "^4.16.4",
        "mysql": "^2.16.0"
    }
    ```
  
10) If some of these dependencies are missing, install them using npm in the terminal inside the api directory
      - e.g. `npm install body-parser`
    
11) Inside the api directory, open the db.js file. The connection should look like this:

    ```
    var connection = mysql.createConnection({
        host: 'sd-vm13.csc.ncsu.edu',
        user: 'admin',
        password: 'sdcTeam12',
        database: 'garden'
    });
    ```
    
12) Make sure you are in the api directory in terminal and then run `node app.js` to start the database
    - You should get a Connection Successful message in the terminal
      - If you go to http://localhost:3000/ it should say "Hello World!"
      - If you go to http://localhost:3000/plants it should show a json representation of the plants in the database
      
13) Leave the current terminal alone and open a new one inside the pollinator-garden directory

14) Run the application using `ng serve` in the terminal
    - When you get the Compiled Successfully message, head to http://localhost:4200/ to start using the application
    - If the `ng` command is not recognized by the terminal in visual studio code, either follow the steps 5a-5c again in this visual studio code terminal, or run the `ng serve` command from the pollinator-garden directory in the regular terminal








