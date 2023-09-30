const bcrypt = require("bcrypt");

const hashPasswords = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const password1 = await bcrypt.hash(password, salt);
    return password1;
  } catch (err) {
    return { Error: err };
  }
};
const comparePass = async (plainPass, hashedPass) => {
  try {
    console.log(plainPass, hashedPass);
    let result = await  bcrypt.compare(plainPass, hashedPass);
    return result
  } catch (err) {
    return { Error: err };
  }
};

module.exports = { hashPasswords, comparePass };
