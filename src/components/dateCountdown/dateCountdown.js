import PropTypes from "prop-types"
import React, { Component } from "react"

// import styles from './footer.module.scss';

class DateCountdown extends Component {

  parseDate = str => {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
  };

  render() {

    const first = this.parseDate((new Date()).toLocaleDateString('en-US'));
    const second = this.parseDate(this.props.second);
    const days = Math.round((second-first)/(1000*60*60*24));

    return (
      <p>{days} Days to go</p>
    );
  }
}

export default DateCountdown
