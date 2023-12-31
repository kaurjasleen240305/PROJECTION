FROM node:18-alpine as nodework

WORKDIR /app/a_f

RUN npm install -g serve

COPY ./build ./build

COPY ./run.sh ./run.sh

# FROM nginx:1.23-alpine
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=nodework /af/build .
# ENTRYPOINT [ "nginx","-g","daemon off;" ]

