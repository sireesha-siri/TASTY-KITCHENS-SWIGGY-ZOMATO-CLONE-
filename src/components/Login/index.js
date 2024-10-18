import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShowPassword: false,
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  showAndHidePassword = () => {
    this.setState(pre => ({isShowPassword: !pre.isShowPassword}))
  }

  successLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  failedLogin = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const apiLoginUrl = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiLoginUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.successLogin(data.jwt_token)
    } else {
      this.failedLogin(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {
      username,
      password,
      showErrorMsg,
      errorMsg,
      isShowPassword,
    } = this.state

    const inputType = isShowPassword ? 'text' : 'password'

    return (
      <div className="bg-container">
        <img
          src="https://res.cloudinary.com/ddgvegjgk/image/upload/v1635315803/tastykitchens/Rectangle_1457_noyo6j.png"
          alt="website login"
          className="large-image"
        />
        <div className="login-container">
          <img
            src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg"
            className="logo"
            alt="website logo"
          />
          <h1 className="large-heading">Tasty Kitchens</h1>
          <img
            className="rectangle"
            src="https://res.cloudinary.com/ddgvegjgk/image/upload/v1635311318/tastykitchens/Rectangle_1457_ri10vf.png"
            alt="website login"
          />

          <h1 className="login-heading">Login</h1>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <label htmlFor="userName" className="label-element">
              USERNAME
            </label>
            <input
              type="text"
              id="userName"
              className="input-element "
              onChange={this.onChangeUsername}
              value={username}
              placeholder="USER NAME"
            />
            <label htmlFor="password" className="label-element">
              PASSWORD
            </label>
            <input
              type={inputType}
              id="password"
              className="input-element "
              onChange={this.onChangePassword}
              value={password}
              placeholder="PASSWORD"
            />

            <div className="show-password-box">
              <input
                type="checkbox"
                id="check-box"
                className="checkbox-element"
                onChange={this.showAndHidePassword}
              />
              <label className="show-password-label" htmlFor="check-box">
                Show Password
              </label>
            </div>

            {showErrorMsg ? <p className="errorMsg">*{errorMsg}</p> : null}
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login

// import {Component} from 'react'

// import Cookies from 'js-cookie'
// import {Redirect} from 'react-router-dom'

// import './index.css'

// class Login extends Component {
//   state = {
//     username: '',
//     password: '',
//     // isShowPassword: false,
//     showErrorMsg: false,
//     errorMsg: '',
//   }

//   onChangeUsername = event => {
//     this.setState({username: event.target.value})
//   }

//   onChangePassword = event => {
//     this.setState({password: event.target.value})
//   }

//   //   showAndHidePassword = () => {
//   //     this.setState(pre => ({isShowPassword: !pre.isShowPassword}))
//   //   }

//   successLogin = jwtToken => {
//     const {history} = this.props
//     Cookies.set('jwt_token', jwtToken, {expires: 30})
//     history.replace('/')
//   }

//   failedLogin = errorMsg => {
//     this.setState({showErrorMsg: true, errorMsg})
//   }

//   onSubmitForm = async event => {
//     event.preventDefault()
//     const apiLoginUrl = 'https://apis.ccbp.in/login'
//     const {username, password} = this.state
//     const userDetails = {username, password}
//     const options = {
//       method: 'POST',
//       body: JSON.stringify(userDetails),
//     }
//     const response = await fetch(apiLoginUrl, options)
//     console.log(response)
//     const data = await response.json()
//     console.log(data)
//     if (response.ok === true) {
//       this.successLogin(data.jwt_token)
//     } else {
//       this.failedLogin(data.error_msg)
//     }
//   }

//   render() {
//     const jwtToken = Cookies.get('jwt_token')
//     if (jwtToken !== undefined) {
//       return <Redirect to="/" />
//     }

//     const {
//       username,
//       password,
//       showErrorMsg,
//       errorMsg,
//       //   isShowPassword,
//     } = this.state

//     // const inputType = isShowPassword ? 'text' : 'password'

//     return (
//       <div className="bg-container">
//         <img
//           src="https://res.cloudinary.com/ddgvegjgk/image/upload/v1635315803/tastykitchens/Rectangle_1457_noyo6j.png"
//           alt="website login"
//           className="large-image"
//         />
//         <div className="login-container">
//           <img
//             src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625742512/Frame_274_zlrzwk.svg"
//             className="logo"
//             alt="website logo"
//           />
//           <h1 className="large-heading">Tasty Kitchens</h1>
//           <img
//             className="rectangle"
//             src="https://res.cloudinary.com/ddgvegjgk/image/upload/v1635311318/tastykitchens/Rectangle_1457_ri10vf.png"
//             alt="website login"
//           />

//           <h1 className="login-heading">Login</h1>
//           <form className="form-container" onSubmit={this.onSubmitForm}>
//             <label htmlFor="userName" className="label-element">
//               USERNAME
//             </label>
//             <input
//               type="text"
//               id="userName"
//               className="input-element "
//               onChange={this.onChangeUsername}
//               value={username}
//               placeholder="USER NAME"
//             />
//             <label htmlFor="password" className="label-element">
//               PASSWORD
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="input-element "
//               onChange={this.onChangePassword}
//               value={password}
//               placeholder="PASSWORD"
//             />

//             {/* <div className="show-password-box">
//               <input
//                 type="checkbox"
//                 id="check-box"
//                 className="checkbox-element"
//                 onChange={this.showAndHidePassword}
//               />
//               <label className="show-password-label" htmlFor="check-box">
//                 Show Password
//               </label>
//             </div> */}

//             {showErrorMsg ? <p className="errorMsg">*{errorMsg}</p> : null}
//             <button className="login-button" type="submit">
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     )
//   }
// }

// export default Login
