import React from 'react';
import './index.scss'
import EscrowImg from '../../assets/images/escrow.png'
import EscrowTXTImg from '../../assets/images/EscrowTxt.png'
import ComingSoonImg from '../../assets/images/ComingSoon.png'

const Casino = () => {
    return (
        <div className="casino-page monkey-page">
            <img className='escrow-img' src={EscrowImg}></img>
            <p className='page-title-text'>Casino</p>
            <img className='coming-soon-img' src={ComingSoonImg}></img>
        </div>
    );
}

export default Casino