import React from 'react'
import styles from "./NotFound.module.css"
import NotFoundPic from "./../../assets/404.jpg"
export default function NotFound() {
  return (
    <div className='container mx-auto'>
      <img src={NotFoundPic} className='w-full' alt=''/>
    </div>
  )
}
