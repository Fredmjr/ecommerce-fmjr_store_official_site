import crypto from "crypto";

const otp_store = new Map();

//genrate otp
export const generate_otp_fuc = (user_id) => {
  const otp = crypto.randomInt(100000, 1000000);

  // cancel old timer if exists
  const old_entry = otp_store.get(user_id);
  if (old_entry && old_entry.timer) {
    clearTimeout(old_entry.timer);
  }

  // new timer
  const timer = setTimeout(() => {
    otp_store.delete(user_id);
  }, 600000); // 10 min duration

  otp_store.set(user_id, { otp, timer });
  return otp;
};

//verify otp
export const verify_otp_fuc = (user_id, input_otp) => {
  const entry = otp_store.get(user_id);
  console.log(entry);
  return entry && entry.otp === Number(input_otp);
};
