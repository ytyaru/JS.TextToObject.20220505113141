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

　パンくずリストのshcema.orgをあらわすBreadcrumbListについて。テキストで書き、それをオブジェクトに変換する。

bread-crumb-list.txt
```
🏠  https://example.com/
大カテゴリ    https://example.com/category1/
中カテゴリ    https://example.com/category1/category2
小カテゴリ    https://example.com/category1/category2/category3
```
参照方法の確認
```javascript
const txt = await fetch('bread-crumb-list.txt')
const elements = TextElement.Single(txt)
elements[0].name;         // 🏠
elements[0].options[0];   // https://example.com/
elements[1].name;         // 大カテゴリ
elements[1].options[0];   // https://example.com/category1/
elements[2].name;         // 中カテゴリ
elements[2].options[0];   // https://example.com/category1/category2
elements[3].name;         // 小カテゴリ
elements[3].options[0];   // https://example.com/category1/category2/category3
```
main.js
```javascript
window.addEventListener('load', async(event)=>{
    function generateBreadcrumbList() {
        const elements = TextElement.Single(txt)
        const bread = {'@context': 'https://schema.org', '@type': 'BreadcrumbList'}
        bread.itemListElement = [] 
        for (let i=0; i<elements.length; i++) {
            const item = {'@context': 'https://schema.org', '@type': 'ListItem'}
            item.position = i
            item.name = elements[i].name
            item.item = elements[i].options[0]
            bread.itemListElement.push(item)
        }
        return bread
    }
    const jsonLdStr = JSON.stringify(
                        generateBreadcrumbList(
                            await fetch('bread-crumb-list.txt')))
});
```

```javascript
class TextElement {
    Single(line, indent='    ') {
        const obj = {}
        const values = line.split(indent)
        obj.name = values[0]
        if (1 < values.length) { obj.options = values.slice(1); }
        return obj
    }
}
```

### MultiLineElement（複数行要素）

　MultiLineElement（複数行要素）は、複数のSingleLineElement（単一行要素）でひとつの要素をあらわす。さらに要素をひとつのテキスト内で複数書ける。そのときは2行の改行で間をあける。

```
ひとつ目の要素における1行目の要素
ひとつ目の要素における2行目の要素

ふたつ目の要素における1行目の要素
ふたつ目の要素における2行目の要素
```

```javascript
const items = []
let begin = 0
let end = 0
const lines = txt.split('\n')
for (let i=0; i<lines.length; i++) {
    end++;
    if (lines[i]) { begin = end + 1; }
    else {
        items.push(TextElement.Single(lines.slice(begin, end).join('\n')))
    }
}
return items
```

　けれど2行改行がつぎの場合だと正しく動作しない。

* 2行改行でなく3行、4行などもっと多い改行である
* 末尾に改行がない
* 末尾に2行改行より多い改行がある

```javascript
class TextElement {
    Multi(txt, indent='    ') {
        const items = []
        let begin = 0
        let end = 0
        let brank = 0
        const lines = txt.split('\n')
        for (let i=0; i<lines.length; i++) {
            end++;
            if (!lines[i]) { // 空行なら
                // SingleLineElement（単一行要素）を追加する
                items.push(lines.slice(begin, end).map(line=>TextElement.Single(line, indent)))
                /*
                const item = []
                for (const line of lines.slice(begin, end)) {
                    item.push(TextElement.Single(line, indent))
                }
                items.push(item)
                */
                //items.push(TextElement.Single(lines.slice(begin, end).join('\n'), indent))
                // 次の要素までにある空行をすべて飛ばす
                begin = end + 1
                for(let n=begin; n<lines.length; n++) {
                    if (lines[n]) { begin++; }
                }
                end = begin
                i = begin
            }
        }
        return items
    }
}
```

　schema.orgのFAQを例にしてみる。

faq.txt
```
よくある質問は必要ですか？
はい、必要です。

複数の質問を書きたいですよね？
はい、書きたいです。
```

main.js
```javascript
window.addEventListener('load', async(event)=>{
    function generateFaq(txt) {
        const elements = TextElement.Multi(txt)
        const faq = {'@context': 'https://schema.org', '@type': 'FAQPage'}
        faq.mainEntity = [] 
        for (const element of elements) {
            const item = {'@context': 'https://schema.org', '@type': 'Question'}
            item.name = element[0].name
            item.acceptedAnswer = {
                '@type': 'Answer',
                text: element[1].name,
            }
            faq.mainEntity.push(item)
        }
        return faq
    }
    const jsonLdStr = JSON.stringify(
                        generateFaq(
                            await fetch('faq.txt')))
});
```

