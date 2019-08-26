var demo = require('./demo.js');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

describe('test suite', function(){
    describe('Sub test suite', function(){
        it('test case', function(){
            expect(demo.add(1, 1)).to.be.equal(2);
        })
    });
});