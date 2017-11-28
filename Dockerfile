FROM node:7

# Create app directory
RUN mkdir -p /usr/src/pdf-engine-service
WORKDIR /usr/src/rules-engine-service

# Install app dependencies
COPY package.json /usr/src/pdf-engine-service
RUN npm install

# Bundle app source
COPY . /usr/src/pdf-engine-service

EXPOSE 3000

#HEALTHCHECK --interval=1m --timeout=3s CMD curl --fail http://localhost/vitals/docker || exit 1

CMD [ "node", "." ]
