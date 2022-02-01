async function connect() {
    const priceElem = document.querySelector('#price')
    try {
        priceElem.textContent = 'Updating price...';

        const ABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "key", "type": "string" }, { "indexed": false, "internalType": "uint128", "name": "value", "type": "uint128" }, { "indexed": false, "internalType": "uint128", "name": "timestamp", "type": "uint128" }], "name": "OracleUpdate", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "newUpdater", "type": "address" }], "name": "UpdaterAddressChange", "type": "event" }, { "inputs": [{ "internalType": "string", "name": "key", "type": "string" }], "name": "getValue", "outputs": [{ "internalType": "uint128", "name": "", "type": "uint128" }, { "internalType": "uint128", "name": "", "type": "uint128" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "key", "type": "string" }, { "internalType": "uint128", "name": "value", "type": "uint128" }, { "internalType": "uint128", "name": "timestamp", "type": "uint128" }], "name": "setValue", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOracleUpdaterAddress", "type": "address" }], "name": "updateOracleUpdaterAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "", "type": "string" }], "name": "values", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]

        const web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"))
        const contract = new web3.eth.Contract(ABI);
        contract.options.address = "0xbAFEe71d40baBC12a3D0B2b8937ee62D3A070835";
        const currentPriceResponse = await contract.methods.getValue('ETH').call()
        console.log(currentPriceResponse[0]);
        if (currentPriceResponse[0]) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
            });
            priceElem.textContent = formatter.format(currentPriceResponse[0] / 100000);
        }

    } catch (e) {
        priceElem.textContent = 'An error occurred while updating the price, please refresh your page.';
    }
}

window.onload = function() {
    connect();
}