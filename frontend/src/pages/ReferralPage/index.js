import React, {useState, useEffect} from 'react';
import { InjectedConnector } from "@web3-react/injected-connector";
import {connect} from 'react-redux'
import { Button } from '@mui/material';
import { AiOutlineCopy } from "react-icons/ai";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useMediaQuery } from "react-responsive";

import { metaMask, metaMaskHooks } from '../../connectors/Metamask.js'
import { usdSwapPrice } from '../../utils/contractData';
import ContainerComponent from '../../components/ContainerComponent';
import { copyTextToClipboard } from '../../actions/globalActions';
import { showDepositModal, showWithdrawModal, getUsdBalance, popup } from '../../actions/gameActions';
import IronRankImg from '../../assets/images/Ranks/0Iron.png'
import BronzeRankImg from '../../assets/images/Ranks/1Bronze.png'
import SilverRankImg from '../../assets/images/Ranks/2Silver.png'
import GoldRankImg from '../../assets/images/Ranks/3Gold.png'
import PlatinumRankImg from '../../assets/images/Ranks/4Platinum.png'
import JadeRankImg from '../../assets/images/Ranks/5Jade.png'
import SapphireRankImg from '../../assets/images/Ranks/6Sapphire.png'
import RubyRankImg from '../../assets/images/Ranks/7Ruby.png'
import EmeraldRankImg from '../../assets/images/Ranks/8Emerald.png'
import DiamondRankImg from '../../assets/images/Ranks/9Diamond.png'

import './index.scss'
import '../../style/base.scss'

const rankImgs = [IronRankImg, BronzeRankImg, SilverRankImg, GoldRankImg, PlatinumRankImg, JadeRankImg, SapphireRankImg, RubyRankImg, EmeraldRankImg, DiamondRankImg]
const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = metaMaskHooks

const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42]
});

const NullInjected = new InjectedConnector({
    supportedChainIds: []
});

