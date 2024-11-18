const calculateTotal = (cart) => {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
}   
export default calculateTotal;