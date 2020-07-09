module.exports = (F) => {
  try {
    new F()
    return true
  } catch (err) {
    return false
  }
}
