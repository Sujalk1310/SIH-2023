// Layout.js
import React from 'react';
import GoogleTranslate from './GoogleTranslate';

const Layout = ({ children }) => {
  return (
    <div>
      <div className="position-fixed bottom-0 start-0 m-3 trans">
        <label for="language-select">Select Language:</label>
        <GoogleTranslate lang="en" />
      </div>
      {children}
    </div>
  );
};

export default Layout;
