import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import APIAddress from '../Utils/APIPaths';
import './Cart.css';

const Cart = () => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [quantityInStock, setQuantityInStock] = useState('');
  const [response, setResponse] = useState(null);
  // State to store the list of cart items
  const [cartItems, setCartItems] = useState([]);

  //const [loggedIn, setLoggedIn] = useState(true); // Set to true for the initial example

  const handleLogout = () => {
    // Perform any necessary logout logic
   // setLoggedIn(false);

    // Reload the page
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(APIAddress.createCartItem, {
        itemName,
        price: parseInt(price, 10), // assuming price is an integer
        quantityInStock: parseInt(quantityInStock, 10), // assuming quantityInStock is an integer
      
      });
      setResponse(response.data);
      fetchCartItems();
    } catch (error) {
      console.error('Error creating cart item:', error);
    }
  };


  const fetchCartItems = () => {
    fetch(APIAddress.fetchCartItems)
      .then((response) => response.json())
      .then((data) => setCartItems(data))
      .catch((error) => console.error('Error fetching cart items:', error));
  };

  const handleDeleteItem = (itemID) => {
    // Display a confirmation alert
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');

    // If the user confirms, proceed with the deletion
    if (isConfirmed) {
      axios.get(`${APIAddress.deleteCartItem}/${itemID}`)
        .then((response) => {
          console.log(response.data); // Log the response from the delete API if needed
          fetchCartItems(); // Refresh the cart items after deletion
        })
        .catch((error) => {
          console.error('Error deleting cart item:', error);
        });
    }};


    const handleEditItem = (item) => {
      // Display an alert with editable inputs preloaded with the current values
      const itemName = prompt('Edit Item Name:', item.itemName);
      const price = prompt('Edit Price:', item.price);
      const quantityInStock = prompt('Edit Quantity In Stock:', item.quantityInStock);
  
      // If the user clicks OK, proceed with the update
      if (itemName !== null && price !== null && quantityInStock !== null) {
        const updatedItem = {
          itemName: itemName,
          price: parseInt(price, 10),
          quantityInStock: parseInt(quantityInStock, 10),
        };

    // Convert the updatedItem object to a query string
    const queryString = Object.entries(updatedItem)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  
        // Call the update API
        axios.get(`${APIAddress.updateCartItem}/${item.itemID}?${queryString}`)
          .then((response) => {
            console.log(response.data); // Log the response from the update API if needed
            fetchCartItems(); // Refresh the cart items after update
          })
          .catch((error) => {
            console.error('Error updating cart item:', error);
          });
      }
    };


  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
   
    <div className="cart-manage-page">
       <div><button className='logout-button' onClick={handleLogout}>Logout</button></div>
      
      <div className='add-cart-item-form'>
      <form onSubmit={handleSubmit}>
        <div className='itemName_input'>

          <input type="text" value={itemName} placeholder ="Item Name" onChange={(e) => setItemName(e.target.value)} />
        </div>
        <div className='price_input'>

          <input type="text" value={price} placeholder ="Price" onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>

          <input
            type="text"
            value={quantityInStock}  placeholder ="Quantity in Stock"
            className='quantity_input'
            onChange={(e) => setQuantityInStock(e.target.value)}
          />
        </div>
        <button type="submit">SUBMIT</button>
      </form>

      {response && (
        <div>
          <h3>Record Added Successfully</h3>
        </div>
      )}

</div>

<h2>Cart Items</h2>

<div className="cart-container">
        {cartItems.map((item) => (
          <div key={item.itemID} className="cart-item">
            <div className="item-details">
              <p>ID: {item.itemID}</p>
              <p>Name: {item.itemName}</p>
              <p>Price: {item.price}</p>
              <p>Quantity In Stock: {item.quantityInStock}</p>
            </div>
            <div className="item-actions">
               <button onClick={() => handleEditItem(item)}>Edit</button>
              <button onClick={() => handleDeleteItem(item.itemID)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

     

    </div>
  );
};

export default Cart;
