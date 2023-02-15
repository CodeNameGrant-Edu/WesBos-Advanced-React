const { createContext, useState, useContext } = require('react');

const CartStateContext = createContext(false);

export const CartStateContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <CartStateContext.Provider value={{ isOpen, toggleCart, close }}>
      {children}
    </CartStateContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
