function authController() {
  let roles;
  let user;

  function setRoles(role) {
    roles = role;
  }

  function setUser(inUser) {
    user = inUser;
  }

  function isAuthorized(neededRole) {
    return roles.indexOf(neededRole) >= 0;
  }

  function isAuthorizedAsync(neededRole, cb) {
    setTimeout(function () {
      cb(roles.indexOf(neededRole) >= 0);
    }, 2100);
  }

  function isAuthorizedPromise(neededRole) {
    return new Promise(function (res) {
      setTimeout(function () {
        res(roles.indexOf(neededRole) >= 0);
      }, 0);
    });
  }

  function getIndex(req, res) {
    res.render('index');
    // res.render('index');
  }

  return { isAuthorized, isAuthorizedAsync, setRoles, isAuthorizedPromise, getIndex, setUser };
}

module.exports = authController();
