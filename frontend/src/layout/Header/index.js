import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { InjectedConnector } from "@web3-react/injected-connector";

import './Header.scss';
import LogoHeader from './LogoHeader.js';
import VectorLogo from '../../assets/images/logo/empepelogo.png';
import { metaMask, metaMaskHooks } from '../../connectors/Metamask.js'

const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42]
});
const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = metaMaskHooks

const Header = (props) => {
    const { children, setPublicKey,
        hideLoginModal, 
        signed,
        logged, 
        useChainData, 
        changeCurrentChainID } = props;
    const [status, setStatus] = useState(null);
    
    const accounts = useAccounts()
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

    const connectToMetamask = () => {
        metaMask
            .activate(Injected)
            .then(
                console.log("successfully connected!!!")
            )
            .catch(err => {
                    console.log("connection failed!!")
                }
            )
    }
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
                    <div><Button className='empeperor-btn wallet-connect-btn' disabled={accounts && accounts.length > 0} onClick={()=>connectToMetamask()}>
                        {
                            accounts && accounts.length > 0
                            ?   `${accounts[0].substring(0, 15)}...${accounts[0].slice(-5)}`
                            :   'CONNECT WALLET'
                        }
                        </Button>
                    </div>
                    {/* <Button className='presale-btn description-text' onClick={()=>navigate('/pre-sale')}>Pre-Sale</Button> */}
                </div>
                {children}
            </div>
        </>
    )
}

export default Header