import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import swal from 'sweetalert';
import Button from 'react-bootstrap/Button';
import CloseIcon from '@mui/icons-material/Close';
import './MobileVerifyModal.css';
import Swal from 'sweetalert2';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: '#1a1a25',
    // border: '2px solid white',
    boxShadow: 24,
    color: "white",
    borderRadius: '5px',
    p: 4
};

export default function MobileVerifyModal({ open, setOpenMobile, otpVerify, setError, disableAfterActivation, handleVerifyMobile, minutes, seconds, setForEnable }) {

    const [otpCode, setOtpCode] = useState()
    const [isOtpError, setOtpError] = useState(false)

    const handleClose = () => setOpenMobile(false);


    // Re-send OTP states

    const [againEnable, setAgainEnable] = useState(true);
    const [count, setCount] = useState(2);
    const [disabled, setDisabled] = useState(false);


    const hendelSubmit = (e) => {
        setCount(count - 1)
        e.preventDefault();
        if (otpVerify == otpCode) {
            // swal({
            //     text: "Mobile Number Verified.",
            //     icon: "success",
            //     button: "OK!",
            //     className: "modal_class_success",
            // });

            const wrapper = document.createElement("div");
            wrapper.innerHTML = `<p class='text-break text-white fs-5'>Mobile Number Verified.</p>`;
            
            Swal.fire(
                {
                    html: wrapper,
                    icon: "success",
                    customClass: "modal_class_success",
                }
        )
    

            setOtpError(false);
            setError(false);
            handleClose(false);
            setForEnable(true);
            return;
        }
        if (count > 0) {
            // let content2 = document.createElement("p");
            // content2.innerHTML = 'You have entered wrong OTP. Please try again. You have another <br/><span style="color: #0d6efd;">0' + count + '</span> more tries .'
            // swal({
            //     content: content2,
            //     icon: "warning",
            //     button: "OK!",
            //     className: "modal_class_success",
            // });

            const wrapper = document.createElement("div");
            wrapper.innerHTML = `<p class='text-break text-white fs-5'>You have entered wrong OTP. Please try again. You have another <br/><span style="color: #0d6efd;">0' + ${count} + '</span> more tries .</p>`;
            
            Swal.fire(
                {
                    html: wrapper,
                    icon: "success",
                    customClass: "modal_class_success",
                }
        )
    
        } else {
            setDisabled(true)
            // swal({
            //     text: "You have entered wrong OTP, And you have no more tries left. You can request another OTP again",
            //     icon: "warning",
            //     button: "OK!",
            //     className: "modal_class_success",
            // });

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
        setError('Mobile OTP Code not matched')
        setOtpError(true)

    }

    const verifyAlert = () => {
        // swal({
        //     text: "Please verify your mobile number before closing!",
        //     icon: "warning",
        //     button: "OK!",
        //     className: "modal_class_success",
        // })

        const wrapper = document.createElement("div");
        wrapper.innerHTML = `<p class='text-break text-white fs-5'>Please verify your mobile number before closing!</p>`;
        
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
                    <Typography id="modal-modal-title text-light" className='text-light' variant="h6" component="h2">
                        Verify Mobile
                    </Typography>
                    <Typography id="modal-modal-description text-light" sx={{ mt: 2 }}>
                        Check your Mobile for OTP
                    </Typography>
                    <form className="d-flex input-group mt-2 mb-2" >
                        <input type="number" className="form-control" placeholder="OTP code" aria-label="OTP code !!" aria-describedby="button-addon2" onChange={e => setOtpCode(e.target.value)} />

                        <button disabled={disabled ? true : false} className="btn btn-outline-secondary bg-danger text-light ps-2 pe-2 pt-2 pb-2" onClick={hendelSubmit} type="submit" id="button-addon2">Verify</button>
                    </form>

                    {isOtpError ? <p style={{ color: 'red' }}>You have entered wrong OTP</p> : ''}
                    <div className='d-flex' style={{ justifyContent: 'center' }}>
                        <button disabled={minutes == 0 && seconds == 0 ? false : true} type='submit' onClick={handleVerifyMobile} className={`${(minutes == 0 && seconds == 0) ? "submit banner-button2 font14 text-decoration-none pb-2" : "submit bg-secondary text-light  font14 text-decoration-none rounded ps-2 pt-1 pe-2 pb-2 mt-3"}`} style={{ backgroundColor: (minutes == 0 && seconds == 0) ? '#7b7b94' : '#007bff' }} id="font14">Resend OTP</button>
                    </div>
                    <div className='text-center text-white mt-3'>
                        <span>{minutes}</span>:<span>{seconds < 10 ? `0${seconds}` : seconds}</span>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
