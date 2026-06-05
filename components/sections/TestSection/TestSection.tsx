'use client'

import styles from './TestSection.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export const TestSection = () => {
  useGSAP(() => {
    gsap.from(`.${styles.title}`, {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
    })
  })

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Build your section here</h1>
    </section>
  )
}
