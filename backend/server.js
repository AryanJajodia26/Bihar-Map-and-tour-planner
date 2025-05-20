const express = require('express');
const cors = require('cors');
const Graph = require('./graph');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const graph = new Graph();

// Get all cities
app.get('/cities', (req, res) => {
    res.json(graph.getCities());
});

// Add a new city
app.post('/addCity', (req, res) => {
    const { city, connections } = req.body;
    if (!city || !connections) {
        return res.status(400).json({ error: 'City and connections are required' });
    }
    graph.addCity(city, connections);
    res.json({ message: 'City added successfully' });
});

// Find route
app.get('/route', (req, res) => {
    const { from, to, time } = req.query;
    if (!from || !to || !time) {
        return res.status(400).json({ error: 'From, to, and time are required' });
    }

    const result = graph.findShortestPath(from, to);
    if (result.distance === Infinity) {
        return res.status(404).json({ error: 'No route found' });
    }

    const speed = time === 'day' ? 40 : 60;
    const timeInHours = result.distance / speed;
    const hours = Math.floor(timeInHours);
    const minutes = Math.round(((timeInHours - hours) * 60)+10);

    res.json({
        path: result.path,
        distance: result.distance,
        estimatedTime: {
            hours,
            minutes
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 