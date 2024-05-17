const express = require("express");
const bcrypt =  require("bcryptjs");
const jwt = require("jsonwebtoken")
const md5 = require("md5");
const User = require("../models/user");
const tempString = require("../util/tempString");
const upSignRequest = require("../request/upSignRequest");
const encriptFn = require("../util/encriptFn");
const decriptFn = require("../util/decriptFn");
const createTranId = require("../util/createTranId");
exports.userAuthentication = async (req, res, next) => {
  const { messageId, timestamp, userId, sign } = req.query;
  const rawString = tempString(req.originalUrl);
  const extractSign = md5(rawString);
  const upData = {
    hreq: {
      hi: 2404,
      htran: createTranId(),
      hkey: "1e0c45e8-5a28-4e59-8011-714c182f7358",
      mo: userId,
      htime: Date.now(),
      walet: 5,
      caurl: "https://asanpardakht.ir",
      hop: 312,
    },
  };

  upData.hsign = encriptFn(JSON.stringify(upData.hreq));
  upData.ver = "1.0.0";
  if (sign === extractSign) {
    const upResponse = await upSignRequest(
      JSON.stringify(upData),
      upData.hreq.hi
    );
    res.status(200).json({
      success: true,
      message: "authentication successfully !",
      data: { messageId, timestamp, userId },
      sign: sign,
      upData: upResponse,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "invalid request",
    });
  }
};

// @desc register new users
// @route /api/users
// @access public
const registerUser = async (req, res) => {
  const { name, family, isAdmin, createAt, email, password } = req.body;

  // Validation
  if (!name || !family || !email || !password || !isAdmin ) {
    res.status(400).json({"message" : "Please include all fields"});
  }

  // Find if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({message : "User already exists" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    family,
    email,
    isAdmin,
    createAt,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin : user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({message : "Invalid user data"});
  }
};

// @desc login a users
// @route /api/users/login
// @access public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // Check user and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin : user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid credentials!" });
    // throw new Error("Invalid credentials");
  }
};

// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe =  (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json(user);
};


// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};