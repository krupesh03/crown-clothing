import React from 'react';
import './menu-item.styles.scss';

const MenuItem = ({ displaytitle, displayimageUrl, displaysize }) => (
    <div className={`menu-item ${displaysize}`}>
        <div style={ { backgroundImage : `url(${displayimageUrl})` } } className='background-image' />
        <div className='content'>
            <h1 className='title'>{ displaytitle.toUpperCase() }</h1>
            <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
);

export default MenuItem;