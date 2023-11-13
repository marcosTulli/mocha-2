const assert = require('assert');
const should = require('chai').should();

describe('Basic Mocha Test', () => {
  it(' - Should deal with objects', () => {
    const obj = { name: 'Tim', gender: 'male' };
    const objB = { name: 'Tim', gender: 'male' };
    obj.should.have.property('name').eql('Tim');
    obj.should.eql(objB);
  });
  it(' - Should allow testing null', () => {
    const iamNull = null;
    should.not.exist(iamNull)
  });
});
