import React from 'react';
import { useNavigate } from "react-router-dom";

const LogoHeader = (props) => {
    const navigate = useNavigate()
    const {history} = props;
    const goToHome = () => {
        navigate("/");
    }
    return (
        <>
            <div className='logo-header' onClick={()=>goToHome()}>
                
            </div>
        </>
    )
}

export default LogoHeader;