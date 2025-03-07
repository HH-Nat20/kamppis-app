# Kämppis App

This is the GUI Application for the Kämppis mobile app.

## Docker setup for developing the front end

1. Install docker

2. Create the image

   ```bash
    docker build -t kamppis-app .
   ```

3. Run the container

   ```bash
   docker run --rm -v ./:/app -itp 19000:19000 -p 19001:19001 -p 19002:19002 -p 8081:8081 kamppis-app
   ```

## If you have the backend repository pulled as well, you can use docker-compose

1. Make sure you have the folders `kamppis-app` including the front-end and `kamppis-server` including the back-end at the same level within your file system.

2. Run docker compose

   ```bash
      docker-compose up --build
   ```

3. To bring the containers down, use

   ```bash
      docker-compose down -v
   ```

## To Build the App for Android, use the following instructions

1. Install eas-cli

   ```bash
      npm install -g eas-cli
   ```
   
2. Make sure you have expo installed as well

   ```bash
      npm install -g expo-cli
   ```

3. Login with your expo credentials (if you haven't registered, do so in https://expo.dev/signup)

   ```bash
      expo Login
   ```
   
4. Build the app using eas-cli and wait for the proccess to finish.

   ```bash
      eas build --platform android --profile preview
   ```