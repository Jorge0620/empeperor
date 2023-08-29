import React from 'react';
import './index.scss';

const ContainerComponent = (props) => {
    const { children, className } = props;
    return (
        <div className={`custom-container-component ${className}`}>
            {children}
        </div>
    )
}

export default ContainerComponent;