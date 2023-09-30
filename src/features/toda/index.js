
const createToda = require("./toda_management/create-toda");
const getAllToda = require("./toda_management/get-all-toda");
const getByIdToda = require("./toda_management/get-by-id-toda");
const updateToda = require("./toda_management/update-toda");
const deleteToda = require("./toda_management/delete-toda");


const createTerminal = require("./toda_terminal/create-terminal");
const getAllTerminal = require("./toda_terminal/get-all-terminal");
const getByIdTerminal = require("./toda_terminal/get-by-id-terminal");
const updateTerminal = require("./toda_terminal/update-terminal");
const deleteTerminal = require("./toda_terminal/delete-terminal");


module.exports = {
  createToda,
  getAllToda,
  getByIdToda,
  updateToda,
  deleteToda,

  createTerminal,
  getAllTerminal,
  getByIdTerminal,
  updateTerminal,
  deleteTerminal,
};
