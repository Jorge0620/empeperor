import React from 'react';
import './index.scss'
import '../../../style/base.scss'
import ChipsImg from '../../../assets/images/new/Casino Chips.png'
import { WhitePaperLink } from '../../../utils/data'

const OurStory = () => {
    return (
        <div className='our-story'>
            <div className='background-content'>
                <a target='blank' href={WhitePaperLink}><span className='title title-text'>Litepaper</span></a>
                <p className='description description-text'>
                    Empeperor is a self funded crypto project. This is an innovative and cutting-edge online gambling platform that operates on the principles of blockchain technology and decentralized applications (DApps). Our platform seeks to revolutionize the gambling industry by offering a secure, transparent, and user-centric gaming experience like no other. Through the power of blockchain, we aim to bring forth a new era of trust and fairness in the world of online gambling.

The project is network agnostic in terms of deposit and withdraw function. It will be integrated with several wallets on several networks such as ERC, BSC, Solana, and Polygon. This will reduce friction and gas fees. User's also do not need to bridge their tokens to be able to play in the platform as long as they use the 4 initial networks. </p>
                
                <img src={ChipsImg} className='chips-right-img'></img>
            </div>
        </div>
    );
}

export default OurStory