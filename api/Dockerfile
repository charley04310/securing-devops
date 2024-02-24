FROM node:18-alpine AS build

RUN apk add --no-cache protoc=24.4-r0

WORKDIR /app

COPY gateway/package*.json ./

RUN npm ci && npm cache clean --force

RUN npm run build


FROM node:18-alpine AS runner

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

USER node

ENV HTTP_PORT=3000
ENV MQTT_HOST=mqtt://127.0.0.1:1883

CMD [ "node", "dist/main.js" ]