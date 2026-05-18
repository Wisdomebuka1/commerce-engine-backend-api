const User = require("../models/Users");
const bcrypt = require("bcrypt");
const {generateAccessToken} = require('../utils/generateAccessToken')
const { createError } = require("../utils/createErrors");

//REGISTER SERVICE
const registerUser = async (data) => {
  const { username, password, email, role } = data;

  // validation
  if (!username || !email || !password) {
    throw createError('All fields are required', 400)
  }

  // check existing user
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw createError('User already exists with this username or email', 409)
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // create user
  const newUser = await User.create({
    username,
    email,
    password: hashPassword,
    role: role || "user",
  });

  return {
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    role: newUser.role,
  };
};

// LOGIN SERVICE
const loginUser = async (data) => {
  const { username, password } = data;

  if (!username || !password) {
     throw createError('Username and password are required', 400)
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw createError('User does not exist', 400)
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw createError('invalid password, try again!', 400)
  }

  const accessToken = generateAccessToken(user)

  return { accessToken };
};

// CHANGE PASSWORD SERVICE
const changePassword = async (userId, data) => {
  const { oldPassword, newPassword } = data;

  if (!oldPassword || !newPassword) {
    throw createError('Old and new password are required', 400)
  }

  if (oldPassword === newPassword) {
    throw createError('New password cannot be same as old password', 400)
  }

  const user = await User.findById(userId);

  if (!user) {
     throw createError('User not found!', 400)
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
        throw createError('old password is incorret!', 400)
  }

  const salt = await bcrypt.genSalt(10);
  const newHashPassword = await bcrypt.hash(newPassword, salt);

  user.password = newHashPassword;
  await user.save();

  return true;
};

module.exports = {
  registerUser,
  loginUser,
  changePassword,
};
