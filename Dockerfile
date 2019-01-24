
# STAGE 1: base node image
FROM node:carbon as base

# create app directory
RUN mkdir -p /urlshortener
WORKDIR /urlshortener


# STAGE 2: install all dependencies
FROM base AS dependencies 

# copy all project files
COPY . .

# install backend dependencies
RUN npm install

# install client dependencies
RUN cd client && npm install

# build client production
RUN cd client && $(npm bin)/ng build --prod

#  build app
RUN npm run build

# STAGE 3: copy all need build
FROM dependencies AS build 

WORKDIR /urlshortener

COPY dist /urlshortener
COPY client/dist /urlshortener/client/dist


# STAGE 4: create production build
FROM node:alpine 

WORKDIR /urlshortener
COPY --from=dependencies /urlshortener/package.json ./
RUN npm install --only=production
COPY --from=build /urlshortener/dist ./dist
COPY --from=build /urlshortener/client/dist ./client/dist







