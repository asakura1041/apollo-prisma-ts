FROM node:16 AS dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install --save-dev nodemon

COPY . .

RUN npm run build

CMD ["npm", "run", "dev"]

# デプロイ用のイメージ
FROM node:16-alpine3.14 AS prod

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をインストール
COPY package*.json ./
RUN npm install --only=production

# アプリケーションコードをコピー
COPY . .

# ビルドコマンド
RUN npm run build

# 起動コマンド
CMD ["npm", "start"]
