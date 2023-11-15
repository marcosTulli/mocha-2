const assert = require('assert');
const authController = require('../../controllers/authController');
const expect = require('chai').expect;
const should = require('chai').should();
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);
chai.should();

describe(' - AuthController', function () {
  describe('\n - isAuthorized:\n', function () {
    let user = {};

    beforeEach(function () {
      user = {
        roles: ['user'],
        isAuthorized: function (neededRole) {
          return this.roles.indexOf(neededRole) >= 0;
        },
      };
      sinon.spy(user, 'isAuthorized');
      authController.setUser(user);
    });

    it('\n- Should return false if not authorized', function () {
      const isAuth = authController.isAuthorized('admin');
      expect(isAuth).to.be.false;
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

  describe.only('getIndex', function () {
    let user = {};
    beforeEach(function () {
      user = {
        roles: ['user'],
        isAuthorized: function (neededRole) {
          return this.roles.indexOf(neededRole) >= 0;
        },
      };
    });

    it(' - Should render index if authorized', function () {
      const isAuth = sinon.stub(user, 'isAuthorized').returns(true);
      const req = { user: user };
      const res = {
        render: function () {},
      };
      const mock = sinon.mock(res);
      mock.expects('render').once().withExactArgs('index');

      authController.getIndex(req, res);
      isAuth.calledOnce.should.be.true;
      mock.verify();
      // res.render.calledOnce.should.be.true;
      // res.render.firstCall.args[0].should.equal('index');
    });
  });
});
