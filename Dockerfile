# Base image Node.js
FROM node:22-bullseye

WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN rm -f package-lock.json && npm install

# Copy semua source code
COPY . .

# Build project (wajib untuk preview)
RUN npm run build

# Expose port (custom 8080)
EXPOSE 8080

# Jalankan vite preview
CMD ["sh", "-c", "npm run preview -- --host 0.0.0.0 --port 8080"]
