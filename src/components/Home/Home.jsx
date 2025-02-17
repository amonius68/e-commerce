import React, { useContext } from 'react';
import styles from "./Home.module.css"
import { CounterContext } from '../../Context/counterContext'
import FeatureProducts from '../FeatureProducts/FeatureProducts';
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Helmet } from 'react-helmet';
export default function Home() {

  
  
  return (
    <div>

      <MainSlider/>
      <CategorySlider/>
      <FeatureProducts/>
    </div>
  )
}
