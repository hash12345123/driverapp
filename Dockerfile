# Use specific Node version for stability
FROM node:20.18.3

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Expose Metro bundler port
EXPOSE 8081

# Start Metro bundler with host option for Docker
CMD ["yarn", "start", "--host", "0.0.0.0"]


