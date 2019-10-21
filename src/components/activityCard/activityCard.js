import React, { Component } from 'react'
import { Link } from "gatsby";
import AniLink from "gatsby-plugin-transition-link/AniLink";

import StaticMap from '../staticMap';
import Timeline from '../timeline/timeline';

import styles from './activityCard.module.scss';

class ActivityCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      access_token: null,
    }
  }

  fetchToken() {
    let localStorage = window.localStorage
    let uniqueAuthorizationCode = 'bfadc96c1059e56bcc4a26cde284c0fa3c715f41'
    let exchangeTokenUrl =
      'https://www.strava.com/oauth/token?client_id=4245&client_secret=1173690540e287755ca4b36f6d4bafb026167f73&code=' +
      uniqueAuthorizationCode +
      '&grant_type=authorization_code'

    let urls = [exchangeTokenUrl]
    let requests = urls.map(url =>
      fetch(exchangeTokenUrl, {
        method: 'post',
      })
        .then(resp => {
          return resp.json()
        })
        .then(json => {
          this.setState({ access_token: json.access_token })
          localStorage.setItem('token_access_token', json.access_token)
          localStorage.setItem('token_expires_at', json.expires_at)
        })
    )

    Promise.all(requests).then(responses => {
      this.fetchData()
    })
  }

  fetchData() {
    let localStorage = window.localStorage
    let access_token = localStorage.getItem('token_access_token')
    let activityApiUrl =
      'https://www.strava.com/api/v3/activities/' +
      this.props.strava_id

    let activityStreamApiUrl =
      activityApiUrl + '/streams/altitude,latlng?resolution=medium'

    let urls = [activityApiUrl, activityStreamApiUrl]

    let requests = urls.map(url =>
      fetch(url, {
        method: 'get',
        headers: {
          'content-type': 'application/json',
          authorization: 'Bearer ' + access_token,
        },
      })
        .then(resp => {
          return resp.json()
        })
        .then(json => {
          let checkIsArray = Array.isArray(json)
          if (checkIsArray) {
            this.setState({ streams: json })
          } else {
            this.setState({ activityData: json })
          }
        })
    )

    Promise.all(requests).then(responses => {
      this.setState({ loading: false })
    })
  }

  componentDidMount() {

    console.log("ACTIVITY CARD MOUNTED");

    let localStorage = window.localStorage
    let localStorageAccessToken = localStorage.getItem('token_access_token')
    let localStorageAccessTokenExpiresAt = localStorage.getItem(
      'token_expires_at'
    )
    let currentTime = Date.now() / 1000

    console.log("Local token: ", localStorageAccessToken)
    console.log("Access token: ", this.state.access_token)

    // If localstorage doesn't have access token, fetch a new one.
    if (!localStorageAccessToken) {
      console.log("no local token. Fetching a new one...");
      this.fetchToken()
    } else if (parseInt(localStorageAccessTokenExpiresAt) < currentTime) {
      // If localstorage token expired, fetch new token
      console.log("Token expired. Fetching a new one...");
      this.fetchToken()
    } else {
      // Otherwise use existing token to fetch data
      console.log("Token is OK.");
      this.fetchData()
    }
  }

  render() {

    const activityImgs = this.props.activityImages;

    console.log("Activity Data", this.state.activityData);

    return (
      <article className={styles.activityCard}>
        <AniLink cover direction="right" to={this.props.slug} bg="#111">
          <div className={styles.activityCard__info}>
            <header>
              <h2>{this.props.title}</h2>
              <p>{this.props.excerpt} <span>/ Read more</span></p>
            </header>
            <div className={styles.activityCard__map}>
              <StaticMap
                loading={this.state.loading}
                activityData={this.state.activityData}
              />
            </div>
            <Timeline
              relativePath={this.props.relativePath}
              trim
              disabled
            />
            <ul className={styles.activityCard__data}>
              <li>
                <strong>Total Time</strong>
                {this.props.time}
              </li>
              <li>
                <strong>Total Distance</strong>
                {this.props.distance}
              </li>
            </ul>
          </div>
          <div className={styles.activityCard__hero}>
            <img src={this.props.coverImage} />
          </div>
          {activityImgs &&
            <ul className={styles.activityCard__images}>
              {activityImgs.map(item => (
                <li>
                  <img src={item.src.childImageSharp.sizes.src} />
                </li>
              ))}
            </ul>
          }
        </AniLink>
      </article>
    )
  }
}

export default ActivityCard
