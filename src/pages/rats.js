import React, { Component } from "react";
import { Link, graphql } from "gatsby";
import classNames from 'classnames';
import Img from 'gatsby-image';

// Component
import SEO from '../components/seo';
import StickyMenu from '../components/stickyMenu/stickyMenu';

// style
import '../styles/styles.scss';
import styles from './fkt.module.scss';

// images
import M from '../images/M.svg';
import ratpack from '../images/ratpack.png';

class Fkt extends Component {

  render() {
    const data = this.props.data

    return (
      <div className={styles.page__fkt}>

       <SEO
        title="NW RATS 🐀"
        description="NORT WEST ROAD & TRAIL SCENE"
        keywords={[`running`, `route`, `map`, `ultra`, `cycling`]}
      />

       <StickyMenu />

        <section className={styles.hero}>
          <header>
            <Link to="/"><img src={ratpack} alt="Malpass Mountains logo" /></Link>
            <p><strong>FKT:</strong> The fastest known time anyone has completed a given task, i.e., running a trail, climbing a mountain, etc.</p>
            <p>Or sometimes just: "<strong className={styles.fkt}>I'm FKT</strong>".</p>
          </header>
        </section>

      </div>
    )
  }
}

export default Fkt;

export const query = graphql`
  query {
    allPosts: allMarkdownRemark(
      filter: { frontmatter: { fkt: { eq: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            fkt
            start
            finish
            time
            strava_id
            excerpt
            title
            date(formatString: "DD MMMM, YYYY")
            cover_image {
              childImageSharp {
                fluid(maxWidth: 700, maxHeight: 500, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
