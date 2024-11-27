FROM node:22-alpine AS build

WORKDIR /app

ARG GOOGLE_API_KEY

COPY package.json ./

RUN npm install

COPY . .

RUN GOOGLE_API_KEY=$GOOGLE_API_KEY npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80