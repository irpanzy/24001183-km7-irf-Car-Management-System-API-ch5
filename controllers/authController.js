const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Auth, User } = require("../models");

const register = async (req, res) => {
  try {
    const { name, age, address, email, password } = req.body;

    if (!password || password.length < 6 || password.length > 100) {
      return res.status(400).json({
        status: "Failed",
        message: "Password must be between 6 and 100 characters",
        data: null,
      });
    }

    const existingUser = await Auth.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        status: "Failed",
        message: "Email already exists",
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, age, address });
    const newAuth = await Auth.create({
      email,
      password: hashedPassword,
      userId: newUser.id,
    });

    res.status(201).json({
      status: "Success",
      message: "User registered successfully",
      data: {
        userName: newUser.name,
        email: newAuth.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
      data: null,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await Auth.findOne({
      include: [{ model: User, as: "user" }],
      where: { email },
    });

    if (!data) {
      return res.status(404).json({
        status: "Failed",
        message: "User does not exist",
        success: false,
        data: null,
      });
    }

    const passwordMatch = await bcrypt.compare(password, data.password);
    if (!passwordMatch) {
      return res.status(401).json({
        status: "Failed",
        message: "Wrong Password",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        id: data.id,
        userName: data.user.name,
        email: data.email,
        userId: data.user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRED || "1h" }
    );

    res.status(200).json({
      status: "Success",
      message: "Success login",
      success: true,
      data: { userName: data.user.name, token },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  register,
  login,
};