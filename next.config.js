/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    PROJECT_ID: process.env.PROJECT_ID,
  },
};

module.exports = nextConfig;
