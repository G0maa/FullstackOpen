# This run from powershell resulted in a ~1GB image, why?
FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

# npm ci gave me Missing & Invalid in package-lock.json
RUN npm install --only=production

USER node

CMD npm start
