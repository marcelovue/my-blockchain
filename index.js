const { ECDH } = require('crypto')
const crypto   = require('crypto')

const SHA256 = (string) => {
	return crypto.createHash('sha256').update(string, 'utf8').digest()
}
const sign = () => {}
const verifySignature = () => {}

const createKeyPair = () => {
	let ecdh    = ECDH('secp256k1')
	ecdh.generateKeys()
	return {
		publicKey:  ecdh.getPublicKey('hex','compressed'),
		privatekey: ecdh.getPrivateKey('hex'),
		keypair:    ecdh
	}
}

Transaction.prototype.addInput  = function(input) {
	this.inputs.push(input)
}
Transaction.prototype.addOutput = function(output) {
	this.outputs.push(output)
}
Transaction.prototype.sign      = function() {}
// Transaction.prototype.broadcast = function() {}
function Transaction() {
	this.inputs  = []
	this.outputs = []
	this.hash    = ''
	this.fee     = 0
	this.value   = 0
	this.script  = ''
}


Block.prototype.addTransaction = function(transaction) {
	this.transactions.push(transaction)
}
Block.prototype.verifyHash     = function() {}
Block.prototype.createHash     = function() {
	try        { this.hash = SHA256(JSON.stringify(this)).toString('hex') }
	catch(err) { console.error(err) }
}
function Block() {
	this.hash         = ''
	this.merkleRoot   = ''
	this.timestamp    = ''
	this.version      = '0.0.1'
	this.nonce        = 0
	this.difficulty   = 5
	this.transactions = []
}

Blockchain.prototype.addBlock      = function(b) {
	this.blocks.push(b)
}
Blockchain.prototype.createGenesis = function() {}
function Blockchain() {
	this.blocks = []
}
const printDynamicLine = (text) => {

}
Mining.prototype.init = function(b, bc) {
	this.block = b
	let d = b.difficulty
	let difString = Array(d).join('0')+'0'
	let digits
	console.log("Mining....")
	while (digits !== difString) {
		b.createHash()
		digits = b.hash.substr(0,d)
		b.nonce++
	}
	console.log(`I've found! NONCE: ${b.nonce} | HASH: ${b.hash}`)
	bc.addBlock(b)
}
function Mining() {
	this.block = ''
}

// const destin = createKeyPair()
// const origin = createKeyPair()
//
const destin = {
	publickey: '0360ab46f63551888d482f6462cabc3acf01465869c53e08a79846d305fe201586',
	privatekey: '602d514b9b5a6e095d7e5aec8f288cec1e53124b1d08ea10494259efa4051c20',
}
destin.address = Buffer.from(destin.publickey).toString('base64')
const origin = {
	publickey: '02291add2690efde7406f65e57e467f2427db3c7c5a27bd326cb066b83da794e23',
	privatekey: '12e626cfe8d697cddc531fadc5018c9a8713d3af491acd06815f4f2d4b1f9881',
}
origin.address = Buffer.from(origin.publickey).toString('base64')

const tx = new Transaction()
const tx2 = new Transaction()
const b  = new Block()
const bc = new Blockchain()
const m  = new Mining()
tx.addInput({ prevout: '0', script: '', value: '10' })
tx.addOutput({ address: origin.address, value: '10' })
tx2.addInput({ prevout: '0', script: '', value: '5' })
tx.addOutput({ address: origin.address, value: '5' })
b.addTransaction(tx)
b.addTransaction(tx2)
// b.createHash()

m.init(b)
// bc.addBlock(b)
