import axios from "axios";

export const createOTP = () => {
  let digits = "0123456789";
  let otp = "";
  for (let i = 0; i < 4; i++) {
    const idx = Math.floor(Math.random() * 10);
    otp += digits[idx];
  }
  return otp;
};

export const fast2SMS = async ({ message, contact_number }) => {
  try {
    const opts = {
      sender_id: "FSTSMS",
      message: message,
      language: "english",
      route: "p",
      numbers: contact_number,
    };
    const { data } = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      opts,
      {
        headers: {
          Authorization: process.env.FAST2SMS,
        },
      }
    );
    console.log(data);
  } catch (error) {
    return console.log("Err->", error);
  }
};
