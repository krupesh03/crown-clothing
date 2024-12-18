import React from 'react';
import { useNavigate } from 'react-router-dom';
import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
    const navigate = useNavigate(); //this is for storing the navigate route for history
    return ( 
        <div className={`menu-item ${size}`} onClick={ () => navigate(`${linkUrl}`)}>
            <div style={ { backgroundImage : `url(${imageUrl})` } } className='background-image' />
            <div className='content'>
                <h1 className='title'>{ title.toUpperCase() }</h1>
                <span className='subtitle'>SHOP NOW</span>
            </div>
        </div>
        );
};

export default MenuItem;