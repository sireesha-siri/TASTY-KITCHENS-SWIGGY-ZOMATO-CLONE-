import Cookies from 'js-cookie'
import {Component} from 'react'
import Slider from 'react-slick'
import {BsFilterLeft, BsCaretDownFill} from 'react-icons/bs'
import Popup from 'react-customizable-popup'
import Loader from 'react-loader-spinner'
import {Pagination} from '@mui/material'
import RestaurantItem from '../RestaurantItem'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_Progress: 'IN_PROGRESS',
  failed: 'FAILED',
}

class Home extends Component {
  state = {
    imagesList: [],
    sortType: 'Lowest',
    restaurantsList: [],
    carouselApi: apiConstants.initial,
    restaurantsApi: apiConstants.initial,
    currPage: 1,
  }

  componentDidMount() {
    const {sortType} = this.state
    const page = localStorage.getItem('curr_page')
    const currPage = page === null ? 1 : parseInt(page, 10)
    this.getCarouselImages()
    this.getRestaurantsList(sortType, currPage)
  }

  getCarouselImages = async () => {
    try {
      this.setState({carouselApi: apiConstants.in_Progress})
      const token = Cookies.get('jwt_token')
      const url = 'https://apis.ccbp.in/restaurants-list/offers'
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }
      const res = await fetch(url, options)
      if (!res.ok) throw new Error('Failed to fetch carousel images')
      const data = await res.json()
      this.setState({
        imagesList: data.offers,
        carouselApi: apiConstants.success,
      })
    } catch (error) {
      this.setState({carouselApi: apiConstants.failed})
      console.error('Error fetching carousel images:', error.message)
    }
  }

  getRestaurantsList = async (sortType = 'Lowest', currPage = '1') => {
    try {
      this.setState({restaurantsApi: apiConstants.in_Progress})
      const token = Cookies.get('jwt_token')
      const LIMIT = 9
      const offset = (currPage - 1) * LIMIT
      const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${sortType}`
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }
      const res = await fetch(url, options)
      if (!res.ok) throw new Error('Failed to fetch restaurant list')
      const data = await res.json()
      const modifiedList = data.restaurants.map(e => ({
        id: e.id,
        costForTwo: e.cost_for_two,
        cuisine: e.cuisine,
        groupByTime: e.group_by_time,
        hasOnlineDelivery: e.has_online_delivery,
        hasTableBooking: e.has_table_booking,
        imageUrl: e.image_url,
        isDeliveringNow: e.is_delivering_now,
        location: e.location,
        menuType: e.menu_type,
        name: e.name,
        opensAt: e.opens_at,
        userRating: {
          rating: e.user_rating.rating,
          ratingColor: e.user_rating.rating_color,
          totalReviews: e.user_rating.total_reviews,
        },
      }))
      this.setState({
        restaurantsList: modifiedList,
        restaurantsApi: apiConstants.success,
      })
    } catch (error) {
      this.setState({restaurantsApi: apiConstants.failed})
      console.error('Error fetching restaurant list:', error.message)
    }
  }

  onSortChange = sortType => {
    const {currPage} = this.state
    this.setState({sortType}, () => this.getRestaurantsList(sortType, currPage))
  }

  onChangePage = (e, value) => {
    const {sortType} = this.state
    const pageValue = value || 1
    localStorage.setItem('curr_page', pageValue)
    this.setState({currPage: pageValue}, () =>
      this.getRestaurantsList(sortType, pageValue),
    )
  }

  renderCarousels = () => {
    const settings = {
      dots: true,
      infinite: true,
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 4000,
      cssEase: 'linear',
      arrows: false,
    }
    const {imagesList} = this.state
    return (
      <div className="carousel-box">
        <Slider {...settings}>
          {imagesList.map(e => (
            <div key={e.id}>
              <img src={e.image_url} alt={e.id} className="carousel-img" />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  renderRestaurants = () => {
    const {restaurantsList} = this.state
    return (
      <ul className="restaurants-list">
        {restaurantsList.map(e => (
          <RestaurantItem data={e} key={e.id} />
        ))}
      </ul>
    )
  }

  renderCarouselsRespectiveView = () => {
    const {carouselApi} = this.state
    switch (carouselApi) {
      case apiConstants.success:
        return this.renderCarousels()
      case apiConstants.in_Progress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderRestaurantsRespectiveView = () => {
    const {restaurantsApi} = this.state
    switch (restaurantsApi) {
      case apiConstants.success:
        return this.renderRestaurants()
      case apiConstants.in_Progress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderLoader = () => (
    <div className="loader-box" data-testid="loader">
      <Loader color="#F7931E" height={50} width={50} type="Oval" />
    </div>
  )

  render() {
    const {currPage, sortType} = this.state
    const lowestSortClass =
      sortType === 'Lowest' ? 'sort-option selected' : 'sort-option'
    const highestSortClass =
      sortType === 'Highest' ? 'sort-option selected' : 'sort-option'
    return (
      <div className="home-container">
        <Header />
        <div className="resp-box">
          {this.renderCarouselsRespectiveView()}
          <div className="home-body">
            <h1 className="popular-rest-text">Popular Restaurants</h1>
            <div className="caption-filter-box">
              <h3 className="caption">
                Select Your favourite restaurant special dish and make your day
                happy...
              </h3>
              <Popup
                arrow={false}
                toggler={
                  <div className="filter-box">
                    <BsFilterLeft className="filter-icon" />
                    <h4 className="filter-text">Sort by {sortType}</h4>
                    <BsCaretDownFill
                      className="filter-icon"
                      style={{fontSize: '15px', marginTop: '5px'}}
                    />
                  </div>
                }
              >
                <div className="filter-popup">
                  <h3
                    onClick={() => this.onSortChange('Lowest')}
                    className={lowestSortClass}
                  >
                    Lowest
                  </h3>
                  <h3
                    onClick={() => this.onSortChange('Highest')}
                    className={highestSortClass}
                  >
                    Highest
                  </h3>
                </div>
              </Popup>
            </div>
            <hr className="hr-rule" />
            <div className="restaurants-box">
              {this.renderRestaurantsRespectiveView()}
            </div>
            <div className="pagination-box">
              <Pagination
                count={4}
                page={currPage}
                onChange={this.onChangePage}
                variant="outlined"
                className="custom-pagination"
              />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
