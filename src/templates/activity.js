import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
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
import Map from '../components/mapbox';
import Timeline from '../components/timeline/timeline';
import { ChevronLeft, Twitter, Facebook } from 'react-feather';

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

    let photoStreamUrl =
      activityApiUrl + '/photos?photo_sources=true'

    let urls = [activityApiUrl, activityStreamApiUrl, photoStreamUrl]

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

    let fbLink = 'https://www.facebook.com/sharer/sharer.php?u=https://fkt.life/' + this.state.post.fields.slug;
    let twLink = 'https://twitter.com/home?status=https://fkt.life/' + this.state.post.fields.slug + this.state.post.frontmatter.excerpt;

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

        <article className={classNames([styles.activity])}>

          <div className={styles.activity__hero}>
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
          </div>

          <header className={styles.activity__header}>
            <Link className={styles.btn__back} to="/"><ChevronLeft size={24} />Back</Link>
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

          <div className={styles.activity__timeline}>
            <Timeline
              relativePath={this.state.post.frontmatter.timeline.relativePath}
              loading={this.state.loading}
            />
          </div>

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
            <div className={styles.activity__share}>
              <a href={twLink}><Twitter size={24} /></a>
              <a href={fbLink}><Facebook size={24} /></a>
            </div>
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
        </article>
      </div>
    )
  }
}

export const query = graphql`
  query($slug: String!) {
    queryPost: markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      fields {
        slug
      }
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
