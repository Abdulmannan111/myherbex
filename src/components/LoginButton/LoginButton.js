import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MyherbxContext } from "../../contexts/MyherbxContext";
import dsl from "../../Images/dsl.jpg";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WalletLogin from "../WalletLogin/WalletLogin";
import "./LoginButton.css";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const LoginButton = ({ fontSizing, profileText, LogOut }) => {
  const { pathname } = useLocation();
  const { user, openWalletModal } = useContext(MyherbxContext);
  const navigate = useNavigate();
  // console.log(user)

  // { walletAddress: '0x6f1aa3bb105886e67a96DeD4b6e32168C03Becb0' }
  const [checkDevice, setCheckDevice] = useState("");
  // const navigate = useNavigate();

  // Custom select
  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState("MINT NOW");
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (pathname.includes("minted")) {
      setName("CHECK NFT");
    }
  }, [pathname]);

  console.log(pathname);

  useEffect(() => {
    const detecting = async () => {
      if (window.innerWidth < 1000 && typeof window.ethereum === "undefined") {
        console.log("mobile");
        setCheckDevice(() => "mobileWithoutApp");
      } else if (
        window.innerWidth < 1000 &&
        typeof window.ethereum !== "undefined"
      ) {
        setCheckDevice(() => "mobileWithApp");
      } else if (
        window.innerWidth > 1000 &&
        typeof window.ethereum !== "undefined"
      ) {
        // console.log("pc");
        setCheckDevice(() => "pcWithExtention");
      } else if (
        window.innerWidth > 1000 &&
        typeof window.ethereum === "undefined"
      ) {
        setCheckDevice(() => "pcWithoutExtention");
      }
    };

    detecting();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    navigate("/availability");
  };
  const handleClose = (val) => {
    setName(val);
    setAnchorEl(null);
  };

  const closed = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {checkDevice === "mobileWithoutApp" && (
        <a
          href="https://metamask.app.link/dapp/http://testnetnfts.myherbx.com/"
          target={"_blank"}
          className="text-decoration-none"
        >
          <button
            className="text-uppercase button-metamask openPadding"
            style={{ fontSize: `${fontSizing}px` }}
          >
            {/* <img className='me-2' width='20px' src={dsl} alt="" />
            {" "} */}
            Connect to wallet
          </button>
        </a>
      )}
      {checkDevice === "mobileWithApp" && (
        <>
          {!user.walletAddress || user.walletAddress === "undefined" ? (
            <button
              className="text-uppercase button-metamask"
              style={{ padding: "10px 47px", fontSize: `${fontSizing}px` }}
              onClick={() => openWalletModal()}
            >
              {/* <img className="me-2" width="20px" src={dsl} alt="" /> */}
              Connect to wallet
            </button>
          ) : (
            <button
              className="text-uppercase button-metamask"
              style={{ padding: "10px 47px", fontSize: `${fontSizing}px` }}
              onClick={() => {
                profileText && LogOut();
                !profileText && navigate("/availability");
              }}
            >
              {/* <img className='me-2' width='20px' src={dsl} alt="" /> */}{" "}
              {profileText ? `${profileText}` : "Mint Now"}
            </button>
          )}
        </>
      )}
      {checkDevice === "pcWithExtention" && (
        <>
          {!user.walletAddress || user.walletAddress === "undefined" ? (
            <button
              className="text-uppercase button-metamask"
              style={{ padding: "10px 47px", fontSize: `${fontSizing}px` }}
              onClick={() => {
                openWalletModal();
                // navigate("/availability");
              }}
            >
              {/* <img className="me-2" width="20px" src={dsl} alt="" /> */}
              CONNECT TO WALLET
            </button>
          ) : (
            // <button
            //     className="text-uppercase button-metamask" style={{ padding: '10px 47px', fontSize: `${fontSizing}px` }}
            //     onClick={() => { profileText && LogOut() }}
            // >
            //     {" "}
            //     <select className="text-uppercase text-center" style={{border: "none", fontSize: `${fontSizing}px`, outline: "none"}}>
            //         <option value={profileText ? `${profileText}` : "Mint Now"} style={{backgroundColor: "transparent"}} selected>{profileText ? `${profileText}` : "Mint Now"}</option>
            //         <option value="option1">MYSTERY MINT: USD 200</option>
            //         <option value="option1">EPIG MINT: USD 150</option>
            //         <option value="option1">AYURV MINT: USD 100</option>
            //     </select>
            // </button>
            <div>
              {profileText ? (
                <button
                  className="text-uppercase button-metamask"
                  style={{ padding: "10px 47px", fontSize: `${fontSizing}px` }}
                  onClick={() => LogOut()}
                >
                  {/* <img className="me-2" width="20px" src={dsl} alt="" />{" "} */}
                  {profileText}
                </button>
              ) : (
                <Button
                  id="demo-customized-button"
                  aria-controls={open ? "demo-customized-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                  // endIcon={pathname === "/" && <KeyboardArrowDownIcon />}
                  className="text-uppercase button-metamask"
                >
                  {name}
                </Button>
              )}
              {pathname === "/" && (
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={closed}
                >
                  <MenuItem
                    onClick={() => handleClose("MYSTERY MINT: USD 200")}
                    disableRipple
                  >
                    MYSTERY MINT: USD 200
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleClose("EPIG MINT: USD 150")}
                    disableRipple
                  >
                    EPIG MINT: USD 150
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleClose("AYURV MINT: USD 100")}
                    disableRipple
                  >
                    AYURV MINT: USD 100
                  </MenuItem>
                </StyledMenu>
              )}
            </div>
          )}
        </>
      )}
      {checkDevice === "pcWithoutExtention" && (
        <a
          href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
          target={"_blank"}
          className="text-decoration-none"
        >
          <button
            className="text-uppercase button-metamask installPadding"
            style={{ fontSize: `${fontSizing}px` }}
          >
            {/* <img className="me-2" width="20px" src={dsl} alt="" /> */}
            Connect to wallet
          </button>
        </a>
      )}
    </div>
  );
};

export default LoginButton;
