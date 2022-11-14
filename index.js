"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lamport = exports.pubFromPri = exports.sign_hash = exports.is_private_key = exports.mk_key_pair = exports.verify_signed_hash = exports.hash_b = exports.hash = exports.cpylck = exports.df = exports.deepFreeze = exports.startTimer = exports.unzipN = void 0;
const ethers_1 = require("ethers");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const crypto_1 = require("crypto");
// F U N C T I O N S 
function unzipN(arr) {
    if (arr.length === 0)
        return [];
    // if all subarrays are not same length ... make them so
    const longest_length = Math.max(...(arr.map((row) => row.length)));
    const arr2 = arr.map((row) => {
        if (row.length < longest_length) {
            const diff = longest_length - row.length;
            return [...row, ...Array.from({ length: diff }, () => '')];
        }
        return row;
    });
    return Array.from({ length: arr2[0].length })
        .map((_, i) => Array.from({ length: arr2.length })
        .map((_, k) => arr2[k][i]));
}
exports.unzipN = unzipN;
/**
 *  @name startTimer
 *  @author William Doyle
 */
const startTimer = () => {
    const start = new Date().getTime();
    return () => {
        const end = new Date().getTime();
        return (end - start) / 1000;
    };
};
exports.startTimer = startTimer;
function deepFreeze(object) {
    // Retrieve the property names defined on object
    const propNames = Object.getOwnPropertyNames(object);
    // Freeze properties before freezing self
    for (const name of propNames) {
        const value = object[name];
        if (value && typeof value === "object") {
            deepFreeze(value);
        }
    }
    return Object.freeze(object);
}
exports.deepFreeze = deepFreeze;
function df(object) {
    return deepFreeze(object);
}
exports.df = df;
function cpylck(obj) {
    return deepFreeze(JSON.parse(JSON.stringify(obj)));
}
exports.cpylck = cpylck;
const hash = (input) => ethers_1.ethers.utils.keccak256(ethers_1.ethers.utils.toUtf8Bytes(input));
exports.hash = hash;
const hash_b = (input) => ethers_1.ethers.utils.keccak256(input);
exports.hash_b = hash_b;
/**
 * @name verify_signed_hash
 * @author William Doyle
 * @param hmsg
 * @param sig
 * @param pub
 * @returns a boolean : true upon successful verification, false otherwise
 */
function verify_signed_hash(hmsg, sig, pub) {
    const msg_hash_bin = new bignumber_js_1.default(hmsg, 16).toString(2).padStart(256, '0');
    const pub_selection = [...msg_hash_bin].map((way /** 'way' as in which way should we go through the public key */, i) => pub[i][way]);
    for (let i = 0; i < pub_selection.length; i++)
        if (pub_selection[i] !== (0, exports.hash_b)(`0x${sig[i]}`))
            return false;
    return true;
}
exports.verify_signed_hash = verify_signed_hash;
/**
 * @name mk_key_pair
 * @description Generate a lamport keypair using the randomBytes function from the crypto library to generate the private key
 * @author William Doyle
 * @returns a random lamport key pair
 */
function mk_key_pair() {
    const mk_rand_num = () => (0, exports.hash)((0, crypto_1.randomBytes)(32).toString('hex')).substring(2); // hash the random number once to get the private key (then forget the original random number) and twice to get the public key... this helps if there is an issue with the random number generator
    const mk_RandPair = () => [mk_rand_num(), mk_rand_num()];
    const mk_pri_key = () => Array.from({ length: 256 }, () => mk_RandPair());
    const pri = mk_pri_key();
    const pub = pubFromPri(pri.map(p => [`0x${p[0]}`, `0x${p[1]}`]));
    return { pri, pub };
}
exports.mk_key_pair = mk_key_pair;
/**
 * @name is_private_key
 * @description check the passed object looks like a lamport private key
 * @author William Doyle
 * @param key
 * @returns boolean if key looks like a valid lamport key pair
 */
function is_private_key(key) {
    if (key.length !== 256)
        return false;
    return true;
}
exports.is_private_key = is_private_key;
/**
 * @name sign_hash
 * @author William Doyle
 * @param hmsg --> the hash of the message to be signed
 * @param pri --> the private key to sign the hash with
 * @returns Sig (a lamport signature)
 */
function sign_hash(hmsg, pri) {
    if (!is_private_key(pri))
        throw new Error('invalid private key');
    const msg_hash_bin = new bignumber_js_1.default(hmsg, 16).toString(2).padStart(256, '0');
    if (msg_hash_bin.length !== 256)
        throw new Error(`invalid message hash length: ${msg_hash_bin.length} --> ${msg_hash_bin}`);
    const sig = [...msg_hash_bin].map((el, i) => pri[i][el]);
    return sig;
}
exports.sign_hash = sign_hash;
/**
 *
 * @param pri
 * @returns PubPair[] (the public key)
 */
const pubFromPri = (pri) => pri.map(p => ([(0, exports.hash_b)(p[0]), (0, exports.hash_b)(p[1])]));
exports.pubFromPri = pubFromPri;
const Lamport = {
    mk_key_pair,
    sign_hash,
    verify_signed_hash,
    is_private_key,
    pubFromPri,
    hash: exports.hash,
    hash_b: exports.hash_b,
};
exports.Lamport = Lamport;
