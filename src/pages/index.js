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
import styles from './index.module.scss';

// images
import M from '../images/M.svg';

class Home extends Component {

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
            <p>An <a href="https://www.strava.com/athletes/182874">athlete</a>, <a href="https://ombori.com">designer</a>, and <a href="https://medium.com/@rmalpass">writer</a> from North West England.</p>
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
            <Fade right>
              <div className={styles.hillClimb__posts}>
                <HorizontalScroller fullWidth>
                  <HorizontalScrollerItem>
                    <div className={styles.spacer} />
                  </HorizontalScrollerItem>
                  {data.hillclimb.edges.map(({ node }) => (
                    <HorizontalScrollerItem>
                      <div className={styles.hcCard}>
                      <div className={styles.hcCard__date}>
                        <p>{node.date}</p>
                      </div>
                      <div className={styles.hcCard__content}>
                        <Link to={node.slug}>
                          {node.featured_media &&
                            <div className={styles.hcCard__content__media}>
                              <img src={node.featured_media.source_url} />
                            </div>
                          }
                          <h2 dangerouslySetInnerHTML={{ __html: node.title }} />
                          <div className={styles.arrow} />
                          {/* <div dangerouslySetInnerHTML={{ __html: node.excerpt }} /> */}
                        </Link>
                      </div>
                      </div>
                    </HorizontalScrollerItem>
                  ))}
                </HorizontalScroller>
              </div>
            </Fade>
            <div className={styles.hillClimb__bg} />
          </section>
        </Fade>
        <section>
          <h1>Posts</h1>
          {data.postOverview.edges.map(({ node }) => (
            <div key={node.slug}>
              <Link to={node.slug} css={{ textDecoration: `none` }}>
                <h3>{node.title}</h3>
              </Link>
              <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              <PostIcons node={node} />
            </div>
          ))}
        </section>
      </div>
    )
  }
}

export default Home;

// Set here the ID of the home page.
export const pageQuery = graphql`
  query getCats ($catname: String = "National Hill Climb 2015"){
    hillclimb: allWordpressPost(
      filter: {categories: {elemMatch: {name: { eq: $catname }}}}
      sort: {
        fields: [date]
        order: ASC
      }
    ){
      edges {
        node {
          guid
          title
          date
          excerpt
          slug
          featured_media {
            source_url
          }
        }
      }
    }
    postOverview: allWordpressPost(
      limit: 5
      sort: {
        fields: [date]
        order: DESC
      }
    ) {
      edges {
        node {
          title
          excerpt
          slug
          ...PostIcons
          featured_media {
            source_url
          }
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
