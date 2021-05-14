async function main() {

    const [deployer] = await ethers.getSigners();
  
    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
    
    console.log("Account balance:", (await deployer.getBalance()).toString());
        
    const KOVAN_VRF_COORDINATOR = "0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9";
    const KOVAN_LINKTOKEN =	"0xa36085f69e2889c224210f603d836748e7dc0088";
    const KOVAN_KEY_HASH = "0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4";


    const RGANFT = await ethers.getContractFactory("RGANFT");
    const rganft = await RGANFT.deploy(KOVAN_VRF_COORDINATOR,
        KOVAN_LINKTOKEN,
        KOVAN_KEY_HASH);
  
    console.log("rganft Token address:", rganft.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  