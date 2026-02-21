const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const config = require('./config.json');

const fileDir = path.resolve(config.directory || '.');
const port = config.port || 3000;
const refreshRate = config.refreshRate || 5000;
const recentFilesCount = config.recentFilesCount || 20;

let app = express();

app.get('/files', async (req, res) => {
    let files = [];
    try {
        const entries = await fs.readdir(fileDir, { withFileTypes: true }); 
        files = entries
            .filter(e => e.isFile() && e.name.toLowerCase().endsWith('.json'))
            .sort((a, b) => b.name.localeCompare(a.name))
            .slice(0, recentFilesCount)
            .map(e => e.name.substring(0, e.name.length - 5)); // remove .json extension
    } catch (err) {
      console.error('Failed to list JSON files:', err.message);
    }
    res.json(files);
});

app.get('/files/:name', async (req, res) => {
    const name = req.params.name;
    const filePath = path.join(fileDir, name + '.json');  
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        res.json(JSON.parse(content));
    } catch (err) {
        console.error('Failed to read file:', err.message);
        res.status(404).json({ error: 'File not found' });
    }   
});

app.get('/refreshRate', (req, res) => {
    res.json({ refreshRate });
});

app.use('/', express.static('site'));

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});