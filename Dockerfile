# -----------------------------
# Build stage
# -----------------------------
FROM node:22-alpine AS builder

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

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
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev --ignore-scripts

# Copy compiled application
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Apply migrations before starting the application
CMD ["sh", "-c", "node dist/server.js"]