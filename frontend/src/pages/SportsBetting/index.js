import React from 'react';
import './index.scss'
import EscrowImg from '../../assets/images/escrow.png'
import EscrowTXTImg from '../../assets/images/EscrowTxt.png'
import ComingSoonImg from '../../assets/images/ComingSoon.png'

const SportsBetting = () => {
    return (
        <div className="sports-betting-page monkey-page">
            <img className='escrow-img' src={EscrowImg}></img>
            <p className='page-title-text'>Sports Betting</p>
            <img className='coming-soon-img' src={ComingSoonImg}></img>
        </div>
    );
}

export default SportsBetting