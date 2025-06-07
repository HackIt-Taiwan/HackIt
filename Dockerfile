# Use a stable Node.js LTS version as base image
FROM node:18-alpine

# Install system dependencies required for git and node-gyp
RUN apk add --no-cache libc6-compat git

# Set working directory
WORKDIR /app

# Clone the repository directly into the working directory
# Using --depth 1 for a shallow clone to speed up the process
RUN git clone --depth 1 https://github.com/HackIt-Taiwan/HackIt.git .

# Set environment to development to ensure devDependencies are installed
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Install dependencies using the package-lock.json for consistency
# npm ci is generally faster and more reliable for automated environments
RUN npm ci

# Verify PostCSS and Tailwind are properly installed
RUN npm list tailwindcss postcss autoprefixer || true

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js development server with explicit hostname
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"] 