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

const defaultProps = {
  isToggleOn: false,
};

class PostTemplate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scrolling: false,
      isToggleOn: false,
    };
  }

  toggleMenu = () => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
    }));
    console.log('menu toggle', this.state.isToggleOn);
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
    const categories = this.props.data.allWordpressCategory;

    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    const disqusShortname = "rmalpass";
    const disqusConfig = {
      identifier: post.id,
      title: post.title,
    };

    return (
      <div className={styles.page__post}>
        <SEO title={post.title} />
        <StickyMenu hidden sidebar={this.state.isToggleOn} title={post.title} />

        <article className={classNames(
          [styles.post],
          {[styles.has_hero]: post.featured_media},
          {[styles.scrolling]: this.state.scrolling},
          {[styles.sidebar_active]: this.state.isToggleOn}
        )}>

          <div
            className={classNames([styles.post__btn_more], {[styles.scrolling]: this.state.scrolling}, {[styles.sidebar_active]: this.state.isToggleOn})}
            onClick={this.toggleMenu}
          >
            <Plus size={32} color="#ffffff" />
            {post.featured_media &&
              <img src={post.featured_media.source_url} className={styles.post__btn_more__img} alt={post.title} />
            }
          </div>

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
        <section className={classNames([styles.sidebar], {[styles.active]: this.state.isToggleOn})}>
          {post.featured_media &&
            <div className={styles.sidebar__media}>
              <img src={post.featured_media.source_url} alt="Hero image" />
            </div>
          }
          <div className={styles.sidebar__categories}>
          <ul>

          </ul>
          </div>
          <div className={styles.sidebar__post_info}>
            <p>
              This article was written on <strong>{post.date}</strong> and is about
              {post.categories.map(category => (
                <span>
                  {category.name}
                </span>
              ))}
            </p>
            <p>
              I also write about
            </p>
            <ul>
              {/* categories.edges.map(({ node }) => (
                <li>
                  {node.name}
                </li>
              ))*/}
              <li><a href="#">Adventures</a></li>
              <li><a href="#">Cycling</a></li>
              <li><a href="#">Design</a></li>
              <li><a href="#">Food</a></li>
              <li><a href="#">Life</a></li>
              <li><a href="#">Outdoors</a></li>
            </ul>
          </div>
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
  allWordpressCategory {
    edges {
      node {
        name
      }
    }
  }
  site {
    siteMetadata {
      title
      description
    }
  }
}`
