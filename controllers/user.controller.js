const User = require("../models/users");
const uuid = require("uuid");

exports.getUser = function (req, res) {
  User.find({}, function (err, response) {
    if (err) {
      return res.send({ status: "FAILED" });
    }
    return res.send(response);
  });
};

exports.getAllSubUsers = function (req, res) {
  if (req.cookies.token) {
    User.find(
      { companyId: req.cookies.token, role: "SUB" },
      function (err, response) {
        if (err) {
          return res.send({ status: "FAILED" });
        }
        return res.send(response);
      }
    );
  } else {
    return res.unauthorized();
  }
};

exports.login = function (req, res) {
  User.findOne(
    { email: req.body.userData.email, password: req.body.userData.password },
    function (err, response) {
      if (err) {
        return err;
      }
      if (response) {
        return res.send({
          status: "SUCCESS",
          token: response.companyId,
          role: response.role,
        });
      } else {
        return res.send({
          status: "FAILED",
          Message: "Email/Password is incorrect.",
        });
      }
    }
  );
};

exports.createUser = function (req, res) {
  if (req.body.userData) {
    User.findOne(
      { email: req.body.userData.email },
      function (err, responseData) {
        if (err) {
          return err;
        }

        if (!responseData) {
          const newUser = new User();
          newUser.name = req.body.userData.name;
          newUser.email = req.body.userData.email;
          newUser.password = req.body.userData.password;
          newUser.companyId = uuid.v1();
          newUser.role = "ADMIN";

          newUser.save(function (err, response) {
            if (err) {
              return err;
            }
            return res.send({
              status: "SUCCESS",
              token: response.companyId,
              role: response.role,
            });
          });
        } else {
          return res.send({
            status: "FAILED",
            Message: "Email Already Exists",
          });
        }
      }
    );
  } else {
    return res.send({ status: "FAILED", Message: "Request Object Not Found" });
  }
};

exports.deleteUsers = function (req, res) {
  User.deleteMany({}, function (err, response) {
    if (err) {
      return res.send({ status: "FAILED" });
    }
    if (response) {
      return res.send(response);
    }
    return res.send({ status: "FAILED" });
  });
};

exports.createSubUser = function (req, res) {
  if (req.body.userData) {
    User.findOne(
      { email: req.body.userData.email },
      function (err, responseData) {
        if (err) {
          return err;
        }

        if (!responseData) {
          const newUser = new User();
          newUser.name = req.body.userData.name;
          newUser.email = req.body.userData.email;
          newUser.password = req.body.userData.password;
          newUser.companyId = req.cookies.token;
          newUser.role = "SUB";

          newUser.save(function (err, response) {
            if (err) {
              return err;
            }
            return res.send({ status: "SUCCESS", data: response });
          });
        } else {
          return res.send({
            status: "FAILED",
            Message: "Email Already Exists",
          });
        }
      }
    );
  } else {
    return res.send({ status: "FAILED", Message: "Request Object Not Found" });
  }
};

exports.updateSubUser = function (req, res) {
  if (req.body.userData) {
    User.findOneAndUpdate(
      {
        email: req.body.userData.oldEmail,
        companyId: req.cookies.token,
      },
      {
        email: req.body.userData.email,
        password: req.body.userData.password,
        name: req.body.userData.name,
      },
      null,
      function (err, response) {
        if (err) {
          return err;
        }
        return res.send({ status: "SUCCESS", data: response });
      }
    );
  } else {
    return res.send({ status: "FAILED", Message: "Request Object Not Found" });
  }
};
