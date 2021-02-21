import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {

  return (
    <footer>
      <ul>
        <li><Link to='/'>Privacy</Link></li>
        <li><Link to='/'>Terms</Link></li>
        <li><Link to='/'>Support</Link></li>
      </ul>
      <span>&copy;{new Date().getFullYear()} <li><Link to='/'>SNAPSENSE</Link></li> | All rights reserved</span>
    </footer>
  );
}

export default Footer;