import React from 'react';
import Nav from './Nav';

export default function Header() {
  return (
    <header>
      <div className="bar">
        <Nav />
      </div>
      <div className="sub-bar">Search:</div>
    </header>
  );
}
