# Assetto Corsa Hotlap Display

This is a very simple Node application that watches for AC results files and displays them in your web browser.

## How to run
1. Download this project
2. Install [Node.js](https://nodejs.org/)
3. Edit config.json
    ```
    {
        "directory": "C:/Users/Bob/AppData/Local/AcTools Content Manager/Progress/Sessions", <--- YOU MUST CHANGE THIS
        "port": 3000,
        "refreshRate": 5000                 <--- This is in milliseconds
        "recentFilesCount": 20
    }
    ````
4. Run command: `npm install`
5. Run command: `node app.js`
    1. The app should now be listening on port 3000, unless you changed the port.
6. Open a browser and go to http://localhost:3000 


## Notes
- This only works for practice/hot-laps.  The files get complicated for races and I haven't done anything about that yet.
- The refresh doesn't start till you click the checkbox.  When you complete a session, give it a few seconds to find the new result.
- I used CoPilot to speed up the dev process, so anything that looks weird I blame on AI.  Anything that seems brilliant was all me.  ;)

