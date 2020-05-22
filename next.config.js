require('dotenv').config({ path: './config/.env' })
module.exports = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    TEST_VAR: process.env.TEST_VAR,
    PRODENDPOINT: process.env.PRODENDPOINT,
    ENDPOINT: process.env.ENDPOINT
  },
}