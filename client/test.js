import 'babel-polyfill';
import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiEnzyme from 'chai-enzyme';
import chaiImmutable from 'chai-immutable';

chai.use(sinonChai);
chai.use(chaiEnzyme());
chai.use(chaiImmutable);

global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
global.should = chai.should();

const context = require.context('./', true, /^(.(?!tests\.entry))*\.js$/);

context('./app.js');

context.keys().forEach(
  key => {
    if (/\.test\.js$/.test(key)) {
      context(key);
    }
  });
