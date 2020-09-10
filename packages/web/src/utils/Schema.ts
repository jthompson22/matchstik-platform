import Joi from "@hapi/joi";

// User
export const user = {
  email: () => Joi.string().email({ tlds: { allow: false } }),
  password: () => Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
}

// Organization
export const organization = {
  name: () => Joi.string().required(),
  email: () => Joi.string().email({ tlds: { allow: false } }).required(),
  phoneNumber: () => Joi.string().required(),
  description: () => Joi.string().required(),
  address: () => Joi.string().required(),
  logoUrl: () => Joi.string().required(),
}



// Organization

// export const exists = function (value) {
//   if (!value) return false;
//   return (value.length > 0);
// };

// export const fullName = function (value) {
//   if (!value) return false;
//   const fullNameReg = /[^\s]+\s[^\s]+/;
//   return (fullNameReg.test(value));
// };

// // Only works with US phone numbers and others of same length
// export const phoneNumber = function (value) {
//   if (!value) return false;
//   return (value.length === 12 || value.length === 14);
// };

// export const url = function (value) {
//   if (!value) return false;
//   const urlReg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
//   return (urlReg.test(value));
// };

// export const zipCode = function (value) {
//   if (!value) return false;
//   const zipReg = /^\d{5}(-\d{4})?$/;
//   return (zipReg.test(value));
// };
