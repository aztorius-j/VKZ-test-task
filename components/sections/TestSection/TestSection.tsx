'use client'

import styles from './TestSection.module.scss'
import { useState } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(SplitText, ScrollTrigger, CustomEase)

const easeOverlay = CustomEase.create(
  'easeOverlay',
  'M0,0 C0.272,0 0.213,0.394 0.339,0.699 0.426,0.912 0.744,1 1,1 '
)

const easeQrCode = CustomEase.create(
  'easeQrCode',
  'M0,0 C0.272,0 0.251,0.155 0.285,0.482 0.329,0.914 0.744,1 1,1 '
)

export const TestSection = () => {
  const [isReady, setIsReady] = useState(false)

  useGSAP(
    () => {
      if (!isReady) return

      // IPHONE
      gsap.to(`.${styles.iphone}`, {
        x: '3.5%',
        y: '-72%',
        duration: 1.95,
        delay: 0.1,
        ease: 'power2.out',
      })

      gsap.to(`.${styles.iphone}`, {
        scale: 0.8,
        delay: 0.2,
        duration: 1.7,
        ease: 'power1.out',
      })

      // PURPLE BACKGROUND
      const qrWrapper = document.querySelector(`.${styles.qrWrapper}`) as HTMLElement
      const rect = qrWrapper.getBoundingClientRect()

      const overlay = document.createElement('div')
      const stickyContainer = document.querySelector(`.${styles.stickyContainer}`) as HTMLElement
      stickyContainer.insertAdjacentElement('beforeend', overlay)

      gsap.set(overlay, {
        position: 'fixed',
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        backgroundColor: '#e6c3ff',
        borderRadius: '1.25rem',
        zIndex: 5,
      })

      gsap.to(overlay, {
        top: '0.5rem',
        left: '0.5rem',
        width: 'calc(100vw - 1rem)',
        height: 'calc(100svh - 1rem)',
        duration: 2,
        ease: easeOverlay,
      })

      // QR CODE
      gsap.to(`.${styles.qrCode}`, {
        x: '6%',
        y: '-420%',
        duration: 1.7,
        ease: easeQrCode,
      })

      gsap.to(`.${styles.qrCode}`, {
        scale: 2.5,
        duration: 0.5,
        delay: 0.3,
        ease: 'power1.out',
      })

      return () => overlay.remove()
    },
    { dependencies: [isReady] }
  )

  useGSAP(() => {
    // TITLE
    const splitTitle = new SplitText(`.${styles.title}`, { type: 'lines' })
    gsap.from(splitTitle.lines, {
      opacity: 0,
      duration: 0.2,
      ease: 'power3.in',
      stagger: 0.035,
    })
    gsap.from(splitTitle.lines, {
      y: 200,
      duration: 1.4,
      ease: 'power3.out',
      stagger: 0.035,
    })

    // PARAGRAPH
    const splitParagraph = new SplitText(`.${styles.paragraph}`, { type: 'lines' })
    gsap.from(splitParagraph.lines, {
      opacity: 0,
      duration: 0.2,
      delay: 0.075,
      ease: 'power3.in',
      stagger: 0.035,
    })
    gsap.from(splitParagraph.lines, {
      y: 200,
      duration: 1.5,
      delay: 0.075,
      ease: 'power3.out',
      stagger: 0.035,
    })

    // QR CODE
    gsap.from(`.${styles.qrContainer}`, {
      opacity: 0,
      duration: 0.2,
      delay: 0.2,
      ease: 'power3.in',
    })
    gsap.from(`.${styles.qrContainer}`, {
      y: 200,
      duration: 1.6,
      delay: 0.2,
      ease: 'power3.out',
    })

    // STICKY ELEMENT
    ScrollTrigger.create({
      trigger: `.${styles.stickyContainer}`,
      pin: true,
      start: 'top top',
      end: '+=100%',
    })

    // IPHONE
    gsap.from(`.${styles.iphone}`, {
      y: 350,
      duration: 1.65,
      delay: 0.25,
      ease: 'power2.out',
    })

    ScrollTrigger.create({
      trigger: `.${styles.section}`,
      start: 'center center',
      onEnter: () => setIsReady(true),
    })
  })

  return (
    <section className={styles.section}>
      <div className={styles.stickyContainer}>
        <div className={styles.paddingEl}></div>
        <div className={styles.mainContainer}>
          <div className={styles.centerContainer}>
            <h1 className={styles.title}>Rychlé a jednoduché QR řešení</h1>
            <p className={styles.paragraph}>
              MúzaPay nabízí rychlé a bezpečné QR platby, které zjednodušují čerpání benefitů přímo
              přes mobilní zařízení. Bez fyzických karet či papírových poukazů poskytuje moderní a
              efektivní způsob, jak pohodlně spravovat zaměstnanecké výhody.
            </p>
          </div>
          <div className={styles.qrContainer}>
            <div className={styles.qrWrapper}>
              <img src='/img/qr.svg' alt='QR code' className={styles.qrCode} />
            </div>
          </div>
        </div>
        <div className={styles.animationContainer}>
          <img src='/img/iphone.png' alt='iphone' className={styles.iphone} />
          {/* <img src='/img/up.png' alt='up' className={styles.up} /> */}
          {/* <img src='/img/down.png' alt='down' className={styles.down} /> */}
          {/* <img src='/img/middle.png' alt='middle' className={styles.middle} /> */}
        </div>
      </div>
    </section>
  )
}
