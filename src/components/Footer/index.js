import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import FooterAppLogo from '../../IMG/FooterAppLogo.png'
import './index.css'

const Footer = () => (
  <div className="footer-box">
    <div className="footer-app-logo-box">
      <img
        src={FooterAppLogo}
        alt="website-footer-logo"
        className="footer-app-logo"
      />
      <h2 className="footer-app-title">Tasty Kitchens</h2>
    </div>
    <p className="footer-caption-text">
      The only thing we are serious about is food. Contact us on
    </p>
    <p className="footer-caption-text">Contact Us</p>
    <div className="social-media-icons-box">
      <FaPinterestSquare
        testid="pintrest-social-icon"
        className="social-media-icon"
      />
      <FaInstagram
        testid="instagram-social-icon"
        className="social-media-icon"
      />
      <FaTwitter testid="twitter-social-icon" className="social-media-icon" />
      <FaFacebookSquare
        testid="facebook-social-icon"
        className="social-media-icon"
      />
    </div>
  </div>
)

export default Footer
