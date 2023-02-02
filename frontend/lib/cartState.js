const { createContext, useState, useContext } = require('react');

const CartStateContext = createContext(false);

export const CartStateContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);

  return (
    <CartStateContext.Provider value={{ isOpen, toggleCart }}>{children}</CartStateContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
