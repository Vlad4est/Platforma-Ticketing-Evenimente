FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g @angular/cli

RUN echo "ng serve --host 0.0.0.0 --port 4200" > /start.sh
RUN chmod +x /start.sh

EXPOSE 4200



CMD ["sh", "-c", "/start.sh"]