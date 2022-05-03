Web3 = require("web3");
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
sourceCode = fs.readFileSync("./contract/A2FCreators.sol").toString();
solc = require("solc");
compiledCode = solc.compile(sourceCode);
abiDefinition = JSON.parse(compiledCode.contracts[":Voting"].interface);
VotingContract = new web3.eth.Contract(abiDefinition);
byteCode = compiledCode.contracts[":Voting"].bytecode;

VotingContract.deploy({
  data: byteCode,
  arguments: ["Joseph", "Sean", "Matthew"],
})
  .send({
    from: "0x00D1AE0A6fC13B9ecdefA118B94cF95ac16D4ab0",
    gas: 4700000,
  })
  .on(
    "error",
    function (error) {
      console.log(error);
    }.then(function (newContractInstance) {
      console.log(newContractInstance.options.address);
    })
  );
