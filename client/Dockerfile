
# use LST node version
FROM node:carbon

# create app directory
RUN mkdir -p /urlshortener_client
WORKDIR /urlshortener_client


# copy all project files
RUN ls
COPY . .


# install client dependencies
# RUN cd client && npm install

# build client
# RUN cd client && $(npm bin)/ng build --prod

# install dependencies
RUN npm install


# expose 4200 and 49153 for angular dev and angular webpack
EXPOSE 4200 49153

# CMD [ "npm", "start" ]








