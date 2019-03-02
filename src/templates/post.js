import React, { Component } from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import classNames from 'classnames';
import { DiscussionEmbed } from "disqus-react";
import { get } from 'lodash';
import { Plus } from 'react-feather';

import SEO from '../components/seo';
import StickyMenu from '../components/stickyMenu/stickyMenu';

import styles from './post.module.scss';
import M from '../images/M.svg';

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
              <Plus size={32} color="#ffffff" />
              <img src={post.featured_media.source_url} className={styles.post__hero__img} alt={post.title} />
            </div>
          }

          <div className={styles.post__content}>
            <header className={styles.post__content__header}>
              <div>
                <img src={M} alt="Go back home" id="content" name="content" />
                <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
                <p className={styles.post__content__categories}>
                  {post.categories.map(category => (
                    <span>
                      {category.name}
                    </span>
                  ))}
                </p>
              </div>
            </header>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            <footer className={styles.post__info}>
              <div className={styles.author_info}>
                <h4>Ross Malpass</h4>
                <p>Is a Designer, writer, and athlete from North West England.</p>
                <p>Current 3 peaks record holder. Father of two.</p>
                <p>Working @ Ombori.</p>
              </div>
              <div className={styles.post_info}>
                <p>
                  This article was written on {post.date} and posted under
                  {post.categories.map(category => (
                    <span>
                      {` `}
                      {category.name}
                    </span>
                  ))}
                </p>
              </div>
            </footer>
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
    date(formatString: "MMMM DD, YYYY")
    content
    featured_media {
      source_url
    }
    author {
      name
    }
    categories {
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
