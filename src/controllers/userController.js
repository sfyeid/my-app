const userService = require('../services/userService');

const getUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

const createUser = async (req, res) => {
  const { name } = req.body;
  const user = await userService.createUser(name);
  res.json(user);
};

module.exports = { getUsers, createUser };