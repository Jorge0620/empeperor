import React from 'react';
import './index.scss'
import '../../../style/base.scss'

const Roadmap = () => {
    return (
        <div className='vibing'>
            <div className='title'>
                <span className='text title-text gradient-text-1'>Roadmap</span>
            </div>
            <div className='phases'>
                <div className='phase'>
                    <p className='title title-text'>3rd Quater 2023</p>
                    <ul>
                        <li className='item description-text'>DEX Listing</li>
                        <li className='item description-text'>Platform Launch</li>
                        <li className='item description-text'>CEX Listing</li>
                    </ul>
                </div>
                <div className='phase'>
                    <p className='title title-text'>4rd Quater 2023</p>
                    <ul>
                        <li className='item description-text'>Casino Launch</li>
                        <li className='item description-text'>Ecosystem Development</li>
                    </ul>
                </div>
                
            </div>
        </div>
    );
}

export default Roadmap