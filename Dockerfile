# Use Node.js LTS version as base image
FROM node:18-alpine

# Install system dependencies
RUN apk add --no-cache libc6-compat git

# Set working directory
WORKDIR /app

# Clone the repository from GitHub
RUN git clone https://github.com/HackIt-Taiwan/HackIt.git temp_repo

# Move all files from cloned repo to working directory
RUN cp -r temp_repo/* . && cp -r temp_repo/.[^.]* . 2>/dev/null || true

# Remove temporary directory
RUN rm -rf temp_repo

# Install project dependencies (including dev dependencies for development mode)
RUN npm ci --include=dev

# Expose port 3000
EXPOSE 3000

# Start the application in development mode with host binding
CMD ["npx", "next", "dev", "--hostname", "0.0.0.0", "--port", "3000"] 