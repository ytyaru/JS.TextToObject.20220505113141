# 名前

## 現在

```javascript
Txty.line()
Txty.lines()
Txty.tree()
Txty.composite()
```

　名前に統一性がない。`line`はプレーンテキスト基準での命名なのに`tree`はデータ構造基準での命名である。

　各要素の状態に名前がないため説明できない。

## 提案

```javascript
Txty.item()

Txty.store()
Txty.stores()
Txty.tree()
Txty.graph()
Txty.composite()
```

名前|説明
----|----
`text`|以下を定義したプレーンテキスト。このAPIにおける入力値。
`item`|`name`と`options`キーをもつオブジェクト。一行のテキストで表現される。
`name`|必須値。文字列。
`options`|任意値。文字列の配列。
`block`（textBlock）|テキストのとき２行以上空白で区切られた範囲のテキスト単位。
`store`（itemBlock）|`item`の配列
`stores`（itemBlockList）|`item`の配列の配列
`node`|ツリー構造をなす要素。`nodes`をもつ（子要素配列）
`tree`（nodeBlock）|ツリー（ルート`node`）

* text
    * block
    * item
        * store: 
            * stores
        * node
            * tree

### 他の名前候補

和|英
--|--
要素|element
属性|attribute

和|英
--|--
ストア|store,entry
キー|key
値|value

Map
Dictionary

Table
Grid

name + option = nao, naop, napt, nap, no, naon

### 型

* `TxtyItem`
* `TxtyNode`

　オブジェクトでなく個別の型にしたほうがいいかも？　複合型のとき、配列には`TxtyItem`の配列または`TxtyNode`のいずれかが含まれる。このときの型チェックに使える。将来、グラフ型を拡張したときに有用かもしれない。

```javascript
const txt = `
名前1    オプション1
名前2    オプション2

根
    節
        葉
`
const blocks = Txty.Composite(txt)
TxtyCompositeParser.Typeof(blocks[0]) // Txty.Type.Store
TxtyCompositeParser.Typeof(blocks[1]) // Txty.Type.Node
```

