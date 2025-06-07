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

# Set NODE_ENV to development before installing dependencies
ENV NODE_ENV=development

# Clear npm cache and install fresh dependencies
RUN npm cache clean --force

# Install all dependencies (including dev dependencies for development mode)
RUN npm install

# Force update to latest compatible versions of critical packages
RUN npm install next@latest tailwindcss@latest postcss@latest autoprefixer@latest

# Verify important packages are installed and show versions
RUN npm list tailwindcss postcss autoprefixer next || echo "Some packages not found, but continuing..."

# Expose port 3000
EXPOSE 3000

# Start the application in development mode with host binding
CMD ["npx", "next", "dev", "--hostname", "0.0.0.0"] 