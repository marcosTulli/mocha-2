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
    if (user) {
      return user.isAuthorized(neededRole);
    } else if (roles.indexOf(neededRole) >= 0) {
      return true;
    }
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
    try {
      if (req.user.isAuthorized('admin')) {
        return res.render('index');
      }
      res.render('Not Authorized');
    } catch (error) {
      res.render('error');
    }
  }

  return { isAuthorized, isAuthorizedAsync, setRoles, isAuthorizedPromise, getIndex, setUser };
}

module.exports = authController();
