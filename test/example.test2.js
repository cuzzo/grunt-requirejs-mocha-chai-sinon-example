// This version loads the requirements via a require block at the beginning,
// but that means you need to be careful not to mutate your copy.

require(['times-six'],function(TimesSix){

  describe('times-six Exemplary Tests', function() {

    it('Should be 12.', function() {
      chai.assert.equal(TimesSix.timesSix(2), 12);
    });

    it('Should be 42; Sinon stub.', function() {
      // Stub timesSix to return 42--no matter what.
      var stub = sinon.stub(TimesSix,'timesSix');
      stub.returns(42);
      chai.assert.equal(TimesSix.timesSix(2), 42);
      // must clean up afterwards, or following tests will fail
      stub.restore();
    });

    it('Should be 12 (again); unstubbed.', function() {
      chai.assert.equal(TimesSix.timesSix(2), 12);
    });

    it('Should be 99; sinon stub sandbox', function() {
      sinon.test(function() {
        this.stub(TimesSix,'timesSix').returns(99);  // this instead of sinon
        chai.assert.equal(TimesSix.timesSix(2), 99);
      })();  
      // note the IIFE, cleanup is automatic, as long as you used this instead of sinon
    });

    it('Should be 12 (yet again!); unstubbed.', function() {
      chai.assert.equal(TimesSix.timesSix(2), 12);
    });
  });

});