import React from "react";
import Fade from 'react-reveal/Fade';
import { Camera } from 'react-feather';

import styles from './insta.module.scss';

import ThreePeaks from './3peaks.png';
import ThreePeaksTwo from './3peaks2.png';
import Bike from './bike.png';
import Drone from './drone.png';
import Ferry from './ferry.png';
import Loughrigg from './loughrigg.png';
import OldMan from './oldMan.png';
import Pigs from './pigs.png';
import Scotland from './scotland.png';
import Shoes from './shoes.png';
import Waterfall from './waterfall.png';

const Insta = () => (
  <ul className={styles.insta__grid}>
    <li className={styles.col_8__row_1__span_4}>
      <Fade>
        <img src={ThreePeaks} alt="Three Peaks by Bike Record" />
        <div className={styles.info}>
          <Camera size={16} />
          <span>
            Climbing a hill somewhere in the Lythe Valley on my national Three Peaks Record ride.
          </span>
        </div>
      </Fade>
    </li>
    <li className={styles.col_3__row_3__span_3}>
      <Fade>
        <img src={Shoes} alt="Nike Trail Shoes" />
        <div className={styles.info}>
          <Camera size={16} />
          <span>
            Nike Kiger Trail Shoes 🔥.
          </span>
        </div>
      </Fade>
    </li>
    <li className={styles.col_8__row_5__span_3}>
      <Fade>
        <img src={Bike} alt="Riding my bike in team kit" />
        <div className={styles.info}>
          <Camera size={16} />
          <span>
            Riding my bike in team kit.
          </span>
        </div>
      </Fade>
    </li>
    <li className={styles.col_6__row_1__span_2}>
      <Fade>
        <img src={Loughrigg} alt="View of Ridal Water from Loughrigg fell" />
        <div className={styles.info}>
          <Camera size={16} />
          <span>
            View of Ridal Water from Loughrigg fell.
          </span>
        </div>
      </Fade>
    </li>
    <li className={styles.col_6__row_3__span_2}>
      <Fade>
        <img src={Drone} alt="A drone's eye view of St Annes pier." />
        <div className={styles.info}>
          <Camera size={16} />
          <span>
            A drone's eye view of St Annes pier.
          </span>
        </div>
      </Fade>
    </li>
    <li className={styles.col_6__row_6__span_2}>
      <Fade>
        <img src={Scotland} alt="Snowy Scotland near Fort William." />
        <div className={styles.info}>
          <Camera size={16} />
          <span>
            Snowy Scotland near Fort William.
          </span>
        </div>
      </Fade>
    </li>
    <li className={styles.col_3__row_2__span_1}>
      <Fade>
        <img src={Pigs} alt="The Piggeries in the Forest of Bowland" />
      </Fade>
    </li>
    <li className={styles.col_4__row_1__span_2}>
      <Fade>
        <img src={ThreePeaksTwo} alt="Climbing in Scotland on the Three Peaks record" />
      </Fade>
    </li>
    <li className={styles.col_2__row_4__span_1}>
      <Fade>
        <img src={Waterfall} alt="Ingleton Falls" />
      </Fade>
    </li>
    <li className={styles.col_11__row_5__span_1}>
      <Fade>
        <img src={Ferry} alt="Corran Ferry crossing" />
      </Fade>
    </li>
  </ul>
)

export default Insta;
