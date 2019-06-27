import React, { Component } from 'react'
import { Link } from "gatsby";

import StaticMap from '../staticMap';
import Timeline from '../timeline/timeline';

import styles from './activityCard.module.scss';

class ActivityCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  fetchData() {
    let publicAccessToken = '43c4b7dd7c2a5e99db779498e960fdc039896087'
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
          authorization: 'Bearer ' + publicAccessToken,
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
    this.fetchData()
    console.log(this.props);
  }

  render() {

    return (
      <article className={styles.activityCard}>
        <Link to={this.props.slug}>
          <div className={styles.activityCard__info}>
            <header>
              <h2>{this.props.title}</h2>
              <p>{this.props.excerpt} <span>/ Read more</span></p>
            </header>
            <Timeline
              relativePath={this.props.relativePath}
              trim
              disabled
            />
          </div>
          <div className={styles.activityCard__map}>
            <StaticMap
              loading={this.state.loading}
              activityData={this.state.activityData}
            />
          </div>
        </Link>
      </article>
    )
  }
}

export default ActivityCard
