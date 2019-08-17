import config from "../config";
import * as jwe from "node-webtokens";
import NodeRSA from 'node-rsa';

export function decrypt(token) {
    let pKey = new NodeRSA(config.private_key);
    const private_key = pKey.exportKey('pkcs1-private-pem');
    let decodedData = jwe.parse(token).verify(private_key);
    
    return decodedData;
}

export function isValidToken(token) {
    if(token && token !== ""){
        let decodedData = decrypt(token);
    
        if (decodedData.valid) {
            return true;
        } else{
          return false;
        }
    } else{
        return false;
    }
}
