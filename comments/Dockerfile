FROM node

# Create app directory
WORKDIR /app/comments

COPY package.json ./

RUN npm install

COPY . .
EXPOSE 8000

CMD [ "npm", "start" ]
