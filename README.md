# Kämppis App

This is the GUI Application for the Kämppis mobile app.

## Get started

1. Install docker

2. Create the image

   ```bash
    docker build -t kamppis-app .
   ```
   
3. Run the container

   ```bash
   docker run -itp 19000:19000 -p 19001:19001 -p 19002:19002 -p 8081:8081 --rm kamppis-app
   ```