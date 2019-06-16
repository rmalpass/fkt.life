import React, { Component } from 'react'
import ImageZoom from 'react-medium-image-zoom'

import styles from './imageZoom.module.scss';

class ImageZoomComponent extends Component {
  render() {
    let imgSrcSet = this.props.children[0].props.children[3].props.srcSet
    let imgSrcSetArray = imgSrcSet.split(', ')
    let imgsrc = this.props.children[0].props.children[3].props.src
    let imgsrcFull = imgSrcSetArray.slice(-1)[0].split(' ')[0]

    return (
      <div>
        <figure className={styles.figure}>
          <ImageZoom
            image={{
              src: imgsrc,
              alt: 'adf',
              style: { width: '100em' },
            }}
            zoomMargin={0}
            zoomImage={{
              src: imgsrcFull,
              alt: 'adf',
            }}
          />
          {this.props.caption ? (
            <figcaption>
              {this.props.caption}
            </figcaption>
          ) : null}
        </figure>
      </div>
    )
  }
}

export default ImageZoomComponent
