FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

CMD ['pwd']
CMD ['ls']
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY yarn.lock ./
COPY package*.json ./

# Bundle app source
COPY . .

RUN yarn install
# If you are building your code for production
# RUN npm install --only=production

EXPOSE 8080
CMD [ "yarn", "run", "dev" ]