//Legacy (P2PKH): Legacy is the original bitcoin address; they all start with one. It is the most compatible and supported by wallets. Example:1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2
//Nested SegWit (P2PSH): Nested SegWit is an improvement on Legacy; they have a 40% lesser transaction fee than Legacy addresses and have multi-signature. It starts with 3. Example: 3EktnHQD7RiAE6uzMj2ZifT9YgRrkSgzQX 
//Native SegWit (Bech32): SegWit, short for Segregated Witness, has smaller transaction sizes; they can save 80% of transaction fees compared to Legacy. They start with bc1. Example: bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4


const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
const bip32 = BIP32Factory(ecc);
const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");

const network = bitcoin.networks.bitcoin;

const path = `m/44'/0/0/0`;

let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);
let root = bip32.fromSeed(seed, network);

let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address;

console.log(`
    Wallet Address: ${btcAddress}
    Key: ${node.toWIF()}
    Mnemonic: ${mnemonic}
`);