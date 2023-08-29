import React from 'react';

import Community from './Community'
import Title from './Title'
import Litepaper from './Litepaper'
import Toknomices from './Toknomices'
import Roadmap from './Roadmap'
import SocialLinks from './SocialLinks'

import './index.scss'
import '../../base.scss'

const Home = () => {
    return (
        <div className="home-page monkey-page">
            <Title/>
            <Litepaper/>
            <Toknomices/>
            <Roadmap/>
            <SocialLinks/>
            <Community/>
        </div>
    );
}

export default Home