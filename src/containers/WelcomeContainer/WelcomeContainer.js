/* External Dependencies */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import classNames from 'classnames'
import logo from './klotter3.png'

/* Internal Dependencies */
import styles from './WelcomeContainer.scss'

import { GeolocationActions } from '../../actions'

class WelcomeContainer extends React.Component {

  constructor() {
    super()
    this.handleClickContinue = this.handleClickContinue.bind(this)
    this.state = {
      geoIsConfirmed: false
    }
  }

  componentWillMount() {
    this.props.dispatch(GeolocationActions.getGeolocation())
      .then((res) => {
        window.sessionStorage.setItem('vtag-geo-x', res.x)
        window.sessionStorage.setItem('vtag-geo-y', res.y)
        this.setState({geoIsConfirmed: true})
      })
  }

  handleClickContinue(event) {
    if (this.state.geoIsConfirmed) {
      this.props.router.push('/messages')
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <p className={styles.logo}>
              <img src={logo} />
            </p>
            <p className={styles.subtitle}>
              <i className="fa fa-dot-circle-o" aria-hidden="true"/>
              <span>tag your world</span>
            </p>
          </div>
          <div className={styles.btnContainer}>
            <button
              className={classNames(styles.button, {[styles.disabled]: !this.state.geoIsConfirmed})}
              type="button"
              onClick={this.handleClickContinue}>
              Continue to Tag
            </button>
          </div>
        </div>
      </div>
    )
  }

}


const mapStateToProps = (state/*, props*/) => {
  return {
    state: state
  }
}

WelcomeContainer = withRouter(WelcomeContainer)
WelcomeContainer = connect(mapStateToProps)(WelcomeContainer)

export default WelcomeContainer
