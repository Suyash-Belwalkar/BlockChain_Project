var Voting = artifacts.require("./Voting.sol");

module.exports = function(deployer,networks,accounts){
  console.log("accounts:",accounts);
  deployer.deploy(Voting,"CollegePresident",{from:accounts[0]});
};
 