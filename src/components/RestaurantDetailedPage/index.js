import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import FoodItem from '../FoodItem'
import Footer from '../Footer'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_Progress: 'IN_PROGRESS',
  failed: 'FAILED',
}

class RestaurantDetailedPage extends Component {
  state = {
    apiStatus: apiConstants.initial,
    restaurantDetails: {},
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({apiStatus: apiConstants.in_Progress})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const res = await fetch(url, options)
      if (res.ok) {
        const data = await res.json()
        const updatedData = {
          costForTwo: data.cost_for_two,
          cuisine: data.cuisine,
          foodItems: data.food_items.map(e => ({
            id: e.id,
            cost: e.cost,
            foodType: e.food_type,
            imageUrl: e.image_url,
            name: e.name,
            rating: e.rating,
          })),
          imageUrl: data.image_url,
          itemsCount: data.items_count,
          location: data.location,
          name: data.name,
          opensAt: data.opens_at,
          rating: data.rating,
          reviewsCount: data.reviews_count,
        }
        this.setState({
          restaurantDetails: updatedData,
          apiStatus: apiConstants.success,
        })
      } else {
        console.error('Error fetching restaurant details:', res.statusText)
        this.setState({apiStatus: apiConstants.failed})
      }
    } catch (error) {
      console.error('Error fetching restaurant details:', error)
      this.setState({apiStatus: apiConstants.failed})
    }
  }

  renderLoader = () => (
    <div className="cart-loader-box" data-testid="loader">
      <Loader color="#F7931E" height={50} width={50} type="Oval" />
    </div>
  )

  renderRestaurantDetails = () => {
    const {restaurantDetails} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
      foodItems,
    } = restaurantDetails

    return (
      <>
        <div className="rest-banner-box">
          <div className="rest-image-details">
            <img src={imageUrl} alt="rest-banner" className="rest-d-image" />
            <div className="rest-d-details">
              <h1 className="rest-d-name">{name}</h1>
              <h5 className="rest-d-cuisine">{cuisine}</h5>
              <h4 className="rest-d-location">{location}</h4>
              <div className="rest-d-rating-cost-for-two-box">
                <div className="rest-review-rating-box">
                  <div className="rest-d-rating-box">
                    <AiFillStar color="#ffffff" />
                    <h4 className="rest-d-rating">{rating}</h4>
                  </div>
                  <h4 className="rest-d-reviews-count">
                    {reviewsCount}+ Ratings
                  </h4>
                </div>
                <h1 className="rest-d-separation-pipe">|</h1>
                <div className="rest-d-cost-for-two-box">
                  <h3 className="rest-d-cost-for-two-amount">
                    <BiRupee /> {costForTwo}
                  </h3>
                  <h5 className="rest-d-cost-for-two-text">Cost for two</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-container">
          {foodItems.map(e => (
            <FoodItem foodItemDetails={e} restaurantName={name} key={e.id} />
          ))}
        </ul>
      </>
    )
  }

  renderRestaurantDetailsRespectiveView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderRestaurantDetails()
      case apiConstants.in_Progress:
        return this.renderLoader()
      case apiConstants.failed:
        return this.failedView() // Make sure to implement this method if not already done.
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    return (
      <div className="rest-details-container">
        <Header />
        <div className="rest-details-responsive-box">
          {this.renderRestaurantDetailsRespectiveView()}
          {apiStatus === apiConstants.success && <Footer />}
        </div>
      </div>
    )
  }
}

export default RestaurantDetailedPage
