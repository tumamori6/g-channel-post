# 手順

### 1.任意の名前でプロジェクト作る  
### 2.プロジェクトにビルドパック2つ追加
### - nodejs
`$ heroku buildpacks:set heroku/nodejs`
### - puppeteer
`$ heroku buildpacks:add https://github.com/CoffeeAndCode/puppeteer-heroku-buildpack`  
### 3.このリポジトリをクローンしてhrokuと連携させる  
### 4.メタバードで「ガルちゃん用ツイート」と「今日は何の日用ツイート」を登録する  
### 5.env.sampleから.envを作って各変数設定
##### CONTENTS_URL...apiのURL
##### USER_ID...twitterののユーザーID
##### USER_PASS...twitterののパスワード
##### META_USER_ID...メタバードのユーザーID
##### META_USER_PASS...メタバードのパスワード
##### TW_AUTH_MAIL_ADDRESS...twitterアカウントのメールアドレス
##### UPDATE_URL_1...ツイートを登録したメタバードのページURL
##### UPDATE_TARGET_1...登録したツイートのテキストエリアのIDセレクター
##### UPDATE_URL_2...1と同じ
##### UPDATE_TARGET_2...1と同じ  
### 6.envをherokuに登録
`heroku config:set $(cat .env)`  
### 7.heroku scheduler設定
`npm run index`
`npm run wiki`  

# 注意点
##### ローカルではメタバードにログイン、更新などができるのにheroku側で実行して更新できない場合、twitterの認証画面が出ている場合があるため、その場合はindex.jsのコメントアウトしている認証用コードで認証してください。