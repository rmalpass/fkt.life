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

class Fkt extends Component {

  render() {
    const data = this.props.data

    return (
      <div className={styles.page__fkt}>

       <SEO title="Designer" keywords={[`design system`, `designer`, `design sprint`, `sketch`, `gatsby`]} />
       <StickyMenu />

        <section className={styles.hero}>
          <header>
            <img src={M} alt="Malpass Mountains logo" />
            <h1>Fastest Known Time</h1>
            <p><strong>FKT:</strong> The fastest time anyone has completed a given task, i.e., running a trail, climbing a mountain, etc.</p>
            <p>Or sometimes just: <strong>"I'm FKT"</strong>.</p>
          </header>
        </section>

        <ul className={styles.fkt__docs}>
          {data.allPosts.edges.map(({ node }) => (
            <li key={node.frontmatter.title}>
              <Link to={node.fields.slug} css={{ textDecoration: `none` }}>
                <Img
                  fluid={node.frontmatter.cover_image.childImageSharp.fluid}
                />
                <header>
                  <h2>{node.frontmatter.title}</h2>
                  <p>{node.frontmatter.excerpt}</p>
                </header>
                <footer>
                  <ul>
                    <li><strong>Start:</strong> {node.frontmatter.start}</li>
                    <li><strong>Finish:</strong> {node.frontmatter.finish}</li>
                    <li><strong>FKT:</strong> {node.frontmatter.time}</li>
                  </ul>
                </footer>
              </Link>
            </li>
          ))}
        </ul>

        {/*<article className={styles.fkt__content}>
          <p>I have a thing for pushing myself, testing my limits. I've always done it; with work, my hobbies, and more recently, competitive cycling and endurance challenges. Just read my archives for a ton of back story.</p>

          <p>My latest achievement -- The National Three Peaks by Bike record -- has given me an appetite for something new.</p>

          <p>The Ultra.</p>

          <p>Ultra cycling and running challenges appeal to me in a way that racing never did. The excitement of the buildup and preparation; The unknown as to whether your body and mind can even go that far; Blah, blah blah.</p>

          <p>Ultrarunning is enjoying a massive gain in popularity. And I find myself drawn to the sub-culture of Fastest Known Times.</p>

          <p>I live in Lancashire on the coast of North West England. We have some incredible and landscape on our doorstep. I can go from beach to woodland to grassy singletrack within a few miles. There are many established long-distance routes on the LDWA website that start or end within a few miles of my house.</p>
        </article>
        */}

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
