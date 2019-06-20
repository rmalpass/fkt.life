import React, { Component } from "react";
import { Link, graphql } from "gatsby";
import classNames from 'classnames';
import Fade from 'react-reveal/Fade';
import ImageZoom from 'react-medium-image-zoom';
import { Twitter, Instagram, Type } from 'react-feather';

// Component
import PostIcons from "../components/post-icons";
import BouncyArrow from '../components/bouncyArrow';
import SEO from '../components/seo';
import StickyMenu from '../components/stickyMenu/stickyMenu';
import HorizontalScroller from '../components/horizontalScroller/horizontalScroller';
import HorizontalScrollerItem from '../components/horizontalScroller/horizontalScrollerItem';
import DateCountdown from '../components/dateCountdown/dateCountdown';
import ImageZoomComponent from '../components/imageZoom/imageZoom';
import HomeFeature from '../components/homeFeature/homeFeature';

// style
import '../styles/styles.scss';
import styles from './index.module.scss';

// images
import M from '../images/M.svg';
import Logo from '../images/logo.svg';
import NGImg from '../images/newgrounds.jpg';
import ThreePeaksImg from '../images/timeline/3peaks.jpg';
import C2cImg from '../images/timeline/c2c.jpg';
import PeaksHero from '../images/3peaksHero.png';

class Home extends Component {

