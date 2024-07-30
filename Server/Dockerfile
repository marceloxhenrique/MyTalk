FROM node:20.13.1

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


EXPOSE 3000

# Define the command to run the application
CMD ["node", "dist/src/infra/http/main.js"]