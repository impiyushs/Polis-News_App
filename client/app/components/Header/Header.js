import React from 'react';
import '../style.css';

import { Link } from 'react-router-dom';

const Header = () => (
  <header id= "header">
    <Link to="/">Home</Link>
    <hr />
  </header>
);

export default Header;
