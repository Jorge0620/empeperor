import React from 'react';

import { BsTelegram } from "react-icons/bs";
import { SiTwitter } from "react-icons/si";

import './index.scss'
import '../../../style/base.scss'
import PPCrownImg from '../../../assets/images/Transparent.png'
import UniswapImg from '../../../assets/images/Uniswap-UNI.png'
import { EtherscanLink, TelegramLink, UniswapLink, TwitterLink } from '../../../utils/data'

const SocialLinks = () => {
    return (
        <div className='our-partners'>
            <img src={PPCrownImg} className='pp-crown-img'></img>
            <div className='background-content'>
                <a className='token-address description-text' target='blank' href={EtherscanLink}>0xee56bf3d175c8d37e6d3c6b867291ab7b1865367</a>
                <div className='links-content'>
                    <a href={TelegramLink} target='_blank' className='telegram social-link'><BsTelegram/></a>
                    <a href={TwitterLink} target='_blank' className='twitter social-link'><SiTwitter/></a>
                    <a href={UniswapLink} target='_blank' className='social-link'><img src={UniswapImg}></img></a>
                </div>
                
            </div>
        </div>
    );
}

export default SocialLinks