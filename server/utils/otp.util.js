import fast2sms from "fast-two-sms";

export const createOTP = () => {
  let digits = "0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    const idx = Math.floor(Math.random() * 10);
    otp += digits[idx];
  }
  return otp;
};

export const fast2sms = async ({ message, contact_number }) => {
  try {
    const res = await fast2sms.sendMessage({
      authorization: process.env.FAST2SMS,
      message,
      numbers: [contact_number],
    });
    console.log(res);
  } catch (error) {
    return null;
  }
};
