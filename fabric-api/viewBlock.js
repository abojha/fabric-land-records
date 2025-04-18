'use strict';

const fs = require('fs');
const path = require('path');
const { Client } = require('fabric-common');

async function main() {
  try {
    const ccpPath = path.resolve(__dirname, 'connection-org1.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    const client = Client.newClient('viewBlockClient');

    const peerName = 'peer0.org1.example.com';
    const peerInfo = ccp.peers[peerName];

    // ✅ Extract raw address only (without grpcs://)
    const rawUrl = peerInfo.url;  // DO NOT strip grpcs://
    const tlsCert = peerInfo.tlsCACerts.pem;
    const grpcOptions = peerInfo.grpcOptions || {};

    const peer = client.newEndorser(peerName);
    console.log('🔌 Connecting to peer at:', rawUrl);

    await peer.connect(
    {
        url: rawUrl,  // like 'grpcs://localhost:7051'
        tlsCACerts: { pem: tlsCert },
        grpcOptions
    },
    {
        name: peerName,
        mspId: 'Org1MSP',
        asLocalhost: true
    }
    );
    

    const channel = client.newChannel('mychannel');
    channel.addEndorser(peer);

    const blockNumber = 0; // Change block number if needed
    const block = await channel.queryBlock(blockNumber, peer, false);

    console.log(`✅ Block ${blockNumber} contents:\n`);
    console.log(JSON.stringify(block, null, 2));

    peer.disconnect();
  } catch (err) {
    console.error('❌ Error querying block:', err);
  }
}

main();
