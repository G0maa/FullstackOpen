# The first FROM is now a stage called build-stage
FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

# Not tested... kidn of a hassle to re-download React again for the 99th time.
RUN CI=true npm test

ENV REACT_APP_BACKEND_URL="http://localhost:3000/"

RUN npm run build

# This is a new stage, everything before this is gone, except the files we want to COPY
FROM nginx:1.20-alpine

# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the docker hub page
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html