const ReferralPage = (props) => {
    const { showDepositModal, showWithdrawModal, tokenBalance, tokenUsdBalance, withdrawableBalance, rank, refRewards, accumulatedReferral, refCode, getUsdBalance } = props

    const accounts = useAccounts()
    const [referralLink, setReferralLink] = useState("")
    const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
    useEffect(() => {
        if(refCode !== '') {
            setReferralLink(window.location.origin + '/home?ref=' + refCode)
        }
        else {
            setReferralLink('')
        }
    }, [refCode])
    useEffect(() => {
        console.log('metamask: ', metaMask)
    }, [])
    
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
    }));
      
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function createData(NAME, AMOUNT, CASJBACL, DATE_TIME) {
        return { address: NAME, amount: AMOUNT, cashback:CASJBACL, createdAt:DATE_TIME };
    }
      
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, '24T'),
        createData('Ice cream sandwich', 237, 9.0, '37T'),
        createData('Eclair', 262, 16.0, '24T'),
        createData('Cupcake', 305, 3.7, '67T'),
        createData('Gingerbread', 356, 16.0, '49T'),
        createData('Gingerbread', 356, 16.0, '49T'),
        createData('Gingerbread', 356, 16.0, '49T'),
        createData('Gingerbread', 356, 16.0, '49T'),
        createData('Gingerbread', 356, 16.0, '49T'),
        createData('Gingerbread', 356, 16.0, '49T'),
        createData('Gingerbread', 356, 16.0, '49T'),
        createData('Gingerbread', 356, 16.0, '49T'),
        createData('Gingerbread', 356, 16.0, '49T'),
        createData('Gingerbread', 356, 16.0, '49T'),
        createData('Gingerbread', 356, 16.0, '49T'),
        createData('Gingerbread', 356, 16.0, '49T'),
        createData('Gingerbread', 356, 16.0, '49T'),
    ];

    const connectToMetamask = () => {
        metaMask
            .activate(Injected)
            .then(
                console.log("successfully connected!!!")
            )
            .catch(err => {
                    console.log("connection failed!!")
                }
            )
    }

    const disConnectMetamask = () => {
        metaMask
            .activate(NullInjected)
            .then(
                console.log("successfully connected!!!")
            )
            .catch(err => {
                    console.log("connection failed!!")
                }
            )
    }

    const clickDepositBtn = () => {
        if(accounts && accounts.length > 0) {
            showDepositModal()
        }
        else {
            popup('plesae connect wallet')
        }
    }

    const clickWithdrwaBtn = () => {
        if(accounts && accounts.length > 0) {
            showWithdrawModal()
        }
        else {
            popup('plesae connect wallet')
        }
    }

    const clicCopyRefCodeBtn = () => {
        if(accounts && accounts.length > 0 && referralLink !== '') {
            copyTextToClipboard(referralLink)
        }
        else {
            
        }
    }

    return (
        <div className="referral-page monkey-page">
             {/* <div className='title'>
                <span className='user-name title-text gradient-text-1'>Hello Allan</span>
            </div> */}
            {/* {
                accounts && accounts.length > 0
                    // ?   <div>
                    //         <p className='wallet-address description-text'>{accounts[0]}</p>
                    //         <Button className='empeperor-btn disconnect-btn' onClick={()=>disConnectMetamask()}>DISCONNECT</Button>
                    //     </div>
                    ?   isMobile
                        ?   <p className='wallet-address description-text'>{`${accounts[0].substring(0, 15)}...${accounts[0].slice(-5)}`}</p>
                        :   <p className='wallet-address description-text'>{accounts[0]}</p>
                    :   <></>
            } */}
            <div className='info-content'>
                <ContainerComponent className="user-info">
                    <p className='content-title title-text'>assets</p>
                    <div className='sub-info'>
                        <p className='info-title description-text'>Balance</p>
                        <p className='info-value description-text'>{tokenBalance}</p>
                    </div>
                    <div className='sub-info'>
                        <p className='info-title description-text'>Value in USD</p>
                        <p className='info-value description-text'>${Number(tokenUsdBalance).toFixed(3)}</p>
                    </div>
                    <div className='btns'>
                        <Button className='deposit-btn description-text' onClick={()=>clickDepositBtn()}>DEPOSIT</Button>
                        <Button className='withdraw-btn description-text' onClick={()=>clickWithdrwaBtn()}>WITHDRAW</Button>
                    </div>
                </ContainerComponent>
                <ContainerComponent className="referral-info">
                    <p className='content-title title-text'>referral code</p>
                    <div className='copy-referral'>
                        {
                            referralLink === '' 
                                ?   <p className='description-text'>You can get it after depositing $20 worth.</p>
                                :   <a target='_blank' href={referralLink}>{`${referralLink.substring(0, 30)}...${referralLink.slice(-5)}`}</a>
                        }
                        
                        {
                            referralLink !== '' &&
                            <AiOutlineCopy className="link-copy" onClick={()=>clicCopyRefCodeBtn()}/>
                        }
                        
                    </div>
                    <div className='ref-deposit-history'>
                        <div>
                            <div className='sub-info'>
                                <p className='info-title description-text'>AVAILABLE EARNINGS</p>
                                <p className='info-value description-text'>{withdrawableBalance} EMPEPE</p>
                            </div>
                            <div className='sub-info'>
                                <p className='info-title description-text'>ACCUMULATED REFERRAL</p>
                                <p className='info-value description-text'>{accumulatedReferral} EMPEPE</p>
                            </div>
                        </div>
                        <img className='rank-image' src={rankImgs[rank]}></img>
                    </div>
                </ContainerComponent>
                
            </div>
                <ContainerComponent className="referral-history">
                    <p className='content-title title-text'>referral history</p>
                    <TableContainer component={Paper} className='empeperor-table'>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <tr>
                                <th>NAME</th>
                                {refRewards.map((row) => (
                                    <td>{row.address}</td>
                                ))}
                            </tr>
                            <tr>
                                <th>AMOUNT</th>
                                {refRewards.map((row) => (
                                    <td>{row.amount}</td>
                                ))}
                            </tr>
                            <tr>
                                <th>%&nbsp;CASHBACK</th>
                                {refRewards.map((row) => (
                                    <td>{row.cashback}</td>
                                ))}
                            </tr>
                            <tr>
                                <th>DATE/TIME</th>
                                {refRewards.map((row) => (
                                    <td>{(row.createdAt.split('T'))[0]}</td>
                                ))}
                            </tr>
                            {/* <TableHead>
                                <TableRow>
                                    <StyledTableCell>NAME</StyledTableCell>
                                    <StyledTableCell align="left">AMOUNT</StyledTableCell>
                                    <StyledTableCell align="left">%&nbsp;CASHBACK</StyledTableCell>
                                    <StyledTableCell align="left">DATE/TIME</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {refRewards.map((row) => (
                                <StyledTableRow key={row.address}>
                                    <StyledTableCell scope="row">
                                        {row.address}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.amount}</StyledTableCell>
                                    <StyledTableCell align="left">{row.cashback}</StyledTableCell>
                                    <StyledTableCell align="left">{(row.createdAt.split('T'))[0]}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody> */}
                        </Table>
                    </TableContainer>
                </ContainerComponent>

        </div>
    );
}

const mapStateToProps = (state) => ({
    tokenBalance: state.userData.tokenBalance,
    tokenUsdBalance: state.gameData.tokenUsdBalance,
    withdrawableBalance: state.userData.withdrawableBalance,
    accumulatedReferral: state.userData.accumulatedReferral,
    refCode: state.userData.refCode,
    rank: state.userData.rank,
    refRewards: state.userData.refRewards
    
});
export default connect(mapStateToProps, {
    showDepositModal, showWithdrawModal, getUsdBalance
})(ReferralPage);