import argon2 from "argon2";

const hashpwd = async (password) => {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (err) {
    console.error(err);
  }
};

export default hashpwd;
