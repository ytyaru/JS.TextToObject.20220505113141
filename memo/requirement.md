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

