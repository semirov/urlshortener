
# use LST node version
FROM node:carbon

# create app directory
WORKDIR /

# copy all project files
COPY ./ ./

# install client dependencies
RUN cd client && npm install

# build client
RUN cd client && $(npm bin)/ng build --prod

# install dependencies
RUN npm install

#  build app
RUN npm run build

# set environment
ENV NODE_ENV=production

# expose 80 port for production config
RUN ls
EXPOSE 80
CMD [ "npm", "start" ]








