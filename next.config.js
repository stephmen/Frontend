require('dotenv').config({ path: './config/dev.env' })
module.exports = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    PRODENDPOINT: process.env.PRODENDPOINT,
    ENDPOINT: process.env.ENDPOINT,
    STAGE: process.env.STAGE,
    APOLLO_TEST: process.env.APOLLO_BACKEND_PORT_4444_TCP,  
    TEST_VAR: process.env.TEST_VAR,
  },
}