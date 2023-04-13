FROM node:14

WORKDIR /app

# 必要なパッケージをインストール
COPY package*.json ./
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションを実行するための設定
ENV PORT=3000
EXPOSE 3000
CMD [ "npm", "start" ]
