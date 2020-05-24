// This is client side config only - don't put anything in here that shouldn't be public!
//export const prodEndpoint = `http://localhost:4444`;

// Before working with environment variables:
// export const prodEndpoint = `http://apollo-backend-myeccomv003.apps-crc.testing`;
// export const endpoint = `http://172.30.212.146:4444`;

//working with environment Variables

//export const prodEndpoint = "http://172.30.254.196:4444"
//export const prodEndpoint = `http://apollo-backend-development.apps-crc.testing`;
//export const prodEndpoint = process.env.prodEndpoint
// export const prodEndpoint = process.env.prodEndpoint
// export const endpoint = process.env.endpoint 

export const endpoint = process.env.ENDPOINT
export const prodEndpoint = process.env.PRODENDPOINT;
export const stage = process.env.STAGE;



export const perPage = 4;


