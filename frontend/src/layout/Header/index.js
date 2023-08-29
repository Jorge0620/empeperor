import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Header.scss';
import MooningLogo from '../../assets/images/logo/textlogo.png';
import LogoHeader from './LogoHeader.js';
import VectorLogo from '../../assets/images/logo/empepelogo.png';

const Header = (props) => {
    const { children, setPublicKey,
        hideLoginModal, 
        signed,
        logged, 
        useChainData, 
        changeCurrentChainID } = props;
    const [status, setStatus] = useState(null);
    
    
    const [basicModal, setBasicModal] = useState(false);
 
    const notify = () => toast.info(status, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
    
    useEffect(async () => {

    }, [])
    
    useEffect(() => {
        if (logged) {
            hideLoginModal()
        }
    }, [logged]);

    useEffect(() => {
        
    }, [signed]);
    
    useEffect(() => {
        if (status) {
            notify();
          setStatus(null)
        }
    }, [status]);
    return (
        <>
            <div className='header' >
                <LogoHeader/>
                <div className="button-group">
                    <a target="_blank" href="" className="middle-logo">
                    <div className="sidebar-logo">
                        <img className="vector-logo" src={VectorLogo}></img>
                        <p className="sidbar-logo-text">EMPEPEROR</p>
                    </div>
                    </a>
                    <div></div>
                    {/* <Button className='presale-btn description-text' onClick={()=>navigate('/pre-sale')}>Pre-Sale</Button> */}
                </div>
                {children}
            </div>
        </>
    )
}

export default Header