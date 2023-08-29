import React from 'react';
import './index.scss'
import '../../../style/base.scss'
import TreeImg from '../../../assets/images/tree.png'
import PandaImg from '../../../assets/images/Panda.png'
import RotateSpaceImg from '../../../assets/images/rotatespace.png'

const Whitepaper = () => {
    return (
        <div className='roadmap'>
            <div className='title'>
                <span className='top title-text gradient-text-1'>THE</span>
                <span className='text title-text gradient-text-1'>Whitepaper</span>
            </div>
            <p className='description description-text'>In this whitepaper, we will delve into every aspect of Empeperor – from the underlying blockchain technology that drives our platform to the innovative features that set us apart. Additionally, we will outline our roadmap, tokenomics, security measures, and commitment to legal compliance.</p>
            {/* <div className='phases'>
                <div className='phase'>
                    <p className='title title-text'>PHASE 1</p>
                    <ul>
                        <li className='item description-text'>Into the Bamboo realm</li>
                        <li className='item description-text'>Community Airdrop</li>
                        <li className='item description-text'>Coingecko/CMC Listing</li>
                        <li className='item description-text'>Change to Panda community</li>
                    </ul>
                </div>
                <div className='phase'>
                    <p className='title title-text'>PHASE 2</p>
                    <ul>
                        <li className='item description-text'>NFT drop</li>
                        <li className='item description-text'>Partnerships</li>
                        <li className='item description-text'>Panda Meme jungle</li>
                        <li className='item description-text'>CEX listing</li>
                        <li className='item description-text'>Bamboo bucks ecosystem</li>
                    </ul>
                </div>
                <div className='phase'>
                    <p className='title title-text'>PHASE 3</p>
                    <ul>
                        <li className='item description-text'>Regenerative stage</li>
                        <li className='item description-text'>Panda utility</li>
                        <li className='item description-text'>Panda Meme jungle</li>
                        <li className='item description-text'>CEX listing</li>
                        <li className='item description-text'>Bamboo bucks ecosystem</li>
                    </ul>
                </div>
            </div> */}
        </div>
    );
}

export default Whitepaper