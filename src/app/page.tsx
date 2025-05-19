"use client";
import React from 'react'
import Homepage from './Components/Home'
import Cursor from './Components/Cursor'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
const Home = () => {
  return (
    <Homepage>
      <Cursor />
    </Homepage>
  )
}

export default Home
