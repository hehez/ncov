# Base image, pull from Docker.io if not
FROM node:10-alpine

# RUN mkdir -p /Users/hehez/workspace/workspace_nodejs/src/node
# Create app directory
# WORKDIR /var/www/amail/client
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# If you are building your code for production
# RUN npm install --only=production
RUN npm install
# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "run", "nodemon:start" ]