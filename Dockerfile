# Stage 1: Build dependencies
FROM node:18-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Production environment
FROM node:18-slim
WORKDIR /app

# Copy dependencies from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy application files
COPY src/ ./src/
COPY index.html ./
COPY package*.json ./

EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "src/app.js"]
