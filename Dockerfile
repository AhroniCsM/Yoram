# --- Stage 1: build the React app ---
FROM node:20-slim AS build
WORKDIR /app
# Keep the webpack runtime as an external file (not inlined) so the strict
# Content-Security-Policy (script-src 'self') in server.js doesn't block it.
ENV INLINE_RUNTIME_CHUNK=false
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Stage 2: runtime (server + static build only) ---
FROM node:20-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
ENV DATA_DIR=/data
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY server.js ./
COPY --from=build /app/build ./build
EXPOSE 8080
CMD ["node", "server.js"]
