import PropTypes from "prop-types"
import React from "react"

import FooterImg from '../images/footer.png';

import styles from './footer.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <img src={FooterImg} alt="Snowdon at dawn" />
  </footer>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer
