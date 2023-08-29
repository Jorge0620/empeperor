import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { BiHomeSmile } from "react-icons/bi";
import PinkSaleImg from '../../assets/images/pinksale (1).png'
import DexViewImg from '../../assets/images/dexview1.png'
import PancakeImg from '../../assets/images/pancakeswap-095a205c.png'

import './index.scss'

const PreSale = () => {
    const navigate = useNavigate()

  return (
    <div className='contact-us-page monkey-page'>
        <button className="home-link" onClick={()=>navigate("/home")}><BiHomeSmile /></button>
        <p className="title title-text gradient-text-1" mb={2}>
          Buy TOkens
        </p>
        <p className="description description-text">You can get your tokens from any these!</p>
        <div className="marketplaces">
          <a className="market">
            <div className="img-container">
              <img className="market-img" src={PinkSaleImg}></img>
            </div>
            <p className="market-description description-text">PINKALE</p>
          </a>
          <a className="market">
            <div className="img-container">
              <img className="market-img" src={DexViewImg}></img>
            </div>
            <p className="market-description description-text">DEXVIEW</p>
          </a>
          <a className="market">
            <div className="img-container">
              <img className="market-img" src={PancakeImg}></img>
            </div>
            <p className="market-description description-text">PANCAKE</p>
          </a>
        </div>
    </div>
  );
}

export default PreSale;