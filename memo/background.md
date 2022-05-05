# プレーンテキストからJSのオブジェクトを生成するツールを作りたい

　schema.orgジェネレータを楽に生成するために。

<!-- more -->

# 経緯

1. HTMLのテンプレートを作りたい
1. ユーザはメタデータを入力するだけで以下を自動生成できる
    1. HTML（DOCTYPE,html,head,body）
    1. HTML（meta,title,base,link,style,script,noscript）
    1. HTML（rel（a,link,form）, small）
    1. HTML（header,footer,nav,menu,main,article,aside,address,section,h1）
    1. OpenGraph
    1. OpenSearch
    1. schema.org（Google,JSON-LD）
    1. PWA（manifest）
    1. WebStory（AMP）
    1. Sitemap（XML）
    1. Feed（Atom/RSS, Google-Podcast（RSS））

　というWEBアプリを作りたかった。作りかけが以下。

* [Html.Template.Generator][]

[Html.Template.Generator]:https://github.com/ytyaru/Html.Template.Generator.20220423144737

　これを作っているときに表題の件が欲しくなった。Googleのschema.orgにてHowToにおけるそれを作ろうとした。schema.orgとして定義するとき、とてつもなく複雑で長大なJSON-LDコードになってしまう。この入力を最大限、簡略化するため、JavaScriptの配列、Map、オブジェクトなどを駆使して、なんとか動作するコードは書けた。それでも冗長で可読性が低いので、さらに簡略化したくなった。それが表題の件である、プレーンテキストからオブジェクトを生成するツールである。そのツールを別プロジェクトで生成し、それを使ってテキストを渡し、返されたオブジェクトを使ってJSON-LDを生成するようにリファクタリングしたい。

HowTo,HowToSection,HowToStep,HowToDirection,HowToTipを使う
```
セクション
    手順1
        手順1-1
        ヒント
```

　きっかけは上記HowToの簡易化であった。しかし、よくよく考えてみると他にもプレーンテキストで入力できたら楽になるものがたくさんある。

HowToTool
```
道具1    画像URL 必要数
道具2    画像URL 必要数
```

HowToSupply
```
材料1    画像URL 必要数 費用（￥100）
材料2    画像URL 必要数 費用（￥234）
```

FAQ
```
よくある質問は必要ですか？
はい、必要です。

複数の質問を書きたいですよね？
はい、書きたいです。
```

Quiz（練習問題）
```
ラジオボタンから正解を選んでください。
⭕これが正解です    必要に応じて正解である理由を書く。
❌これは間違いです    必要に応じて間違いである理由を書く。
❌これも間違いです    必要に応じて間違いである理由を書く。

チェックボックスから正解を複数選んでください。
⭕これが正解です    必要に応じて正解である理由を書く。
❌これは間違いです    必要に応じて間違いである理由を書く。
⭕これも正解です    必要に応じて正解である理由を書く。
❌これも間違いです    必要に応じて間違いである理由を書く。
```

BreadcrumbList
```
🏠  https://example.com/
大カテゴリ    https://example.com/category1/
中カテゴリ    https://example.com/category1/category2
小カテゴリ    https://example.com/category1/category2/category3
```

Article
```
見出し  画像URL
最終更新日時    公開日時
著者名  URL sameAsURL...
```

Dataset
```
名前1
説明1
XML https://a.xml
CSV https://a.csv

名前2
説明2
XML https://b.xml
CSV https://b.csv
```

SoftwareApplication／WebApplication／MobileApplication／VideoGameSoftwareApplication／VideoGameWebApplication／VideoGameMobileApplication
```
名前
価格（￥123）
評価（★5/5   評価した人数123）
カテゴリ
動作OS
```

Book（構造をよく理解していないので一旦対象外）
```
@id
url sameAsURL...
名前
著者名
最終更新日時
workExample
    @id
    ISBN
    bookEdition
    bookFormat
    inLanguage
    potentialAction
        target
            actionPlatform
        expectsAcceptanceOf
```


Sitemap
```
URL1 最終更新日時
URL2 最終更新日時
URL3 最終更新日時
...
```


Feed-Entries
```
URL
タイトル
要約
最終更新日時    公開日時

URL
タイトル
要約
最終更新日時    公開日時

...
```

Google-Podcast-Items
```
URL
タイトル
説明文
公開日
長さ（hh:mm:ss,mm:ss,ssss）    MIMEタイプ  ファイルサイズ（バイト）
露骨表現有無    削除有無
```

　PWA-manifestは項目が多様なので専用の入力フォームを作ったほうがよさそう。

PWA-manifest
```
```

　WebStoryは簡単に作れる専用のアプリを作るべきか。

WebStory
```
```

* <time datetime="2022-05-05T10:33:43+0900" title="実施日">2022-05-05</time>

