const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Simple login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Save credentials to a JSON file (you should secure this part in real applications)
    const userCredentials = { username, password };

    // Write the credentials to a file (storing them as JSON for simplicity)
    fs.writeFile('credentials.json', JSON.stringify(userCredentials, null, 2), (err) => {
        if (err) {
            return res.status(500).send('Failed to save credentials');
        }
        res.send('Credentials saved successfully');
    });
});

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
