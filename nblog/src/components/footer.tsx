import React, { JSX } from 'react';

function Footer(): JSX.Element {
  return (
    <footer style={{ textAlign: 'center', padding: '1rem', background: '#f1f1f1' }}>
      <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
