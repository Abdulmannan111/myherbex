import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BigNumber, ethers } from "ethers";
import { Button } from "@mui/material";
import { MyherbxContext } from "../../contexts/MyherbxContext";
import LoginButton from "../../components/LoginButton/LoginButton";
import { BlockchainContext } from "../../contexts/BlockchainContext";
import swal from "sweetalert";
import html2canvas from "html2canvas";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const AvailableItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, openWalletModal } = useContext(MyherbxContext);
  const { setRequestLoading, mintNFTTestnetBNB, signBuyFunction } =
    useContext(BlockchainContext);

  const [img, setImg] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [nft, setNft] = useState({});
  const certificateTemplate = useRef();

  let newDate = new Date();
  let dd = String(newDate.getDate()).padStart(2, "0");
  let mm = String(newDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = newDate.getFullYear();

  newDate = dd + "/" + mm + "/" + yyyy;

  const exportAsImage = async (element, imageFileName) => {
    const canvas = await html2canvas(element, {
      allowTaint: true,
      useCORS: true,
    });
    const image = canvas.toDataURL("image/jpeg", 1.0);
    // download the image
    // console.log(image, "img")
    setImg(image);
  };

  useEffect(() => {
    exportAsImage(certificateTemplate.current, "heelo");
  }, []);

  useEffect(() => {
    const getSingleNft = async () => {
      await axios
        .get(`https://testnetnftsbackend.myherbx.com/api/myherbx-nfts/${id}`)
        .then((response) => {
          setNft(response?.data?.nft);
        });
    };
    getSingleNft();
  }, [refetch]);

  const handleUpdateAvailable = async () => {
    const udatedQuantity = parseInt(nft.available) - 1;
    await axios
      .put(`https://testnetnftsbackend.myherbx.com/api/myherbx-nfts/${id}`, {
        available: udatedQuantity,
      })
      .then((response) => {
        if (response.status === 200) {
          setRefetch(!refetch);
        }
      });
  };
  // getSingleNft()

  const mintNft = async () => {
    console.log(user?._id);
    console.log("clicked.......................");
    const generateId = Math.floor(Math.random() * 1000000000000);

    setRequestLoading(true);
    const dataUrl = img;
    const data = new FormData();
    data.append("image", nft?.image);
    data.append("id", generateId.toString());
    data.append("price", "0");
    data.append("tokenAddress", "0x0000000000000000000000000000000000000000");
    data.append("refAddress", "0x0000000000000000000000000000000000000000");
    data.append("nonce", uuidv4());
    data.append("name", nft?.name);
    data.append("walletAddress", user?.walletAddress);
    data.append("date", newDate);
    data.append("category", nft?.category);

    await axios
      .post(
        "https://testnetnftsbackend.myherbx.com/api/mint/uri-json-nft",
        data,
        {}
      )
      .then(async (res) => {
        let Obj = {};

        if (res.status === 200) {
          console.log("cliced.................33332222222222");
          const data1 = await signBuyFunction(
            generateId.toString(),
            ethers.utils.parseEther("0"),
            "0x0000000000000000000000000000000000000000",
            "0x0000000000000000000000000000000000000000",
            "0x0000000000000000000000000000000000000000",
            "0x0000000000000000000000000000000000000000",
            "0x4c17f3c856d1d059bdd597ad64d0f4375e52944d",
            "0",
            "0",
            "0",
            "0",
            res.data.uri
          );

          //   if (token === "bnb") {
          Obj = await mintNFTTestnetBNB(data1);
          //   }

          data.append("tokenId", Obj.ID);
          data.append("minthast", Obj.mint_hash);
          data.append(
            "contactAdd",
            "0x2995E3bd041E4C737537f033ca608713414E0e3e"
          );

          console.log("testing", ...data);

          await axios
            .post(
              "https://testnetnftsbackend.myherbx.com/api/mint/save-nft",
              data,
              {}
            )
            .then((res) => {
              if (res.status === 200) {
                setRequestLoading(false);
                const wrapper = document.createElement("div");
                wrapper.innerHTML = `
                        <a href=${Obj.mint_hash} target="_any" className="link_hash">${Obj.mint_hash}</a>
                        <br/>
                        <p>Use the following information to import the NFT to your wallet</p>
                        <p className="address">Contract Address: <br/><span style="color: yellow;">0x2995E3bd041E4C737537f033ca608713414E0e3e</span></p>
                        <p className="address">Token ID: <br/><span style="color: yellow;">${Obj.ID}</span></p>
                        `;
                swal({
                  title: "Minted",
                  content: wrapper,
                  icon: "success",
                  button: true,
                  className: "modal_class_success",
                });
                handleUpdateAvailable();
                navigate("/minted");
                setRefetch(!refetch);
                //   .then((willDelete) => {
                //     if (willDelete) {
                //       navigate(`/mintednft/${Obj.ID}/${mintAddressTestnet2}`)
                //     } else {
                //       console.log("good job")
                //     }
                //   });
                // console.log(res.data, "res.data")
                // handleSubmit(Obj.ID, priceByToken, res.data.certificateImg)
                // // handleSubmit(Obj.ID, priceByToken, img)
              }
            })
            .catch((err) => {
              console.log(err);
              setRequestLoading(false);
              const wrapper = document.createElement("div");
              wrapper.innerHTML = `<a href="" target="_any" className="link_hash"></a> <br/> <p className="success"><b>You have successfully minted but error in while saving data.<b></p>`;
              swal({
                title: "Warning",
                content: wrapper,
                icon: "warning",
                button: "OK",
                className: "modal_class_success",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        setRequestLoading(false);
        if (err.code === 4001) {
          return swal({
            title: "Failed",
            text: "Minting Failed!",
            icon: "warning",
            button: "OK",
            dangerMode: true,
            className: "modal_class_success",
          });
        }
        const wrapper = document.createElement("div");
        wrapper.innerHTML = `<span style="font-style: normal;" class='text-break text-white fs-6 font-normal'>Something went wrong <br/>Check your balance and try again later.</span>`;
        return swal({
          title: "Attention",
          // text: "Something went wrong. Check your balance and try again later.",
          content: wrapper,
          icon: "warning",
          button: "OK",
          dangerMode: true,
          className: "modal_class_success",
        });
      });
  };

  return (
    <div className="container py-5" style={{}}>
      <div className="row gx-md-5 gx-lg-5 gx-0 gy-md-0 gy-lg-0 gy-3">
        <div className="col-md-6">
          <img
            className="img-fluid d-block mx-auto w-100"
            src={nft.image}
            alt=""
            style={{ border: "4px solid rgb(1, 73, 1)" }}
          />
        </div>
        <div className="col-md-6 text-lg-start text-md-start text-center">
          <p className="nftDetailsText py-2" style={{ color: "#6CB646" }}>
            Name:{" "}
          </p>
          <p className="" style={{ color: "" }}>
            {nft.name}
          </p>
          <p className="nftDetailsText py-2" style={{ color: "#6CB646" }}>
            Price:{" "}
          </p>
          <p className="" style={{ color: "" }}>
            USD {nft.price} (Estimated ARB needed: 0.0000 ARB)
          </p>
          <p className="nftDetailsText py-2" style={{ color: "#6CB646" }}>
            Total:{" "}
          </p>
          <p className="" style={{ color: "" }}>
            {nft.total}
          </p>
          <p className="nftDetailsText" style={{ color: "#6CB646" }}>
            Available:{" "}
          </p>
          <p className="" style={{ color: "" }}>
            {nft.available}
          </p>

          <div
            className="d-flex justify-content-md-start justify-content-lg-start justify-content-center rpv_center details-page"
            style={{ alignItems: "flex-end" }}
          >
            {!user?.walletAddress || user?.walletAddress === "undefined" ? (
              <LoginButton register={"pay"}></LoginButton>
            ) : (
              <>
                {/* {(token === "bnb" && gotFreeCode === false) &&
                      <button disabled={(availableNftOrigin ? availableNftOrigin : isDetails.availableNft) < 1} className="card_button button_dtl mt-3" onClick={() => mintCelebrityNft(bnbTwoDec, "0x0000000000000000000000000000000000000000", affiliateWalletAddress, mealnId)} href="#!">{(availableNftOrigin ? availableNftOrigin : isDetails.availableNft) < 1 ? "No Nft available" : `BUY THIS NFT FOR ${bnbTwoDec} BNB`}</button>}
                    {token === "usdsc" &&
                      <button disabled={(availableNftOrigin ? availableNftOrigin : isDetails.availableNft) < 1} className="card_button button_dtl mt-3" onClick={() => mintCelebrityNft(usdsc, USDSCtokenAddressMainnet, affiliateWalletAddress, mealnId)} href="#!">{(availableNftOrigin ? availableNftOrigin : isDetails.availableNft) < 1 ? "No Nft available" : `BUY THIS NFT FOR ${usdsc} USDSC`}</button>}
                    {token === "dsl" &&
                      <button disabled={(availableNftOrigin ? availableNftOrigin : isDetails.availableNft) < 1} className="card_button button_dtl mt-3" onClick={() => mintCelebrityNft(dslTwoDec, DSLtokenAddressMainnet, affiliateWalletAddress, mealnId)} href="#!">{(availableNftOrigin ? availableNftOrigin : isDetails.availableNft) < 1 ? "No Nft available" : `BUY THIS NFT FOR ${dslTwoDec} DSl`}</button>}
                    {gotFreeCode === true &&
                      <button disabled={(availableNftOrigin ? availableNftOrigin : isDetails.availableNft) < 1} className="card_button button_dtl mt-3" onClick={() => mintCelebrityNftFree(dslTwoDec, DSLtokenAddressMainnet, affiliateWalletAddress, mealnId)} href="#!">{(availableNftOrigin ? availableNftOrigin : isDetails.availableNft) < 1 ? "No Nft available" : `BUY THIS NFT FREE`}</button>} */}

                <Button
                  className="button_dtl"
                  variant="contained"
                  onClick={() => mintNft()}
                >
                  mint this nft
                </Button>
              </>
            )}
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableItem;
