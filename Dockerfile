FROM node

# We use nodemon to restart the server every time there's a change
RUN npm install -g nodemon

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5000

# Use script specified in package,json
CMD ["npm", "run", "dev"]