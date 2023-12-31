// promise
// pending
//fulfilled
//rejected

//http://127.0.0.1:7545

const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();
async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJson,
  //   process.env.PRIVATE_KEY_PASSWORD
  // );
  //  wallet = await wallet.connect(provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.json", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying , please wait ...");
  const contract = await contractFactory.deploy(); // STOP here ! wait for contract to deploy
  await contract.deployTransaction.wait(1);
  console.log(contract.address);
  const currentFavoriteNumber = await contract.retrieve();
  console.log(
    ` Current favourite number : ${currentFavoriteNumber.toString()}`
  );
  const transactionResponse = await contract.store("7");
  const transactionReceipt = await transactionResponse.wait(1);
  const updateFavoriteNumber = await contract.retrieve();
  console.log(`Updated favorite number is : ${updateFavoriteNumber}`);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
