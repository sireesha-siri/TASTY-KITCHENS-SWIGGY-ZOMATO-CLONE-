import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import {BiRupee} from 'react-icons/bi'
import {
  AiFillStar,
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
} from 'react-icons/ai'
import CartItemsContext from '../../context/CartItemsContext'

import './index.css'

class FoodItem extends Component {
  state = {
    quantity: 0,
    open: false,
  }

  onIncrease = () => {
    this.setState(prev => ({quantity: prev.quantity + 1}))
  }

  onDecrease = () => {
    this.setState(prev => ({quantity: prev.quantity - 1}))
  }

  goToCart = () => {
    const {history} = this.props
    history.replace('/cart')
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({open: false})
  }

  render() {
    const {open, quantity} = this.state // Destructuring state properties
    const {foodItemDetails, restaurantName} = this.props
    const {id, name, cost, rating, imageUrl} = foodItemDetails
    const vertical = 'bottom'
    const horizontal = 'right'

    const action = (
      <>
        <Button color="secondary" size="small" onClick={this.goToCart}>
          VIEW CART
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={this.handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </>
    )

    return (
      <CartItemsContext.Consumer>
        {value => {
          const {setCartItems} = value
          const onToggle = () => {
            this.setState({quantity: 1})
          }

          const onAddItem = () => {
            const foodItem = {
              cost,
              quantity,
              id,
              imageUrl,
              name,
              restaurantName,
            }
            setCartItems(foodItem)
            this.setState({open: true})
          }

          return (
            <li className="food-item">
              <img src={imageUrl} alt="food item" className="food-item-image" />
              <div className="food-item-details">
                <h3 className="food-item-name">{name}</h3>
                <h4 className="food-item-cost">
                  <BiRupee /> {cost}
                </h4>
                <h3 className="food-item-rating">
                  <AiFillStar className="star" /> {rating}
                </h3>
                {quantity > 0 ? (
                  <div className="add-btn-box">
                    <div className="add-box">
                      <AiOutlineMinusSquare
                        className="add-buttons"
                        onClick={this.onDecrease}
                      />
                      <span className="food-quantity">{quantity}</span>
                      <AiOutlinePlusSquare
                        className="add-buttons"
                        onClick={this.onIncrease}
                      />
                    </div>
                    <button
                      type="button"
                      className="add-item-btn"
                      onClick={onAddItem}
                      disabled={open}
                    >
                      ADD
                    </button>
                  </div>
                ) : (
                  <button
                    className="add-item-btn"
                    onClick={onToggle}
                    type="button"
                  >
                    ADD
                  </button>
                )}
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={this.handleClose}
                  message="Item Added to Cart"
                  action={action}
                  anchorOrigin={{vertical, horizontal}}
                  key={vertical + horizontal}
                  severity="success"
                />
              </div>
            </li>
          )
        }}
      </CartItemsContext.Consumer>
    )
  }
}

export default withRouter(FoodItem)
