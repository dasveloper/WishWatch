//Prod keys
module.exports={
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    cookieKey: process.env.COOKIE_KEY,
    awsAccessKey:process.env.AWS_ACCESS_KEY_ID,
    awsSecretKey:process.env.AWS_SECRET_ACCESS_KEY,
    awsBucket: process.env.S3_BUCKET,
    pgDatabase: process.env.DATABASE_URL,
}