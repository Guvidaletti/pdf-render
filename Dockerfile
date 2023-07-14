FROM node:18-alpine

ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV ENVIRONMENT=production

RUN apk add chromium --no-cache

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

CMD ["node", "./dist/server.js"]