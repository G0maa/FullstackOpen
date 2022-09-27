# This run from powershell resulted in a ~1GB image, why?
FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production

USER node

CMD npm start
