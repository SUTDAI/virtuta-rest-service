const models = require("../models");

function login(request, response) {
  const login_data = {
    userName: request.body.userName,
    password: request.body.password,
  };

  //check for valid fields
  if (!request.body.userName) {
    response.status(400).send({
      message: "Username cannot be empty!",
    });
  } else if (!request.body.password) {
    response.status(400).send({
      message: "Password cannot be empty!",
    });
  }

  //unimplemented
}

function add_user(request, response) {
  const user_data = {
    userName: request.body.userName,
    password: request.body.password,
    email: request.body.email,
  };

  //check for valid fields
  if (!request.body.userName) {
    response.status(400).send({
      message: "Username cannot be empty!",
    });
    return;
  } else if (!request.body.password) {
    response.status(400).send({
      message: "Password cannot be empty!",
    });
    return;
  } else if (!request.body.email) {
    response.status(400).send({
      message: "Email cannot be empty!",
    });
    return;
  }

  //Catch uploading error
  models.User.create(user_data)
    .then((result) => {
      response.status(201).json({
        message: "User Created Successfully!",
        post: result,
      });
    })
    .catch((error) => {
      response.status(500).json({
        message: "Something Went Wrong",
        post: error,
      });
    });
}

function remove_user(request, response) {
  const validation_data = {
    userName: request.body.userName,
    password: request.body.password,
    email: request.body.email,
  };

  //check for valid fields
  if (!request.body.userName) {
    response.status(400).send({
      message: "Username cannot be empty!",
    });
    return;
  } else if (!request.body.password) {
    response.status(400).send({
      message: "Password cannot be empty!",
    });
    return;
  } else if (!request.body.email) {
    response.status(400).send({
      message: "Email cannot be empty!",
    });
    return;
  }

  //Catch uploading error
  models.User.destroy({
    where: validation_data,
  })
    .then((result) => {
      response.status(201).json({
        message: "User Deleted Successfully!",
        post: result,
      });
    })
    .catch((error) => {
      response.status(500).json({
        message: "Something Went Wrong",
        post: error,
      });
    });
}

module.exports = {
  login: login,
  add_user: add_user,
  remove_user: remove_user,
};
