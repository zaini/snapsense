import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/sign-up'>How it works</Link>
            <Link to='/'>About</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
        <div className='footer-link-wrapper'>
        <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
          </div>
        </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              SOMELOGO
              <i class='fab fa-typo3' />
            </Link>
          </div>
          <small class='website-rights'>SOMELOGO © 2021</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;