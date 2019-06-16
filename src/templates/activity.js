import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Map from '../components/mapbox'
import rehypeReact from 'rehype-react'
// import Footer from '../components/footer'
import MarkerLink from '../components/markerLink'
import StravaStats from '../components/stravaStats'
import AltitudeChart from '../components/altitudeChart'
import SEO from '../components/seo'
import RouteCard from '../components/routeCard'
import ImageZoomComponent from '../components/imageZoom'
import InfoCard from '../components/infoCard'
import Hidden from '../components/hidden'
import ImageZoom from 'react-medium-image-zoom'
import StickyMenu from '../components/stickyMenu/stickyMenu';
import M from '../images/M.svg';
import classNames from 'classnames';

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

    return (
      <div className={styles.page__activity}>
        <SEO
          title={this.state.post.frontmatter.title}
          keywords={[`gatsby`, `application`, `react`]}
          description={this.state.post.frontmatter.excerpt}
          image={
            this.state.post.frontmatter.social_image.childImageSharp.fixed.src
          }
        />

        <StickyMenu hidden sidebar={this.state.isToggleOn} title={this.state.post.frontmatter.title} />

        <article className={classNames(
          [styles.post],
          [styles.sidebar_active],
          {[styles.sidebar_active]: this.state.isToggleOn}
        )}>
          <div className={styles.post__content}>
            <header className={styles.post__content__header}>
              <div>
                <img src={M} alt="Go back home" id="content" name="content" />
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
            <div className="mt5 ph4 pv2 bg-near-white flex flex-wrap items-start">
              <a
                className="mv3 link w-100 w-auto-l dim db br2 mb3 mb0-l ph3 pv3 mr3-l mr0 tc b tl db white bg-black ttu"
                href={this.state.post.frontmatter.route_file.publicURL}
              >
                download gpx
              </a>
              <a
                className="mv3 link w-100 w-auto-l dim db br2 mb0 ph3 pv3 tc b tl white db bg-black ttu"
                href={
                  'https://www.strava.com/activities/' +
                  this.state.post.frontmatter.strava_id
                }
              >
                view strava activity
              </a>
            </div>
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
        <section className={classNames([styles.sidebar], [styles.active], {[styles.active]: this.state.isToggleOn})}>
          <Map
            loading={this.state.loading}
            activityData={this.state.activityData}
          />
        </section>
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
        route_file {
          publicURL
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
