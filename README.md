# localで動かす場合
.envファイルを作成して、環境変数を入れて下さい

# lambdaへデプロイ
- 各種profileを設定
下記コマンドを入力
```
- npx sls deploy --aws-profile hogehoge
```

# ローカルでサーバーレス環境を動かす

```
$ npm run build
$ npx serverless offline
``

# ローカルでnestを動かす
```
$ npm run start:dev
```
