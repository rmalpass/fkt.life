import React, { Component } from "react";
import { Link, graphql } from "gatsby";
import classNames from 'classnames';
import Fade from 'react-reveal/Fade';

// Component
import PostIcons from "../components/post-icons";
import BouncyArrow from '../components/bouncyArrow';
import SEO from '../components/seo';
import StickyMenu from '../components/stickyMenu/stickyMenu';
import HorizontalScroller from '../components/horizontalScroller/horizontalScroller';
import HorizontalScrollerItem from '../components/horizontalScroller/horizontalScrollerItem';

// style
import '../styles/styles.scss';
import styles from './designer.module.scss';

// images
import M from '../images/M.svg';
import titleServices from '../images/title_services.svg';

class Designer extends Component {

  render() {
    const data = this.props.data

    return (
      <div className={styles.page__designer}>

       <SEO
        title="Design"
        keywords={[`design system`, `designer`, `design sprint`, `sketch`, `gatsby`]}
      />
      
       <StickyMenu />

       {/*
        <Helmet>
          <html lang="en" />
          <title>Ross is a digital designer and endurance athlete.</title>
          <meta name="description" content="An award winning digital designer and record breaking endurance athlete from North-West England." />
          <meta property="og:title" content="Ross is a digital designer and endurance athlete." />
          <meta property="og:description" content="An award winning digital designer and record breaking endurance athlete from North-West England." />
          <meta
            property="og:image"
            content="http://rossmalpass.co.uk/wp-content/themes/rm/static/img/new-hero.jpg"
          />
        </Helmet>
        */}

        <section className={styles.hero}>
          <header>
            <img src={M} alt="Malpass Mountains logo" />
            <h1>Designer.</h1>
          </header>
        </section>

        <section className={styles.hello}>
          <p>I work for a tech startup in Stockholm, Sweden called <a href="https://ombori.com" className={styles.ombori}>Ombori</a>; I create delightful UI’s for our products, champion design thinking, and consult for our clients.</p>
          <img src="https://scontent.fman1-1.fna.fbcdn.net/v/t1.0-9/1392069_10154810916970077_6291587837517764507_n.jpg?_nc_cat=108&_nc_ht=scontent.fman1-1.fna&oh=4f9e5c0a1303253524af981d0c0c2472&oe=5D0739E4" />
        </section>

        <section className={styles.services}>
          <header>
            <img src={titleServices} alt="Services" />
          </header>
          <ul className={styles.services__list}>
            <li>
              <h2>Design systems & processes</h2>
              <p>I create and implement design systems and processes. Including Sketch and web UI Kits; implementation of Design Processes and workflows; and detailed component documentation.</p>
              <p>Clients include Kambi, Nordnet</p>
            </li>
            <li>
              <h2>Design sprints</h2>
              <p>Originally conceived by Jake Knapp at Google Ventures, Design Sprints are a great way to answer big questions and solve real problems quickly and efficiently. From idea to prototype in one week. I run design sprints all over the World with the team at Ombori.</p>
              <p>Clients include Kambi, Target, Nordnet</p>
            </li>
            <li>
              <h2>Digital product design</h2>
              <p>I create and implement design systems and processes. Including Sketch and web UI Kits; implementation of Design Processes and workflows; and detailed component documentation.</p>
              <p>Clients include Kambi, Nordnet</p>
            </li>
          </ul>
        </section>

      </div>
    )
  }
}

export default Designer;
