require("@matterlabs/hardhat-zksync-solc");

/** @type import('hardhat/config').HardhatUserConfig */
const PRIVATE_KEY = "c36faae7c3fcd146570ad9be85c3b8b61ad6ee7937083dbdb6ba1f590b282bb3";
const RPC_URL='https://rpc.ankr.com/polygon_mumbai';
module.exports = {
defaultNetwork: "polygon_mumbai",
networks:{
hardhat:{
  chainId: 80001,
},
polygon_mumbai:{
  url: RPC_URL,
  accounts:[`0x${PRIVATE_KEY}`]
}
},
  solidity:{
    version: "0.8.17",
    settings:{
      optimizer:{
        enabled: true,
        runs: 200,
      },
    },
  },
};