　なお、このテキスト形式においてコメントは実装しない。よくあるのは行頭`#`や`;`のときにコメントという書式である。それらは実装しない。できるだけシンプルにしたいから。そもそもシンプルなテキストから複雑なschema.orgを作りたいという要件だったので、ソースのテキストが複雑になってしまったら本末転倒。余計な機能も作り込みたくない。

### TreeElement（木構造要素）

　TreeElement（木構造要素）はツリー構造テキストをあらわす。ツリーは親子関係をもったノードのリストである。ひとつのノードはSingleLineElementであらわす。

```javascript
const root = TextElement.Tree(txt)
root.indent  // 入力テキストのインデント（'\t','  ','    ',）
root.maxDeps // rootだけがもつ。最深階層数
root.deps    // 現在の階層数
root.nodes   // 子の配列
root.name    // 名前。値。必須値
root.options // オプション値
```

　schema.orgの`HowTo`がもつ`step`値を以下テキストから生成したい。このとき、まずテキストからツリー構造オブジェクトを生成するのが今回の対象範囲である。

```
セクション1
    手順1-1
        手順1-1-1
        TIP:ヒント1
    手順1-2
        手順1-2-1
        TIP:ヒント2
セクション2
    手順2-1
        手順2-1-1
        TIP:ヒント3
    手順2-2
        手順2-2-1
        TIP:ヒント4
```

　ツリーテキストを1行ずつみるとき、以下のように階層差でだれの子として挿入するか判断する。

階層差|関係
------|----
前行と同じ|parent.childrenの末弟。
前行より1深い|now.childrenの長兄。
前行より1浅い|parent.childrenの末弟。
それ以外|不正値

```javascript
class TextElement {
    Tree(txt) {
        const root = {}
        const LINES = txt.split('\n')
        root.indentText = this.#guessIndent(LINES)
        root.maxDepth = 1
        let [depth, preDepth] = [1, 1]
        const parents = [root]
        for (const line of LINES) {
            if (!line) { break; }
            depth = getDepth(line)
            this.#validDepth(depth, preDepth)
            const node = this.Single(line.slice(root.indent.length * depth), root.indent)
            let parent = parents[parents.length-1]
            if (preDepth === depth) { parent.nodes.push(node); }
            else if (preDepth < depth) { parents.push(node); parent.nodes[parent.nodes.length-1].push(node); }
            //else if (preDepth < depth) { parents.push(node); parent.nodes[parent.nodes.length-1].nodes.push(node); }
            else if (depth < preDepth) { parents.pop(); parent.nodes.push(node); }
            else if (preDepth < depth) { parent.nodes.push(node); }
            if (root.maxDepth < parents.lenght) { root.maxDepth = parents.lenght; }
            root.nodes.push(node)
        }
        return root
    }
    #getParent(root, depth) {
        let target = root
        for (let i=1; i<depth; i++) {
            if (!target.hasOwnProperty('nodes')) { target.nodes = []; }
            target = target.nodes
        }
        return target
    }
    #addChild(parent, child) {
        if (!parent.hasOwnProperty('nodes')) { parent.nodes = []; }
        parent.nodes.push(child)
    }
    #validDepth(depth, preDepth) {
        if (0 < depth && (depth === preDepth || depth === preDepth + 1 || depth === preDepth - 1)) { return true; }
        throw TextElementIndentDepthError(`テキストの階層が不正です。前の行と同じかひとつだけ深いインデントのみ許可されます。`)
    }
    #getDepth(line, indent) {
        let depth = 1;
        while (line.startsWith(indent.repeat(depth))) { depth++ }
        return depth
    }
    #guessIndentText(LINES) { // テキスト内のインデント文字を推測する（最初に見つかった所定のインデント文字がそれとする。以降それをインデント文字として使われることを期待する）
        const INDENTS = ['\t'].concat([2,4,8].map((i)=>' '.repeat(i)))
        for (const line of LINES) {
            return INDENTS.find(indent=>line.startsWith(indent))
        }
    }
}
```

