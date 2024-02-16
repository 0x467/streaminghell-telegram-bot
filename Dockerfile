FROM node:21-alpine

WORKDIR /app
COPY . .
RUN npm ci && npm run build && rm -rf ./src

CMD [ "node", "dist/main.js" ]
