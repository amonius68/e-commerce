import React from 'react'
import styles from "./Loader.module.css"
import { ThreeCircles } from 'react-loader-spinner'
export default function Loader() {
  return (
    <>
    <ThreeCircles
  visible={true}
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="three-circles-loading"
  wrapperClass="wrapper-class h-[70vh] flex justify-center items-center"
  wrapperStyle={{}}
  />

    </>
  )
}
