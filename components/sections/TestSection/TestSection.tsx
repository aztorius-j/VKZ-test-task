'use client'

import styles from './TestSection.module.scss'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(SplitText, ScrollTrigger)

export const TestSection = () => {
  useGSAP(() => {
    const rootUnit = 3.5 // adjust for responsive breakpoints
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const qrCodeSize = rootUnit * 1.5625 * rootFontSize
    const stickyContainer = document.querySelector(`.${styles.stickyContainer}`) as HTMLElement
    const paragraph = document.querySelector(`.${styles.paragraph}`) as HTMLElement
    const splitTitle = new SplitText(`.${styles.title}`, { type: 'lines' })
    const splitParagraph = new SplitText(paragraph, { type: 'lines' })
    const qrPurpleBg = document.querySelector(`.${styles.qrPurpleBg}`) as HTMLElement
    const qrCode = document.querySelector(`.${styles.qrCode}`) as HTMLElement
    const centerContainer = document.querySelector(`.${styles.centerContainer}`) as HTMLElement
    const iphone = document.querySelector(`.${styles.iphone}`) as HTMLElement
    const upEl = document.querySelector(`.${styles.up}`) as HTMLElement
    const middleEl = document.querySelector(`.${styles.middle}`) as HTMLElement
    const downEl = document.querySelector(`.${styles.down}`) as HTMLElement
    document.documentElement.style.setProperty('--rootUnit', `${rootUnit}rem`)

    // ------------------
    // *** FIRST PART ***
    // ------------------
    gsap.set([splitTitle.lines, splitParagraph.lines, qrPurpleBg], { opacity: 0, y: 200 })

    ScrollTrigger.create({
      trigger: paragraph,
      start: 'top bottom',
      once: true,
      onEnter: () => {
        // TITLE
        gsap.to(splitTitle.lines, {
          opacity: 1,
          duration: 0.2,
          ease: 'power3.in',
          stagger: 0.035,
        })
        gsap.to(splitTitle.lines, {
          y: 0,
          duration: 1.4,
          ease: 'power3.out',
          stagger: 0.035,
        })

        // PARAGRAPH
        gsap.to(splitParagraph.lines, {
          opacity: 1,
          duration: 0.2,
          delay: 0.075,
          ease: 'power3.in',
          stagger: 0.035,
        })
        gsap.to(splitParagraph.lines, {
          y: 0,
          duration: 1.5,
          delay: 0.075,
          ease: 'power3.out',
          stagger: 0.035,
        })

        // QR CODE
        gsap.to(qrPurpleBg, {
          opacity: 1,
          duration: 0.2,
          delay: 0.2,
          ease: 'power3.in',
        })
        gsap.to(qrPurpleBg, {
          y: 0,
          duration: 1.6,
          delay: 0.2,
          ease: 'power3.out',
        })
      },
    })

    // -------------------
    // *** SECOND PART ***
    // -------------------
    const animationTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: stickyContainer,
        pin: true,
        scrub: true,
        start: `top+=${rootUnit * 12.5} center`,
        end: 'bottom bottom',
        pinSpacing: false,
        invalidateOnRefresh: true,
      },
    })

    // QR WRAPPER
    animationTimeLine.fromTo(
      qrPurpleBg,
      { width: qrCodeSize, height: qrCodeSize },
      { width: '100%', height: '100%', ease: 'none', duration: 0.62 },
      '<'
    )

    // QR CODE
    animationTimeLine.fromTo(qrCode, { scale: 1 }, { scale: 2.32, duration: 0.9 }, '<')

    // CENTER CONTAINER
    animationTimeLine.fromTo(
      centerContainer,
      { x: '-58.35%', y: 0 },
      { x: '-58.35%', y: '-58.75%', duration: 0.9 },
      '<'
    )

    // IPHONE
    animationTimeLine.fromTo(
      iphone,
      { x: 0, scale: 1.25, transformOrigin: 'right top' },
      { x: '-8.5%', scale: 1, transformOrigin: 'right top', duration: 0.8 },
      '<'
    )

    //UP (BALL)
    animationTimeLine.fromTo(upEl, { y: '250%' }, { y: 0, duration: 1 }, '<')

    // MIDDLE
    animationTimeLine.fromTo(
      middleEl,
      { y: '130%', rotate: '64deg' },
      { y: 0, rotate: '28deg', duration: 0.6 },
      '<+=0.4'
    )

    // DOWN
    animationTimeLine.fromTo(
      downEl,
      { y: '280%', rotate: '7deg' },
      { y: 0, rotate: '29deg', duration: 0.6 },
      '<'
    )
  })

  return (
    <>
      <section className={styles.dummySection}></section>
      <section className={styles.section}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Rychlé a jednoduché QR řešení</h1>
          <p className={styles.paragraph}>
            MúzaPay nabízí rychlé a bezpečné QR platby, které zjednodušují čerpání benefitů přímo
            přes mobilní zařízení. Bez fyzických karet či papírových poukazů poskytuje moderní a
            efektivní způsob, jak pohodlně spravovat zaměstnanecké výhody.
          </p>
        </div>
        <div className={styles.stickyContainer}>
          <div className={styles.qrContainer}>
            <div className={styles.qrPurpleBg}>
              <img src='/img/qr.svg' alt='QR code' className={styles.qrCode} />
            </div>
          </div>
          <div className={styles.centerContainer}>
            <img src='/img/iphone.png' alt='iphone' className={styles.iphone} />
            <img src='/img/up.png' alt='up' className={styles.up} />
            <img src='/img/middle.png' alt='middle' className={styles.middle} />
            <img src='/img/down.png' alt='down' className={styles.down} />
          </div>
        </div>
      </section>
    </>
  )
}
