import { useState, useEffect } from "react";
import { Modal, CircularProgress, Box, Button } from '@mui/material';
import {connect} from 'react-redux'
import { ImCancelCircle } from "react-icons/im";
import { BsCheckCircleFill } from "react-icons/bs";

import './index.scss';
import { changeCurrentPage, popup, setLoadingDeposit } from '../../actions/gameActions'
import { getUserData, setTokenBalance, setTokenUsdBalance, checkServerConnection } from '../../actions/userActions'

import { writeDepositResultToServer } from '../../actions/transactinActions'

import { getGasFee, deposit, getBalance } from "../../utils/interact";

const DepositModal = (props) => {
    const { show, onHide, tokenBalance, setLoadingDeposit, loadingDeposit, getUserData, setTokenBalance, walletAddress } = props
    const [depositAmount, setDepositAmount] = useState(0);
    const [sentAmount, setSentAmount] = useState(0);
    const [gasFee, setGasFee] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    useEffect(() => {
        console.log("show: ", show)
        const initGasfee = async () => {
            const gasFee = await getGasFee()
            setGasFee(gasFee)
        }
        initGasfee()
    }, [show]);

    const handleDeposit = async () => {
        if(Number(depositAmount) >= Number(tokenBalance)) {
            popup("insufficient balance!")
            return
        }
        const netStatus = await checkServerConnection()
        if(!netStatus) {
            popup('The connection to the server has been lost.')
            return
        }
        setLoadingDeposit(true)
        setSentAmount(depositAmount)
        let result = true;
        result = await deposit(walletAddress, depositAmount)
        if(result) {
            result = await writeDepositResultToServer(walletAddress, depositAmount)
        }
        setLoadingDeposit(false);
        setShowResult(true)
        if(result === true) {
            setIsSuccess(true)
            getUserData(walletAddress)
            const _balance = await getBalance(walletAddress)
            setTokenBalance(_balance)
        }
        else {
            setIsSuccess(false)
        }
    }

    return (

        <Modal open={show} onClose={onHide} 
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description" 
            className="empeperor-modal deposit-modal"
        >
            <div className="modal-content">
                <div className='modal-header'>
                    <span className='title title-text'>DEPOSIT</span>
                    
                </div>
                <p className="description-text withdraw-alert">After 30 days, you can withdraw on this deposit and receive additional cashback.</p>
                <div className='modal-body'>
                
                    <div className="deposit-settings">
                        <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className="sub-title description-text">Gas fee: {Number(gasFee).toFixed(6)}</p>
                            <p className="sub-title description-text">Wallet Balance: <span className="sub-title description-text">{Number(tokenBalance).toFixed(3)}</span></p>
                        </Box>
                        <div className="deposit-amount">
                            <input className="deposit-amount-input description-text" value={depositAmount} onChange={(e)=>setDepositAmount(e.target.value)} type="number"></input>  
                            <Button color="success" className="max-btn description-text">MAX</Button>
                        </div>
                    </div>
                    <Button variant="contained" size="medium" className="deposit-btn description-text" disabled={loadingDeposit} onClick={()=>handleDeposit()}>
                        {loadingDeposit?<><CircularProgress className="pending-spinner" sx={{ width: '30px', height: '30px' }} color="inherit" />PENDING</>:"DEPOSIT"}
                    </Button>
                </div>
                {
                    showResult &&
                    (
                        isSuccess ?
                            <div className="recent-transaction-history">
                                <div className="status">
                                    <p className="description-text white-text">Deposit</p>
                                    <div className="success-box">
                                        <BsCheckCircleFill className="greenyellow-text description-text" />
                                        <strong className="greenyellow-text description-text"> Success</strong>
                                    </div>
                                </div>
                                <p className="description-text white-text">{sentAmount}</p>
                            </div>
                            :
                            <div className="recent-transaction-history">
                                <div className="status">
                                    <p className="description-text white-text">Deposit</p>
                                    <div className="success-box">
                                        <ImCancelCircle/>
                                        <strong> Failed</strong>
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        </Modal>
    );
}

const mapStateToProps = (state) => (
    {
        tokenBalance: state.userData.tokenBalance,
        loadingDeposit: state.gameData.loadingDeposit,
        walletAddress: state.userData.walletAddress
    }
)
export default connect(mapStateToProps, {changeCurrentPage, setLoadingDeposit, getUserData, setTokenBalance, setTokenUsdBalance})(DepositModal)
//https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png