FROM node

# Create app directory
WORKDIR /app/user

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 9002
CMD [ "npm", "start" ]
