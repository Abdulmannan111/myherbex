import React, { useContext, useEffect, useState } from "react";
import HerBXnftLogo from "../../Images/HerBXlogo.png";
import HerBXnftLogoOffcanvas from "../../Images/my-herbx-logo.png";
// import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MyherbxContext } from "../../contexts/MyherbxContext";
import swal from "sweetalert";
import LoginButton from "../../components/LoginButton/LoginButton";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CloseIcon from "@mui/icons-material/Close";
import Offcanvas from "react-bootstrap/Offcanvas";
import { CgProfile } from "react-icons/cg";
import { AiFillInfoCircle, AiTwotoneShop } from "react-icons/ai";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

function Header() {
  const {
    connectToMetamask,
    openWalletModal,
    closeopenWalletModal,
    goToProfile,
    setGoToProfile,
    logOut,
    user,
  } = useContext(MyherbxContext);

  const location = useLocation();
  const pathname = location.pathname;

  const [checkDevice, setCheckDevice] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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

  const loginPopup = document.getElementById("loginModal");
  loginPopup?.addEventListener("click", () => {
    swal.close();
    // openWalletModal();
    if (window.innerWidth < 1000 && typeof window.ethereum === "undefined") {
      console.log("mobile");
      setCheckDevice(() => "mobileWithoutApp");

      window.open(
        "https://metamask.app.link/dapp/http://testnetnfts.myherbx.com/",
        "_blank"
      );
    } else if (
      window.innerWidth < 1000 &&
      typeof window.ethereum !== "undefined"
    ) {
      setCheckDevice(() => "mobileWithApp");
      openWalletModal();
    } else if (
      window.innerWidth > 1000 &&
      typeof window.ethereum !== "undefined"
    ) {
      console.log("pc");
      setCheckDevice(() => "pcWithExtention");
      openWalletModal();
    } else if (
      window.innerWidth > 1000 &&
      typeof window.ethereum === "undefined"
    ) {
      setCheckDevice(() => "pcWithoutExtention");
      window.open(
        "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
        "_blank"
      );
    }
  });

  const loginAlert = () => {
    const data = document.createElement("div");
    data.innerHTML = `<button class="text-uppercase button-metamask openPadding" role="button"  id="loginModal" style="font-size: 12px;">
    ${
      (checkDevice === "mobileWithoutApp" && "CONNECT TO WALLET") ||
      (checkDevice === "mobileWithApp" && "CONNECT TO WALLET") ||
      (checkDevice === "pcWithExtention" && "CONNECT TO WALLET") ||
      (checkDevice === "mobileWithApp" && "CONNECT TO WALLET") ||
      (checkDevice === "pcWithoutExtention" && "CONNECT TO WALLET")
    }</button>`;
    // data.innerHTML = `<button class="button-Payment-Menu text-uppercase" role="button"  id="loginModal">
    //  <img class='me-2' width='20px' src="https://i.ibb.co/CBj8VVQ/af0137fd-42ad-4ca5-9e6c-3e8595fa77e2.jpg" alt="" />
    // ${(checkDevice === "mobileWithoutApp" && "Open in metamask") ||
    //   (checkDevice === "mobileWithApp" && "CONNECT TO METAMASK") ||
    //   (checkDevice === "pcWithExtention" && "CONNECT TO METAMASK") ||
    //   (checkDevice === "mobileWithApp" && "CONNECT TO METAMASK") ||
    //   (checkDevice === "pcWithoutExtention" && "INSTALL METAMASK")
    //   }</button>`;

    swal({
      content: data,
      icon: "warning",
      button: "CLOSE",
      className: "modal_class_success",
    });
  };

  const LogOut = () => {
    logOut();
    swal({
      // title: "S",
      text: "You are successfully logged out.",
      icon: "success",
      button: "OK!",
      className: "modal_class_success",
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Navbar expand={false} className="mainNavbar">
      <Container fluid>
        <Navbar.Brand href="#home">
          <Link to="/">
            <img className="navLogo" src={HerBXnftLogo} alt="HerBXnft" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setOpen(true)}
          aria-controls={`offcanvasNavbar-expand`}
        />
        <Navbar.Offcanvas
          show={open}
          onClose={handleClose}
          style={{ backgroundColor: "#E6F7E7" }}
          id={`offcanvasNavbar-expand`}
          aria-labelledby={`offcanvasNavbarLabel-expand`}
          placement="end"
          className="smWidth"
        >
          <Offcanvas.Header>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
              <Link to="/">
                <img
                  onClick={() => setOpen(false)}
                  className="navLogo"
                  src={HerBXnftLogo}
                  alt="HerBXnft"
                />
              </Link>
            </Offcanvas.Title>
            <CloseIcon
              onClick={handleClose}
              style={{ fontSize: "30px" }}
              className="drawerCloseIcon"
            />
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Link
                onClickCapture={() => setOpen(false)}
                to={`${
                  !user.walletAddress ||
                  user.walletAddress === "undefined" ||
                  user.walletAddress === undefined
                    ? ""
                    : "/profile"
                }`}
                onClick={() => {
                  (!user.walletAddress ||
                    user.walletAddress === "undefined" ||
                    user.walletAddress === undefined) &&
                    loginAlert();
                }}
                className="text-dark fs-5 fw-semibold"
              >
                <Nav.Link
                  href="#profile"
                  className={pathname === "/profile" ? "pageMenu" : ""}
                >
                  <CgProfile className="mb-1 me-3" /> Profile
                </Nav.Link>
              </Link>

              <Link
                onClickCapture={() => setOpen(false)}
                to={`${
                  !user.walletAddress ||
                  user.walletAddress === "undefined" ||
                  user.walletAddress === undefined
                    ? ""
                    : "/minted"
                }`}
                onClick={() => {
                  (!user.walletAddress ||
                    user.walletAddress === "undefined" ||
                    user.walletAddress === undefined) &&
                    loginAlert();
                }}
                className="text-dark fs-5 fw-semibold"
              >
                <Nav.Link
                  href="#minted"
                  className={pathname === "/minted" ? "pageMenu" : ""}
                >
                  <AiFillInfoCircle className="mb-1 me-3" /> Minted
                </Nav.Link>
              </Link>

              <Link
                onClickCapture={() => setOpen(false)}
                to="/availability"
                className="text-dark fs-5 fw-semibold"
              >
                <Nav.Link
                  href="#minted"
                  className={pathname === "/availability" ? "pageMenu" : ""}
                >
                  <AiTwotoneShop className="mb-1 me-3" /> Availability
                </Nav.Link>
              </Link>
              <Nav.Link
                onClickCapture={() => setOpen(false)}
                href="#minted"
                className="text-dark fs-5 fw-semibold mt-2"
              >
                <LoginButton
                  fontSizing={10}
                  profileText={"Logout"}
                  LogOut={LogOut}
                ></LoginButton>
              </Nav.Link>
            </Nav>
            <div
              style={{ marginTop: "30px" }}
              className="offcanvas-logo-here text-start"
            >
              <img src={HerBXnftLogoOffcanvas} width={30} alt="" />
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>

    // <Navbar expand="lg" style={{ margin: '0px 25px' }}   >
    //   <Link to='/'>
    //     <Navbar.Brand href="#home">
    //       <img className='navLogo' src={HerBXnftLogo} alt="HerBXnft" />
    //     </Navbar.Brand>
    //   </Link>
    //   <Navbar.Collapse id="basic-navbar-nav" className="mr-0">
    //     <Nav >

    //     </Nav>
    //   </Navbar.Collapse>
    //   <Dropdown className='menuIcon '>
    //     <Dropdown.Toggle id="dropdown-basic" as={CustomToggle}>
    //       <AiOutlineMenu style={{ color: '#212529', marginRight: '0px' }} fontSize='28px' />
    //     </Dropdown.Toggle>
    //     <Dropdown.Menu className='MenuDropdown'>

    //       <Link to={`${(!user.walletAddress || user.walletAddress === "undefined" || user.walletAddress === undefined) ? "" : "/profile"}`} onClick={() => { (!user.walletAddress || user.walletAddress === "undefined" || user.walletAddress === undefined) && loginAlert() }}>
    //         <Dropdown.Item className='hoverBg' href="#Profile">Profile</Dropdown.Item>
    //       </Link>
    //       <Link to={`${(!user.walletAddress || user.walletAddress === "undefined" || user.walletAddress === undefined) ? "" : "/minted"}`} onClick={() => { (!user.walletAddress || user.walletAddress === "undefined" || user.walletAddress === undefined) && loginAlert() }}>
    //         <Dropdown.Item className='hoverBg' href="#Minted">Minted</Dropdown.Item>
    //       </Link>

    //       <Link to='/availability'>
    //         <Dropdown.Item className='hoverBg' href="#Availability">Availability</Dropdown.Item>
    //       </Link>
    //       <Dropdown.Item className='hoverBg' href="#Availability" >

    //         <LoginButton fontSizing={10} profileText={"Logout"} LogOut={LogOut}></LoginButton>
    //       </Dropdown.Item>
    //     </Dropdown.Menu>
    //   </Dropdown>
    // </Navbar>
  );
}

export default Header;
