import { useState, useEffect } from "react";
import { Modal, CircularProgress, Box, Button } from '@mui/material';
import {connect} from 'react-redux'
import { ImCancelCircle } from "react-icons/im";
import { BsCheckCircleFill } from "react-icons/bs";

import './index.scss';
import { changeCurrentPage, popup, setLoadingWithdraw } from '../../actions/gameActions'
import { getUserData, setTokenBalance, setTokenUsdBalance } from '../../actions/userActions'

import { getGasFee, getBalance, getUSDBalance } from "../../utils/interact";
import { withdraw } from '../../actions/transactinActions'

const WithdrawModal = (props) => {
    const { show, onHide, withdrawableBalance, getUserData, loadingWithdraw, setLoadingWithdraw, setTokenBalance, walletAddress } = props
    const [withdrawAmount, setWithdrawAmount] = useState(0);
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

    useEffect(() => {
        console.log("loadingWithdraw: ", loadingWithdraw)
        
    }, [loadingWithdraw]);

    const handleWithdraw = async () => {
        if(Number(withdrawAmount) >= Number(withdrawableBalance)) {
            popup("insufficient balance!")
            return
        }
        setLoadingWithdraw(true);
        const result = await withdraw(walletAddress, withdrawAmount)
        setLoadingWithdraw(false);
        setShowResult(true)
        console.log("result: ", result)
        if(result.status === "success") {
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
            className="empeperor-modal withdraw-modal"
        >
            <div className="modal-content">
                <div className='modal-header'>
                    <span className='title title-text'>WITHDRAW</span>
                </div>
                <div className='modal-body'>
                    <div className="withdraw-settings">
                        <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className="sub-title description-text">Gas fee: {Number(gasFee).toFixed(6)}</p>
                            <p className="sub-title description-text">Withdrawable: <span className="sub-title description-text">{Number(withdrawableBalance).toFixed(3)}</span></p>
                        </Box>
                        <div className="withdraw-amount">
                            <input className="withdraw-amount-input description-text" value={withdrawAmount} onChange={(e)=>setWithdrawAmount(e.target.value)} type='number'></input>  
                            <Button color="success" className="max-btn description-text">MAX</Button>
                        </div>
                    </div>
                    <Button variant="contained" size="medium" onClick={handleWithdraw} disabled={loadingWithdraw} className="withdraw-btn description-text">
                        {loadingWithdraw?<><CircularProgress className="pending-spinner" sx={{ width: '30px', height: '30px' }} color="inherit" />PENDING</>:"WITHDRAW"}
                    </Button>
                </div>
                {
                    showResult &&
                    (
                        isSuccess ?
                            <div className="recent-transaction-history">
                                <div className="status">
                                    <p className="description-text white-text">Withdraw</p>
                                    <div className="success-box">
                                        <BsCheckCircleFill className="greenyellow-text description-text" />
                                        <strong className="greenyellow-text description-text"> Success</strong>
                                    </div>
                                </div>
                                <p className="description-text white-text">{withdrawAmount}</p>
                            </div>
                            :
                            <div className="recent-transaction-history">
                                <div className="status">
                                    <p className="description-text white-text">Withdraw</p>
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
        withdrawableBalance: state.userData.withdrawableBalance,
        loadingWithdraw: state.gameData.loadingWithdraw,
        walletAddress: state.userData.walletAddress
    }
)
export default connect(mapStateToProps, {changeCurrentPage, setLoadingWithdraw, getUserData, setTokenBalance, setTokenUsdBalance})(WithdrawModal)
//https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png