import React from 'react'
import playstore from '../../../images/playstore.png';
import appstore from '../../../images/Appstore.png';
import './Footer.css';


const Footer = () => {
    return (
        <footer id = 'footer'>
            <div className='leftfooter'>
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download app for android and ios app </p>
                <img src={playstore} alt="playstore" />
                <img src={appstore} alt="appstore" />

            </div>

            <div className='rightfooter'>
                <h4>Aquafresh</h4>
                <h5>Provides you the best products</h5>
                <p>Copyrights 2021 &copy; Divyanshu singh</p>
            </div>

        </footer>
    )
}

export default Footer

