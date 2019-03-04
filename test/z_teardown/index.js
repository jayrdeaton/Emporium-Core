let { is, isnt } = require('amprisand'),
  { join } = require('path'),
  { homedir } = require('os'),
  rimraf = require('rimraf'),
  { promisify } = require('util');

rimraf = promisify(rimraf);

describe('teardown', () => {
  describe('should teardown test environment', () => {
    it('should remove test json files', async () => {
      await rimraf(join(homedir(), '.emporium', 'TEST'));
    });
  });
});
