/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {AiOutlinePlusSquare, AiOutlineMinusSquare} from 'react-icons/ai'
import Popup from 'reactjs-popup'
import {BiRupee} from 'react-icons/bi'
import {MdDeleteOutline} from 'react-icons/md'
import CartItemsContext from '../../context/CartItemsContext'
import './index.css'

class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: props.itemDetails.quantity || 1,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {quantity} = this.state
    if (prevState.quantity !== quantity) {
      this.updateQuantityInContext()
    }
  }

  updateQuantityInContext = () => {
    const {itemDetails} = this.props
    const {quantity} = this.state
    const foodItem = {...itemDetails, quantity}

    const {updateQuantity} = this.context // Destructuring context
    updateQuantity(foodItem) // Using destructured context function
  }

  onIncrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onDecrement = () => {
    const {DeleteCartItem, itemDetails} = this.props
    this.setState(prevState => {
      if (prevState.quantity === 1) {
        const {id} = itemDetails
        DeleteCartItem(id) // Call to delete item
        return {quantity: 0} // Set quantity to 0 to remove from UI
      }
      return {quantity: prevState.quantity - 1} // Decrement normally
    })
  }

  render() {
    const {itemDetails, DeleteCartItem} = this.props
    const {id, imageUrl, name, cost, restaurantName} = itemDetails
    const {quantity} = this.state

    return (
      <li className="cart-item" testid="cartItem">
        <div className="image-name-box">
          <img src={imageUrl} alt={name} className="cart-item-image" />
          <div className="item-details">
            <h1 className="cart-item-name">{name}</h1>
            <h5 className="cart-item-rest-name">from {restaurantName}</h5>
          </div>
        </div>
        <div className="quantity-box">
          <AiOutlineMinusSquare
            className="cart-item-quantity-icon"
            onClick={this.onDecrement}
            testid="decrement-quantity"
          />
          <p className="cart-item-quantity" testid="item-quantity">
            {quantity > 0 ? quantity : null}{' '}
            {/* Prevent rendering if quantity is 0 */}
          </p>
          <AiOutlinePlusSquare
            className="cart-item-quantity-icon"
            onClick={this.onIncrement}
            testid="increment-quantity"
          />
        </div>
        <div className="cart-price-box">
          <p className="cart-item-price">
            <BiRupee /> {quantity > 0 ? quantity * cost : 0}
          </p>
        </div>
        <Popup
          modal
          className="popup-content"
          trigger={<MdDeleteOutline className="delete-icon" />}
        >
          {close => (
            <div className="logout-popup-box">
              <h2 className="are-you-sure-text">
                Are you sure you want to delete {name}?
              </h2>
              <div className="buttons-box">
                <button className="cancel-button" onClick={close} type="button">
                  Cancel
                </button>
                <button
                  className="btn confirm"
                  onClick={() => {
                    DeleteCartItem(id)
                    close()
                  }}
                  type="button"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </Popup>
      </li>
    )
  }
}

CartItem.contextType = CartItemsContext

export default CartItem
