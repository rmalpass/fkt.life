/*
  Author:   Ross Malpass
  Email:    ross@ombori.com
*/

// Imports
import React from 'react';

// Styles
import styles from './horizontalScroller.module.scss';

export default props => (
  <div
    className={styles.horizontalScrollerItem}
    style={{ zIndex: props.zIndex }}
  >
    <div className={styles.horizontalScrollerItem__content}>
      {props.children}
    </div>
  </div>
);
