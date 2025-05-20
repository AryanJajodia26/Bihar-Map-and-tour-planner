class Graph {
    constructor() {
        this.adjacencyList = new Map();
        // Initialize with some major cities in Bihar
        this.addCity('Patna', [
            { city: 'Gaya', distance: 100 },
            { city: 'Muzaffarpur', distance: 80 },
            { city: 'Bhagalpur', distance: 220 },
            { city: 'Nalanda', distance: 90 }
        ]);
        this.addCity('Gaya', [
            { city: 'Patna', distance: 100 },
            { city: 'Bodh Gaya', distance: 15 },
            { city: 'Aurangabad', distance: 45 }
        ]);
        this.addCity('Muzaffarpur', [
            { city: 'Patna', distance: 80 },
            { city: 'Darbhanga', distance: 60 },
            { city: 'Sitamarhi', distance: 55 }
        ]);
        this.addCity('Bhagalpur', [
            { city: 'Patna', distance: 220 },
            { city: 'Munger', distance: 70 }
        ]);
        this.addCity('Bodh Gaya', [
            { city: 'Gaya', distance: 15 }
        ]);
        this.addCity('Darbhanga', [
            { city: 'Muzaffarpur', distance: 60 },
            { city: 'Madhubani', distance: 30 }
        ]);
        this.addCity('Nalanda', [
            { city: 'Patna', distance: 90 },
            { city: 'Rajgir', distance: 15 }
        ]);
        this.addCity('Rajgir', [
            { city: 'Nalanda', distance: 15 },
            { city: 'Gaya', distance: 65 }
        ]);
        this.addCity('Aurangabad', [
            { city: 'Gaya', distance: 45 },
            { city: 'Rohtas', distance: 70 }
        ]);
        this.addCity('Munger', [
            { city: 'Bhagalpur', distance: 70 },
            { city: 'Begusarai', distance: 65 }
        ]);
        this.addCity('Begusarai', [
            { city: 'Munger', distance: 65 },
            { city: 'Samastipur', distance: 55 }
        ]);
        this.addCity('Samastipur', [
            { city: 'Begusarai', distance: 55 },
            { city: 'Muzaffarpur', distance: 65 }
        ]);
        this.addCity('Madhubani', [
            { city: 'Darbhanga', distance: 30 },
            { city: 'Sitamarhi', distance: 50 }
        ]);
        this.addCity('Sitamarhi', [
            { city: 'Muzaffarpur', distance: 55 },
            { city: 'Madhubani', distance: 50 }
        ]);
        this.addCity('Rohtas', [
            { city: 'Aurangabad', distance: 70 },
            { city: 'Buxar', distance: 90 }
        ]);
        this.addCity('Buxar', [
            { city: 'Rohtas', distance: 90 },
            { city: 'Patna', distance: 120 }
        ]);

        // Additional 10 Cities
        this.addCity('Sasaram', [
            { city: 'Rohtas', distance: 15 },
            { city: 'Aurangabad', distance: 80 },
            { city: 'Buxar', distance: 75 }
        ]);
        this.addCity('Siwan', [
            { city: 'Chhapra', distance: 35 },
            { city: 'Gopalganj', distance: 30 }
        ]);
        this.addCity('Chhapra', [
            { city: 'Siwan', distance: 35 },
            { city: 'Hajipur', distance: 50 },
            { city: 'Buxar', distance: 60 }
        ]);
        this.addCity('Hajipur', [
            { city: 'Chhapra', distance: 50 },
            { city: 'Patna', distance: 20 }
        ]);
        this.addCity('Gopalganj', [
            { city: 'Siwan', distance: 30 },
            { city: 'Motihari', distance: 70 }
        ]);
        this.addCity('Motihari', [
            { city: 'Gopalganj', distance: 70 },
            { city: 'Sitamarhi', distance: 80 }
        ]);
        this.addCity('Kishanganj', [
            { city: 'Purnia', distance: 45 },
            { city: 'Araria', distance: 35 }
        ]);
        this.addCity('Purnia', [
            { city: 'Kishanganj', distance: 45 },
            { city: 'Katihar', distance: 35 },
            { city: 'Bhagalpur', distance: 110 }
        ]);
        this.addCity('Katihar', [
            { city: 'Purnia', distance: 35 },
            { city: 'Bhagalpur', distance: 95 }
        ]);
        this.addCity('Araria', [
            { city: 'Kishanganj', distance: 35 },
            { city: 'Purnia', distance: 40 }
        ]);
    }

    addCity(city, connections) {
        if (!this.adjacencyList.has(city)) {
            this.adjacencyList.set(city, []);
        }
        connections.forEach(connection => {
            this.adjacencyList.get(city).push(connection);
            // Add reverse connection
            if (!this.adjacencyList.has(connection.city)) {
                this.adjacencyList.set(connection.city, []);
            }
            this.adjacencyList.get(connection.city).push({ city, distance: connection.distance });
        });
    }

    findShortestPath(start, end) {
        const distances = new Map();
        const previous = new Map();
        const unvisited = new Set();

        // Initialize distances
        for (const city of this.adjacencyList.keys()) {
            distances.set(city, city === start ? 0 : Infinity);
            previous.set(city, null);
            unvisited.add(city);
        }

        while (unvisited.size > 0) {
            // Find the unvisited city with the smallest distance
            let current = null;
            let smallestDistance = Infinity;
            for (const city of unvisited) {
                if (distances.get(city) < smallestDistance) {
                    smallestDistance = distances.get(city);
                    current = city;
                }
            }

            if (current === null) break;
            if (current === end) break;

            unvisited.delete(current);

            // Update distances to neighbors
            for (const neighbor of this.adjacencyList.get(current)) {
                const distance = distances.get(current) + neighbor.distance;
                if (distance < distances.get(neighbor.city)) {
                    distances.set(neighbor.city, distance);
                    previous.set(neighbor.city, current);
                }
            }
        }

        // Build the path
        const path = [];
        let current = end;
        while (current !== null) {
            path.unshift(current);
            current = previous.get(current);
        }

        return {
            path: path,
            distance: distances.get(end)
        };
    }

    getCities() {
        return Array.from(this.adjacencyList.keys());
    }
}

module.exports = Graph; 