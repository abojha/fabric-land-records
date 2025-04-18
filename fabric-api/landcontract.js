// landcontract.js
'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, 'connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

async function connect() {
    const walletPath = path.join(__dirname, 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: 'admin',
        discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('landrecords');
    return { contract, gateway };
}

async function getAllLandRequests() {
    const { contract, gateway } = await connect();
    const result = await contract.evaluateTransaction('getAllLandRequests');
    await gateway.disconnect();
    return JSON.parse(result.toString());
}

async function createLandRequest(receiptNumber, data) {
    const { contract, gateway } = await connect();
    const response = await contract.submitTransaction(
        'createLandRequest',
        receiptNumber,
        JSON.stringify(data)
    );
    await gateway.disconnect();
    return response.toString();
}

async function updateLandStatus(receiptNumber, newStatus, assignedTo, remarks, fromUser, timestamp) {
    const { contract, gateway } = await connect();
    const response = await contract.submitTransaction(
        'updateLandStatus',
        receiptNumber,
        newStatus,
        assignedTo,
        remarks,
        fromUser,
        timestamp
    );
    await gateway.disconnect();
    return response.toString();
}

module.exports = {
    getAllLandRequests,
    createLandRequest,
    updateLandStatus,
};
