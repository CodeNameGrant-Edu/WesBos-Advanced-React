import React from 'react';
import PropTypes from 'prop-types';

export default function Page({ children }) {
  return (
    <div>
      <h2>I amd the page component</h2>
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any
};
