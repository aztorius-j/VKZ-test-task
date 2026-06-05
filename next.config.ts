import type { NextConfig } from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
  sassOptions: {
    // Allow `@use 'styles/...'` to resolve from the project root,
    // e.g. `@use 'styles/' as *;` -> styles/_index.scss
    loadPaths: [path.join(process.cwd())],
  },
}

export default nextConfig
