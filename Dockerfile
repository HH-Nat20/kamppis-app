# Use Node.js as the base image
FROM node:20-bullseye

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8081
ENV BACKEND_URL=http://localhost:8080

# Set working directory
WORKDIR /app

# Install global dependencies
RUN npm install -g expo-cli

# Copy package files first to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the necessary ports for Expo
EXPOSE 19000 19001 19002 19006
EXPOSE $PORT

# Start the Expo development server with the tunnel option
CMD ["npm", "start", "--", "--tunnel"]
