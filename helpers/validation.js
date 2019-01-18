var validator = require("validator");

module.exports = function validate(value, type, errorMessage, errorList) {
  switch (type) {
    case "string":
      if (!value || validator.isEmpty(value, { ignore_whitespace: true }))
        return errorList.push(errorMessage);
      return true;
      case "email":
      if (!value || !validator.isEmail(value))
        return errorList.push(errorMessage);
      return true;
    case "url":
      if(
        !value ||
        !validator.isURL(value, {
          protocols: ['http','https'],
          require_protocol: true
        })
      )
        return errorList.push(errorMessage);
      return true;
    default:
      return value && validator.isEmpty(value, { ignore_whitespace: true });
  }
  return value == null || value.length === 0;
};
