import { ethers, Contract, BigNumber } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
// import 'dotenv/config';
import { v4 as uuidv4 } from "uuid";
import abi from "../utils/nftAbi.json";

import axios from "axios";
import swal from "sweetalert";
import {
  mintABITestnet,
  mintAddressTestnet,
  mintABITestnet2,
  mintAddressTestnet2,
  mintABITestnet3,
  mintAddressTestnet3,
  S39tokenAddressTestnet,
  S39tokenABITestnet,
  BUSDtokenAddressTestnet,
  BUSDtokenABITestnet,
  RPC,
  chainId,
} from "../utils/constant";

// import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export const BlockchainContext = createContext();

const { ethereum } = window;

const getMintContractTestnet = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const MintNFTContract = new ethers.Contract(
    mintAddressTestnet,
    mintABITestnet,
    signer
  );

  console.log("MintNFTContract", MintNFTContract);

  return MintNFTContract;
};

const getMintContractTestnet2 = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const MintNFTContract = new ethers.Contract(
    mintAddressTestnet2,
    mintABITestnet2,
    signer
  );

  console.log("MintNFTContract", MintNFTContract);

  return MintNFTContract;
};

const getMintContractTestnet3 = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const MintNFTContract = new ethers.Contract(
    mintAddressTestnet3,
    mintABITestnet3,
    signer
  );

  console.log("MintNFTContract", MintNFTContract);

  return MintNFTContract;
};

const getBUSDtokenContractTestnet = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(
    BUSDtokenAddressTestnet,
    BUSDtokenABITestnet,
    signer
  );

  return tokenContract;
};

const getS39tokenContractTestnet = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(
    S39tokenAddressTestnet,
    S39tokenABITestnet,
    signer
  );

  return tokenContract;
};

const getAllItemBlockchain = async () => {
  const provider = new ethers.providers.JsonRpcProvider(RPC);
  return {
    provider,
    // deployer: new ethers.Wallet(private_key, provider),
    NFTContract: new Contract(mintAddressTestnet, abi, provider),
  };
};

const genSignature = async (types, voucher, auth) => {
  const domain = {
    name: "NFT-Voucher",
    version: "1",
    verifyingContract: auth.contract,
    chainId: chainId,
  };
  const BuyNFTVoucher = {
    id: voucher.id,
    price: voucher.price,
    tokenAddress: voucher.tokenAddress,
    nonce: voucher.nonce,
  };

  // const signature = await auth.signer._signTypedData(domain, types, BuyNFTVoucher);

  return {
    ...voucher,
    // signature,
  };
};

const signBuyFunction = async (
  id,
  price,
  tokenAddress,
  refAddress,
  refAddress2,
  refAddress3,
  refAddress4,
  refAmount,
  refAmount2,
  refAmount3,
  refAmount4,
  uri
) => {
  const contracts = await getAllItemBlockchain();
  const auth = {
    signer: contracts.deployer,
    contract: contracts.NFTContract.address,
  };

  const types = {
    BuyCOURSEStruct: [
      { name: "id", type: "string" },
      { name: "price", type: "uint256" },
      { name: "tokenAddress", type: "address" },
      { name: "nonce", type: "string" },
    ],
  };
  console.log(
    "111111111111111: ",
    id,
    price,
    tokenAddress,
    refAddress,
    refAddress2,
    refAddress3,
    uri
  );

  // Generate nonce as transaction id
  const nonce = uuidv4();
  const voucher = {
    id: id,
    price: BigNumber.from(price).toString(),
    tokenAddress: tokenAddress,

    refAddress: refAddress
      ? refAddress
      : "0x0000000000000000000000000000000000000000",
    refAddress2: refAddress2
      ? refAddress2
      : "0x0000000000000000000000000000000000000000",
    refAddress3: refAddress3
      ? refAddress3
      : "0x0000000000000000000000000000000000000000",

    refAddress4: refAddress4
      ? refAddress4
      : "0x0000000000000000000000000000000000000000",

    refAmount: BigNumber.from(refAmount).toString(),
    refAmount2: BigNumber.from(refAmount2).toString(),
    refAmount3: BigNumber.from(refAmount3).toString(),

    refAmount4: BigNumber.from(refAmount4).toString(),

    nonce: nonce,
    uri: uri,
  };
  return {
    ...(await genSignature(types, voucher, auth)),
    price: price.toString(),
  };
};

