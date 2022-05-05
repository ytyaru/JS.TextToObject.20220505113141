# 要件定義

## 形式

　最終成果物の形式はJavaScriptライブラリである。GitHubにソースコードをアップロードする。最適化にいたるフェーズは以下。このうち「Global関数」か「ES6 Class」の少なくともいずれかひとつを作成する。それ以外の形式に関しては、余力があればやるが、基本的には対象外。

* Global関数
* ES6 Class
* ES6 Module
* Minify
* CDN
* TypeScript
    * トランスパイル
    * WebPack
* AssemblyScript
    * コンパイル（wasm）
    * CDN

## 要件定義

　[background.md][]にあるように、プレーンテキストからオブジェクトや配列を返してほしい。さまざまな形式があるため、その形式からどのようなパラメータと出力結果があればよいか考えてみる。

[background.md]:background.md

　大雑把にみるとテキストの形式は以下である。

* 単一行でひつつの要素をあらわす（同一行にオプションデータ付与可）
* 複数行でひとつの要素をあらわす（2つ以上の改行で次の新しい別の要素へ。要素は行位置で値を取り出し、schema.orgキーとマッピングする）
* ツリー構造（ネストで包含関係をあらわす。同一行にオプションデータ付与可）

　それらを型として名付けてみる。

* SingleLineElement（単一行要素）
* MultiLineElement（複数行要素）
* TreeElement（木構造要素）

　たとえばBreadcrumbList、HowToTool、HowToSupplyは単一行要素を複数もった形式である。

　たとえばFAQ、Quiz、Article、Dataset、SoftwareApplicationは複数行要素を複数もった形式である。

　たとえばHowToStepは木構造要素をひとつだけもった形式である。

　たとえばHowToは複数行要素と木構造要素をそれぞれひとつだけもった形式である。

### SingleLineElement（単一行要素）

```
名前（値。必須）    オプション1（任意）  オプション2（任意）  ...
```

　ひとつの要素を一行のテキストで表現する。一行のテキストはインデント文字列（区切り文字列）で分割することができる。分割すると、このとき最も左に出現する

```javascript
const element = TextElement.Single(txt)
element.name;         // 名前（値。必須）
element.options[0];   // オプション1（任意）
element.options[1];   // オプション2（任意）
element.options[...]; // ...
```

　最初の値を引き出すキーはどうするか。`name`,`value`,`title`などの候補が思いつくが、どれにする？　それともオプションもすべて含めて`values[0]`にする？

```javascript
const element = TextElement.Single(txt)
element.name;            // 名前（値。必須）
element.value;           // 名前（値。必須）
element.title;           // 名前（値。必須）
element.values[0];       // 名前（値。必須）
element.values.slice(1); // オプション配列
```

　名前とオプションは分けたほうがいい。理由は二つある。

　ひとつ目は制約の違いがあるから。名前は必須だが、オプションは任意だから。もしオプションを取り出そうとして`element.values.slice(1)`とやって、オプションがひとつもなかったら？　空配列`[]`が返ってくる。でももしかしたら`undefined`や`null`が返ってくるかもしれないと思ってしまう。

　ふたつ目はアクセスのしやすさ。`value[0]`よりも`name`のほうが読みやすい。`value[0]`のインデックス値`0`はマジックナンバーになってしまう。何を入れたら何が取得できるのかわかりにくい。

　名前のキー名は`name`がよい。`value`だと汎用的すぎる。先述のようにオプションも含めて`values[]`と表現できてしまう。`title`や`caption`は表題だが、それなら名前`name`のほうがシンプルだし短く書ける。汎用性も高い。`key`にするのはふさわしくない。キーは何行目にあるかの位置であったり、インデント階層数であったりする。よって必須値を参照するキー名としては`name`が妥当。

　取得される値はすべて文字列である。名前もオプションもすべて文字列だ。

　もしオプションをキーに紐付けたければ、テキスト値として`key:value`のようにするなど工夫する。ただし本ライブラリではそのための処理を一切しない。以下のように自力で行うこと。

```javascript
const element = TextElement.Single(`名前    key1:値1    key2:値2`)
element.name;         // 名前
element.options[0];   // key1:値1
element.options[1];   // key2:値2
const obj = {}
for (const option of element.options) {
    const [key, value] = option.split(':')
    obj[key] = value
}
```

　オプションのオブジェクト化が対象外である理由は二つある。

　ひとつ目は想定外だから。オプションはあくまでオマケ。オプションはその位置またはデータ値だけで何の値であるのか判別できるくらい明瞭なときにのみ使う。元々はschema.orgのHowToStepのときサイトURL、画像URL、動画URLをオプション値として受け付ける想定だった。これらはファイル拡張子が異なるため、キーがなくても判別できる。また、それらの値を引き出してどう使うかはエンドユーザに委ねる想定だった。よってオプションのオブジェクト化はしない。

