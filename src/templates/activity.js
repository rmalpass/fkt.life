import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
import Map from '../components/mapbox'
import rehypeReact from 'rehype-react'
import classNames from 'classnames';
import { get } from 'lodash';

// import Footer from '../components/footer'
import MarkerLink from '../components/markerLink'
import StravaStats from '../components/stravaStats/stravaStats'
import AltitudeChart from '../components/altitudeChart/altitudeChart'
import SEO from '../components/seo'
import RouteCard from '../components/routeCard'
import ImageZoomComponent from '../components/imageZoom/imageZoom'
import InfoCard from '../components/infoCard'
import Hidden from '../components/hidden'
import ImageZoom from 'react-medium-image-zoom'
import StickyMenu from '../components/stickyMenu/stickyMenu';
import { MapPin } from 'react-feather';

import styles from './activity.module.scss';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    'marker-link': MarkerLink,
    'route-card': RouteCard,
    'image-zoom': ImageZoomComponent,
    hidden: Hidden,
    'info-card': InfoCard,
  },
}).Compiler

class PostPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: props.data.queryPost,
      loading: true,
    }
  }

  fetchData() {
    let publicAccessToken = '43c4b7dd7c2a5e99db779498e960fdc039896087'
    let activityApiUrl =
      'https://www.strava.com/api/v3/activities/' +
      this.state.post.frontmatter.strava_id

    let activityStreamApiUrl =
      activityApiUrl + '/streams/altitude,latlng?resolution=medium'

    let urls = [activityApiUrl, activityStreamApiUrl]

    let requests = urls.map(url =>
      fetch(url, {
        method: 'get',
        headers: {
          'content-type': 'application/json',
          authorization: 'Bearer ' + publicAccessToken,
        },
      })
        .then(resp => {
          return resp.json()
        })
        .then(json => {
          let checkIsArray = Array.isArray(json)
          if (checkIsArray) {
            this.setState({ streams: json })
          } else {
            this.setState({ activityData: json })
          }
        })
    )

    Promise.all(requests).then(responses => {
      this.setState({ loading: false })
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    let coverImageSrc = this.state.post.frontmatter.cover_image.childImageSharp
      .sizes.src
    let coverImageSrcSet = this.state.post.frontmatter.cover_image
      .childImageSharp.sizes.srcSet
    let coverImageSrcSetFull = coverImageSrcSet.split(',').splice(-1)[0]
    let coverImageSrcSetFullFlatten = coverImageSrcSetFull
      .replace(/(\r\n\t|\n|\r\t)/gm, '')
      .split(' ')[0]

    // Fetch timeline
    let getTimeline = require('../posts/' + this.state.post.frontmatter.timeline.relativePath);
    const timelineData = getTimeline.timeline;
    console.log(timelineData);

    return (
      <div className={styles.page__activity}>
        <SEO
          title={this.state.post.frontmatter.title + ` by ` + this.state.post.frontmatter.author}
          keywords={[`fkt`, `record`, `ultra`]}
          description={this.state.post.frontmatter.excerpt}
          image={
            this.state.post.frontmatter.social_image.childImageSharp.fixed.src
          }
        />

        <StickyMenu hidden title={this.state.post.frontmatter.title} />

        <article className={styles.activity}>

          <header className={styles.activity__header}>
            <h1>{this.state.post.frontmatter.title}</h1>
          </header>

          <div className={styles.activity__excerpt} dangerouslySetInnerHTML={{ __html: this.state.post.frontmatter.excerpt }}  />

          <ul className={styles.activity__data}>
            <li>
              <strong>Total Time</strong>
              {this.state.post.frontmatter.time}
            </li>
            <li>
              <strong>Total Distance</strong>
              {this.state.post.frontmatter.distance}
            </li>
          </ul>

          <ul className={classNames([styles.activity__timeline], {[styles.loading]: this.state.loading})}>
            {timelineData.map(item => (
              <li>
                <MarkerLink lat={item.lat} lng={item.lng} label={item.label} zoom={item.zoom}>
                  <MapPin size={24} />
                  <strong>{item.title}</strong>
                  {item.date}
                </MarkerLink>
              </li>
            ))}
          </ul>

          <div className={classNames([styles.activity__chart], {[styles.loading]: this.state.loading})}>
            <AltitudeChart
              loading={this.state.loading}
              data={this.state.streams}
            />
          </div>

          <div className={classNames([styles.activity__map], {[styles.loading]: this.state.loading})}>
            <Map
              loading={this.state.loading}
              activityData={this.state.activityData}
            />
          </div>

          <section className={styles.post__content}>
            <p className={styles.post__crew}>Special thanks to <span>{this.state.post.frontmatter.crew}</span></p>
            {renderAst(this.state.post.htmlAst)}
            <footer className={styles.post__footer}>
              <a
                className="btn btn__white"
                href={this.state.post.frontmatter.route_file.publicURL}
              >
                download gpx
              </a>
              <a
                className="btn btn__primary"
                href={
                  'https://www.strava.com/activities/' +
                  this.state.post.frontmatter.strava_id
                }
              >
                view strava activity
              </a>
            </footer>
          </section>


          {/*
          <div className={styles.post__content}>
            <header className={styles.post__content__header}>
              <div>
                <Link to="/"><img src={M} alt="Go back home" id="content" name="content" /></Link>
                <h1>{this.state.post.frontmatter.title}</h1>
                <p className={styles.post__content__categories}>
                  {this.state.post.frontmatter.location} •{' '}
                  {this.state.post.frontmatter.date} • by{' '}
                  {this.state.post.frontmatter.author}
                </p>
              </div>
            </header>
            <div className={styles.activity__stats}>
              <AltitudeChart
                loading={this.state.loading}
                data={this.state.streams}
              />
              <StravaStats
                loading={this.state.loading}
                activityData={
                  this.state.activityData ? this.state.activityData : 0
                }
              />
            </div>
            {renderAst(this.state.post.htmlAst)}
            <footer className={styles.post__footer}>
              <a
                className="btn btn__white"
                href={this.state.post.frontmatter.route_file.publicURL}
              >
                download gpx
              </a>
              <a
                className="btn btn__primary"
                href={
                  'https://www.strava.com/activities/' +
                  this.state.post.frontmatter.strava_id
                }
              >
                view strava activity
              </a>
            </footer>
          </div>
          {/*
          <ImageZoom
            image={{
              src: coverImageSrc,
              alt: 'main',
              className: 'w-100',
            }}
            zoomMargin={10}
            zoomImage={{
              src: coverImageSrcSetFullFlatten,
              alt: 'main',
              className: 'w-100',
            }}
          />
          */}

        </article>
      </div>
    )
  }
}

export const query = graphql`
  query($slug: String!) {
    queryPost: markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
        location
        excerpt
        crew
        distance
        time
        route_file {
          publicURL
        }
        timeline {
          relativePath
        }
        author
        strava_id
        social_image {
          childImageSharp {
            fixed(width: 1200, height: 630) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        cover_image {
          childImageSharp {
            sizes(maxWidth: 1400, maxHeight: 1000, cropFocus: CENTER) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        date(formatString: "DD MMMM, YYYY")
      }
    }
  }
`

export default PostPage
