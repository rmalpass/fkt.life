import React, { Component } from 'react'
import Loader from './loader/loader';

class StaticMap extends Component {

  render() {
    if (this.props.loading) {
      return <Loader />
    } else {
      // const gMapkey = '&key=AIzaSyA45q2lOab0FaqQOXQRPgNvhQ6IBblnEuw';
      const gMapkey = ')/auto/1080x720?access_token=pk.eyJ1Ijoicm1hbHBhc3MiLCJhIjoiY2p3eHk2MDl3MTlidTQ5bW82MXJ5ZzB3aiJ9.0TO1f8jRFfSzVTvTx0tuoA';
      // const staticMap = 'https://maps.googleapis.com/maps/api/staticmap?size=1080x720&maptype=roadmap&path=enc:'
      const staticMap = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/path-5+f44-0.5('
      const route = this.props.activityData.map.summary_polyline;
      const staticUrl = staticMap + route + gMapkey;
      return <img src={staticUrl} />
    }
  }
}

export default StaticMap
