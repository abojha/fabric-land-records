// api.js
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {
    getAllLandRequests,
    createLandRequest,
    updateLandStatus
} = require('./landcontract');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/landrequests', async (req, res) => {
    try {
        const result = await getAllLandRequests();
        res.json(result);
    } catch (error) {
        console.error('Error fetching land requests:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/landrequests/create', async (req, res) => {
    const { receiptNumber, data } = req.body;
    try {
        const result = await createLandRequest(receiptNumber, data);
        res.json({ message: result });
    } catch (error) {
        console.error('Error creating land request:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/landrequests/update', async (req, res) => {
    const { receiptNumber, newStatus, assignedTo, remarks, fromUser, timestamp } = req.body;
    try {
        const result = await updateLandStatus(receiptNumber, newStatus, assignedTo, remarks, fromUser, timestamp);
        res.json({ message: result });
    } catch (error) {
        console.error('Error updating land request:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`🚀 Fabric API server running at http://localhost:${port}`);
});
