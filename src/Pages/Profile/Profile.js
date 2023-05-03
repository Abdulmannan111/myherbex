// import { Button } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import {
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    WhatsappIcon,
    WhatsappShareButton,
    FacebookShareButton,
    FacebookIcon,
    PinterestShareButton,
    PinterestIcon,
    TelegramShareButton,
    TelegramIcon,
} from "react-share";
import swal from 'sweetalert';
import Swal from 'sweetalert2';
// import { S39GlobalContext } from '../../contexts/S39GlobalContext';
import EmailVerificationModal from './EmailVerificationModal';
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "copy-to-clipboard";
import { Button } from 'react-bootstrap';
import { MyherbxContext } from '../../contexts/MyherbxContext';


const Profile = ({ expiryTimestamp }) => {
    const { openWalletModal, user, getBalanceTestnet, closeWalletModal, logOut, setUserRefetch, userRefetch } = useContext(MyherbxContext);
    // console.log(user);
    // const user = ''
    const locations = useLocation().state
    const [openEmail, setOpenEmail] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [CurrentFile, setCurrentFile] = useState("");
    const [fullName, setFullName] = useState("");
    const [emailOtpVerify, setEmailOtpVerify] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");


    // Copy Text 
    const [copyTextAffiliateCode, setCopyTextAffiliateCode] = useState("");
    const [copyTextAffiliateLink, setCopyTextAffiliateLink] = useState("");
    const [copyTextWalletAddress, setCopyTextWalletAddress] = useState("");
    const [tabIndex, setTabIndex] = useState(locations?.name || 0);

    useEffect(() => {
        window.scrollTo(0, 0);
        if ((!user.walletAddress || user.walletAddress === "undefined" || user.walletAddress === undefined)) {
            navigate(-1);
        }
    }, [user]);

    useEffect(() => {
        // getBalanceTestnet();
        setCopyTextWalletAddress(user?.walletAddress ? user?.walletAddress : "");
        setCopyTextAffiliateCode(user?.myReferralCode ? user?.myReferralCode : "");
        // setCopyTextAffiliateLink(
        //   window.location.origin || user?.myReferralCode
        //     ? window.location.origin + "/" + user?.myReferralCode
        //     : ""
        // );
        setCopyTextAffiliateLink(
            window.location.origin || user?.myReferralCode
                ? window.location.origin + "/" + user?.myReferralCode
                : ""
        );
        // if (!user?.email || !user.email === "undefined") {
        //     // swal({
        //     //     text: "Please update your email before proceeding further. You stand to win attractive prizes monthly.",
        //     //     icon: "warning",
        //     //     button: "OK",
        //     //     dangerMode: true,
        //     //     className: "modal_class_success swal-text swal-footer",
        //     // });

        //     const wrapper = document.createElement("div");
        //     wrapper.innerHTML = `<p class='text-break text-white fs-5'>Please update your email before proceeding further. You stand to win attractive prizes monthly.</p>`;

        //     Swal.fire(
        //         {
        //             html: wrapper,
        //             icon: "warning",
        //             customClass: "modal_class_success",
        //         }
        //     )
        // }
    }, [user]);


    // Re-send OTP functionality
    const {
        seconds,
        minutes,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

    const restarting = (sec) => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + sec);
        restart(time)

    }

    const Logout = () => {
        logOut();
        navigate("/");
        // setOpen(false);
        // closeWalletModal();
        swal({
            // title: "S",
            text: "You are successfully logged out.",
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
        });
    };



    const selectFile = (event) => {
        setCurrentFile(event.target.files[0]);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));

    };

    //image update
    const handleUpdateImage = async () => {
        const ImageFormData = new FormData();
        ImageFormData.append("image", CurrentFile);

        if (CurrentFile) {
            await axios.put("https://testnetback.s39global.com/api/v1/wallet-user/", ImageFormData, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("s39GlobalToken")}`,
                },
            })
                .then(res => {
                    console.log("update");
                    if (res.status === 200) {
                        swal({
                            title: "Successful",
                            text: "Image updated successfully",
                            icon: "success",
                            button: "OK",
                            className: "modal_class_success",
                        });
                        setPreviewImage("");
                        setCurrentFile("");
                        // setUserRefetch(!userRefetch);
                    }
                })
        }
    }

    const handleUpdateFullName = async () => {
        const fullNameFormData = new FormData();
        fullNameFormData.append("name", fullName);
        if (fullName) {
            await axios.put("https://testnetback.s39global.com/api/v1/wallet-user/", fullNameFormData, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("s39GlobalToken")}`,
                },
            })
                .then(res => {
                    console.log("update");
                    if (res.status === 200) {
                        swal({
                            title: "Successful",
                            text: "Name updated successfully",
                            icon: "success",
                            button: "OK",
                            className: "modal_class_success",
                        });
                        setFullName("");
                        // setUserRefetch(!userRefetch);
                    }
                })
        }
    }
    const handleUpdateEmail = async () => {
        const emailFormData = new FormData();
        emailFormData.append("email", email);
        if (email.length > 0 && email.includes("@" && ".")) {
            await axios.put("https://testnetback.s39global.com/api/v1/wallet-user/", emailFormData, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("s39GlobalToken")}`,
                },
            })
                .then(res => {
                    console.log("update");
                    if (res.status === 200) {
                        setEmailOtpVerify(false);
                        setOpenEmail(false);
                        // swal({
                        //     title: "Successful",
                        //     text: "Email updated successfully",
                        //     icon: "success",
                        //     button: "OK",
                        //     className: "modal_class_success",
                        // });
                        setEmail("");

                        // setUserRefetch(!userRefetch);
                    }
                })
        }
    }


    const handleVerifyEmail = async () => {
        // check if email is valid

        if (email.length > 0 && email.includes("@" && ".")) {
            // setLoading(true);
            // setEmailVerify(true);
            console.log(email)
            await axios.post('https://testnetback.s39global.com/api/v1/email/send', { email })
                .then(res => {
                    // console.log(res, '--data results gotten~');
                    if (res.status === 200) {
                        swal({
                            text: res.data.message,
                            icon: "success",
                            button: "OK!",
                            className: "modal_class_success",
                        });
                        setOpenEmail(true);
                        restarting(180);
                        // setEmailOtpVerify(res.data.otp);

                    }
                }).catch(err => {
                    // alert(err.response.data.message);
                    console.dir(err)
                    // setEmailVerify(false);
                    // swal({
                    //     title: "Attention",
                    //     text: err.response.data.message,
                    //     icon: "warning",
                    //     button: "OK!",
                    //     className: "modal_class_success",
                    // });


                    const wrapper = document.createElement("div");
                    wrapper.innerHTML = `<p class='text-break text-white fs-5'>${err.response.data.message}</p>`;

                    Swal.fire(
                        {
                            html: wrapper,
                            icon: "warning",
                            customClass: "modal_class_success",
                        }
                    )
                })
                .finally(() => {
                    // setLoading(false);
                });
        }
        else {
            // swal({
            //     title: "Attention",
            //     text: "Please enter a valid email address",
            //     icon: "warning",
            //     button: "OK!",
            //     className: "modal_class_success",
            // });


            const wrapper = document.createElement("div");
            wrapper.innerHTML = `<p class='text-break text-white fs-5'>Please enter a valid email address</p>`;

            Swal.fire(
                {
                    html: wrapper,
                    icon: "warning",
                    customClass: "modal_class_success",
                }
            )
        }
    }

    // ********************************************** walletAddress
    const copyToClipboardAffiliateCode = () => {
        copy(copyTextAffiliateCode);
        // alert(`You have copied "${copyTextReferralID}"`);
        // copyTextAffiliateCode !== ""
        //     ? swal({
        //         title: "Copied",
        //         text: `You have copied "${copyTextAffiliateCode}"`,
        //         icon: "success",
        //         button: "OK",
        //         className: "modal_class_success",
        //     })
        //     : swal({
        //         title: "Not Copied",
        //         text: "Nothing to Copy",
        //         icon: "warning",
        //         button: "OK",
        //         className: "modal_class_warning",
        //     });


        if (copyTextAffiliateCode !== "") {

            const wrapper = document.createElement("div");
            wrapper.innerHTML = `<p class='text-break text-white fs-5'>You have copied "${copyTextAffiliateCode}"</p>`;

            Swal.fire(
                {
                    // title: 'Successfully updated your Full Name.',
                    html: wrapper,
                    icon: "success",
                    customClass: "modal_class_success",
                }
            )


        }
        else {


            const wrapper = document.createElement("div");
            wrapper.innerHTML = `<p class='text-break text-white fs-5'>Nothing to Copy</p>`;

            Swal.fire(
                {
                    html: wrapper,
                    icon: "warning",
                    customClass: "modal_class_success",
                }
            )
        }
    };

    // ********************************************** Affiliate Link 
    const copyToClipboardAffiliateLink = () => {
        copy(copyTextAffiliateLink);

        // copyTextAffiliateLink !== ""
        // ? swal({
        //     title: "Copied",
        //     text: `You have copied "${copyTextAffiliateLink}"`,
        //     icon: "success",
        //     button: "OK",
        //     className: "modal_class_success",
        // })
        // : swal({
        //     title: "Not Copied",
        //     text: "Nothing to Copy",
        //     icon: "warning",
        //     button: "OK",
        //     className: "modal_class_warning",
        // });

        // alert(`You have copied "${copyTextAffiliateLink}"`);

        if (copyTextAffiliateLink !== "") {
            // swal({
            //     title: "Copied",
            //     text: `You have copied "${copyTextAffiliateCode}"`,
            //     icon: "success",
            //     button: "OK",
            //     className: "modal_class_success",
            // })

            const wrapper = document.createElement("div");
            wrapper.innerHTML = `<p class='text-break text-white fs-5'>You have copied "${copyTextAffiliateLink}"</p>`;

            Swal.fire(
                {
                    // title: 'Successfully updated your Full Name.',
                    html: wrapper,
                    icon: "success",
                    customClass: "modal_class_success",
                }
            )


        }
        else {
            // swal({
            //         title: "Not Copied",
            //         text: "Nothing to Copy",
            //         icon: "warning",
            //         button: "OK",
            //         className: "modal_class_warning",
            //  });

            const wrapper = document.createElement("div");
            wrapper.innerHTML = `<p class='text-break text-white fs-5'>Nothing to Copy</p>`;

            Swal.fire(
                {
                    html: wrapper,
                    icon: "warning",
                    customClass: "modal_class_success",
                }
            )
        }

    };

    // ********************************************** walletAddress

    const copyToClipboardWalletAddress = () => {
        copy(copyTextWalletAddress);
        // alert(`You have copied "${copyTextWalletAddress}"`);
        // copyTextWalletAddress !== ""
        //     ? swal({
        //         title: "Copied",
        //         text: `You have copied "${copyTextWalletAddress}"`,
        //         icon: "success",
        //         button: "OK",
        //         className: "modal_class_success",
        //     })
        //     : swal({
        //         title: "Not Copied",
        //         text: "Nothing to Copy",
        //         icon: "warning",
        //         button: "OK",
        //         className: "modal_class_warning",
        //     });

        if (copyTextWalletAddress !== "") {
            // swal({
            //     title: "Copied",
            //     text: `You have copied "${copyTextAffiliateCode}"`,
            //     icon: "success",
            //     button: "OK",
            //     className: "modal_class_success",
            // })

            const wrapper = document.createElement("div");
            wrapper.innerHTML = `<p class='text-break text-white fs-5'>You have copied "${copyTextWalletAddress}"</p>`;

            Swal.fire(
                {
                    // title: 'Successfully updated your Full Name.',
                    html: wrapper,
                    icon: "success",
                    customClass: "modal_class_success",
                }
            )


        }
        else {
            // swal({
            //         title: "Not Copied",
            //         text: "Nothing to Copy",
            //         icon: "warning",
            //         button: "OK",
            //         className: "modal_class_warning",
            //  });

            const wrapper = document.createElement("div");
            wrapper.innerHTML = `<p class='text-break text-white fs-5'>Nothing to Copy</p>`;

            Swal.fire(
                {
                    html: wrapper,
                    icon: "warning",
                    customClass: "modal_class_success",
                }
            )
        }
    };

    return (

        <div className='text-dark' style={{ overflow: 'hidden' }}>
            <div className='container pb-5 mt-4'>
                {/* <div className='mx-auto text-center mb-3'>
                    <button onClick={() => navigate('/')} className='kyc-profile-btn'>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Please complete your Kyc
                    </button>
                </div> */}
                <div className=" g-5 mx-auto" style={{maxWidth: "520px"}}>
                    <div className=" md-mb-5 border-md-0 ">
                        <h4 className='text-center d-none d-lg-block'>PROFILE</h4>
                        <div className='d-flex justify-content-center align-items-center d-lg-none mb-2 text-center'>
                            <h4 >PROFILE</h4>
                            {/* <Button variant="contained" size="small" onClick={() => navigate("/mineraltoken")} style={{ marginTop: "-12px", }}>MINE MINERAL TOKENS</Button> */}
                        </div>
                        <div className="">
                            <div id="login" className="mb-30 ">
                                <div className="">
                                    <div className="d-flex justify-content-center">
                                        {(!user?.image && !previewImage) && <img src={"https://i.ibb.co/JtVwzXs/default.jpg"} width={200} height={200} className='d-flex justify-content-center' alt="" />}
                                        {(user?.image && !previewImage) && <img src={user?.image} width={200} height={200} className='d-flex justify-content-center' alt="" />}
                                        {previewImage && <img src={previewImage} width={200} height={200} className='d-flex justify-content-center' alt="" />}
                                    </div>
                                    <div className="mt-3">
                                        <label className=''>Update your profile image<span>*</span></label>
                                        <div className='d-flex'>
                                            <input className='w-100 border py-2 cursor-pointer' onChange={selectFile} type="file" accept='image/*' name="image" id="image" />
                                            {CurrentFile ? <button
                                                disabled={!previewImage || !CurrentFile}
                                                onClick={() => handleUpdateImage()}
                                                className='border-0 px-4 p-2 w-25 d-flex justify-content-center' style={{ color: '#ffffff', backgroundColor: (!previewImage || !CurrentFile) ? "rgb(151, 145, 145)" : '#FF5421' }}>

                                                Update
                                            </button> :
                                                <button
                                                    disabled={!previewImage || !CurrentFile}
                                                    onClick={() => handleUpdateImage()}
                                                    className='border-0 px-4 p-2 w-25 d-flex justify-content-center' style={{ color: '#ffffff', backgroundColor: (!previewImage || !CurrentFile) ? "rgb(151, 145, 145)" : '#FF5421' }}>

                                                    {user?.image ? "Updated" : "Update"}
                                                </button>
                                            }
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <label className=''>Update your Full Name<span>*</span></label>
                                        <div className='d-flex'>
                                            <input
                                                id="fname" name="name" className="w-100 form-control-mod ps-2 profile-inputs" placeholder='Please update your Full Name.'

                                                defaultValue={user?.name ? user?.name : ""} onChange={(e) => setFullName(e.target.value)}
                                                type="text" />
                                            {fullName ? <button
                                                disabled={!fullName}
                                                onClick={() => handleUpdateFullName()}
                                                className='border-0 px-4 p-2 w-25 d-flex justify-content-center' style={{ color: '#ffffff', backgroundColor: (!fullName) ? "rgb(151, 145, 145)" : '#FF5421' }}>
                                                Update
                                            </button> : <button
                                                disabled={!fullName}
                                                onClick={() => handleUpdateFullName()}
                                                className='border-0 px-4 p-2 w-25 d-flex justify-content-center' style={{ color: '#ffffff', backgroundColor: (!fullName) ? "rgb(151, 145, 145)" : '#FF5421' }}>
                                                {user?.name ? "Updated" : "Update"}
                                            </button>}
                                        </div>

                                    </div>
                                    <div className=" my-3">
                                        <label className=''>Update your email/username<span>*</span></label>
                                        <div className='d-flex'>
                                            <input
                                                id="email" name="email" className="w-100 ps-2" placeholder='Please update your email/username' defaultValue={user?.email ? user?.email : ""} type="email" required onChange={(e) => setEmail(e.target.value)} />


                                            {email && email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ?
                                                <button
                                                    disabled={!email || !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)}
                                                    className='border-0 px-4 p-2 w-25 d-flex justify-content-center' style={{ color: '#ffffff', backgroundColor: (!email) ? "rgb(151, 145, 145)" : '#FF5421' }}
                                                    onClick={() => handleVerifyEmail()}

                                                >
                                                    Verify
                                                </button>
                                                :
                                                <button
                                                    disabled={!email}
                                                    className='border-0 px-4 p-2 w-25 d-flex justify-content-center' style={{ color: '#ffffff', backgroundColor: (!email) ? "rgb(151, 145, 145)" : '#FF5421' }}>
                                                    {user?.email ? "Updated" : "Update"}
                                                </button>

                                            }

                                        </div>
                                    </div>
                                    <div className=" mb-3 ">
                                        <label className=''>Membership ID<span>*</span></label>
                                        <input className="w-100 form-control-mod ps-2 py-2" placeholder='Membership ID' value={user?.membershipId} readOnly />
                                    </div>

                                    <div className=" mb-3">
                                        <label className=''>Your Wallet Address<span>*</span></label>
                                        <div className="d-flex">
                                            <input
                                                type="text"
                                                id="walletAddress"
                                                name="walletAddress"
                                                defaultValue={user?.walletAddress}
                                                className="form-control text-dark rounded-start rounded-0"
                                                disabled
                                            />
                                            <button
                                                className=""
                                                style={{ backgroundColor: "#15407f", border: '1px solid #15407F' }}
                                                type="button"
                                                onClick={copyToClipboardWalletAddress}

                                            >
                                                <FaRegCopy size={32} color='#fff' className='p-1' />
                                            </button>
                                        </div>
                                        
                                    </div>
                                    <div className='d-flex justify-content-start'>

                                            
                                            <Button onClick={() => navigate(-1)} className='btn rounded-0 border-0 me-2 w-50' style={{ background: "#15407F", }}>CANCEL</Button>
                                            <Button
                                                // onClick={Logout} 
                                                className='btn rounded-0 border-0 w-50' style={{ background: "#FF5421", }} onClick={() => Logout()}>LOGOUT</Button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* <div className="col-lg-6 border-md-0 pt-2">
                        
                        <div className="">
                            <div id="login" className="form-group mb-30 ">
                                <div className="">

                                    <div className=" mb-3">
                                        <label className=''>Your Affiliate Code<span>*</span></label>
                                        <div className="d-flex">
                                            <input
                                                type="text"
                                                name="affiliateCode"
                                                defaultValue={user?.myReferralCode}
                                                className="form-control profileInput text-dark rounded-start rounded-0"
                                                disabled
                                            />
                                            <button
                                                className=""
                                                style={{ backgroundColor: "#15407f", border: '1px solid #15407F' }}
                                                type="button"
                                                onClick={copyToClipboardAffiliateCode}

                                            >
                                                <FaRegCopy size={32} color='#fff' className='p-1' />
                                            </button>
                                        </div>
                                    </div>
                                    <div className=" mb-3">
                                        <label className=''>Your Affiliate Link<span>*</span></label>
                                        <div className="d-flex">
                                            <input
                                                type="text"
                                                id="AffiliateLink"
                                                name="AffiliateLink"
                                                defaultValue={window.location.origin + "/" + user.myReferralCode}
                                                className="form-control text-dark rounded-start rounded-0"
                                                disabled
                                            />
                                            <button
                                                className=""
                                                style={{ backgroundColor: "#15407f", border: '1px solid #15407F' }}
                                                type="button"
                                                onClick={copyToClipboardAffiliateLink}
                                            >
                                                <FaRegCopy size={32} color='#fff' className='p-1' />
                                            </button>
                                        </div>
                                    </div>
                                    <div className=" mb-3 ">
                                        <label className=''>Membership ID<span>*</span></label>
                                        <input className="w-100 form-control-mod ps-2 py-2" placeholder='Membership ID' value={user?.membershipId} readOnly />
                                    </div>
                                    
                                    
                                    <div>
                                        <div className="">
                                            <div>
                                                <span className='pt-2  text-start mb-3'>Share Affiliate Link</span>
                                                <div className='d-flex gap-2 mb-3'>
                                                    <TwitterShareButton url={window.location.origin + "/" + user?.myReferralCode} title={`Get 5% discount at s39global.com when you use my code.`}>
                                                        <TwitterIcon size={40} round={true} />
                                                    </TwitterShareButton>
                                                    <LinkedinShareButton url={window.location.origin + "/" + user?.myReferralCode} title={`Get 5% discount at s39global.com when you use my code.`}>
                                                        <LinkedinIcon size={40} round={true} />
                                                    </LinkedinShareButton>
                                                    <WhatsappShareButton url={window.location.origin + "/" + user?.myReferralCode} title={`Get 5% discount at s39global.com when you use my code.`}>
                                                        <WhatsappIcon size={40} round={true} />
                                                    </WhatsappShareButton>
                                                    <FacebookShareButton url={window.location.origin + "/" + user?.myReferralCode} title={`Get 5% discount at s39global.com when you use my code.`}>
                                                        <FacebookIcon size={40} round={true} />
                                                    </FacebookShareButton>
                                                    <PinterestShareButton url={window.location.origin + "/" + user?.myReferralCode} title={`Get 5% discount at s39global.com when you use my code.`}>
                                                        <PinterestIcon size={40} round={true} />
                                                    </PinterestShareButton>
                                                    <TelegramShareButton url={window.location.origin + "/" + user?.myReferralCode} title={`Get 5% discount at s39global.com when you use my code.`}>
                                                        <TelegramIcon size={40} round={true} />
                                                    </TelegramShareButton>
                                                </div>
                                            </div>
                                        </div>
                                        <p className='text-start'>Please share the affiliate code and start earning.</p>
                                        <div className='d-flex justify-content-start'>

                                            
                                            <Button onClick={() => navigate(-1)} className='btn rounded-0 border-0 me-2 w-50' style={{ background: "#15407F", }}>CANCEL</Button>
                                            <Button
                                                // onClick={Logout} 
                                                className='btn rounded-0 border-0 w-50' style={{ background: "#FF5421", }} onClick={() => Logout()}>LOGOUT</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <EmailVerificationModal
                handleUpdateEmail={handleUpdateEmail}
                handleVerifyEmail={handleVerifyEmail}
                minutes={minutes}
                email={email}
                seconds={seconds}
                emailOtpVerify={emailOtpVerify}
                setEmailOtpVerify={setEmailOtpVerify}
                open={openEmail}
                setOpenEmail={setOpenEmail}
            />
        </div>
    );
};

export default Profile;