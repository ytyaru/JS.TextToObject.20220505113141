# 課題

　現状のTxtyには不足がある。

* Itemのスペース文字処理（オプション値に余計な空白文字がつくかも？　空要素ができるかも？）
* 型チェック（Item型、Store型、Store配列型、Tree型）

## Itemのスペース文字処理（オプション値に余計な空白文字がつくかも？　空要素ができるかも？）

## 型チェック（Item型、Store型、Store配列型、Tree型）

```javascript
Txty.isItem(value)
Txty.isStore(value)
Txty.isStores(value)
Txty.isTree(value)
```

　単純なオブジェクトや配列にしている。そのほうが新しいプロパティや要素を追加するのが楽だから。けれどそのせいで型チェックできない。Txtyメソッドによって生成された型であるかどうかチェックしたいとき、どうするか。

