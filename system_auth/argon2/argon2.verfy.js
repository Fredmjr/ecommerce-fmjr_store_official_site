import argon2 from "argon2";

const verifypwd = async (hash, password) => {
  try {
    const isValid = await argon2.verify(hash, password);
    return isValid;
  } catch (err) {
    console.error(err);
  }
};

export default verifypwd;
