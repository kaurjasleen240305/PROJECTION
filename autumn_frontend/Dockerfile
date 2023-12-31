FROM node:18-alpine as nodework

WORKDIR /app/a_f

COPY package.json .
RUN npm install

COPY . .
RUN npm run build



