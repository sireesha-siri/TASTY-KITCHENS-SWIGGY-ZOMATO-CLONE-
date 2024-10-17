import {Link} from 'react-router-dom'
import NotFoundImg from '../../IMG/NotFoundImg.png'
import './index.css'

const PageNotFound = () => (
  <div className="not-found-container">
    <img src={NotFoundImg} alt="not found" className="not-found-img" />
    <h1 className="not-found-text">Page Not Found</h1>
    <p className="not-found-caption">
      we are sorry, the page you requested could not be found
    </p>
    <Link to="/">
      <button type="button" className="home-page-btn">
        Home Page
      </button>
    </Link>
  </div>
)

export default PageNotFound
