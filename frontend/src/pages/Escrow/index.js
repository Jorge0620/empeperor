import React from 'react';
import './index.scss'
import EscrowImg from '../../assets/images/escrow.png'
import EscrowTXTImg from '../../assets/images/EscrowTxt.png'
import ComingSoonImg from '../../assets/images/ComingSoon.png'

const Escrow = () => {
    return (
        <div className="escrow-page monkey-page">
            <img className='escrow-img' src={EscrowImg}></img>
            <p className='page-title-text'>ESCROW</p>
            <p className='description-text about-text'>Crypto escrow is a service that helps to secure financial transactions involving cryptocurrencies. The fundamental idea behind a crypto escrow is comparable to that of conventional escrow services. It performs the role of a neutral third party holding money or assets until both parties of the transaction have met their responsibilities.</p>
            <img className='coming-soon-img' src={ComingSoonImg}></img>
        </div>
    );
}

export default Escrow