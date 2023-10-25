FROM node

# Create app directory
WORKDIR /app/posts

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 9001
CMD [ "npm", "start" ]
