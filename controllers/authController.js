function authController() {
  let roles;

  function setRoles(role) {
    roles = role;
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

  return { isAuthorized, isAuthorizedAsync, setRoles, isAuthorizedPromise };
}

module.exports = authController();
