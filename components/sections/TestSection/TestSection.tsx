'use client'

import styles from './TestSection.module.scss'
import { useRef } from 'react'
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

const easeAnimCont = CustomEase.create(
  'easeAnimCont',
  'M0,0 C0.124,0.291 0.182,0.626 0.448,0.816 0.579,0.909 0.752,1 1,1 '
)

export const TestSection = () => {
  const isSecondAnimationTriggered = useRef(false)

  useGSAP(() => {
    const iPhoneHeight = 52.25
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const section = document.querySelector(`.${styles.section}`) as HTMLElement
    const stickyContainer = document.querySelector(`.${styles.stickyContainer}`) as HTMLElement
    const splitTitle = new SplitText(`.${styles.title}`, { type: 'lines' })
    const splitParagraph = new SplitText(`.${styles.paragraph}`, { type: 'lines' })
    const qrWrapper = document.querySelector(`.${styles.qrWrapper}`) as HTMLElement
    const qrCode = document.querySelector(`.${styles.qrCode}`) as HTMLElement
    const qrContainerEl = document.querySelector(`.${styles.qrContainer}`) as HTMLElement
    const qrRect = qrContainerEl.getBoundingClientRect()
    const animContainer = document.querySelector(`.${styles.animationContainer}`) as HTMLElement
    const iphone = document.querySelector(`.${styles.iphone}`) as HTMLElement
    document.documentElement.style.setProperty('--iphoneHeight', `${iPhoneHeight}rem`)

    // TITLE
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
    gsap.from(qrWrapper, {
      opacity: 0,
      duration: 0.2,
      delay: 0.2,
      ease: 'power3.in',
    })
    gsap.from(qrWrapper, {
      y: 200,
      duration: 1.6,
      delay: 0.2,
      ease: 'power3.out',
    })

    // ANIMATION CONTAINER
    const updateAnimContainerY = () => {
      if (isSecondAnimationTriggered.current) return
      const freshRect = qrContainerEl.getBoundingClientRect()
      gsap.set(animContainer, { y: -(window.innerHeight - freshRect.bottom - 32) })
    }

    gsap.to(animContainer, {
      y: -(window.innerHeight - qrRect.bottom - 32),
      duration: 1.65,
      delay: 0.6,
      ease: 'power2.out',
      onComplete: () => {
        ScrollTrigger.addEventListener('refresh', updateAnimContainerY)
      },
    })

    // IPHONE
    gsap.to(iphone, {
      x: '-4%',
      scale: 1.25,
      transformOrigin: 'top center',
    })

    // --------------------------------
    // *** SECOND PART AFTER SCROLL ***
    // --------------------------------
    ScrollTrigger.create({
      trigger: stickyContainer,
      pin: true,
      start: 'top top',
      end: '+=100%',
    })

    ScrollTrigger.create({
      trigger: section,
      start: 'center center',
      once: true,
      onEnter: () => {
        isSecondAnimationTriggered.current = true
        // PURPLE OVERLAY
        const freshWrapperRect = qrWrapper.getBoundingClientRect()
        const overlay = document.createElement('div')
        stickyContainer.insertAdjacentElement('beforeend', overlay)

        gsap.set(overlay, {
          position: 'fixed',
          top: freshWrapperRect.top,
          left: freshWrapperRect.left,
          width: freshWrapperRect.width,
          height: freshWrapperRect.height,
          backgroundColor: '#e6c3ff',
          borderRadius: '1.25rem',
          zIndex: 2,
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
        const qrCodeRect = qrCode.getBoundingClientRect()
        const targetY = window.innerHeight / 2 - qrCodeRect.top - qrCodeRect.height / 2

        gsap.to(qrCode, {
          y: targetY,
          duration: 1.7,
          ease: easeQrCode,
          onComplete: () => {
            const updateQrY = () => {
              const containerRect = qrContainerEl.getBoundingClientRect()
              const naturalCenterY = containerRect.top + containerRect.height / 2
              gsap.set(qrCode, { y: window.innerHeight / 2 - naturalCenterY })
            }
            ScrollTrigger.addEventListener('refresh', updateQrY)
          },
        })

        gsap.to(qrCode, {
          scale: 2.5,
          transformOrigin: 'center center',
          duration: 0.5,
          delay: 0.3,
          ease: 'power1.out',
        })

        //ANIMATION CONTAINER
        const getContainerTargetY = () =>
          -window.innerHeight + (window.innerHeight - iPhoneHeight * rootFontSize) / 2

        gsap.to(animContainer, {
          y: getContainerTargetY(),
          duration: 1.95,
          delay: 0.05,
          ease: easeAnimCont,
          onComplete: () => {
            ScrollTrigger.addEventListener('refresh', () =>
              gsap.set(animContainer, { y: getContainerTargetY() })
            )
          },
        })

        gsap.to(iphone, {
          x: 0,
          y: '3.8%',
          scale: 1,
          delay: 0.2,
          duration: 1.7,
          ease: 'power1.out',
        })
      },
    })
  })

  return (
    <section className={styles.section}>
      <div className={styles.stickyContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Rychlé a jednoduché QR řešení</h1>
          <p className={styles.paragraph}>
            MúzaPay nabízí rychlé a bezpečné QR platby, které zjednodušují čerpání benefitů přímo
            přes mobilní zařízení. Bez fyzických karet či papírových poukazů poskytuje moderní a
            efektivní způsob, jak pohodlně spravovat zaměstnanecké výhody.
          </p>
          <div className={styles.qrContainer}>
            <div className={styles.qrWrapper}>
              <img src='/img/qr.svg' alt='QR code' className={styles.qrCode} />
            </div>
          </div>
        </div>
        <div className={styles.animationContainer}>
          <div className={styles.iphoneWrapper}>
            <img src='/img/iphone.png' alt='iphone' className={styles.iphone} />
          </div>
          {/* <img src='/img/up.png' alt='up' className={styles.up} /> */}
          {/* <img src='/img/down.png' alt='down' className={styles.down} /> */}
          {/* <img src='/img/middle.png' alt='middle' className={styles.middle} /> */}
        </div>
      </div>
    </section>
  )
}
