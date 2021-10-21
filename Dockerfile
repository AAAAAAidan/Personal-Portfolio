FROM node:alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

FROM node:alpine AS builder
WORKDIR /app
COPY . ./
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

FROM node:alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["npm", "start"]
