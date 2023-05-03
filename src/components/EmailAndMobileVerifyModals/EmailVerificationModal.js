import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
// import Button from 'react-bootstrap/Button';
import CloseIcon from '@mui/icons-material/Close';
import './EmailVerificationModal.css';
import { Button, Form, InputGroup } from 'react-bootstrap';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#1a1a25',
    // border: '2px solid white',
    boxShadow: 24,
    color: "white",
    borderRadius: '5px',
    p: 4
};

export default function EmailVerificationModal(
    { open, setForEnable, setOpenEmail, otpVerify, setError, handleVerifyEmail, minutes, seconds, setEmailVerify, handleEmailSubmit }
) {

    const [otpCode, setOtpCode] = useState()
    const [isOtpError, setOtpError] = useState(false)

    const handleClose = () => setOpenEmail(false);

    // Re-send OTP states
    const [againEnable, setAgainEnable] = useState(true);
    const [count, setCount] = useState(2);
    const [disabled, setDisabled] = useState(false);

    console.log(otpVerify, otpCode)


    const hendelSubmit = (e) => {
        setCount(count - 1)
        e.preventDefault();
        if (otpVerify == otpCode) {


            const wrapper = document.createElement("div");
            wrapper.innerHTML = `<p class='text-break text-white fs-5'>Email Verified.</p>`;
            handleEmailSubmit();
            Swal.fire(
                {
                    html: wrapper,
                    icon: "success",
                    customClass: "modal_class_success",
                }
            )


            setEmailVerify(true);
            localStorage.setItem("isVerifiedEmail", true)
            setForEnable(true);
            setOtpError(false)
            setError(false)
            handleClose(false)
            return;
        }
        if (count > 0) {


            const wrapper = document.createElement("div");
            wrapper.innerHTML = `<p class='text-break text-white fs-5'>You have entered wrong OTP. Please try again. You have another <br/><span style="color: #0d6efd;">0' + ${count} + '</span> more tries .</p>`;

            Swal.fire(
                {
                    html: wrapper,
                    icon: "warning",
                    customClass: "modal_class_success",
                }
            )




        } else {
            setDisabled(true)


            const wrapper = document.createElement("div");
            wrapper.innerHTML = `<p class='text-break text-white fs-5'>You have entered wrong OTP, And you have no more tries left. You can request another OTP again</p>`;

            Swal.fire(
                {
                    html: wrapper,
                    icon: "warning",
                    customClass: "modal_class_success",
                }
            )

        }
        setError('Email OTP Code not matched')
        setOtpError(true)


    }
    const verifyAlert = () => {
        // swal({
        //     text: "Please verify your email before closing!",
        //     icon: "warning",
        //     button: "OK!",
        //     className: "modal_class_success",
        // })

        const wrapper = document.createElement("div");
        wrapper.innerHTML = `<p class='text-break text-white fs-5'>Please verify your email before closing!</p>`;

        Swal.fire(
            {
                html: wrapper,
                icon: "warning",
                customClass: "modal_class_success",
            }
        )

    }

    return (
        <div>
            <Modal
                open={open} P
                onClose={otpVerify == otpCode && handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} id="">
                    <div className='closeD pb-3'>
                        <Button className='iconClose' onClick={otpVerify == otpCode ? handleClose : verifyAlert}><CloseIcon className='iconClose' style={{ color: "red" }} /></Button>
                    </div>
                    <Typography id="modal-modal-title text-dark" className='text-light' variant="h6" component="h2">
                        Verify Email
                    </Typography>
                    <Typography id="modal-modal-description text-light" sx={{ mt: 2 }}>
                        Check your email for OTP
                    </Typography>
                    <form className="d-flex input-group mt-2 mb-2" >
                        <input type="number" className="form-control" placeholder="OTP code" aria-label="OTP code !!" aria-describedby="button-addon2" onChange={e => setOtpCode(e.target.value)} />

                        <button disabled={disabled ? true : false} className="btn btn-outline-secondary bg-danger text-light ps-2 pe-2 pt-2 pb-2" onClick={hendelSubmit} type="submit" id="button-addon2">Verify</button>
                    </form>

                    {isOtpError ? <p style={{ color: 'red' }}>You have entered wrong OTP</p> : ''}
                    <div className='d-flex' style={{ justifyContent: 'center' }}>
                        <button disabled={minutes == 0 && seconds == 0 ? false : true} type='submit' onClick={handleVerifyEmail} className='submit banner-button2 font14 text-decoration-none pb-2' style={minutes == 0 && seconds == 0 ? { backgroundColor: '#007bff' } : { backgroundColor: '#7b7b94' }} id="font14">Resend OTP</button>
                    </div>
                    <div className='text-center text-white mt-3'>
                        <span>{minutes}</span>:<span>{seconds < 10 ? `0${seconds}` : seconds}</span>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
