// deploy/00_deploy_contract

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const args = ["testhandle", "0xe6606766A52848b29c1C5E80c7b03eF41F126d74"];
  await deploy("BuyMeCoffee", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    args: args,
    from: deployer,
    log: true,
  });
};
module.exports.tags = ["all", "coffee"];
