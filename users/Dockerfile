FROM node

# Create app directory
WORKDIR /app/users

COPY package.json .

RUN npm install

COPY . .
EXPOSE 8002
CMD [ "npm", "start" ]
