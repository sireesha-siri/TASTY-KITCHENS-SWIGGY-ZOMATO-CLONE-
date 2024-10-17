import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobileMenuOpen: false,
      itemsList: [],
    }
  }

  componentDidMount() {
    const itemsList = JSON.parse(localStorage.getItem('cart_items')) || []
    this.setState({itemsList})
  }

  toggleMobileMenu = () => {
    this.setState(prevState => ({
      isMobileMenuOpen: !prevState.isMobileMenuOpen,
    }))
  }

  closeMobileMenu = () => {
    this.setState({isMobileMenuOpen: false})
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  renderCartItemsCount = () => {
    const {itemsList} = this.state
    const cartItemsCount = itemsList.length
    return (
      <>
        {cartItemsCount > 0 && (
          <sup className="cart-count">{cartItemsCount}</sup>
        )}
      </>
    )
  }

  render() {
    const {isMobileMenuOpen} = this.state
    const {location} = this.props // Access current location
    const logoUrl =
      'https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg'

    return (
      <div className="nav_bar">
        <Link
          to="/"
          style={{textDecoration: 'none'}}
          onClick={this.closeMobileMenu}
        >
          <div className="logo_container">
            <img src={logoUrl} alt="website logo" className="logo_image" />
            <h1 className="main_heading">Tasty Kitchens</h1>
          </div>
        </Link>
        <nav className="navigation">
          <ul
            className={
              isMobileMenuOpen ? 'mobile_nav_list' : 'desktop_nav_list'
            }
          >
            <Link
              to="/"
              className={`nav_link ${
                location.pathname === '/' ? 'active' : ''
              }`}
              onClick={this.closeMobileMenu}
            >
              <li>Home</li>
            </Link>
            <Link
              to="/cart"
              className={`nav_link ${
                location.pathname === '/cart' ? 'active' : ''
              }`}
              onClick={this.closeMobileMenu}
            >
              <li>
                Cart <span>{this.renderCartItemsCount()}</span>
              </li>
            </Link>
            <li onClick={this.closeMobileMenu}>
              <button
                type="button"
                className="logout_button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
        {isMobileMenuOpen ? (
          <AiOutlineCloseCircle
            className="hamburger_icon"
            size="35px"
            onClick={this.toggleMobileMenu}
          />
        ) : (
          <GiHamburgerMenu
            className="hamburger_icon"
            size="35px"
            onClick={this.toggleMobileMenu}
          />
        )}
      </div>
    )
  }
}

export default withRouter(Header)
