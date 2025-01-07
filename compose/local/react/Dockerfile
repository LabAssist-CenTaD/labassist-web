FROM node:18-alpine

ARG VITE_API_ENDPOINT

ENV VITE_API_ENDPOINT=${VITE_API_ENDPOINT}

# print the value of the VITE_API_ENDPOINT
RUN echo "VITE_API_ENDPOINT: $VITE_API_ENDPOINT"

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]