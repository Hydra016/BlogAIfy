FROM node:24-alpine3.21 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:24-alpine3.21

RUN npm install -g serve

COPY --from=builder /app/dist /app/dist

WORKDIR /app

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
