let { is, isnt } = require('amprisand'),
  { join } = require('path'),
  { homedir } = require('os'),
  rimraf = require('rimraf');

process.env.NODE_ENV = 'test';

describe('Emporium Test Setup', () => {
  it('should setup test environment', () => {
    return;
  });
});

describe('Clean JSON Store', () => {
  it('should remove test json files', (done) => {
    rimraf(join(homedir(), '.emporium', 'TEST'), () => {
      done();
    });
  });
});
