import React from "react";



const Variables = (props) => (
  <div>
    <ul>
    <li>{process.env.NODE_ENV}</li>
    <li>{process.env.PRODENDPOINT}</li>
    <li>{process.env.ENDPOINT}</li>
    <li>{process.env.STAGE}</li>
    <li>{process.env.TEST_VAR}</li>
    <li>{process.APOLLO_BACKEND_PORT}</li>
    <li>{process.APOLLO_BACKEND_PORT_4444_TCP}</li>
    </ul>
  </div>
)

export default Variables
