import React from 'react'
import { Link } from "gatsby"
import classNames from 'classnames';

import styles from './homeFeature.module.scss';

export default props => {
  const { title, content, link, image, reverse } = props;
  return (
    <section className={classNames([styles.homeFeature], {[styles.reverse]: props.reverse})}>
      <Link to={link} className={styles.img}><img src={image}/></Link>
      <header className={styles.homeFeature__header}>
        <h1>{title}</h1>
        <p>{content}</p>
        <p><Link to={link} data-link-external>Read More</Link></p>
      </header>
    </section>
  );
};
