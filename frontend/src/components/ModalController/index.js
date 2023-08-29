import {connect} from 'react-redux'

import { hideDepositModal, hideWithdrawModal } from '../../actions/gameActions'
import DepositModal from '../DepositModal';
import WithdrawModal from '../WithdrawModal';

const ModalController = (props) => {
    const { 
      hideDepositModal,
      hideWithdrawModal,
      displayDepositModal,
      displayWithdrawModal } = props;
    
    return (
      <>
        <DepositModal show={displayDepositModal} onHide={() => hideDepositModal()} />
        <WithdrawModal show={displayWithdrawModal} onHide={() => hideWithdrawModal()} />
      </>    
    );
}

const mapStateToProps  = (state) => (
  {
    displayDepositModal: state.gameData.displayDepositModal,
    displayWithdrawModal: state.gameData.displayWithdrawModal,
  }
)

export default connect(mapStateToProps, { hideDepositModal, hideWithdrawModal })(ModalController)