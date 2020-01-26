import React from 'react';
import { colors, spacing } from './variables';

const Header = () => (
  <header className="header-wrapper">
    <h2>Click Get Accounts to download data</h2>
    <style jsx>
      {`
        .header-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: ${colors.primary};
          margin-bottom: ${spacing.xl};
        }
      `}
    </style>
  </header>
);

export default Header;
