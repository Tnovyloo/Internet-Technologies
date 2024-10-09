FROM node:14

# Set the working directory
WORKDIR /app

# Install packages.
COPY package.json package-lock.json ./
RUN npm install


RUN npm install -g nodemon

# Copy the rest of app.
COPY . .

# Start the server
# CMD ["npm", "dev"]