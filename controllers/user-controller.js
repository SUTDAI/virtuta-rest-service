const models = require("../models/");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

//Login
async function login(request, response) {
  try {
    const user = await models.User.findOne({
      where: { email: request.body.email },
    });

    if (!user) {
      return response.status(404).json({ message: "User does not exist" });
    }

    const passwordValid = await bcrypt.compare(
      request.body.password,
      user.password
    );

    if (!passwordValid) {
      return response.status(400).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        userName: user.userName,
      },
      process.env.SECRET
    );

    response.status(200).json({
      message: "Login Successful!",
      userId: user.id,
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
}

//Add User to database
async function add_user(request, response) {
  try {
    const salt = await bcrypt.genSalt(10);
    const user_data = {
      userName: request.body.userName,
      email: request.body.email,
      password: await bcrypt.hash(request.body.password, salt),
    };
    const created_user = await models.User.create(user_data);

    response.status(201).json({
      message: "User Created Successfully!",
      post: created_user,
    });
  } catch (error) {
    response.status(500).json({
      message: "An error occurred while adding user",
      error: error.message,
    });
  }
}

//remove user account
async function remove_user(request, response) {
  try {
    // Extract userId and password from request
    const userId = request.body.userId;
    const password = request.body.password;

    // Check if userId and password are provided
    if (!userId || !password) {
      return response.status(400).json({
        message: "Both userId and password are required for deletion",
      });
    }

    // Find user by userId
    const user = await models.User.findByPk(userId);

    // Check if user exists
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    // Validate password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return response.status(401).json({ message: "Invalid password" });
    }

    // Delete user
    await user.destroy();

    // Respond with success message
    return response.status(200).json({
      message: "User deleted successfully",
      userId: user.id,
    });
  } catch (error) {
    // Handle errors
    return response.status(500).json({
      message: "An error occurred while removing user",
      error: error.message,
    });
  }
}

module.exports = {
  login: login,
  add_user: add_user,
  remove_user: remove_user,
};
