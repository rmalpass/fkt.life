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

        <Fade>
          <section className={styles.hello}>
            <header>
              <img src={M} alt="Malpass Mountains logo" />
              <h1>Ross Malpass</h1>
              <p>An <a href="https://www.strava.com/athletes/182874">athlete</a>, <a href="https://ombori.com">designer</a>, and <a href="https://medium.com/@rmalpass">writer</a> from North West England.</p>
              <p>Current <a href="https://www.threepeakschallenge.net/213070/national-three-peaks-by-bike-solo-no-drafting">Three Peaks Challenge</a> record holder. Father of two.</p>
              <p>Working @ <a href="https://ombori.com" className={styles.ombori}>Ombori</a>. Always plotting and scheming.</p>
            </header>
            <div className={styles.bouncyArrow}>
              <BouncyArrow />
            </div>
          </section>
        </Fade>

        <section className={styles.threePeaks}>
          <img src="https://cdn-images-1.medium.com/max/2600/1*dC80Up_uuuSwS8mUM1S0TA.png" alt="A lonely hill 7 hours into the National Three Peaks record" />
          <header className={styles.threePeaks__header}>
            <h1>The National Three Peaks by Bike. A Record-breaking Ride</h1>
            <p>In August 2017 I set the record for hiking the three largest hills in the UK and cycling the 800 mile distance between them. It took 37 hours.</p>
            <p><a href="https://medium.com/@rmalpass/national-3-peaks-challenge-cycling-record-874211c1e200" data-link-external>Read on Medium</a></p>
          </header>
        </section>

        <Fade>
          <section className={styles.timeline}>
            <Fade right>
              <div className={styles.timeline__posts}>
                <HorizontalScroller fullWidth>

                  <HorizontalScrollerItem>
                    <header className={styles.timeline__header}>
                      <h1>Events & achievements</h1>
                      <p>I'm proud of many things, here are some of them. From sport to design to everyday life.</p>

                      <label>Records <input type="checkbox" checked /></label>
                      <label>Race wins <input type="checkbox" checked /></label>
                      <label>Life events <input type="checkbox" checked /></label>
                      <label>Upcoming events <input type="checkbox" checked /></label>
                      <label>Design achievements <input type="checkbox" checked /></label>
                    </header>
                  </HorizontalScrollerItem>

                  <HorizontalScrollerItem>
                    <div className={styles.timeline__year}>
                      2019
                    </div>
                  </HorizontalScrollerItem>

                  <HorizontalScrollerItem>
                    <div className={classNames([styles.card], [styles.spacer])}>
                      <div className={styles.card__date}>
                        <p>8/09/2019</p>
                      </div>
                      <div className={styles.card__content}>
                        <a href="https://medium.com/@rmalpass/national-3-peaks-challenge-cycling-record-874211c1e200">
                          <h2>Ambleside Trail 60km</h2>
                          <ul className={styles.card__tags}>
                            <li>Running</li>
                            <li>Ultra</li>
                          </ul>
                        </a>
                      </div>
                    </div>
                  </HorizontalScrollerItem>

                  <HorizontalScrollerItem>
                    <div className={classNames([styles.card])}>
                      <div className={styles.card__date}>
                        <p>22/09/2019</p>
                      </div>
                      <div className={styles.card__content}>
                        <a href="https://medium.com/@rmalpass/national-3-peaks-challenge-cycling-record-874211c1e200">
                          <div className={styles.card__content__media}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/1/16/Ribble_-_geograph.org.uk_-_42616.jpg" />
                          </div>
                          <h2>The Ribble Way FKT attempt</h2>
                          <ul className={styles.card__tags}>
                            <li>Running</li>
                            <li>Ultra</li>
                          </ul>
                          <div className={styles.arrow} />
                          {/* <div dangerouslySetInnerHTML={{ __html: node.excerpt }} /> */}
                        </a>
                      </div>
                    </div>
                  </HorizontalScrollerItem>

                  <HorizontalScrollerItem>
                    <div className={styles.timeline__year}>
                      2018
                    </div>
                  </HorizontalScrollerItem>

                  <HorizontalScrollerItem>
                    <div className={classNames([styles.card], [styles.spacer])}>
                      <div className={styles.card__date}>
                        <p>15/02/2018</p>
                      </div>
                      <div className={styles.card__content}>
                        <a href="https://medium.com/@rmalpass/national-3-peaks-challenge-cycling-record-874211c1e200">
                          <div className={styles.card__content__media}>
                            <img src="https://scontent.fman1-1.fna.fbcdn.net/v/t1.0-9/27750695_10160115184495077_3559515959127389353_n.jpg?_nc_cat=102&_nc_ht=scontent.fman1-1.fna&oh=4bda188430f6167dc0db5d6edb7f6cfa&oe=5D70B811" />
                          </div>
                          <h2>Erik Malpass born</h2>
                          <ul className={styles.card__tags}>
                            <li>Life</li>
                            <li>Child</li>
                          </ul>
                        </a>
                      </div>
                    </div>
                  </HorizontalScrollerItem>

                  <HorizontalScrollerItem>
                    <div className={styles.timeline__year}>
                      2017
                    </div>
                  </HorizontalScrollerItem>

                  <HorizontalScrollerItem>
                    <div className={classNames([styles.card], [styles.spacer])}>
                      <div className={styles.card__date}>
                        <p>11/08/2017</p>
                      </div>
                      <div className={styles.card__content}>
                        <a href="https://medium.com/@rmalpass/national-3-peaks-challenge-cycling-record-874211c1e200">
                          <div className={styles.card__content__media}>
                            <img src="https://cdn-images-1.medium.com/max/2400/1*9hJUjIQzIIs1Aqa_MNla3g.png" />
                          </div>
                          <h2>The National Three Peaks by Bike</h2>
                          <ul className={styles.card__tags}>
                            <li>Record</li>
                            <li>Cycling</li>
                            <li>Ultra</li>
                          </ul>
                          <div className={styles.arrow} />
                          {/* <div dangerouslySetInnerHTML={{ __html: node.excerpt }} /> */}
                        </a>
                      </div>
                    </div>
                  </HorizontalScrollerItem>

                  <HorizontalScrollerItem>
                    <div className={styles.timeline__year}>
                      2016
                    </div>
                  </HorizontalScrollerItem>

                  <HorizontalScrollerItem>
                    <div className={classNames([styles.card], [styles.spacer])}>
                      <div className={styles.card__date}>
                        <p>11/04/2016</p>
                      </div>
                      <div className={styles.card__content}>
                        <a href="http://rossmalpass.co.uk">
                          <div className={styles.card__content__media}>
                            <img src="https://scontent.fman1-1.fna.fbcdn.net/v/t1.0-9/12936781_10156829863855077_8255999253801425165_n.jpg?_nc_cat=103&_nc_ht=scontent.fman1-1.fna&oh=6fea257ed9e6736094b42ca9b250df5a&oe=5D725BA9" />
                          </div>
                          <h2>Arlo Malpass born</h2>
                          <ul className={styles.card__tags}>
                            <li>Life</li>
                            <li>Child</li>
                          </ul>
                        </a>
                      </div>
                    </div>
                  </HorizontalScrollerItem>

                  <HorizontalScrollerItem>
                    <div className={styles.timeline__year}>
                      2015
                    </div>
                  </HorizontalScrollerItem>

                  <HorizontalScrollerItem>
                    <div className={classNames([styles.card])}>
                      <div className={styles.card__date}>
                        <p>01/08/2015</p>
                      </div>
                      <div className={styles.card__content}>
                        <a href="https://www.strava.com/activities/359051541">
                          <div className={styles.card__content__media}>
                            <img src="http://rossmalpass.co.uk/wp-content/themes/rm/static/img/pages/c2c/hawes/full.jpg" />
                          </div>
                          <h2>Morecambe to Scarborough Coast 2 Coast</h2>
                          <ul className={styles.card__tags}>
                            <li>Cycling</li>
                            <li>Ultra</li>
                          </ul>
                          <div className={styles.arrow} />
                          {/* <div dangerouslySetInnerHTML={{ __html: node.excerpt }} /> */}
                        </a>
                      </div>
                    </div>
                  </HorizontalScrollerItem>

                  <HorizontalScrollerItem>
                    <div className={classNames([styles.card])}>
                      <div className={styles.card__date}>
                        <p>01/08/2015</p>
                      </div>
                      <div className={styles.card__content}>
                        <a href="https://www.strava.com/activities/359051541">
                          <h2>1st @ Martin Greenwood Memorial TT</h2>
                          <ul className={styles.card__tags}>
                            <li>Cycling</li>
                            <li>TimeTrial</li>
                            <li>Win</li>
                          </ul>
                        </a>
                      </div>
                    </div>
                  </HorizontalScrollerItem>

                  <HorizontalScrollerItem>
                    <div className={classNames([styles.card])}>
                      <div className={styles.card__date}>
                        <p>01/08/2015</p>
                      </div>
                      <div className={styles.card__content}>
                        <a href="https://www.strava.com/activities/359051541">
                          <h2>1st @ GCC Undulation Trophy TT</h2>
                          <ul className={styles.card__tags}>
                            <li>Cycling</li>
                            <li>TimeTrial</li>
                            <li>Win</li>
                          </ul>
                        </a>
                      </div>
                    </div>
                  </HorizontalScrollerItem>

                </HorizontalScroller>
              </div>
            </Fade>
          </section>
        </Fade>

        {/*
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
        */}
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
          date(formatString: "MMMM DD, YYYY")
          excerpt
          slug
          featured_media {
            source_url
          }
        }
      }
    }
    postOverview: allWordpressPost(
      limit: 100
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