　ふたつ目はテキストを短く書きたいから。もしキーを書いてしまえば既存のXML,JSON,YAML,TOML,LTSVのように冗長なテキストになってしまう。それにキーはIDなので、結局は一文字でも違えば機能しない。それなら位置をキーにしたっていいじゃないか、という発想。人が手で入力するとミスが発生しうるため、その意味でもできるだけ入力値の量は減らしたい。短く書きたい。そのためにはキーを減らすしかない。キーがなければオブジェクト化できない。よって本ライブラリではオプションのオブジェクト化は非対応である。

### MultiLineElement（複数行要素）

### TreeElement（木構造要素）


### HowToStep系

　[Google schema.org HowTo][]のうち`HowTo`配下の`HowToSection`, `HowToStep`, `HowToDirection`, `HowToTip`を生成する。

[Google schema.org HowTo]:https://developers.google.com/search/docs/advanced/structured-data/how-to?hl=ja

#### HowTo

階層|パターン
----|-------
1,2|Stepの配列を含める
1,2,3|Sectionの配列を含める

```javascript
{
    "@type": "HowTo",
    "step": [{"@type": "HowToStep"}, ...]
}
```
```javascript
{
    "@type": "HowTo",
    "step": [{
        "@type": "HowToSection",
        "name": "セクション名",
        "itemListElement": [{
            "@type": "HowToStep"
            ...
        },{}]
    }, ...]
}
```

#### HowToStep

階層|パターン
----|-------
1|Stepに直接`text`をセットする
2|Stepの`itemListElement`に複数の`Direction`か`Tip`を含める

```javascript
{
    "@type": "HowToStep",
    "text": "手順",
}
```

```javascript
{
    "@type": "HowToStep",
    "name": "要約"
    "itemListElement": [{
        "@type": "HowToDirect",
        "text": "手順",
    },{
        "@type": "HowToTip",
        "text": "ヒント",
    }],
}
```

　`Step`にはさらにオプションでサイトのURL、画像、動画をセットできる。

```javascript
{
    "@type": "HowToStep",
    "text": "手順",
    "url": "該当するサイトのURL",
    "image": "該当する画像URL",
    "video": "該当する動画URL",
}
```

```javascript
{
    "@type": "HowToStep",
    "name": "要約"
    "url": "該当するサイトのURL",
    "image": "該当する画像URL",
    "video": "該当する動画URL",
    "itemListElement": [{
        "@type": "HowToDirect",
        "text": "手順",
    },{
        "@type": "HowToTip",
        "text": "ヒント",
    }],
}
```

　`name`は`itemListElement`があるとき、その要約としてセットする。`name`は推奨であり必須ではないが、事実上必須である。

　反面、`itemListElement`がなく`text`で表現されるとき、`name`を要約としてセットする頻度はあまりないと思われる。理由は`text`として1文でしか書けないから、それを要約する必要性が薄いため。さっさと具体的に`text`で書いてしまったほうが早い。もしたくさんの工程があるなら`text`でなく`itemListElement`を使って表現すべきである。よって以下のパターンはない。

```javascript
{
    "@type": "HowToStep",
    "name": "要約",
    "text": "手順",
    "url": "該当するサイトのURL",
    "image": "該当する画像URL",
    "video": "該当する動画URL",
}
```

使用|パターン|理由
----|--------|----
⭕|`text`|ひとつの手順を一文でシンプルにあらわす
❌|`name`-`text`|一文であらわせるならその要約は不要
⭕|`name`-`itemListElement`|ひとつの手順をさらに詳細な工程にわけて表現する。その要約として`name`がほしい。

パターン|例
--------|--
`text`|`ACアダプタをコンセントに挿す。`
`name`-`text`|`ラズパイの電源を入れる。`-`ACアダプタをコンセントに挿す。`
`name`-`itemListElement`|`ラズパイの電源を入れる。`-[`ACアダプタをコンセントに挿す。`, `電源スイッチを入れる。`, `ブートが完了まで待つ`, `TIP:HDDなら60秒、SSDなら30秒くらい。`]

* `name`-`text`のパターンのときも欲しいが、それは`name`-`itemListElement`パターンで代用できる。よって不要。
* `HowToDirection`か`HowToTip`かの判断はテキストの先頭が`TIP:`か否かで判断することにする


* 単一行でひつつの要素をあらわす（同一行にオプションデータ付与可）
* 複数行でひとつの要素をあらわす（2つ以上の改行で次の新しい別の要素へ。要素は行位置で値を取り出し、schema.orgキーとマッピングする）
* ツリー構造（ネストで包含関係をあらわす。同一行にオプションデータ付与可）

　手順の工程はツリー構造になっている。なのでその階層から










```javascript
{
    "@type": "HowToStep",
    "text": "手順",
    "step": [{"@type": "HowToStep"}, ...]
}
```



1層
```
手順1   オプションで画像URL
手順2   オプションで画像URL
手順3   オプションで画像URL
```

2層
```
手順1   サイトURL   画像URL     動画URL
    手順1-1
    ヒント
手順2
    手順2-1
    ヒント
```

3層
```
セクション1
    手順1
        手順1-1
        ヒント
    手順2
        手順2-1
        ヒント
セクション2
    手順1
        手順1-1
        ヒント
```

