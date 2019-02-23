import React, { Component } from "react";
import classNames from 'classnames';
import styles from './bouncyArrow.module.scss';

class BouncyArrow extends Component {
  state = {
    scrolling: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = event => {
    if (window.scrollY === 0 && this.state.scrolling === true) {
      this.setState({ scrolling: false });
    } else if (window.scrollY !== 0 && this.state.scrolling !== true) {
      this.setState({ scrolling: true });
    }
  };
  render(){
    return (
      <span className={classNames([styles.bouncyArrow], {
          [styles.active]: this.state.scrolling,
        })}
      />
    );
  }
}

export default BouncyArrow;
