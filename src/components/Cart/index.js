/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'
import NoCartView from '../../IMG/NoCartView.png'
import SuccessTick from '../../IMG/SuccessTickImg.png'
import './index.css'

class Cart extends Component {
  state = {
    itemsList: [],
    placeOrder: false,
  }

  componentDidMount() {
    const itemsList = JSON.parse(localStorage.getItem('cart_items')) || []
    this.setState({itemsList})
  }

  onPlaceOrder = () => {
    this.setState({placeOrder: true})
    localStorage.removeItem('cart_items')
  }

  renderEmptyCartView = () => (
    <>
      <Header />
      <div className="empty-cart-box">
        <img src={NoCartView} alt="empty cart" className="bowl-image" />
        <h2 className="no-orders-text">No Order Yet!</h2>
        <p className="cart-empty-text">
          Your cart is empty. Add something from the menu.
        </p>
        <Link to="/">
          <button className="order-btn" type="button">
            Order now
          </button>
        </Link>
      </div>
    </>
  )

  renderPaymentSuccessView = () => (
    <>
      <Header />
      <div className="payment-container">
        <img
          src={SuccessTick}
          alt="Payment Successful"
          className="pay-success-img"
        />
        <h1 className="pay-success-text">Payment Successful</h1>
        <p className="thanks-text">
          Thank you for ordering. Your payment is successfully completed.
        </p>
        <Link to="/">
          <button className="go-to-home-btn" type="button">
            Go To Home Page
          </button>
        </Link>
      </div>
    </>
  )

  DeleteCartItem = id => {
    // const {itemsList} = this.state
    // const updatedList = itemsList.filter(item => item.id !== id)
    // this.setState({itemsList: updatedList})
    // localStorage.setItem('cart_items', JSON.stringify(updatedList))
    this.setState(prevState => {
      const updatedList = prevState.itemsList.filter(item => item.id !== id)
      localStorage.setItem('cart_items', JSON.stringify(updatedList))
      return {itemsList: updatedList}
    })
  }

  handleRefresh = () => {
    window.location.reload()
  }

  renderCartItems = () => {
    const {itemsList} = this.state
    const finalPrice = itemsList.reduce(
      (total, item) => total + item.cost * item.quantity,
      0,
    )

    return (
      <>
        <Header />
        <div className="cart-container">
          <div className="cart-responsive-box">
            <div className="t-header">
              <h1 className="t-h-item">Item</h1>
              <h1 className="t-h-item">Quantity</h1>
              <h1 className="t-h-item">Price</h1>
            </div>
            <ul className="cart-items-list">
              {itemsList.map(item => (
                <CartItem
                  key={item.id}
                  itemDetails={item}
                  DeleteCartItem={this.DeleteCartItem}
                />
              ))}
              <hr className="cart-items-line" />
            </ul>
            <div className="total-price-box">
              <h1 className="order-total-text">Order Total:</h1>
              <div className="box">
                <p className="total-price" testid="total-price">
                  <BiRupee /> {finalPrice}
                </p>

                <button
                  className="place-order-btn"
                  onClick={this.handleRefresh}
                  type="button"
                >
                  Refresh
                </button>
              </div>
            </div>
            <div className="place-order-ref-btn-box">
              <button
                className="place-order-btn"
                onClick={this.onPlaceOrder}
                type="button"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  render() {
    const {itemsList, placeOrder} = this.state

    if (itemsList.length === 0) {
      return this.renderEmptyCartView()
    }

    if (placeOrder) {
      return this.renderPaymentSuccessView()
    }

    return this.renderCartItems()
  }
}

export default Cart
