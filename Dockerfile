FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json .

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "dev"]
