
# use LST node version
FROM node:carbon

# create app directory
WORKDIR /

# copy all project files
COPY ./ ./

# install client dependencies
# RUN cd client && npm install

# build client
# RUN cd client && $(npm bin)/ng build --prod

# install dependencies
RUN npm install

#  build app
RUN npm run build

# expose 80 and 3000 port for production and dev config
EXPOSE 3000 80
CMD [ "npm", "start" ]








