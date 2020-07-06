require('dotenv').config({ path: './config/dev.env' })
module.exports = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    PRODENDPOINT: process.env.PRODENDPOINT,
    ENDPOINT: process.env.ENDPOINT,
    STAGE: process.env.STAGE,
    TEST_VAR: process.env.TEST_VAR,
    APOLLO_BACKEND_PORT_4444_TCP: process.APOLLO_BACKEND_PORT_4444_TCP,  
    APOLLO_BACKEND_PORT: process.APOLLO_BACKEND_PORT,
  },
}