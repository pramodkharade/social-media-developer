const isEmpty = value => {
  console.log('Calling empty Function:: ', value);
  return (value === undefined ||
    value === null ||
    (typeof value === "Object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0))

};

module.exports = isEmpty;
