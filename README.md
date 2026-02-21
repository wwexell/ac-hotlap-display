# Assetto Corsa Hotlap Display

This is a very simple Node application that watches for AC results files and displays them in your web browser.

## How to run
1. Download this project
2. Install Node
3. edit config.json
    ```
    {
    "directory": "C:/Users/Bob/AppData/Local/AcTools Content Manager/Progress/Sessions", <--- YOU MUST CHANGE THIS
    "port": 3000,
    "refreshRate": 5000
    }
    ````
4. npm install
5. node app.js
    1. The app should now be listening on port 3000
6. Open a browser and go to http://localhost:3000 