  render() {
    const data = this.props.data

    return (
      <div className={styles.page__home}>

       <SEO
        title="Ross Malpass"
        keywords={[`cylist`, `designer`, `design sprint`, `blog`, `gatsby`]}
        image={PeaksHero}
      />

       <StickyMenu />

        <Fade>
          <section className={styles.hello}>
            <header>
              <h1>
                <Link to="/records">
                  <img src={M} alt="Malpass Mountains logo" />
                  <div>Ross Malpass <span>FKTs →</span></div>
                </Link>
              </h1>
              <p>Ross is an <a href="https://www.strava.com/athletes/182874">athlete</a>, <a href="https://ombori.com">designer</a>, and <a href="https://medium.com/@rmalpass">writer</a> from North West England.</p>
              <p>Current <Link to="/activities/national-three-peaks-by-bike-record">Three Peaks Challenge</Link> record holder. Father of two.</p>
              <p>Working @ <a href="https://ombori.com" className={styles.ombori}>Ombori</a>. Always plotting and scheming.</p>
              <ul className={styles.social}>
                <li><a href="https://twitter.com/rmalpass" target="_blank"><Twitter size={18} /></a></li>
                <li><a href="https://instagram.com/rmalpass" target="_blank"><Instagram size={18} /></a></li>
                <li><a href="https://medium.com/@rmalpass" target="_blank"><Type size={18} /></a></li>
              </ul>
            </header>
            <div className={styles.bouncyArrow}>
              <BouncyArrow />
            </div>
          </section>
        </Fade>

        <HomeFeature
          title="The National Three Peaks by Bike. A Record-breaking Ride"
          content="In August 2017 I set the record for hiking the three largest hills in the UK and cycling the 800 mile distance between them. It took 37 hours."
          link="/activities/national-three-peaks-by-bike-record"
          image={PeaksHero}
        />

        {/*}
        <section className={styles.threePeaks}>
          <img src={PeaksHero}/>
          <header className={styles.threePeaks__header}>
            <h1>The National Three Peaks by Bike. A Record-breaking Ride</h1>
            <p>In August 2017 I set the record for hiking the three largest hills in the UK and cycling the 800 mile distance between them. It took 37 hours.</p>
            <p><Link to="/activities/national-three-peaks-by-bike-record" data-link-external>Read More</Link></p>
          </header>
        </section>
        */}

        <section className={styles.timeline}>
          <Fade right>
            <div className={styles.timeline__posts}>
              <HorizontalScroller fullWidth>

                <HorizontalScrollerItem>
                  <header className={styles.timeline__header}>
                    <h1>Schedule, events & achievements</h1>
                  </header>
                </HorizontalScrollerItem>

                <HorizontalScrollerItem>
                  <div className={styles.timeline__year}>
                    2019
                  </div>
                </HorizontalScrollerItem>

                <HorizontalScrollerItem>
                  <div className={classNames([styles.card], [styles.scheduled])}>
                    <div className={styles.card__date}>
                      <p>22/09/2019</p>
                    </div>
                    <div className={styles.card__content}>
                      <div className={styles.card__content__media}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/16/Ribble_-_geograph.org.uk_-_42616.jpg" />
                        <div className={styles.countdown}>
                          <DateCountdown second="09/22/2019" />
                        </div>
                      </div>
                      <h2>The Ribble Way FKT attempt</h2>
                      <ul className={styles.card__tags}>
                        <li>Running</li>
                        <li>Ultra</li>
                        <li>FKT Attempt</li>
                      </ul>
                      <div className={styles.arrow} />
                    </div>
                  </div>
                </HorizontalScrollerItem>

                <HorizontalScrollerItem>
                  <div className={classNames([styles.card], [styles.scheduled])}>
                    <div className={styles.card__date}>
                      <p>8/09/2019</p>
                    </div>
                    <div className={styles.card__content}>
                      <div className={styles.card__content__media}>
                        <img src="https://instagram.fman1-1.fna.fbcdn.net/vp/ad4e52f969baf09b2dfcf38d103f12d3/5D7E80D2/t51.2885-15/e35/18381884_244134129323854_2252555259777908736_n.jpg?_nc_ht=instagram.fman1-1.fna.fbcdn.net" />
                        <div className={styles.countdown}>
                          <DateCountdown second="09/08/2019" />
                        </div>
                      </div>
                      <h2>Ambleside Trail 60km</h2>
                      <ul className={styles.card__tags}>
                        <li>Running</li>
                        <li>Ultra</li>
                      </ul>
                    </div>
                  </div>
                </HorizontalScrollerItem>

                <HorizontalScrollerItem>
                  <div className={classNames([styles.card], [styles.scheduled])}>
                    <div className={styles.card__date}>
                      <p>03/08/2019</p>
                    </div>
                    <div className={styles.card__content}>
                      <a href="https://fastestknowntime.com/route/lancaster-canal-uk">
                        <div className={styles.card__content__media}>
                          <img src="https://fastestknowntime.com/sites/default/files/styles/very_large/public/2019-06/33117.jpg?itok=oWekc7jL" />
                          <div className={styles.countdown}>
                            <DateCountdown second="08/03/2019" />
                          </div>
                        </div>
                        <h2>The Lancaster Canal FKT attempt</h2>
                        <ul className={styles.card__tags}>
                          <li>Running</li>
                          <li>Ultra</li>
                          <li>FKT Attempt</li>
                        </ul>
                        <div className={styles.arrow} />
                        {/* <div dangerouslySetInnerHTML={{ __html: node.excerpt }} /> */}
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
                      <Link to="/activities/national-three-peaks-by-bike-record">
                        <div className={styles.card__content__media}>
                          <img src={ThreePeaksImg} alt="Start of the National Three Peaks Challenge" />
                        </div>
                        <h2>The National Three Peaks by Bike</h2>
                        <ul className={styles.card__tags}>
                          <li>Record</li>
                          <li>Cycling</li>
                          <li>Ultra</li>
                        </ul>
                        <div className={styles.arrow} />
                        {/* <div dangerouslySetInnerHTML={{ __html: node.excerpt }} /> */}
                      </Link>
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
                      <Link to="activities/coast-to-coast/">
                        <div className={styles.card__content__media}>
                          <img src={C2cImg} alt="Bombing a hill on the coast to coast ride" />
                        </div>
                        <h2>Morecambe to Scarborough Coast 2 Coast</h2>
                        <ul className={styles.card__tags}>
                          <li>Cycling</li>
                          <li>Ultra</li>
                        </ul>
                        <div className={styles.arrow} />
                        {/* <div dangerouslySetInnerHTML={{ __html: node.excerpt }} /> */}
                      </Link>
                    </div>
                  </div>
                </HorizontalScrollerItem>

              </HorizontalScroller>
            </div>
          </Fade>
        </section>

        <Fade>
          <HomeFeature
            title="Breaking New Ground"
            content="I have decided to start chasing Fastest Known Times on North West England's finest trails."
            link="/records"
            image={NGImg}
            reverse
          />
        </Fade>

        <section className={styles.archives}>
          <aside>
            <h2>Posts from my archives</h2>
            <ul>
              <li><a href="http://archive.rossmalpass.co.uk/adventures">Adventures</a></li>
              <li><a href="http://archive.rossmalpass.co.uk/category/cycling">Cycling</a></li>
              <li><a href="http://archive.rossmalpass.co.uk/category/design">Design</a></li>
              <li><a href="http://archive.rossmalpass.co.uk/category/food">Food</a></li>
              <li><a href="http://archive.rossmalpass.co.uk/category/life">Life</a></li>
              <li><a href="http://archive.rossmalpass.co.uk/category/outdoors">Outdoors</a></li>
            </ul>
          </aside>
          <ol>
            {data.postOverview.edges.map(({ node }) => (
              <li key={node.slug}>
                <Link to={node.slug} css={{ textDecoration: `none` }}>
                  <h3 dangerouslySetInnerHTML={{ __html: node.title }} />
                  <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                  {/*
                      <footer>
                        <PostIcons node={node} />
                      </footer>
                  */}
                </Link>
              </li>
            ))}
          </ol>
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
