/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        dbConfig: {
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD, // @@@
            database: 'reportsMK'
        },
        secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? `http://${process.env.API_DEV}/api` // development api
            : `https://${process.env.API_PROD}/api` // production api
    },
    env: {
        API_PROD: process.env.API_PROD,
        API_DEV: process.env.API_DEV,
        REGION: process.env.REGION,
        ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
        SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
        S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    }
}

module.exports = nextConfig