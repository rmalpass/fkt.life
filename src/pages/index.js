import React, { Component } from "react";
import { Link, graphql } from "gatsby";
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import a11yChecker from 'a11y-checker';
import Fade from 'react-reveal/Fade';

// Component
import PostIcons from "../components/post-icons";
import BouncyArrow from '../components/bouncyArrow';
import SEO from '../components/seo';
import StickyMenu from '../components/stickyMenu/stickyMenu';

// style
import '../styles/styles.scss';
import { rhythm } from "../utils/typography";
import styles from './index.module.scss';

// images
import M from '../images/M.svg';

class Home extends Component {
  componentDidMount() {
    a11yChecker();
  }
  render() {
    const data = this.props.data

    return (
      <div className={styles.page__home}>

       <SEO title="Home" keywords={[`cylist`, `designer`, `design sprint`, `blog`, `gatsby`]} />
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

        <section className={styles.hello}>
          <header>
            <img src={M} alt="Malpass Mountains logo" />
            <h1>Ross Malpass</h1>
            <p>A <a href="https://ombori.com">designer</a>, <a href="https://medium.com/@rmalpass">writer</a>, and <a href="https://www.strava.com/athletes/182874">athlete</a> from North West England.</p>
            <p>Current <a href="https://www.threepeakschallenge.net/213070/national-three-peaks-by-bike-solo-no-drafting">3 peaks record</a> holder. Father of two.</p>
            <p>Working @ <a href="https://ombori.com" className={styles.ombori}>Ombori</a>.</p>
          </header>
          <div className={styles.bouncyArrow}>
            <BouncyArrow />
          </div>
        </section>

        <section className={styles.threePeaks}>
          <img src="https://cdn-images-1.medium.com/max/2600/1*dC80Up_uuuSwS8mUM1S0TA.png" alt="A lonely hill 7 hours into the National Three Peaks record" />
          <header className={styles.threePeaks__header}>
            <h1>The National Three Peaks by Bike. A Record-breaking Ride</h1>
            <p>In August 2017 I set the record for hiking the three largest hills in the UK and cycling the 800 mile distance between them. It took 37 hours.</p>
            <p><a href="https://medium.com/@rmalpass/national-3-peaks-challenge-cycling-record-874211c1e200" data-link-external>Read on Medium</a></p>
          </header>
        </section>

        <Fade>
          <section className={styles.hillClimb}>
            <div className={styles.hillClimb__content}>
              <header className={styles.hillClimb__header}>
                <h1>Training for the National Hill Climb Championship 2015</h1>
                <p>The year I was obssessed with making the Top Ten at the National Hill Climb competition.</p>
                <p>This is the story of my year long training journey. Everything from bitterly cold base miles, to throwing up after interval sessions on the turbo trainer in the garage.</p>
              </header>
            </div>
          </section>
        </Fade>
        {/*<section>
          <h1>Posts</h1>
          {data.allWordpressPost.edges.map(({ node }) => (
            <div css={{ marginBottom: rhythm(2) }} key={node.slug}>
              <Link to={node.slug} css={{ textDecoration: `none` }}>
                <h3>{node.title}</h3>
              </Link>
              <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              <PostIcons node={node} />
            </div>
          ))}
        </section>
        */}
      </div>
    )
  }
}

export default Home;

// Set here the ID of the home page.
export const pageQuery = graphql`
  query {
    allWordpressPage {
      edges {
        node {
          id
          title
          excerpt
          slug
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
    allWordpressPost(sort: { fields: [date] }) {
      edges {
        node {
          title
          excerpt
          slug
          ...PostIcons
        }
      }
    }
    site {
      id
      siteMetadata {
        title
      }
    }
  }
`
