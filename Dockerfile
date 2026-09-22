# -----------------------------
# Build stage
# -----------------------------

FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files first for Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source
COPY . .

# Build TypeScript application
RUN npm run build


# -----------------------------
# Production stage
# -----------------------------

FROM node:24-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev --ignore-scripts

# Copy compiled application
COPY --from=builder /app/dist ./dist

# Gateway port
EXPOSE 3000

# Start gateway
CMD ["node", "dist/server.js"]