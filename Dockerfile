FROM node:6.7
ENV NPM_CONFIG_LOGLEVEL warn

RUN apt-get -y install tar
RUN apt-get -y install bzip2

COPY . /src
RUN rm -f -d -R /src/node_modules
RUN rm -f -d -R /src/app/bower_components

RUN cd src && npm install
RUN cd src && npm run bower-install

EXPOSE 8000
CMD ["node", "src/node-app.js"]