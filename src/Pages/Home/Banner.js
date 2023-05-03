import React from "react";
import HerBXnftLogo from "../../Images/my-herbx-logo.png";
import BoyNft from "../../Images/BoyNFt.png";
import BoyNft2 from "../../Images/BoyNFt2.png";
import homeCutie from "../../Images/TOOTHPASTE-NFT.png";
import "./Banner.css";
import LoginButton from "../../components/LoginButton/LoginButton";
import Logo from "../../Images/HerBXlogo.png";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="pb-5">
        <p className="ContentDiv">
          {/* <img className="BannerLogo" src={HerBXnftLogo} alt="herbx logo" /> */}
          <img className="BannerLogo" src={Logo} alt="Herbx" />
          <p className="BannerTitle fw-bolder">MYHERBX NFT</p>
          {/* <img className="BoyImage" src={BoyNft2} alt="nft" /> <br /> */}
          <img className="BoyImage" src={homeCutie} alt="nft" /> <br />
          {/* <button className='button-metamask fw-normal'>MINT NOW</button> */}
            <LoginButton />
          {/* <div className='d-flex justify-content-center mt-md-3 mt-2'>
                        <button className='MintButton fw-normal text-uppercase' style={{display: 'block'}}>Buy From Opensea.io</button>
                    </div> */}
        </p>
      </div>
    </div>
  );
}

export default Banner;
