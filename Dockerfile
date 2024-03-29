FROM node:12
RUN mkdir -p /usr/src/frontend/
WORKDIR /usr/src/frontend/
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /usr/src/frontend/
ENV PRODENDPOINT myeccom.com:4444
ENV ENDPOINT myeccom.com:4444
#RUN npm install
# If you are building your code for production
RUN npm ci --only=production
COPY . .
RUN npm install
RUN chmod a+x endpointscript.sh
RUN npm run build
RUN chmod 777 /usr/src/frontend/.next/BUILD_ID
EXPOSE 7777
# this is for kubernetes CMD [ "npm", "run", "start" ]
#CMD [ "npm", "run", "dev" ]
CMD [ "npm", "run", "start" ]

####The line below was used to create the container
####docker build -t stephane/docker-ecom-front .
####docker run -p 7777:7777 -d stephane/docker-ecom-frontend
