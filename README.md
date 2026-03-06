# bbs-app
next.js v16 掲示板アプリ作成

# フォルダ解説 src
app
フロント側のファイルが入ってる。
ページやコンポーネント

actions
サーバーアクション
DBの接続やDB内にデータを作成

entities
DBのテーブルの構造をtypescriptで書いてる

migrations
entitiesのtypescriptで定義したデータベースの構造を実際に反映させる処理みたいなものがある

utils
サーバーとフロント分離が難しいものが入ってる