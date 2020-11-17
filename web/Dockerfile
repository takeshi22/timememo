FROM node:12.8.0-alpine

RUN mkdir -p /timememo/web
WORKDIR /timememo/web

ENV PATH /timememo/web/node_modules/.bin:$PATH

COPY package.json /timememo/web
RUN npm install

# Copying source files
COPY . /timememo/web

CMD ["npm", "start"]