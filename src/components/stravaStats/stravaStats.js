import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import Loader from '../loader/loader'

import styles from './stravaStats.module.scss';

const Stat = props => {
  let { label, value, unit } = props
  return (
    <div className={styles.stravaStat}>
      <div className=" b--black-05 pa3 br2 c-strava-stats-card">
        <label htmlFor="distance">{label}</label>
        <h2 className="f3 fw7 mt1 mb0" name="distance">
          {value} {unit}
        </h2>
      </div>
    </div>
  )
}

const StravaStats = props => {
  let activityData = props.activityData

  // Activity distance
  let distanceMeter = activityData.distance
  let distanceKilometer = _.round(distanceMeter / 1000, 2)
  let distanceMile = distanceKilometer * 0.62137;
  distanceMile = _.round(distanceMile, 2);

  // Activity elevation gain
  let elevation = activityData.total_elevation_gain
  elevation = _.round(elevation * 3.2808, 2);

  // Activity calories
  let calories = activityData.calories

  // Activity moving time
  let moving_time_seconds = activityData.moving_time
  let formatted = moment.utc(moving_time_seconds * 1000).format('HH:mm:ss')

  // Activity speed
  let avg_speed = activityData.average_speed
  let speed = avg_speed * 2.2369;

  if (props.loading) {
    return (
      <div className="c-strava-stats">
        <Loader />
      </div>
    )
  } else {
    return (
      <div className={styles.stravaStats}>
        <Stat
          label="Distance"
          value={distanceMile ? distanceMile : 0}
          unit="mi"
        />
        <Stat
          label="Elevation Gain"
          value={elevation ? elevation : 0}
          unit="ft"
        />
        {/*<Stat label="Average Speed" value={avg_speed ? avg_speed : 0} unit="mph" />*/}
        <Stat label="Moving Time" value={formatted ? formatted : 0} unit="" />
        <Stat label="Calories" value={calories ? calories : 0} unit="cal" />
      </div>
    )
  }
}

export default StravaStats
