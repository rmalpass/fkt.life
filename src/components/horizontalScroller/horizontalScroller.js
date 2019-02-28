/*
  Author:   Ross Malpass
  Email:    ross@ombori.com
*/

// Imports
import React from 'react';
import classNames from 'classnames';

// Styles
import styles from './horizontalScroller.module.scss';

export default props => {
  const { children, fullWidth, showScrollbar } = props;
  return (
    <section
      className={classNames(
        [styles.horizontalScroller],
        { [styles.fullWidth]: fullWidth },
        { [styles.showScrollbar]: showScrollbar }
      )}
    >
      <div
        className={classNames(
          [styles.horizontalScroller__items],
          [styles.touchScroll]
        )}
      >
        <div className={styles.horizontalScroller__items_track}>{children}</div>
      </div>
    </section>
  );
};
