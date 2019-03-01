import React, { Component } from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import classNames from 'classnames';
import { DiscussionEmbed } from "disqus-react";
import { get } from 'lodash';

import SEO from '../components/seo';
import StickyMenu from '../components/stickyMenu/stickyMenu';

import styles from './post.module.scss';
import M from '../images/m.svg';

class PostTemplate extends Component {
  state = {
    scrolling: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = event => {
    if (window.scrollY === 0 && this.state.scrolling === true) {
      this.setState({ scrolling: false });
    } else if (window.scrollY !== 0 && this.state.scrolling !== true) {
      this.setState({ scrolling: true });
    }
  };

  render() {
    const post = this.props.data.wordpressPost;

    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    const disqusShortname = "rmalpass";
    const disqusConfig = {
      identifier: post.id,
      title: post.title,
    };

    return (
      <div className={styles.page__post}>
        <SEO title={post.title} />
        <StickyMenu hidden title={post.title} />

        <article className={classNames(
          [styles.post],
          {[styles.has_hero]: post.featured_media},
          {[styles.scrolling]: this.state.scrolling}
        )}>

          {post.featured_media &&
            <div className={classNames([styles.post__hero], {[styles.scrolling]: this.state.scrolling})}>
              <img src={post.featured_media.source_url} alt={post.title} />
            </div>
          }

          <div className={styles.post__content}>
            <header className={styles.post__content__header}>
              <img src={M} alt="Go back home" id="content" name="content" />
              <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
              <p dangerouslySetInnerHTML={{ __html: post.date }} className={styles.post__content__date} />
            </header>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          <div className={styles.post__comments}>
            <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
          </div>
        </article>
        <section className={styles.sidebar}>
          {post.featured_media &&
            <div className={styles.sidebar__media}>
              <img src={post.featured_media.source_url} alt="Hero image" />
            </div>
          }
          <div className={classNames([styles.sidebar__about], {[styles.hasMedia]: post.featured_media})}>
            <img src="http://rossmalpass.co.uk/wp-content/themes/rm/static/img/avatar.jpg" alt="Ross riding a bike" />
            <p>I'm a digital designer living in the North West of England, and working in Stockholm Sweden.</p>
            <p>I love to ride my bicycle, run, take my dogs for long walks, and stuff my face full of delicious food.</p>
            <p>You can follow my exploits on Instagram (@rmalpass). Where I post frequently and shamelessly!</p>
          </div>
          <ul className={styles.sidebar__share}>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
          </ul>
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
      id
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
