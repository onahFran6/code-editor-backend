# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install the application dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript application
RUN yarn build

# Expose the port the app runs on (change as needed)
EXPOSE 80

# Define the entry point for the container
CMD ["yarn", "start"]