main.js
```javascript
window.addEventListener('load', async(event)=>{
    function generateHowTo(txt) {
        const howto = {'@context': 'https://schema.org', '@type': 'HowTo'}
        howto.step = []
        const root = TextElement.Tree(txt)
        if (3 === root.maxDepth) { // 3層
            for (const node of root.nodes) {
                const section = this.#Section(node)
                if (node.nodes) {
                    for (const step of node.nodes) {
                        section.itemElementList.push(this.#Step(step))
                    }
                }
                howto.step.push(section)
            }
        } else { // 1,2層
            for (const step of root.nodes) {
                howto.step.push(this.#Step(step))
            }
        }
        return howto
    }
    #Section(node) {
        const section = {'@context': 'https://schema.org', '@type': 'HowToSection'}
        section.name = node.name
        section.itemElementList = []
    }
    #Step(node) {
        const step = {'@context': 'https://schema.org', '@type': 'HowToStep'}
        if (node.nodes) {
            for (const child of node.nodes) {
                step.itemElementList = []
                if (child.name.toUpperCase().startsWith('TIP:')) { step.itemElementList.push(this.#Direction(node)); }
                else { step.itemElementList.push(this.#Tip(node)); }
            }
        } else { step.text = node.name; }
    }
    #Direction(node) { return {'@context': 'https://schema.org', '@type': 'HowToDirection', text:node.name }; }
    #Tip(node) { return {'@context': 'https://schema.org', '@type': 'HowToTip', text:node.name }; }
    const jsonLdStr = JSON.stringify(
                        generateFaq(
                            await fetch('how-to-steps.txt')))
});
```

### CompositeElement（複合形）

　CompositeElement（複合形）は以下の複合形である。

* SingleLineElement（一行で値とオプションをあらわす。インデント文字で値やオプション間を区切る）
* MultiLineElement（複数のSingleLineElementでひとつの要素をあらわす。2空行で要素間を区切る）
* TreeElement（ひとつの木構造をあらわす）

　schema.orgのHowTo全体をあらわすために実装する。

how-to-1.txt
```
MultiLineElement（HowToのオプション。名前、所要時間、画像、ビデオなど）

MultiLineElement（HowToSupply配列）

MultiLineElement（HowToTool配列）

TreeElement（HowToSection, HowToStep, HowToDirection, HowToTip）
```

how-to-1.txt
```
MultiLineElement（HowToのオプション。名前、所要時間、画像、ビデオなど）
name
image
video
estimatedCost
totalTime

MultiLineElement（HowToSupply配列）
name    image   
MultiLineElement（HowToTool配列）

TreeElement（HowToSection, HowToStep, HowToDirection, HowToTip）
セクション1
    手順1-1     url     image   video
        手順1-1-1
        TIP:ヒント1
    手順1-2     url     image   video
        手順1-2-1
        TIP:ヒント2
セクション2
    手順2-1     url     image   video
        手順2-1-1
        TIP:ヒント3
    手順2-2     url     image   video
        手順2-2-1
        TIP:ヒント4
```

　このとき許可されるパターンは以下。

* Multi, Multi, Multi, Tree
* Multi, Multi, Tree（2つ目のMultiはToolでなくSupply（道具は不要でも素材は必要になるのが一般的な手順だから））
* Multi, Tree

　複合系のとき、各型との区別は2つ以上の空行で行う。

```javascript
TextElement.Composite(txt, '    ', 'MmmT')
```

引数|説明
----|----
1|入力テキスト
2|インデント文字列
3|複合型の位置とその内容型

　第三引数について。各字は型をあらわす。順序はその型があらわれる位置をあらわす。小文字はオプションであり大文字は必須である。オプションなら存在しなくてもよい。

値|説明
--|----
`s`,`S`|`SimpleElement`型（任意,必須）
`m`,`M`|`MultiLineElement`型（任意,必須）
`t`,`T`|`TreeElement`型（任意,必須）

　各型は2行以上の空行で区切られる。よって`MmmT`のように4字あれば最大3つの2行以上空行がある。ただし小文字の`mm`はオプションであり、存在しない場合がありうる。つまり2行以上空白は、3,2,1つの3パターンがありうる。

　もし第三引数が`null`,`空文字`,`undefined`であれば自動推測する。まずは2行以上空行をさがす。それらをテキスト塊とし、インデント文字が先頭に含まれている行があればTree型と判断する。それ以外であればMulti型と判断する。

　もし第三引数が`null`,`空文字`,`undefined`でなく、`s`,`S`,`m`,`M`,`t`,`T`以外の文字が含まれていたら、不正値として例外を発生させる。

