/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}

module.exports = nextConfig
