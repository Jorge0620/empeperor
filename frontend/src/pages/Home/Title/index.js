import React from 'react';

import './index.scss'
import '../../../style/base.scss'

import PepeImg from '../../../assets/images/NoBGLogoVersion.png'
import CasinoMachineImg from '../../../assets/images/new/Casino Machine.png'
import UniswapImg from '../../../assets/images/Uniswap-UNI.png'
import { WhitePaperLink, UniswapLink } from '../../../utils/data'

const Title = () => {
    return (
        <div className='title-content'>
            <div className='title'>
                <img src={PepeImg} className='pepe-img'></img>
                <span className='text title-text gradient-text-1'>EMPEPEROR</span>
                
            </div>
            <p className='description description-text'>Multi network crypto casino</p>
            <a target='blank' href={WhitePaperLink} className='litepaper-btn description-text'>Litepaper</a>
            <a href={UniswapLink} target='_blank' className='social-link'><img src={UniswapImg}></img></a>
            <img src={CasinoMachineImg} className='casino-machine'></img>
            {/* <img src={SpaceImg} className='race-img'></img> */}
        </div>
    );
}

export default Title