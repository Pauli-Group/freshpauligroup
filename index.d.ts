export declare type LamportKeyPair = {
    pri: RandPair[];
    pub: PubPair[];
};
export declare type RandPair = [string, string];
export declare type PubPair = [string, string];
export declare type KeyPair = {
    pri: RandPair[];
    pub: PubPair[];
};
export declare type Sig = string[];
export declare function unzipN<Type>(arr: Type[][]): Type[][];
/**
 *  @name startTimer
 *  @author William Doyle
 */
export declare const startTimer: () => () => number;
export declare function deepFreeze(object: any): any;
export declare function df(object: any): any;
export declare function cpylck(obj: any): any;
export declare const hash: (input: string) => string;
export declare const hash_b: (input: string) => string;
/**
 * @name verify_signed_hash
 * @author William Doyle
 * @param hmsg
 * @param sig
 * @param pub
 * @returns a boolean : true upon successful verification, false otherwise
 */
export declare function verify_signed_hash(hmsg: string, sig: Sig, pub: PubPair[]): boolean;
/**
 * @name mk_key_pair
 * @description Generate a lamport keypair using the randomBytes function from the crypto library to generate the private key
 * @author William Doyle
 * @returns a random lamport key pair
 */
export declare function mk_key_pair(): KeyPair;
/**
 * @name is_private_key
 * @description check the passed object looks like a lamport private key
 * @author William Doyle
 * @param key
 * @returns boolean if key looks like a valid lamport key pair
 */
export declare function is_private_key(key: RandPair[]): boolean;
/**
 * @name sign_hash
 * @author William Doyle
 * @param hmsg --> the hash of the message to be signed
 * @param pri --> the private key to sign the hash with
 * @returns Sig (a lamport signature)
 */
export declare function sign_hash(hmsg: string, pri: RandPair[]): Sig;
/**
 *
 * @param pri
 * @returns PubPair[] (the public key)
 */
declare const pubFromPri: (pri: [string, string][]) => PubPair[];
export { pubFromPri };
declare const Lamport: {
    mk_key_pair: typeof mk_key_pair;
    sign_hash: typeof sign_hash;
    verify_signed_hash: typeof verify_signed_hash;
    is_private_key: typeof is_private_key;
    pubFromPri: (pri: [string, string][]) => PubPair[];
    hash: (input: string) => string;
    hash_b: (input: string) => string;
};
export { Lamport };
