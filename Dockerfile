FROM node:12-alpine3.9
WORKDIR /app
COPY package.json /app/
WORKDIR /app
#RUN apk update && apk upgrade && \
#    apk add --no-cache git
RUN npm install
COPY . .
VOLUME ../fr
#RUN npm run build
#EXPOSE 4242
CMD [ "npm", "run", "build" ]



