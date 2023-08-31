import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { InjectedConnector } from "@web3-react/injected-connector";
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/ethereum-provider'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import {connect} from 'react-redux'
import Web3 from 'web3';

import { mainnetInfuraKey } from '../../utils/contractData';
import './Header.scss';
import LogoHeader from './LogoHeader.js';
import VectorLogo from '../../assets/images/logo/empepelogo.png';
import { metaMask, metaMaskHooks } from '../../connectors/Metamask.js'
import { setWalletAddress } from '../../actions/userActions'

const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42]
});
const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = metaMaskHooks

const providerOptions = {
    coinbasewallet: {
      package: CoinbaseWalletSDK, // Required
      options: {
        appName: 'Web 3 Modal', // Required
        infuraId: mainnetInfuraKey, // Required unless you provide a JSON RPC url; see `rpc` below
      },
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: mainnetInfuraKey,
      },
    }
}
let web3Modal
if (typeof window !== 'undefined') {
    web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        providerOptions,
    })
}

const Header = (props) => {
    const { children, setPublicKey,
        setWalletAddress,
        hideLoginModal, 
        signed,
        logged, walletAddress,
        useChainData, 
        changeCurrentChainID } = props;
    const [status, setStatus] = useState(null);
    
    const accounts = useAccounts()
    
    useEffect(async () => {
        await web3Modal.clearCachedProvider();
        await web3Modal.resetState()
        web3Modal.providerController.disableInjectedProvider = true
    }, [])
    
    useEffect(() => {
        if (logged) {
            hideLoginModal()
        }
    }, [logged]);

    useEffect(() => {
        
    }, [signed]);
    

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
    const connectWallet = async () => {
        console.log('web3modal: ', web3Modal)
        const provider = await web3Modal.connect().catch((error) => {
            // eslint-disable-next-line no-console
            console.log('Could not get a wallet connection', error)
            return
          })
      
        if (provider) {
            
            const web3 = new Web3(provider); 
            const accounts = await web3.eth.getAccounts();
            console.log('successfully connected', accounts)
            if(accounts && accounts.length > 0) {
                setWalletAddress(accounts[0])
            }
        }
    }
    const disConnectWallet = async () => {
        await web3Modal.clearCachedProvider();
        await web3Modal.resetState()
        web3Modal.providerController.disableInjectedProvider = true
        console.log('web3modal: ', web3Modal)
        setWalletAddress('')
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
                        {
                            walletAddress && walletAddress !== "" > 0
                            ?   <Button className='empeperor-btn wallet-connect-btn'  onClick={()=>disConnectWallet()}>{`DISCONNECT(${walletAddress.substring(0, 5)}...${walletAddress.slice(-5)})`}</Button>
                            :   <Button className='empeperor-btn wallet-connect-btn'  onClick={()=>connectWallet()}>CONNECT WALLET</Button>
                        }
                        
                    
                    {/* <Button className='presale-btn description-text' onClick={()=>navigate('/pre-sale')}>Pre-Sale</Button> */}
                </div>
                {children}
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    walletAddress: state.userData.walletAddress
});
export default connect(mapStateToProps, {
    setWalletAddress
})(Header);