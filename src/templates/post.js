import React, { Component } from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";

import SEO from '../components/seo';
import StickyMenu from '../components/stickyMenu/stickyMenu';

import { rhythm } from "../utils/typography";
import styles from './post.module.scss';

class PostTemplate extends Component {
  render() {
    const post = this.props.data.wordpressPost

    return (
      <div className={styles.page__post}>
        <SEO title={post.title} />
        <StickyMenu hidden title={post.title} />
        <article className={styles.post}>
          <div className={styles.post__content}>
            <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </article>
        <section className={styles.sidebar}>
          <header>
            <p>Written by Ross on {post.date}</p>
          </header>
          <div className={styles.sidebar__about}>
            <img src="http://rossmalpass.co.uk/wp-content/themes/rm/static/img/avatar.jpg" alt="Ross riding a bike" />
            <p>I'm a digital designer living in the North West of England, and working in Stockholm Sweden.</p>
            <p>I love to ride my bicycle, run, take my dogs for long walks, and stuff my face full of delicious food.</p>
            <p>You can follow my exploits on Instagram (@rmalpass). Where I post frequently and shamelessly!</p>
          </div>
          {post.featured_media &&
            <div className={styles.sidebar__media}>
              <img src={post.featured_media.source_url} alt="Hero image" />
            </div>
          }
        </section>
      </div>
    )
  }
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default PostTemplate;

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
    date
    content
    featured_media {
      source_url
    }
    author {
      name
    }
  }
  site {
    siteMetadata {
      title
      description
    }
  }
}`
