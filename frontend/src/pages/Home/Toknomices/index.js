import React from 'react';
import './index.scss'
import { Chart } from "react-google-charts";
import '../../../style/base.scss'
import TokenomicesImg from '../../../assets/images/Token_Distribution_8.png'
import CoinImg from '../../../assets/images/money.svg'

const data = [
    ["target", "percent"],
    ["DEX Liquidity", 75],
    ["Ecosystem Fund", 10],
    ["Marketing", 5],
    ["Treasury", 5],
    ["CEX Listing Allocation", 5],
  ];
const options = {

    legend: "none",
    pieSliceText: "none",
    backgroundColor: "transparent",
    colors: ['#ff3131', '#ff914d', '#004aad', '#00bf63', '#8c52ff'],
};

const Toknomices = () => {
    return (
        <div className='tokenomices'>
            <div className='background-div'>
                <div className='tokenomics-title-content'>
                    <div className='left-title'>
                        {/* <Chart
                            options={options}
                            className='tokenomices-img'
                            chartType="PieChart"
                            data={data}
                        /> */}
                        <img src={TokenomicesImg} className='tokenomices-img'></img>
                        
                        <div className='max-supply'>
                            <p className='title-text'>88,888,888,888,888</p>
                            <p className='description-text'>Max supply</p>
                        </div>
                    </div>
                    <div className='right-title'>
                        <div className='center-align'>
                            <span className='title gradient-text-1 title-text'>TOKENOMICS</span>
                            <img src={CoinImg} className='tokenomices-img'></img>
                        </div>
                        <p className='description description-text'>Gain the tools to construct a diversified portfolio, identify promising projects, and optimize your investment strategy.</p>
                    </div>
                </div>
                <div className='tokenomics-chart'>
                    <div className='tokenomics-item'>
                        <p className='title title-text'>0.9%</p>
                        <p className='description description-text'>Unlocked</p>
                        <div className='em-progress-bar'>
                            <div className='progerss-0-9 color-1'></div>
                        </div>
                    </div>
                    <div className='tokenomics-item'>
                        <p className='title title-text'>10.0%</p>
                        <p className='description description-text'>Team</p>
                        <div className='em-progress-bar'>
                            <div className='progerss-10 color-2'></div>
                        </div>
                    </div>
                    <div className='tokenomics-item'>
                        <p className='title title-text'>10.0%</p>
                        <p className='description description-text'>CEX Listing</p>
                        <div className='em-progress-bar'>
                            <div className='progerss-10 color-3'></div>
                        </div>
                    </div>
                    <div className='tokenomics-item'>
                        <p className='title title-text'>2.1%</p>
                        <p className='description description-text'>Androp & Community</p>
                        <div className='em-progress-bar'>
                            <div className='progerss-2-1 color-4'></div>
                        </div>
                    </div>
                    <div className='tokenomics-item'>
                        <p className='title title-text'>3.2%</p>
                        <p className='description description-text'>Marketing</p>
                        <div className='em-progress-bar'>
                            <div className='progerss-3-2 color-5'></div>
                        </div>
                    </div>
                    <div className='tokenomics-item'>
                        <p className='title title-text'>3.2%</p>
                        <p className='description description-text'>Treasury</p>
                        <div className='em-progress-bar'>
                            <div className='progerss-3-2 color-6'></div>
                        </div>
                    </div>
                    <div className='tokenomics-item'>
                        <p className='title title-text'>39.2%</p>
                        <p className='description description-text'>Ecosystem</p>
                        <div className='em-progress-bar'>
                            <div className='progerss-39-2 color-7'></div>
                        </div>
                    </div>
                    
                    <div className='tokenomics-item'>
                        <p className='title title-text'>10.0%</p>
                        <p className='description description-text'>Staking</p>
                        <div className='em-progress-bar'>
                            <div className='progerss-10 color-8'></div>
                        </div>
                    </div>
                    <div className='tokenomics-item'>
                        <p className='title title-text'>21.2%</p>
                        <p className='description description-text'>Liquidity</p>
                        <div className='em-progress-bar'>
                            <div className='progerss-21-2 color-9'></div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Toknomices