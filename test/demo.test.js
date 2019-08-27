var chai = require('chai');
var expect = chai.expect;

var foo;

describe('test suite', function(){
    it('test case', function(){
        expect(foo).to.not.exist;
        expect(foo).to.undefined;
        expect(foo).to.not.null;
        expect([]).to.be.empty;
    })
});
