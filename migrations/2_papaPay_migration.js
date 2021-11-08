const PapaPay = artifacts.require("PapaPay");

module.exports = function (deployer) {
  deployer.deploy(PapaPay);
};
