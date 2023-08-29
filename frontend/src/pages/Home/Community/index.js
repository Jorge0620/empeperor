import React from 'react';
import { Button } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom'; 

import './index.scss'
import RocketImg from '../../../assets/images/new/moonspace.png'

const Community = () => {
    const navigate = useNavigate();
    return (
        <div className="our-community">
            <div className='title'>
                {/* <span className='top title-text gradient-text-1'>our</span> */}
                <span className='text title-text gradient-text-1'>community</span>
                <span className='description description-text'>Join us as we venture into the untamed future!</span>
                <div className='contact-content'>
                    <Button onClick={()=>navigate('/contact-us')} className='contact-btn description-text'>CONTACT US</Button>
                </div>
            </div>
            
            <img className='rocket-img' src={RocketImg}></img>
        </div>
    );
}

export default Community