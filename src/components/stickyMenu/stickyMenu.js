import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'gatsby';
import { Menu } from 'react-feather';

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
        <ul>
          <li><Menu size={24} /></li>
          <li>
            <Link to="/">Athlete</Link>
          </li>
          <li>
            <Link to="/designer">Designer</Link>
          </li>
          <li>
            <Link to="https://medium.com/@rmalpass">Writer</Link>
          </li>
          <li>
            <Link to="http://archive.rossmalpass.co.uk">Archive</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default StickyMenu;