export default function BlockchainProvider({ children }) {
  const [loginModal, setLoginModal] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [refetchForSidebar, setRefetchForSidebar] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [chain, setChain] = useState(null);
  const [walletModal, setWalletModal] = useState(false);
  const [metamaskBalance, setMetamaskBalance] = useState({});
  const [metamaskBalanceLoading, setMetamaskBalanceLoading] = useState(false);
  const [coinbaseModal, setCoinbaseModal] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [refetchUser, setRefetchUser] = useState(false);
  const [refetchUserName, setRefetchUserName] = useState(false);
  const [refetchUserEmail, setRefetchUserEmail] = useState(false);
  const [pathName, setPathName] = useState();
  // const { data } = useContext(UserContext);
  const [refetchAfterRegister, setRefetchAfterRegister] = useState(1);
  const [isClickedFromSidebar, setClickedFromSidebar] = useState();

  console.log("isClickedFromSidebar", isClickedFromSidebar);

  const openWalletModal = () => {
    (!user?.walletAddress || user?.walletAddress === "undefined") &&
      setWalletModal(true);
    console.log("data click");
    getBalanceTestnet();
    console.log(user?.walletAddress);
  };
  const closeWalletModal = () => setWalletModal(false);

  const openCoinbaseModal = () => {
    setCoinbaseModal(true);
  };
  const closeCoinbaseModal = () => setCoinbaseModal(false);

  const openLoginModal = () => setLoginModal(true);
  const closeLoginModal = () => setLoginModal(false);

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  const getBalanceTestnet = async () => {
    const BUSDtokenContract = getBUSDtokenContractTestnet();
    const S39tokenContract = getS39tokenContractTestnet();
    const BUSDbalance = await BUSDtokenContract.balanceOf(currentAccount);
    const BUSDamount = ethers.utils.formatEther(BUSDbalance);
    const S39balance = await S39tokenContract.balanceOf(currentAccount);
    const S39amount = ethers.utils.formatEther(S39balance);
    const provider = new ethers.providers.Web3Provider(ethereum);
    const balance1 = await provider.getBalance(currentAccount);
    console.log("usdt: " + BUSDamount);
    console.log("s39: " + S39amount);
    console.log("BNB Testnet: " + ethers.utils.formatEther(balance1));
    const wallet = {
      busd: BUSDamount,
      bnb: ethers.utils.formatEther(balance1),
      s39: S39amount,
    };
    return setMetamaskBalance(wallet);
  };
  useEffect(() => {
    getBalanceTestnet();
  }, []);

  // console.log(metamaskBalance);

  // const getBalanceMainnet = async () => {
  //     const USDSCtokenContract = getUSDSCtokenContractMainnet();
  //     const DSLtokenContract = getDSLtokenContractMainnet();
  //     const USDSCbalance = await USDSCtokenContract.balanceOf(currentAccount);
  //     const USDSCamount = ethers.utils.formatEther(USDSCbalance);
  //     const DSLbalance = await DSLtokenContract.balanceOf(currentAccount);
  //     const DSLamount = ethers.utils.formatEther(DSLbalance);
  //     const provider = new ethers.providers.Web3Provider(ethereum);
  //     const balance1 = await provider.getBalance(currentAccount);
  //     console.log("usdsc: " + USDSCamount);
  //     console.log("dsl: " + DSLamount);
  //     console.log("BNB Testnet: " + ethers.utils.formatEther(balance1));
  //     const metamask = {
  //         usdsc: USDSCamount,
  //         bnb: ethers.utils.formatEther(balance1),
  //         dsl: DSLamount,
  //     };
  //     return setMetamaskBalance(metamask);
  // };

  const payTestnetBUSD = async (data) => {
    try {
      if (ethereum) {
        getBalanceTestnet();
        const MintNFTContract = getMintContractTestnet();
        const BUSDTokenContract = getBUSDtokenContractTestnet();
        console.log(BUSDTokenContract);
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log(
          "BUSD",
          MintNFTContract.address,
          BigNumber.from(ethers.constants.MaxUint256)
        );
        const payment = await BUSDTokenContract.approve(
          MintNFTContract.address,
          BigNumber.from(ethers.constants.MaxUint256)
        );
        let payment_test = await provider.getTransaction(payment.hash);
        while (payment_test.blockNumber === null) {
          console.log("Approve In Progress...");
          payment_test = await provider.getTransaction(payment.hash);
        }
        console.log(payment_test.blockNumber);
        let payment_hash = "https://testnet.bscscan.com/tx/" + payment.hash;
        console.log("Payment link: " + payment_hash);
        // const recipient = currentAccount;
        // // const Val = await MintNFTContract.mint(uriNft, recipient);
        const object = {
          id: data.id,
          price: data.price,
          tokenAddress: data.tokenAddress,
          refAddress: data.refAddress,
          refAddress2: data.refAddress2,
          refAddress3: data.refAddress3,
          refAddress4: data.refAddress4,
          refAmount: data.refAmount,
          refAmount2: data.refAmount2,
          refAmount3: data.refAmount3,
          refAmount4: data.refAmount4,
          nonce: data.nonce,
          uri: data.uri,
          signature: data.signature,
        };
        console.log("valueeee", object);

        const Val = await MintNFTContract.buyCOURSE(object);
        await Val.wait();
        let txn_test = await provider.getTransaction(Val.hash);
        if (txn_test) {
          const wrapper = document.createElement("div");
          wrapper.innerHTML = `<p></p><div class="loaders"></div> <p class="wait"><b>BUSD Transaction Pending...<b></p> `;
          swal({
            content: wrapper,
            button: false,
            className: "modal_class_success",
          });

          //     Swal.fire(
          //         {
          //             html: wrapper,
          //             icon: "success",
          //             customClass: "modal_class_success",
          //         }
          // )

          while (txn_test.blockNumber === null) {
            console.log("Minting...");
            txn_test = await provider.getTransaction(Val.hash);
          }
          console.log("txn_test.blockNumber: " + txn_test.blockNumber);
        }
        // const ID = await MintNFTContract.totalSupply();
        // console.log(ID.toString());
        let mint_hash = "https://testnet.bscscan.com/tx/" + Val.hash;
        console.log("Mint link: " + mint_hash);

        return {
          mint_hash: mint_hash,
          // ID: ID.toString(),
          mintPrice: data.price,
          address: BUSDtokenAddressTestnet,
        };
      }
    } catch (error) {
      console.log(error);
      console.log("No ethereum object");
      //setRequestLoading(false);
      if (error.code === -32603) {
        // swal({
        //     title: "Attention",
        //     text: "Insufficient funds for minting!",
        //     icon: "warning",
        //     button: "OK",
        //     // dangerMode: true,
        //     className: "modal_class_success",
        // });

        const wrapper = document.createElement("div");
        wrapper.innerHTML = `<p class='text-break text-white fs-5'>Insufficient funds for minting!</p>`;

        Swal.fire({
          html: wrapper,
          icon: "warning",
          customClass: "modal_class_success",
        });
      } else {
        // swal({
        //     title: "Attention",
        //     text: "Minting Failed",
        //     icon: "warning",
        //     button: "OK",
        //     // dangerMode: true,
        //     className: "modal_class_success",
        // });

        const wrapper = document.createElement("div");
        wrapper.innerHTML = `<p class='text-break text-white fs-5'>Minting Failed</p>`;

        Swal.fire({
          html: wrapper,
          icon: "warning",
          customClass: "modal_class_success",
        });
      }
      throw new Error("No ethereum object");
    }
  };

  const payTestnetS39 = async (data) => {
    try {
      if (ethereum) {
        const MintNFTContract = getMintContractTestnet2();
        const S39TokenContract = getS39tokenContractTestnet();
        console.log(S39TokenContract);
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log(
          "BUSD",
          MintNFTContract.address,
          BigNumber.from(ethers.constants.MaxUint256)
        );
        const payment = await S39TokenContract.approve(
          MintNFTContract.address,
          BigNumber.from(ethers.constants.MaxUint256)
        );
        let payment_test = await provider.getTransaction(payment.hash);
        while (payment_test.blockNumber === null) {
          console.log("Approve In Progress...");
          payment_test = await provider.getTransaction(payment.hash);
        }
        console.log(payment_test.blockNumber);
        let payment_hash = "https://testnet.bscscan.com/tx/" + payment.hash;
        console.log("Payment link: " + payment_hash);
        // const recipient = currentAccount;
        // // const Val = await MintNFTContract.mint(uriNft, recipient);
        const object = {
          id: data.id,
          price: data.price,
          tokenAddress: data.tokenAddress,
          nonce: data.nonce,
          uri: data.uri,
          signature: data.signature,
        };
        console.log("valueeee", object);

        const Val = await MintNFTContract.buyCOURSE(object);
        await Val.wait();
        let txn_test = await provider.getTransaction(Val.hash);
        if (txn_test) {
          const wrapper = document.createElement("div");
          wrapper.innerHTML = `<p></p><div class="loaders"></div> <p class="wait"><b> Transaction Pending...<b></p> `;
          swal({
            content: wrapper,
            button: false,
            className: "modal_class_success",
          });

          //     Swal.fire(
          //         {
          //             html: wrapper,
          //             customClass: "modal_class_success",
          //         }
          // )

          while (txn_test.blockNumber === null) {
            console.log("Minting...");
            txn_test = await provider.getTransaction(Val.hash);
          }
          console.log("txn_test.blockNumber: " + txn_test.blockNumber);
        }
        // const ID = await MintNFTContract.totalSupply();
        // console.log(ID.toString());
        let mint_hash = "https://testnet.bscscan.com/tx/" + Val.hash;
        console.log("Mint link: " + mint_hash);

        return {
          mint_hash: mint_hash,
          // ID: "10000" + ID.toString(),
          mintPrice: data.price,
          address: S39tokenAddressTestnet,
        };
      }
    } catch (error) {
      console.log(error);
      console.log("No ethereum object");
      //setRequestLoading(false);
      if (error.code === -32603) {
        // swal({
        //     title: "Attention",
        //     text: "Insufficient funds for minting!",
        //     icon: "warning",
        //     button: "OK",
        //     // dangerMode: true,
        //     className: "modal_class_success",
        // });

        const wrapper = document.createElement("div");
        wrapper.innerHTML = `<p class='text-break text-white fs-5'>Insufficient funds for minting!</p>`;

        Swal.fire({
          html: wrapper,
          icon: "warning",
          customClass: "modal_class_success",
        });
      } else {
        // swal({
        //     title: "Attention",
        //     text: "Minting Failed",
        //     icon: "warning",
        //     button: "OK",
        //     // dangerMode: true,
        //     className: "modal_class_success",
        // });

        const wrapper = document.createElement("div");
        wrapper.innerHTML = `<p class='text-break text-white fs-5'>Minting Failed</p>`;

        Swal.fire({
          html: wrapper,
          icon: "warning",
          customClass: "modal_class_success",
        });
      }
      throw new Error("No ethereum object");
    }
  };

  const mintNFTTestnetBNB = async (data) => {
    try {
      if (ethereum) {
        const chainid = await window.ethereum.request({
          method: "eth_chainId",
        });
        console.log("This is Chain ID: ", chainid);
        if (chainid === "0x38" || chainid === "0x61") {
          const MintNFTContract = getMintContractTestnet3();
          console.log(MintNFTContract);
          const provider = new ethers.providers.Web3Provider(ethereum);

          // const parsedAmount = ethers.utils.parseEther(mintPrice);
          const admin = "0x626D20125da6a371aA48023bF9dad94BD66588F7";
          // const payment = await MintNFTContract.charge(admin, {
          //   value: parsedAmount._hex,
          // });
          // let payment_test = await provider.getTransaction(payment.hash);
          // while (payment_test.blockNumber === null) {
          //   console.log("Payment In Progress...");
          //   payment_test = await provider.getTransaction(payment.hash);
          // }
          // console.log(payment_test.blockNumber);
          // let payment_hash = "https://testnet.bscscan.com/tx/" + payment.hash;
          // console.log("Payment link: " + payment_hash);
          // const recipient = currentAccount;
          // console.log(currentAccount);
          // const Val = await MintNFTContract.mint(uriNft, recipient);
          const object = {
            id: data.id,
            price: data.price,
            tokenAddress: data.tokenAddress,
            refAddress: data.refAddress,
            nonce: data.nonce,
            uri: data.uri,
            signature: data.signature,
          };
          console.log("valueeee", object);

          const Val = await MintNFTContract.buyCOURSE(object, {
            value: BigNumber.from(object.price),
          });
          await Val.wait();
          let txn_test = await provider.getTransaction(Val.hash);
          while (txn_test.blockNumber === null) {
            console.log("Minting...");
            txn_test = await provider.getTransaction(Val.hash);
          }
          console.log("txn_test.blockNumber: " + txn_test.blockNumber);
          let mint_hash = "https://testnet.bscscan.com/tx/" + Val.hash;
          console.log("Mint link: " + mint_hash);
          const ID = await MintNFTContract.totalSupply();
          console.log("Token ID: ", ID.toString());
          console.log("this is Token ID: 10000" + ID.toString());
          console.log("this is Contract Address: : " + abi);

          let details = { mint: mint_hash, Id: ID };
          console.log(details);

          if (ID.toString() < 10) {
            return {
              mint_hash: mint_hash,
              ID: "100000" + ID.toString(),
              mintPrice: data.price,
            };
          } else {
            return {
              mint_hash: mint_hash,
              ID: "10000" + ID.toString(),
              mintPrice: data.price,
            };
          }
        } else {
          console.log("No ethereum object");
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const payNFTTestnetBUSD = async (data) => {
    try {
      if (ethereum) {
        const MintNFTContract = getMintContractTestnet3();
        const BUSDTokenContract = getBUSDtokenContractTestnet();
        console.log(BUSDTokenContract);
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log(
          "USDC",
          MintNFTContract.address,
          BigNumber.from(ethers.constants.MaxUint256)
        );
        const payment = await BUSDTokenContract.approve(
          MintNFTContract.address,
          BigNumber.from(ethers.constants.MaxUint256)
        );
        let payment_test = await provider.getTransaction(payment.hash);
        while (payment_test.blockNumber === null) {
          console.log("Approve In Progress...");
          payment_test = await provider.getTransaction(payment.hash);
        }
        console.log(payment_test.blockNumber);
        let payment_hash = "https://testnet.bscscan.com/tx/" + payment.hash;
        console.log("Payment link: " + payment_hash);
        // const recipient = currentAccount;
        // // const Val = await MintNFTContract.mint(uriNft, recipient);
        const object = {
          id: data.id,
          price: data.price,
          tokenAddress: data.tokenAddress,
          refAddress: data.refAddress,
          nonce: data.nonce,
          uri: data.uri,
          signature: data.signature,
        };
        console.log("valueeee", object);

        const Val = await MintNFTContract.buyCOURSE(object);
        await Val.wait();
        let txn_test = await provider.getTransaction(Val.hash);
        if (txn_test) {
          const wrapper = document.createElement("div");
          wrapper.innerHTML = `<p></p><div class="loaders"></div> <p class="wait"><b>Transaction Pending...<b></p> `;
          swal({
            content: wrapper,
            button: false,
            className: "modal_class_success",
          });
          while (txn_test.blockNumber === null) {
            console.log("Minting...");
            txn_test = await provider.getTransaction(Val.hash);
          }
          console.log("txn_test.blockNumber: " + txn_test.blockNumber);
        }
        const ID = await MintNFTContract.totalSupply();
        console.log(ID.toString());
        let mint_hash = "https://testnet.bscscan.com/tx/" + Val.hash;
        console.log("Mint link: " + mint_hash);

        if (ID.toString() < 10) {
          return {
            mint_hash: mint_hash,
            ID: "100000" + ID.toString(),
            mintPrice: data.price,
          };
        } else {
          return {
            mint_hash: mint_hash,
            ID: "10000" + ID.toString(),
            mintPrice: data.price,
          };
        }
      }
    } catch (error) {
      console.log(error);
      console.log("No ethereum object");
      //setRequestLoading(false);
      if (error.code === -32603) {
        swal({
          title: "Attention",
          text: "Insufficient funds for minting!",
          icon: "warning",
          button: "OK",
          // dangerMode: true,
          className: "modal_class_success",
        });
      } else {
        swal({
          title: "Attention",
          text: "Minting Failed",
          icon: "warning",
          button: "OK",
          // dangerMode: true,
          className: "modal_class_success",
        });
      }
      throw new Error("No ethereum object");
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) {
        return console.log("please use metamask");
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        const chainid = await window.ethereum.request({
          method: "eth_chainId",
        });
        setChain(chainid);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const connectToMetamask = async () => {
    getBalanceTestnet();
    // console.log(email)
    if (typeof window.ethereum === "undefined") {
      // alert("Please open this website with METAMASK");
      // return swal({
      //     title: "Attention",
      //     text: "Please open this website with METAMASK",
      //     icon: "warning",
      //     button: "OK",
      //     dangerMode: true,
      //     className: "modal_class",
      // });
      closeWalletModal();

      const wrapper = document.createElement("div");
      wrapper.innerHTML = `<p class='text-break text-white fs-5'>Please open this website with METAMASK.</p>`;

      Swal.fire({
        html: wrapper,
        icon: "warning",
        customClass: "modal_class_success",
      });
    }
    let provider = null;
    if (typeof window.ethereum !== "undefined") {
      let provider = window.ethereum;
      // edge case if MM and CBW are both installed
      if (window.ethereum.providers?.length) {
        window.ethereum.providers.forEach(async (p) => {
          if (p.isMetaMask) provider = p;
        });
      }
      try {
        const chainid = await provider.request({
          method: "eth_chainId",
        });
        console.log("This is Chain ID: ", chainid);
        setChain(chainid);
        if (chainid === "0x61") {
          const accounts = await provider.request({
            method: "eth_requestAccounts",
          });
          console.log(accounts[0]);
          setCurrentAccount(accounts[0]);

          await axios
            .post(`https://backendtestnetcert.blockchaincert.sg/api/wallet`, {
              walletAddress: accounts[0],
              // email: email,
            })
            .then((res) => {
              if (res.data.user) {
                setUser(res.data.user);
                getBalanceTestnet();

                setLoading(false);
                if (isClickedFromSidebar != "clicked-from-sidebar") {
                  setRefetch(true);
                }
                if (isClickedFromSidebar == "clicked-from-sidebar") {
                  setRefetchForSidebar(true);
                }

                closeWalletModal();
                localStorage.setItem("tokenwalletCert", res.data.token);
                console.log("tokenwalletCert" + res.data.token);

                const wrapper = document.createElement("div");
                // alert("login success");
                setTimeout(() => {
                  setRefetchForSidebar(false);
                  setRefetch(false);
                  setClickedFromSidebar("");
                }, 2000);
                console.log("called how many");
                wrapper.innerHTML = `<p class='text-break text-white fs-5'>You have successfully <br/> logged in with <br/>Binance Chain (Testnet).</p>`;

                return Swal.fire({
                  // title: 'Successfully updated your Full Name.',
                  html: wrapper,
                  icon: "success",

                  customClass: "modal_class_success",
                });
              }
            });
        } else {
          closeWalletModal();

          console.log("Please Switch to Binance Chain (testnet)");
          // alert("Please Switch to Binance Chain")
          // swal({
          //     title: "Attention",
          //     text: "Please change to Binance Chain (Testnet) before connecting.",
          //     icon: "warning",
          //     button: "OK",
          //     dangerMode: true,
          //     className: "modal_class",
          // });

          const wrapper = document.createElement("div");
          wrapper.innerHTML = `<p class='text-break text-white fs-5'>Please change to <br/> Binance Chain (Testnet) <br /> before connecting.</p>`;

          Swal.fire({
            html: wrapper,
            icon: "warning",
            customClass: "modal_class_success",
          });
        }
      } catch (error) {
        throw new Error("User Rejected");
      }
    } else {
      throw new Error("No MetaMask Wallet found");
    }
    console.log("MetaMask provider", provider);
    return provider;
  };

  const logOut = async () => {
    setCurrentAccount(null);
    setUser({});
    localStorage.removeItem("localStorage");
    localStorage.removeItem("tokenwalletCert");
  };
  // console.log("dataa" + data.email);

  useEffect(() => {
    if (currentAccount && localStorage.getItem("tokenwalletCert")) {
      setLoading(true);
      axios
        .get(`https://backendtestnetcert.blockchaincert.sg/api/wallet`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("tokenwalletCert")}`,
          },
        })
        .then((res) => {
          console.log("from context", res);
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [currentAccount, refetchUser, refetchUserEmail, refetchUserName]);

  useEffect(() => {
    if (requestLoading) {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = `<p></p><div class="loaders"></div> <p class="wait"><b>Please wait, don't exit screen!<b></p> `;
      swal({
        content: wrapper,
        button: false,
        className: "modal_class_success",
      });
      //     Swal.fire(
      //         {
      //             html: wrapper,
      //             showConfirmButton: false,
      //             customClass: "modal_class_success",
      //         }
      // )
    }
  }, [requestLoading]);

  return (
    <BlockchainContext.Provider
      value={{
        loginModal,
        openLoginModal,
        requestLoading,
        closeLoginModal,
        currentAccount,
        loading,
        user,
        walletModal,
        openWalletModal,
        closeWalletModal,
        setUser,
        chain,
        setRefetch,
        refetch,
        setRequestLoading,
        logOut,
        metamaskBalance,
        metamaskBalanceLoading,
        setMetamaskBalanceLoading,
        connectToMetamask,
        mintAddressTestnet,
        signBuyFunction,
        setSearchResults,
        searchResults,
        payTestnetBUSD,
        payTestnetS39,
        mintNFTTestnetBNB,
        getBalanceTestnet,
        setRefetchUser,
        setRefetchUserEmail,
        setRefetchUserName,
        refetchAfterRegister,
        payNFTTestnetBUSD,
        setRefetchAfterRegister,
        pathName,
        setPathName,
        refetchForSidebar,
        setRefetchForSidebar,
        setClickedFromSidebar,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
}
