const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/setEmail");
const jwt = require("jsonwebtoken"); //authentication
const { expressjwt } = require("express-jwt"); //authorization
//post user
exports.postUser = async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  //check if user is already registered
  User.findOne({ email: user.email })
    .then(async (data) => {
      if (data) {
        return res
          .status(400)
          .json({ error: "Email must be unique, try another." });
      } else {
        user = await user.save();
        if (!user) {
          return res.status(400).json({
            error: "Something went wrong while creating ypur account",
          });
        }
        //for send token to database
        let token = new Token({
          token: crypto.randomBytes(16).toString("hex"),
          userId: user._id,
        });
        token = await token.save();
        if (!token) {
          return res.status(400).json({ error: "Failed to create token" });
        }
        const url =
          process.env.FRONTEND_URL + `\/email\/confirmation\/` + token.token;
        //send email
        sendEmail({
          from: "no-reply.ecommerce.com",
          to: user.email,
          subject: "Email verification link",
          text: `Hello, \n please verfiy your email by clicking the below link \n\n
        http://${req.headers.host}/api/confirmation/${token.token}`,
          html: `
            <h1>Verify your email </h1>
            <a href='${url}' > Click to verify </a>`,
        });
        res.send(user);
      }
    })
    .catch((err) => res.status(400).json({ error: err }));
};

//email confirmation
exports.postEmailConfirmation = (req, res) => {
  //at first find the valid or matching token
  Token.findOne({ token: req.params.token })
    .then((token) => {
      if (!token) {
        return res
          .status(403)
          .json({ error: "invalid token or token may have expired." });
      }
      //if we found valid token then find the valid user for that token
      User.findOne({ _id: token.userId })
        .then((user) => {
          if (!user) {
            return res.status(403).json({
              error: "we are unable to find valid user for this token",
            });
          }
          //check if the user is already verified or not
          if (user.isVerified) {
            return res
              .status(400)
              .json({ error: "email is already verified, login to continue" });
          }
          //save the verified user
          user.isVerified = true;
          user
            .save()
            .then((user) => {
              if (!user) {
                return res
                  .status(400)
                  .json({ error: "failed to verify your email, try again" });
              } else {
                res.json({ message: "Congrats, your email has been verified" });
              }
            })
            .catch((err) => res.status(400).json({ error: err }));
        })
        .catch((err) => res.status(400).json({ error: err }));
    })
    .catch((err) => res.status(400).json({ error: err }));
};

//Login process
exports.signIn = async (req, res) => {
  //destructuring user
  const { email, password } = req.body;
  //check if email is registered or not in database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(403).json({
      error: "Sorry the email  you provided is not found in the system",
    });
  }

  //if email found then check for matching password for that email
  if (!user.authenticate(password)) {
    return res.status(400).json({ error: "Email and password doesnt match" });
  }

  //check if user is verified or not
  if (!user.isVerified) {
    return res.status(400).json({ error: "Verify your email before login" });
  }

  //now generate token using user id and jwt secret
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET
  );

  //store token in the cookie
  res.cookie("myCookie", token, { expire: Date.now() + 999999 });
  //return user information to frontend
  const { _id, name, role } = user;
  return res.json({ token, user: { _id, name, email, role } });
};

//forget password
exports.forgetPassword = async (req, res) => {
  //at first check if email is in the system or not.
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(404)
      .json({ error: "Email you provided is not in the  system" });
  }
  //To save token in database
  let token = new Token({
    userId: user,
    token: crypto.randomBytes(16).toString("hex"),
  });
  token = await token.save();
  if (!token) {
    return res
      .status(400)
      .json({ error: "failed to create the token, process terminated." });
  }
  const url = process.env.FRONTEND_URL + `\/reset\/password\/` + token.token;
  //sendemail for reset
  sendEmail({
    from: "no-reply.ecommerce.com",
    to: user.email,
    subject: "Password Reset Link",
    text: `Hello, \n please reset your password by clicking the below link \n\n
  http://${req.headers.host}/api/resetpassword/${token.token}`,
    html: `
  <h1>Reset your password</h1>
  <a href='${url}' > Click here to reset your password </a>`,
  });

  res.json({ message: "password reset link has been sent to your email" });
};

//reset password
exports.resetPassword = async (req, res) => {
  //at first check if the email is in the system or not
  const token = await Token.findOne({ token: req.params.token });
  if (!token) {
    return res
      .status(403)
      .json({ error: "invalid token or token may have been expired" });
  }
  //if token found find the valid user for that token
  let user = await User.findOne({ _id: token.userId });
  if (!user) {
    return res
      .status(403)
      .json({ error: "User for this token does not exist" });
  }

  //for creating new password set and save
  user.password = req.body.password;
  user = await user.save();
  if (!user) {
    return res.status(500).send("Error reseting The Password");
  }
  res.json({ message: "password has been reset successfully" });
};

//userlist
exports.usersList = async (req, res) => {
  const user = await User.find().select("-hashed_password").select("-salt");
  if (!user) {
    return res.status(400).json({ error: "something went wrong" });
  }
  res.send(user);
};

//userDetail
exports.userDetail = async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-hashed_password")
    .select("-salt");
  if (!user) {
    return res.status(400).json({ error: "something went wrong" });
  }
  res.send(user);
};

//admin middleware
exports.requireAdmin = (req, res, next) => {
  //verify jwt
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
  })(req, res, (err) => {
    if (err) {
      return res.status(401).json({ error: "unauthorized" });
    }
    //check for user role
    if (req.auth.role === 1) {
      next();
    } else {
      return res
        .status(403)
        .json({ error: "you are not authorized to access this page." });
    }
  });
};

//user middleware
exports.requireUser = (req, res, next) => {
  //verify jwt
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
  })(req, res, (err) => {
    if (err) {
      return res.status(401).json({ error: "unauthorized" });
    }
    //check for user role
    if (req.auth.role === 0) {
      next();
    } else {
      return res
        .status(403)
        .json({ error: "you are not authorized to access this page." });
    }
  });
};

//signout
exports.signOut = (req, res) => {
  res.clearCookie("myCookie");
  res.json({ message: "sign out successfully" });
};
