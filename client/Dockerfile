FROM node:12.8.0-alpine

RUN mkdir -p /timememo/client
WORKDIR /timememo/client

ENV PATH /timememo/client/node_modules/.bin:$PATH

COPY package.json /timememo/client
RUN npm install

# Copying source files
COPY . /timememo/client

CMD ["npm", "run", "start"]