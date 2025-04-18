#!/bin/bash

# Dynamically get the base project path (where this script resides)
BASE_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

# Add Fabric binaries to PATH
export PATH=$PATH:$BASE_DIR/fabric-samples/bin

# Set FABRIC_CFG_PATH dynamically
export FABRIC_CFG_PATH=$BASE_DIR/fabric-samples/config

# Set Org1 environment variables
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=$BASE_DIR/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=$BASE_DIR/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051
export ORDERER_CA=$BASE_DIR/fabric-samples/test-network/organizations/ordererOrganizations/example.com/msp/tlscacerts/tlsca.example.com-cert.pem
