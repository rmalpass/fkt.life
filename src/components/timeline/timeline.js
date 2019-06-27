import React from 'react'
import { Link } from "gatsby"
import classNames from 'classnames';
import { MapPin } from 'react-feather';
import MarkerLink from '../markerLink';

import styles from './timeline.module.scss';

const Timeline = ({ relativePath, loading })  => {
  // Fetch timeline
  let getTimeline = require('../../posts/' + relativePath);
  const timelineData = getTimeline.timeline;

  return (
    <ul className={classNames([styles.timeline], {[styles.loading]: loading})}>
      {timelineData.map(item => (
        <li>
          <MarkerLink lat={item.lat} lng={item.lng} label={item.label} zoom={item.zoom}>
            <MapPin size={24} />
            <strong>{item.title}</strong>
            {item.date}
          </MarkerLink>
        </li>
      ))}
    </ul>
  );
};

export default Timeline;
