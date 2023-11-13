const assert = require('assert');
const authController = require('../../controllers/authController');
const expect = require('chai').expect;
const should = require('chai').should();
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

beforeEach(function settingUpRoles() {
  authController.setRoles(['user']);
});
describe(' - AuthController', function () {
  describe('\nisAuthorized:\n', function () {
    it('- Should return false if not authorized', function () {
      const isAuth = authController.isAuthorized('admin');
      expect(isAuth).to.be.false;
      // assert.equal(false, authController.isAuthorized('admin'));
    });
    it('- Should return true if  authorized', function () {
      authController.setRoles(['user', 'admin']);
      const isAuth = authController.isAuthorized('admin');
      isAuth.should.be.true;
    });
    it('- Should not allow a get if not authorized');
    it('- Should allow a get if  authorized');
  });

  describe('\nisAuthorizedAsync:\n', function () {
    it('- Should return false if not authorized', function (done) {
      this.timeout(2500);
      authController.isAuthorizedAsync('admin', (isAuth) => {
        assert.equal(false, isAuth);
        done();
      });
    });
  });

  describe('\nisAuthorizedPromise:\n', function () {
    it('- Should return false if not authorized (promise)', function () {
      // const isAuth = authController.isAuthorizedPromise('admin');
      return authController.isAuthorizedPromise('admin').should.eventually.be.false;
    });
  });
});