```javascript
class TreeElement {
    Composite(txt, indent='    ', format='') {

    }
}
```
```javascript
class TreeElement {
    #Composite(txt, indent='    ', format='') { // 2行以上空行の箇所で分断する。
        const items = this.#CompositeItems(txt.split('\n'), indent)
        // formatによるバリデート
        if (format) {}
        return items
    }
    #validCompositeFormatString(format) {
        const VALIDS = ['s','m','t','S','M','T']
        for (let i=0; i<format.length; i++) {
            if (!VALIDS.some(format.charAt(i)) { throw new TextElementError(`Compositeのformatが不正値です。次のいずれかの文字だけ使用してください。\n${VALIDS.join('\n')}\nあるいは未設定、空文字、null, undefinedにすると自動推測します。2行以上空白で要素を区切り、その要素型はMultiLineElementかTreeElementのいずれかであると判断します。要素内の全行のうちひとつでも行頭にインデント値をもつ行があればTreeと判断します。`); }
        }
    }
    #validCompositeFormat(items, format) {
        for (let i=0; i<items.length; i++) {
            
            if (['S','M','T'].some(items[i].type))
            if (['s','m','t'].some)
        }
    }
    #CompositeItems(LINES, indent='    ') { // 2行以上空行の箇所で分断されたテキストの配列を返す。
        const items = []
        const txts = this.#CompositeTxts(LINES)
        for (const txt of txts) {
            const item = {}
            let method = this.MultiLineElement
            for (const line of txt) {
                if (line.startsWith(indent)) { method = this.TreeElement }
            }
            item.type = (line.startsWith(indent)) ? 'T' : 'M'
            method = (line.startsWith(indent)) ? this.Tree : this.Multi
            item.txt = method(txt, indent)
            items.push(item)
            //items.push(method(txt, indent))
        }
        return items
    }
    #CompositeTxts(LINES) { // 2行以上空行の箇所で分断されたテキストの配列を返す。
        const ranges = #CompositeTxtRanges(LINES)
        return ranges.map(r=>LINES.slice(r.begin, r.end))
        const txts = []
        for (const range of ranges) {
            txts.push(txt.slice(range.begin, range.end))
        }
        return txts
    }
    #CompositeTxtRanges(LINES) { // 2行以上空行の箇所で分断する。
        const ranges = []
        let [begin, end, blank] = [0, 0, 0]
        for (let i=0; i<LINES.length; i++) {
            end++;
            if (line) { continue; }
            ranges.push({begin:begin, end:end})
            // 次の要素までにある空行をすべて飛ばす
            begin = end + 1
            for(let n=begin; n<lines.length; n++) {
                if (lines[n]) { begin++; }
            }
            end = begin
            i = begin
        }
        return ranges
    }
}
```

　`format`による型チェックはいらないかもしれない。よく考えたら別にMultiLineとTreeの型チェックをする必要なんてない。ふつうにインデントがあればTreeにして、それ以外ならMultiでいい。仮にTree想定だった位置がMultiだったとしても、エンドユーザが好きにすればいい。どのみち返すデータは配列かオブジェクトになるため、エンドユーザ側で制御せねばならないのだから。

```javascript
class TreeElement {
    #Composite(txt, indent='    ') { // 2行以上空行の箇所で分断する。
        const items = this.#CompositeItems(txt.split('\n'), indent)
    }
    #CompositeItems(LINES, indent='    ') { // 2行以上空行の箇所で分断されたテキストの配列を返す。
        const items = []
        const txts = this.#CompositeTxts(LINES)
        for (const txt of txts) {
            let method = this.Multi
            for (const line of txt) {
                if (line.startsWith(indent)) { method = this.Tree }
            }
            items.push(method(txt, indent))
        }
        return items
    }
    #CompositeTxts(LINES) { // 2行以上空行の箇所で分断されたテキストの配列を返す。
        const ranges = #CompositeTxtRanges(LINES)
        return ranges.map(r=>LINES.slice(r.begin, r.end))
        const txts = []
        for (const range of ranges) {
            txts.push(txt.slice(range.begin, range.end))
        }
        return txts
    }
    #CompositeTxtRanges(LINES) { // 2行以上空行の箇所で分断する。
        const ranges = []
        let [begin, end, blank] = [0, 0, 0]
        for (let i=0; i<LINES.length; i++) {
            end++;
            if (line) { continue; }
            ranges.push({begin:begin, end:end})
            // 次の要素までにある空行をすべて飛ばす
            begin = end + 1
            for(let n=begin; n<lines.length; n++) {
                if (lines[n]) { begin++; }
            }
            end = begin
            i = begin
        }
        return ranges
    }
}
```

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

