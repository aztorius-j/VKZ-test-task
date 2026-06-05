import '@/styles/globals.scss'

import type { Metadata } from 'next'
import localFont from 'next/font/local'

const objectivity = localFont({
  src: [
    {
      path: '../public/fonts/Objectivity/Objectivity-Light.woff2',
      weight: '300',
    },
    {
      path: '../public/fonts/Objectivity/Objectivity-Regular.woff2',
      weight: '400',
    },
    {
      path: '../public/fonts/Objectivity/Objectivity-Medium.woff2',
      weight: '500',
    },
  ],
  variable: '--font-objectivity',
})

export const metadata: Metadata = {
  title: 'Interview Task',
  description: 'Bare-bones Next.js scaffold for building a single section.',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' className={objectivity.variable}>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
