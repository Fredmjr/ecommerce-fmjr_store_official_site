import { jwtDecrypt } from "jose";
import dotenv from "dotenv";

dotenv.config();

const de_token =
  "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Ru1uZ9JextYuOAqQ.5-TE3DIAlbEIDlAvlvZ0vl-bugXpsgysikyRMhDGx5QucC6jFEPcfG_32eBf.CJLtg665RLXZOyXF7Qv4IQ";

const secretKey = Buffer.from(process.env.SECRETHEX, "hex");

//Decrpt JWE
export const decryptJWT = async (de_token, secretKey) => {
  try {
    const decryptedJW = await jwtDecrypt(de_token, secretKey);
    return decryptedJW;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const l = await decryptJWT(de_token, secretKey);
console.log(l);
