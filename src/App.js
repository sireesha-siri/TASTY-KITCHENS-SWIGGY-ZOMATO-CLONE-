import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import CartItemsContext from './context/CartItemsContext'
import RestaurantDetailedPage from './components/RestaurantDetailedPage'
import PageNotFound from './components/PageNotFound'
import './App.css'

class App extends Component {
  state = {
    cartItems: JSON.parse(localStorage.getItem('cart_items')) || [],
  }

  updateLocalStorage = items => {
    localStorage.setItem('cart_items', JSON.stringify(items))
  }

  setCartItems = newItem => {
    this.setState(prevState => {
      const existingItem = prevState.cartItems.find(
        item => item.id === newItem.id,
      )
      const updatedCartItems = existingItem
        ? prevState.cartItems.map(item =>
            item.id === newItem.id
              ? {...item, quantity: newItem.quantity}
              : item,
          )
        : [...prevState.cartItems, newItem]
      this.updateLocalStorage(updatedCartItems)
      return {cartItems: updatedCartItems}
    })
  }

  updateQuantity = item => {
    this.setState(prevState => {
      const updatedCartItems = prevState.cartItems.map(cartItem =>
        cartItem.id === item.id
          ? {...cartItem, quantity: item.quantity}
          : cartItem,
      )
      this.updateLocalStorage(updatedCartItems)
      return {cartItems: updatedCartItems}
    })
  }

  render() {
    const {cartItems} = this.state
    return (
      <CartItemsContext.Provider
        value={{
          cartItems,
          setCartItems: this.setCartItems,
          updateQuantity: this.updateQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute
            exact
            path="/restaurants-list/:id"
            component={RestaurantDetailedPage}
          />
          <Route path="/bad-path" component={PageNotFound} />
          <Redirect to="/bad-path" />
        </Switch>
      </CartItemsContext.Provider>
    )
  }
}

export default App
