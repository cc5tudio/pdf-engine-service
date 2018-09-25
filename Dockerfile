<<<<<<< HEAD
FROM node:7

# Create app directory
RUN mkdir -p /usr/src/pdf-engine-service
WORKDIR /usr/src/pdf-engine-service
=======
FROM node:8

# Create app directory
RUN mkdir -p /usr/src/pdf
WORKDIR /usr/src/pdf
>>>>>>> b608c19fae9bf3686aaa0112f01a16332d90c373

# Install Qt5
RUN apt-get update && apt-get -y install libcairo2-dev libpoppler-qt5-dev

<<<<<<< HEAD
# Install app dependencies
COPY package.json /usr/src/pdf-engine-service
RUN npm install

# Bundle app source
COPY . /usr/src/pdf-engine-service

EXPOSE 3000

#HEALTHCHECK --interval=1m --timeout=3s CMD curl --fail http://localhost/vitals/docker || exit 1

CMD [ "node", "." ]
=======
COPY package.json /usr/src/pdf
RUN npm install

# Bundle app source
COPY . /usr/src/pdf

EXPOSE 3000

CMD ["npm", "start"]

# docker build -t pdf-service .
# docker run -p 80:3000 -d pdf-service
# docker tag pdf-service:latest 726773907144.dkr.ecr.us-east-1.amazonaws.com/pdf-service:latest
# docker push 726773907144.dkr.ecr.us-east-1.amazonaws.com/pdf-service:latest
# docker stop (docker ps -a -q)
>>>>>>> b608c19fae9bf3686aaa0112f01a16332d90c373
