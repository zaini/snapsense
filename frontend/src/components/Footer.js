import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {

  return (
    <footer>
      <ul>
        <li><Link to='/sign-up'>Privacy</Link></li>
        <li><Link to='/'>Terms</Link></li>
        <li><Link to='/'>Support</Link></li>
      </ul>
      <span>&copy;{new Date().getFullYear()} SNAPSENSE | All rights reserved</span>
    </footer>
  );
}

export default Footer;