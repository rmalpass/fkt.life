import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'gatsby';
import { Menu, Home } from 'react-feather';

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
    const data = this.props

    return (
      <nav
        className={classNames(
          [styles.stickyMenu],
          { [styles.hidden]: this.props.hidden },
          { [styles.active]: this.state.scrolling },
          { [styles.sidebar]: this.props.sidebar},
          { [styles.activity]: this.props.activity}
        )}
      >
        <div className={styles.wordmark}>
          <Link to="/">
            <img src={wordmark} alt="Go back to the home page" />
          </Link>
        </div>
        {data.title &&
          <p dangerouslySetInnerHTML={{ __html: data.title }} className={styles.title} />
        }
        <Link to="/" className={styles.btn__back}>
          <Home size={16} />
        </Link>
        <ul className={styles.navigation}>
          <li><Menu size={24} /></li>
          <li>
            <Link to="/">Athlete</Link>
          </li>
          <li>
            <a href="https://ombori.com" target="_blank">Designer</a>
          </li>
          <li>
            <a href="https://medium.com/@rmalpass" target="_blank">Writer</a>
          </li>
          <li>
            <a href="http://archive.rossmalpass.co.uk" target="_blank">Archive</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default StickyMenu;
