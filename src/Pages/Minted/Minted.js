import React, { useContext, useEffect, useState } from "react";
import "./Minted.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { MyherbxContext } from "../../contexts/MyherbxContext";
import { Link, useNavigate } from "react-router-dom";
import LoginButton from "../../components/LoginButton/LoginButton";
import Button from "@mui/material/Button";
import axios from "axios";
import { Spin } from "antd";
const Minted = () => {
  const [pageYOffset, setPageYOffset] = useState(0);
  const navigate = useNavigate();
  const {
    openWalletModal,
    user,
    getBalanceTestnet,
    closeWalletModal,
    logOut,
    setUserRefetch,
    userRefetch,
  } = useContext(MyherbxContext);

  const [mintedNfts, setMintedNfts] = useState({
    nft: [],
    message: "",
  });
  const { nft, message } = mintedNfts;
  const [loading, setLoading] = useState(false);
  console.log(typeof nft, message, "MINTED NFTS HERE");

  const checkNfts = async () => {
    setLoading(true);
    await axios
      .get("https://testnetnftsbackend.myherbx.com/api/mint/mint-nft", {
        headers: {
          authorization: `Bearer fuTBncWdXFhWYOs3CrKZt86atzL3-CJdExpP4bIq7Olx4abs2zDM01DMMEgt33fbEe54`,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          const filtering = res?.data?.filter(
            (items) =>
              items.walletAddress == user?.walletAddress &&
              items.contractAddress !=
                "0x31219e8af07699054B690116675546939a0c362F"
          );
          setMintedNfts({
            nft: filtering,
            message: "NFT's found",
          });
          setLoading(false);
        } else {
          setMintedNfts({
            nft: [],
            message: "No NFT's found",
          });
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (
      !user.walletAddress ||
      user.walletAddress === "undefined" ||
      user.walletAddress === undefined
    ) {
      navigate(-1);
    }
  }, [user]);

  useEffect(() => {
    window.onscroll = () => setPageYOffset(window.pageYOffset);
  });

  return (
    <div className="container">
      <h3 className="text-center my-3 fs-2 text-uppercase">Minted NFTs</h3>
      <div className=" d-flex justify-content-center align-items-center my-3">
        <div className="text-center">
          <Button
            onClick={() => checkNfts()}
            id="demo-customized-button"
            // aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            // aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            className="text-uppercase button-metamask"
          >
            CHECK NFT
          </Button>
          <div className="py-3">
            <Link className="text-decoration-underline" to="/availability">
              Click here to buy NFTs
            </Link>
          </div>
          {!nft.length > 0 && (
            <p>You can check only NFTs in the wallet you are connecting to</p>
          )}
        </div>
      </div>

      <div className=" row d-md-flex justify-content-center myteryContainer">
        {loading ? (
          <Spin size="large" />
        ) : (
          <>
            {nft.length > 0 ? (
              nft?.map((item) => (
                <div
                  className="col-md-6 col-lg-4 mb-4 mb-lg-0 pb-3 px-3"
                  // onClick={() => navigate(`/availability/${item._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  {console.log(item, "EACH ITEM")}
                  <div className="mx-auto" style={{ width: "95%" }}>
                    <img
                      className="img-fluid"
                      src={item.image}
                      alt=""
                      style={{ border: "4px solid rgb(1, 73, 1)" }}
                    />
                    <div className="mb-3 mb-lg-0 mt-2">
                      <p className="nftDetailsText">Name: {item.name}</p>
                      <p className="nftDetailsText">Rarity: {item.category}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                <p className="text-danger">{message}</p>
              </div>
            )}
          </>
        )}
      </div>

      <div>
        {pageYOffset > 200 ? (
          <KeyboardArrowUpIcon
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="arrowIcon"
            style={{
              fontSize: `${window.screen.width > 500 ? "50px" : "35px"}`,
            }}
          />
        ) : (
          <KeyboardArrowDownIcon
            onClick={() => window.scrollTo(0, document.body.scrollHeight)}
            className="arrowIcon"
            style={{
              fontSize: `${window.screen.width > 500 ? "50px" : "35px"}`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Minted;
