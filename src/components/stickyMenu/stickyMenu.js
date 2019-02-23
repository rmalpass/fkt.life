import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'gatsby';

// Styles
import styles from './stickyMenu.module.scss';

import wordmark from '../../images/M.svg';

class StickyMenu extends Component {
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

  render() {
    const { scrolling } = this.state;
    return (
      <nav
        className={classNames([styles.stickyMenu], {
          [styles.active]: this.state.scrolling,
        })}
      >
        <div className={styles.wordmark}>
          <Link to="/">
            <img src={wordmark} alt="Go back to the home page" />
          </Link>
        </div>
        <ul>
          <li>
            <Link to="/">Athlete</Link>
          </li>
          <li>
            <Link to="/">Designer</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/">Archive</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default StickyMenu;
