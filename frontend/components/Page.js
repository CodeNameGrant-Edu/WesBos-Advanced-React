import React from 'react';

export default function Page({ children }) {
  return (
    <div>
      <h2>I am the PAge Component</h2>
      {children}
    </div>
  );
}
