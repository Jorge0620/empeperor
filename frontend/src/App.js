import React, {useEffect} from 'react';
import axios from 'axios';
import { useState } from "react";
import {Provider} from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import Favicon from 'react-favicon'
import { useWeb3React, initializeConnector, Web3ReactProvider } from '@web3-react/core'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Buffer } from 'buffer';

import { metaMask, metaMaskHooks } from './connectors/Metamask'
import PageRoutes from './PageRoutes';
import ModalController from './components/ModalController'
import AccountManager from './components/AccountManager'
import './App.scss';
import './base.scss';
import './assets/font/Nurom-Bold.ttf';
import './assets/font/Poppins-Medium.ttf';
import './assets/font/Poppins-SemiBold.ttf';
import store from './store'
import desktopFavicon from './assets/images/NoBGLogoVersion.png';
import { detectMob } from './utils/globalActions';
import {serverUrl} from './utils/constant'

axios.defaults.withCredentials = false;
axios.defaults.crossDomain = true;
axios.defaults.baseURL = serverUrl;

global.Buffer = Buffer;

const connectors = [
  [metaMask, metaMaskHooks],
]

function App() {
  document.title = "Empeperor"
  const [isMobile, setIsMobile] = useState(false)
  useEffect(async () => {
    setIsMobile(detectMob());
  }, [])
  return (
    <div>
      <Favicon url={isMobile ? desktopFavicon : desktopFavicon} />
      <Web3ReactProvider connectors={connectors}>
        <Provider store={store}>
            <BrowserRouter>
              <PageRoutes/>
              <ModalController/>
              <AccountManager/>
              
            </BrowserRouter>
        </Provider>
      </Web3ReactProvider>
      <ToastContainer/>
    </div>
  );
}

export default App;
