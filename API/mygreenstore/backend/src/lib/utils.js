var s = require('string')

module.exports.requiredFields = (data, requiredFields) => {
  var errs = {}
  if (requiredFields && requiredFields.length > 0) {
    requiredFields.forEach(function (requiredField) {
      if (
        data[requiredField] === null ||
        data[requiredField] === undefined ||
        data[requiredField] === ''
        ) {
        errs[requiredField] = 'Required Field'
      }
    })
  }
  return errs
}

module.exports.replaceAll = (str, find, replace) => {
  return str.replace(new RegExp(find, 'g'), replace)
}