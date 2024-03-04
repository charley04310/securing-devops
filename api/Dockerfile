# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY ./package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:18-alpine AS runner

WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

RUN addgroup -S nodegroup && adduser -S node -G nodegroup
USER node

# Set environment variables
ENV HTTP_PORT=3000
ENV MQTT_HOST=mqtt://127.0.0.1:1883

# Run the app
CMD [ "node", "dist/main.js" ]
