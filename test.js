describe('docker-link', function () {
  'use strict';

  var assume = require('assume')
    , Link = require('./');

  it('is exported as function', function () {
    assume(Link).is.a('function');
  });

  it('automatically uppercases the prefix', function () {
    var link = new Link({ prefix: 'bar ' });

    assume(link.prefix).to.equal('BAR');
  });

  it('allows the prefix to be supplied as string', function () {
    var link = new Link('bar');

    assume(link.prefix).to.equal('BAR');
  });

  describe('#get', function () {
    it('returns an empty object if nothing is found', function () {
      var link = new Link('bar');

      assume(link.get('foo')).to.be.a('object');
      assume(link.get('foo')).to.have.length(0);
    });
  });
});
