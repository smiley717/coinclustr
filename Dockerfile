# build environment
FROM node:12.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV=$ENVIRONMENT
ENV ENV_URL=$ENV_URL
#COPY package.json /app/package.json
#RUN npm install --silent
#RUN npm install react-scripts@3.0.1 -g --silent
COPY . /app
RUN npm install serve
#RUN npm run build

# production environment
ENTRYPOINT ["/app/startup.sh"]

