# Txty

　Txtyは独自の構造化テキスト形式またはそのパーサを指す。TxtyはTSVの行指向版。TSVは列位置でデータのキーを網羅するのに対し、Txtyは行位置でデータのキーを網羅する。

　１行あたりのデータはノードである。以下は３ノードある。

```
データ1
データ2
データ3
```

　ノードには必須値とオプション値がある。同一行内においてインデント文字で区切られる。オプションは付与しなくてもよい。

```
必須値    オプション値１    オプション値２    ...
```

　以下のようにテキストファイルに書いたとする。

list.txt
```
必須値1    オプション値1-1    オプション値1-2
必須値2    オプション値2-1    オプション値2-2
必須値3    オプション値3-1    オプション値3-2
必須値4
```

　上記は以下のように解析できる。

```
const data = Txty.list(await fetch('list.txt'))
data[0].name       // 必須値1
data[0].options[0] // オプション値1-1
data[0].options[1] // オプション値1-2
data[1].name       // 必須値2
data[1].options[0] // オプション値2-1
data[1].options[1] // オプション値2-2
data[2].name       // 必須値3
data[2].options[0] // オプション値3-1
data[2].options[1] // オプション値3-2
data[3].name       // 必須値3
data[3].options    // []
```

　ツリー構造にも対応している。上記リスト形式のテキストに加え、先頭にインデント文字を加えることで、その見た目どおりのツリー構造をしたオブジェクトが返る。

tree.txt
```
大項目1
    中項目1-1    オプション値1-1-A    オプション値1-1-B
        小項目1-1-1
        小項目1-1-2
    中項目1-2
大項目2
    中項目2-1
        小項目2-1-1
        小項目2-1-2
    中項目2-2
```

　上記は以下のように解析できる。

```
const root = Txty.tree(await fetch('tree.txt'))
root.nodes         // [node, node]
root.nodes[0].name // 大項目1
root.nodes[1].name // 大項目2
root.nodes[0].nodes[0].name // 中項目1-1
root.nodes[0].nodes[0].options[0] // オプション値1-1-A
root.nodes[0].nodes[0].options[1] // オプション値1-1-B
root.nodes[0].nodes[0].nodes[0].name // 小項目1-1
...
```

```javascript
const list = Txty.list(await fetch('list.txt'))
const root = Txty.tree(await fetch('tree.txt'))
```

## Indent

　Txtyのメタ文字は`\n`,`\t`(` `(2,4))である。つまり改行とインデントがメタ文字。よってデータには複数行データを含めることが出来ない。エスケープ文字`\n`にすれば含められるが、可読性がいちじるしく低下するため非推奨。

　インデントは３種から選べる。定数が定義されており、以下のように第二引数に渡す。第二引数はオプションであり、未設定のときはSpace4が適用される。

```javascript
const list = Txty.list(await fetch('list.txt'), Txty.Indent.Tab)
const list = Txty.list(await fetch('list.txt'), Txty.Indent.Space2)
const list = Txty.list(await fetch('list.txt'), Txty.Indent.Space4)
const tree = Txty.tree(await fetch('tree.txt'), Txty.Indent.Tab)
const tree = Txty.tree(await fetch('tree.txt'), Txty.Indent.Space2)
const tree = Txty.tree(await fetch('tree.txt'), Txty.Indent.Space4)
```

