const db = require('../db/db');

const getAllUsers = async () => {
  return await db.getUsers();
};

const createUser = async (name) => {
  return await db.addUser(name);
};

module.exports = { getAllUsers, createUser };