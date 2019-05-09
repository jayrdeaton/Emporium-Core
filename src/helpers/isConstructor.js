module.exports = (f) => {
  try {
    new f();
    return true;
  } catch (err) {
    return false;
  };
};
