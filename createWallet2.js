// create with coinkey

var CoinKey = require('coinkey'); 

var wallet = new CoinKey.createRandom();

console.log("Address:", wallet.publicAddress);
console.log("Private Key (Hex):", wallet.privateKey.toString('hex'));
console.log("Private Key (WIF):", wallet.privateWif);


