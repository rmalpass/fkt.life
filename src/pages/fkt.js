import React, { Component } from "react";
import { Link, graphql } from "gatsby";
import classNames from 'classnames';
import Fade from 'react-reveal/Fade';

// Component
import PostIcons from "../components/post-icons";
import BouncyArrow from '../components/bouncyArrow';
import SEO from '../components/seo';
import StickyMenu from '../components/stickyMenu/stickyMenu';
import HorizontalScroller from '../components/horizontalScroller/horizontalScroller';
import HorizontalScrollerItem from '../components/horizontalScroller/horizontalScrollerItem';

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
            <h1>Fastest Know Time</h1>
            <p>The fastest time anyone has completed a given task, i.e., running a trail, climbing a mountain, etc.</p>
          </header>
        </section>

        <article className={styles.fkt__content}>
          I have a thing for pushing myself, testing my limits. I've always done it; with work, my hobbies, and more recently, competitive cycling and endurance challenges. Just read my archives for a ton of back story.

          My latest achievement -- The National Three Peaks by Bike record -- has given me an appetite for something new.

          The Ultra.

          Ultra cycling and running challenges appeal to me in a way that racing never did. The excitement of the buildup and preparation; The unknown as to whether your body and mind can even go that far; Blah, blah blah.

          Ultrarunning is enjoying a massive gain in popularity. And I find myself drawn to the sub-culture of Fastest Known Times.

          I live in Lancashire on the coast of North West England. We have some incredible and landscape on our doorstep. I can go from beach to woodland to grassy singletrack within a few miles. There are many established long-distance routes on the LDWA website that start or end within a few miles of my house.
        </article>

      </div>
    )
  }
}

export default Fkt;
