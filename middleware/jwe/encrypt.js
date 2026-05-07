import { EncryptJWT } from "jose";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const uuid = uuidv4();
const token = {
  ky: uuid,
};

const secretKey = Buffer.from(process.env.SECRETHEX, "hex");

export const encryptJWT = async (token, secretKey) => {
  try {
    const encryptedJWT = await new EncryptJWT(token)
      .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
      .encrypt(secretKey);
    return encryptedJWT;
  } catch (err) {
    console.error("Error:", err);
  }
};

const l = await encryptJWT(token, secretKey);
console.log("encrypted user id: ", l);
console.log("db user id", uuid);
