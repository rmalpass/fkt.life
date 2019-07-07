import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'gatsby';
import { Menu, Home, Award, Calendar, Archive } from 'react-feather';
import Scrollspy from 'react-scrollspy';

import Scroll from '../scroll';

// Styles
import styles from './homeMenu.module.scss';

import wordmark from '../../images/M.svg';

class HomeMenu extends Component {

  render() {
    const data = this.props

    return (
      <nav
        className={classNames(
          [styles.stickyMenu],
          [styles.homeMenu]
        )}
      >
        <div className={styles.wordmark}>
          <Link to="/">
            <img src={wordmark} alt="Go back to the home page" />
          </Link>
        </div>
        <Scrollspy items={ ['hello', 'records', 'schedule'] } currentClassName={styles.active}>
          <li>
              <Scroll type="id" element="hello">
                  <a href="#"><Home size={20} /> About</a>
              </Scroll>
          </li>
          <li>
              <Scroll type="id" element="records">
                  <a href="#"><Award size={20} /> Records</a>
              </Scroll>
          </li>
          <li>
              <Scroll type="id" element="schedule">
                  <a href="#"><Calendar size={20} /> Schedule</a>
              </Scroll>
          </li>
          <li>
            <a href="http://archive.rossmalpass.co.uk" target="_blank">
              <Archive size={20} /> Archive
            </a>
          </li>
        </Scrollspy>
        {/*
        <ul className={styles.navigation}>
          <li><Menu size={24} /></li>
          <li>
            <Link to="/"><Home size={20} /> About</Link>
          </li>
          <li>
            <Link to="#records"><Award size={20} /> Records</Link>
          </li>
          <li>
            <Link to="#schedule"><Calendar size={20} /> Schedule</Link>
          </li>
        </ul>
        */ }
      </nav>
    );
  }
}

export default HomeMenu;
