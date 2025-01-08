const logout = async (req, res) => {
  res.clearCookie("cookieID")
  return res.sendStatus(200)
}

module.exports = {
  logout,
}
