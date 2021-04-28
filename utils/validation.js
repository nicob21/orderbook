const { validate } = require("uuid");
const { includes } = require("lodash");
const { positiveNumber, enumType, uuidType } = require("./constants");

const isValidParam = (value, type, enumList) => {
  if (type === positiveNumber) {
    if (!value || isNaN(value) || value <= 0) return false;
  } else if (type === uuidType) {
    if (!validate(value)) return false;
  } else if (type === enumType) {
    if (!includes(enumList, value)) return false;
  }
  return true;
};

exports.isValidParam = isValidParam;
