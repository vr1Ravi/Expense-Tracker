import { User } from "../models/user_model";
import { createOTP, fast2sms } from "../utils/otp.util";
export const registerUser = async (req, res) => {
  try {
    let { name, mobile } = req.body;
    mobile = Number(mobile);
    if (!mobile) {
      return res.status(400).json({
        message: "Please Enter Valid Number",
      });
    }
    let user = await User.find({ mobile });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    user = await User.create({
      name,
      mobile,
    });
    // Crete OTP
    const otp = createOTP();
    user.phoeOTP = otp;
    await user.save();

    // send OTP
    await fast2sms({
      message: `Your OTP is ${otp}`,
      contactNumber: user.mobile,
    });

    return res.status(201).json({
      message: "Welcom account created OTP sended to mobile number",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};

// export const verifyOTP =async (req, res) =>{
// try {
//     const {otp, user_id} = req.body;

//     if(otp !=== user.phoeOTP){

//     }
// } catch (error) {
//     return res.status(500).json({
//         message: "Internal server error"
//     })
// }
// }
