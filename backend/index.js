// Add tourism cities and their connections
const cityConnections = [
    {
        name: 'Patna',
        connections: [
            { city: 'Rajgir-Nalanda', distance: 90 },
            { city: 'Gaya', distance: 110 },
            { city: 'Vaishali', distance: 35 },
            { city: 'East Champaran', distance: 220 },
            { city: 'West Champaran', distance: 220 },
            { city: 'Munger', distance: 180 },
            { city: 'Bhagalpur', distance: 240 },
            { city: 'Darbhanga', distance: 140 },
            { city: 'Pawapuri', distance: 93 },
            { city: 'Sitamarhi', distance: 160 }
        ]
    },
    {
        name: 'Rajgir-Nalanda',
        connections: [
            { city: 'Patna', distance: 90 },
            { city: 'Gaya', distance: 70 },
            { city: 'Vaishali', distance: 120 },
            { city: 'East Champaran', distance: 300 },
            { city: 'West Champaran', distance: 300 },
            { city: 'Munger', distance: 210 },
            { city: 'Bhagalpur', distance: 270 },
            { city: 'Darbhanga', distance: 180 },
            { city: 'Pawapuri', distance: 15 },
            { city: 'Sitamarhi', distance: 200 }
        ]
    },
    {
        name: 'Gaya',
        connections: [
            { city: 'Patna', distance: 110 },
            { city: 'Rajgir-Nalanda', distance: 70 },
            { city: 'Vaishali', distance: 140 },
            { city: 'East Champaran', distance: 320 },
            { city: 'West Champaran', distance: 320 },
            { city: 'Munger', distance: 230 },
            { city: 'Bhagalpur', distance: 260 },
            { city: 'Darbhanga', distance: 210 },
            { city: 'Pawapuri', distance: 60 },
            { city: 'Sitamarhi', distance: 230 }
        ]
    },
    {
        name: 'Vaishali',
        connections: [
            { city: 'Patna', distance: 35 },
            { city: 'Rajgir-Nalanda', distance: 120 },
            { city: 'Gaya', distance: 140 },
            { city: 'East Champaran', distance: 150 },
            { city: 'West Champaran', distance: 150 },
            { city: 'Munger', distance: 210 },
            { city: 'Bhagalpur', distance: 270 },
            { city: 'Darbhanga', distance: 70 },
            { city: 'Pawapuri', distance: 125 },
            { city: 'Sitamarhi', distance: 100 }
        ]
    },
    {
        name: 'East Champaran',
        connections: [
            { city: 'Patna', distance: 220 },
            { city: 'Rajgir-Nalanda', distance: 300 },
            { city: 'Gaya', distance: 320 },
            { city: 'Vaishali', distance: 150 },
            { city: 'West Champaran', distance: 50 },
            { city: 'Munger', distance: 300 },
            { city: 'Bhagalpur', distance: 350 },
            { city: 'Darbhanga', distance: 140 },
            { city: 'Pawapuri', distance: 310 },
            { city: 'Sitamarhi', distance: 130 }
        ]
    },
    {
        name: 'West Champaran',
        connections: [
            { city: 'Patna', distance: 220 },
            { city: 'Rajgir-Nalanda', distance: 300 },
            { city: 'Gaya', distance: 320 },
            { city: 'Vaishali', distance: 150 },
            { city: 'East Champaran', distance: 50 },
            { city: 'Munger', distance: 300 },
            { city: 'Bhagalpur', distance: 350 },
            { city: 'Darbhanga', distance: 160 },
            { city: 'Pawapuri', distance: 320 },
            { city: 'Sitamarhi', distance: 150 }
        ]
    },
    {
        name: 'Munger',
        connections: [
            { city: 'Patna', distance: 180 },
            { city: 'Rajgir-Nalanda', distance: 210 },
            { city: 'Gaya', distance: 230 },
            { city: 'Vaishali', distance: 210 },
            { city: 'East Champaran', distance: 300 },
            { city: 'West Champaran', distance: 300 },
            { city: 'Bhagalpur', distance: 60 },
            { city: 'Darbhanga', distance: 200 },
            { city: 'Pawapuri', distance: 215 },
            { city: 'Sitamarhi', distance: 220 }
        ]
    },
    {
        name: 'Bhagalpur',
        connections: [
            { city: 'Patna', distance: 240 },
            { city: 'Rajgir-Nalanda', distance: 270 },
            { city: 'Gaya', distance: 260 },
            { city: 'Vaishali', distance: 270 },
            { city: 'East Champaran', distance: 350 },
            { city: 'West Champaran', distance: 350 },
            { city: 'Munger', distance: 60 },
            { city: 'Darbhanga', distance: 240 },
            { city: 'Pawapuri', distance: 270 },
            { city: 'Sitamarhi', distance: 250 }
        ]
    },
    {
        name: 'Darbhanga',
        connections: [
            { city: 'Patna', distance: 140 },
            { city: 'Rajgir-Nalanda', distance: 180 },
            { city: 'Gaya', distance: 210 },
            { city: 'Vaishali', distance: 70 },
            { city: 'East Champaran', distance: 140 },
            { city: 'West Champaran', distance: 160 },
            { city: 'Munger', distance: 200 },
            { city: 'Bhagalpur', distance: 240 },
            { city: 'Pawapuri', distance: 175 },
            { city: 'Sitamarhi', distance: 60 }
        ]
    },
    {
        name: 'Pawapuri',
        connections: [
            { city: 'Patna', distance: 93 },
            { city: 'Rajgir-Nalanda', distance: 15 },
            { city: 'Gaya', distance: 60 },
            { city: 'Vaishali', distance: 125 },
            { city: 'East Champaran', distance: 310 },
            { city: 'West Champaran', distance: 320 },
            { city: 'Munger', distance: 215 },
            { city: 'Bhagalpur', distance: 270 },
            { city: 'Darbhanga', distance: 175 },
            { city: 'Sitamarhi', distance: 210 }
        ]
    },
    {
        name: 'Sitamarhi',
        connections: [
            { city: 'Patna', distance: 160 },
            { city: 'Rajgir-Nalanda', distance: 200 },
            { city: 'Gaya', distance: 230 },
            { city: 'Vaishali', distance: 100 },
            { city: 'East Champaran', distance: 130 },
            { city: 'West Champaran', distance: 150 },
            { city: 'Munger', distance: 220 },
            { city: 'Bhagalpur', distance: 250 },
            { city: 'Darbhanga', distance: 60 },
            { city: 'Pawapuri', distance: 210 }
        ]
    }
];


// Add tourism cities to the graph
tourismCities.forEach(cityData => {
    if (!graph.hasNode(cityData.name)) {
        graph.addNode(cityData.name);
    }
    cityData.connections.forEach(connection => {
        if (!graph.hasNode(connection.city)) {
            graph.addNode(connection.city);
        }
        graph.addEdge(cityData.name, connection.city, connection.distance);
    });
}); 