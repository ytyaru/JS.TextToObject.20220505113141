class TxtyError extends ExtensibleCustomError {}
class TxtyLineError extends TxtyError {}
class TxtyLinesError extends TxtyError {}
class TxtyTreeError extends TxtyError {}
class TxtyCompositeError extends TxtyError {}
class Txty {
    static line(line, indent=TxtyIndent.Space4) { return new TxtyLineParser(indent).generate(line); }
    static lines(txt, indent=TxtyIndent.Space4) { return new TxtyLinesParser(indent).generate(txt); }
    static tree(txt, indent=TxtyIndent.Space4) { return new TxtyTreeParser(indent).generate(txt); }
    static composite(txt, indent=TxtyIndent.Space4) { return new TxtyCompositeParser(indent).generate(txt); }
    static get Indent() { return TxtyIndent; }
    /*
    static get Tab { return TxtyIndent.Tab; }
    static get Space2 { return TxtyIndent.Space2; }
    static get Space4 { return TxtyIndent.Space4; }
    */
}
class TxtyIndent {
    static get Tab() { return '\t'; }
    static get Space2() { return ' '.repeat(2); }
    static get Space4() { return ' '.repeat(4); }
    /*
    get Tab() { return '\t'; }
    get Space2() { return ' '.repeat(2); }
    get Space4() { return ' '.repeat(4); }
    */
}
class TxtyParser {
    //constructor() { this.LINES = null; this.indent = TxtyIndent.Space4; }
    constructor(indent=TxtyIndent.Space4) { this.LINES = null; this.INDENT = indent; }
    generate(txt) { this.LINES = txt.trim().split(/\r\n|\n/); }
}
class TxtyLineParser extends TxtyParser {
    generate(line, indent=TxtyIndent.Space4) {
//        super.generate(txt)
        if (!line.trim()) { throw new TxtyLineError('引数lineには空白文字以外の字がひとつ以上必要です。'); }
        const obj = {}
        const values = line.split(indent)
        obj.name = values[0]
        obj.options = (1 < values.length) ? values.slice(1) : []
        return obj
    }
}
class TxtyLinesParser extends TxtyParser {
    generate(txt, indent=TxtyIndent.Space4) {
        const list = []
        super.generate(txt)
        const blocks = TxtyBlock.blocks(this.LINES)
        for (const block of TxtyBlock.blocks(this.LINES)) {
            const nodes = []
            for (const line of block) {
                nodes.push(Txty.line(line))
            }
            list.push(nodes)
        }
        return list
    }
}
class TxtyTreeParser extends TxtyParser { // ツリー（木構造）オブジェクトを返す
    generate(txt, indent=TxtyIndent.Space4) {
        super.generate(txt)
        const root = {}
        root.indentText = (this.INDENT) ? this.INDENT : this.#guessIndentText()
//        root.indentText = this.#guessIndentText(this.LINES)
        root.maxDepth = 1
        root.nodes = []
        //console.log(this.LINES, root, this.LINES.length)
        if (1 === this.LINES.length && !this.LINES[0]) { return root; }
        let [depth, preDepth] = [1, 1]
        const parents = [root]
        for (const line of this.LINES) {
            //if (!line) { break; }
            if (!line) { throw new TxtyTreeError(`途中に空行があってはなりません。`); }
            depth = this.#getDepth(line, root.indentText)
            this.#validDepth(depth, preDepth)
            //const node = Txty.line(line.slice(root.indentText.length * depth), root.indent)
            //const node = Txty.line(line)
            const node = {content:Txty.line(line.trim()), nodes:[]}
            //console.log(preDepth, depth, node)

            const parent = this.#getParent(parents, depth, preDepth)
            /*
            if (1 < parents.length) {
                if (preDepth === depth) { parents.pop(); }
                //if (preDepth === depth) { }
                else if (preDepth < depth) { }
                else if (depth < preDepth) { parents.pop(); }
            }
            */
            //console.log(root.maxDepth, parents.length)
            if (root.maxDepth < parents.length) { root.maxDepth = parents.length; }
            //console.log(root.maxDepth, parents.length)

            //if (preDepth < depth) { parents.push(node); }
            /*
            parents.push(node)
            if (preDepth === depth) { parents.pop(); }
            else if (preDepth < depth) { }
            else if (depth < preDepth) { parents.pop(); }
            */
            //let parent = parents[parents.length-1]
            //console.log((parents.length-1), parent)
            parent.nodes.push(node);

            //if (root.maxDepth < parents.lenght) { root.maxDepth = parents.lenght; }
            preDepth = depth
            parents.push(node)
            /*
            let parent = parents[parents.length-1]
            if (preDepth === depth) { parent.nodes.push(node); }
            //else if (preDepth < depth) { parents.push(node); parent.nodes[parent.nodes.length-1].push(node); }
            //else if (preDepth < depth) { parents.push(node); parent.nodes[parent.nodes.length-1].nodes.push(node); }
            else if (preDepth < depth) { parents.push(node); parents[parents.length-1].nodes.push(node); }
            else if (depth < preDepth) { parents.pop(); parent.nodes.push(node); }
            else if (preDepth < depth) { parent.nodes.push(node); }
            if (root.maxDepth < parents.lenght) { root.maxDepth = parents.lenght; }
            //root.nodes.push(node)
            */
        }
        return root
    }
    #getParent(parents, depth, preDepth) {
        if (1 < parents.length) {
            if (preDepth === depth) { parents.pop(); }
            else if (preDepth < depth) { }
            else if (depth < preDepth) { [...Array(preDepth - depth + 1)].map(() => parents.pop()); }
        }
        return parents[parents.length-1]
    }
    /*
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
    */
    #validDepth(depth, preDepth) {
        if (depth < 1) { throw new TxtyTreeError(`テキストツリーの階層が不正です。depthは1以上であるべきです。${depth}`); }
        if (preDepth < depth && preDepth+1 < depth) {
            throw new TxtyTreeError(`テキストの階層が不正です。前の行より2階層以上深いインデントです。深くするなら1層深くするだけにしてください。${depth}, ${preDepth}`)
        }
//        if (0 < depth && (depth === preDepth || depth === preDepth + 1 || depth === preDepth - 1)) { return true; }
//        throw new TxtyTreeError(`テキストの階層が不正です。前の行と同じかひとつだけ深いインデントのみ許可されます。${depth}, ${preDepth}`)
    }
    #getDepth(line, indent) {
        let depth = 1;
        while (line.startsWith(indent.repeat(depth))) { depth++ }
        return depth
    }
    #guessIndentText() { // テキスト内のインデント文字を推測する（最初に見つかった所定のインデント文字がそれとする。以降それをインデント文字として使われることを期待する）
        const INDENTS = ['\t'].concat([2,4,8].map((i)=>' '.repeat(i)))
        for (const line of this.LINES) {
            return INDENTS.find(indent=>line.startsWith(indent))
        }
        throw new TxtyTreeError(`インデント文字の推測に失敗しました。入力テキストのうち少なくともひとつの行の先頭にTABまたは半角スペース2,4,8のいずれかを含めてください。`)
    }

}
class TxtyCompositeParser extends TxtyParser {
    generate(txt, indent=TxtyIndent.Space4) {
        super.generate(txt)
        for (const line of this.LINES) {

        }
    }
}
class TxtyBlock { // 2行以上空行の箇所で分断されたテキスト行配列リスト
    static blocks(LINES) {
        const ranges = this.ranges(LINES)
        return this.ranges(LINES).map(r=>LINES.slice(r.begin, r.end).filter(v=>v))
    }
    static ranges(LINES) { // 2行以上空行の箇所で分断する。
        if (!Array.isArray(LINES)) { throw new TxtyError(`引数LINESは配列であるべきです。`); }
        if (0 === LINES.length) { return []; }
        if (1 === LINES.length) { return [{begin:0, end:1}]; }
        const ranges = []
        let [begin, end, validEnd] = [0, 0, 0]
        for (let i=0; i<LINES.length; i++) {
            end++;
            if (LINES[i]) { continue; }
            ranges.push({begin:begin, end:end})
            // 過剰な空白行を飛ばす
            while (!LINES[i]) { i++; }
            if (i >= LINES.length) { break; }
            begin = i
            end = i
        }
        ranges.push({begin:begin, end:LINES.length})
        return ranges
    }
}
/*
class Txty { 
    static TxtBlockRanges(LINES) { // 2行以上空行の箇所で分断する。
        if (!Array.isArray(LINES)) { throw new TxtyError(`引数LINESは配列であるべきです。`); }
        if (0 === LINES.length) { return []; }
        if (1 === LINES.length) { return [{begin:0, end:1}]; }
        const ranges = []
        let [begin, end, validEnd] = [0, 0, 0]
        for (let i=0; i<LINES.length; i++) {
            end++;
            //console.log(i, LINES[i], '---------')
            if (LINES[i]) { continue; }
            ranges.push({begin:begin, end:end})
            begin = end
        }
        ranges.push({begin:begin, end:end})
        return ranges
    }
}
*/
/*
class Txty {
    static line(line, indent='    ') { // 1行テキストから名前とオプションのオブジェクトを返す。
        if (!line.trim()) { throw new TxtyLineError('引数lineには空白文字以外の字がひとつ以上必要です。'); }
        const obj = {}
        const values = line.split(indent)
        obj.name = values[0]
        obj.options = (1 < values.length) ? values.slice(1) : []
        return obj
    }
    static lines(txt, indent='    ') {
        const items = []
        let [begin, end, brank] = [0, 0, 0]
        const lines = txt.split(/\r\n|\n/)
        console.log(lines)
        for (let i=0; i<lines.length; i++) {
            end++;
            if (!lines[i]) { // 空行なら
                end--;
                // SingleLineElement（単一行要素）を追加する
                console.log(begin, end, lines.slice(begin, end))
                items.push(lines.slice(begin, end).map(line=>this.line(line, indent)))
                // 次の要素までにある空行をすべて飛ばす
                begin = end + 1
                for(let n=begin; n<lines.length; n++) {
                    if (lines[n]) { begin++; }
                }
                end = begin
                i = begin
                console.log(begin, end)
            }
        }
        console.log(begin, end, lines.length)
        //if (end < lines.length) {
        items.push(lines.slice(begin-1, end).map(line=>Txty.line(line, indent)))
        //if (0 === items.length && txt.trim()) { items.push(txt); }
        return items
    }
    static TxtBlockRanges(LINES) { // 2行以上空行の箇所で分断する。
        if (!Array.isArray(LINES)) { throw new TxtyError(`引数LINESは配列であるべきです。`); }
        if (0 === LINES.length) { return []; }
        if (1 === LINES.length) { return [{begin:0, end:1}]; }
        const ranges = []
        let [begin, end, validEnd] = [0, 0, 0]
        for (let i=0; i<LINES.length; i++) {
            end++;
            //console.log(i, LINES[i], '---------')
            if (LINES[i]) { continue; }
            ranges.push({begin:begin, end:end})
            begin = end
        }
        ranges.push({begin:begin, end:end})
        return ranges
    }

    static Composite(txt, indent='    ') { // 2行以上空行の箇所で分断する。
        const items = this.#CompositeItems(txt.split('\n'), indent)
    }
    static #CompositeItems(LINES, indent='    ') { // 2行以上空行の箇所で分断されたテキストの配列を返す。
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
    static #CompositeTxts(LINES) { // 2行以上空行の箇所で分断されたテキストの配列を返す。
        const ranges = this.#CompositeTxtRanges(LINES)
        return ranges.map(r=>LINES.slice(r.begin, r.end))
        const txts = []
        for (const range of ranges) {
            txts.push(txt.slice(range.begin, range.end))
        }
        return txts
    }
    static #CompositeTxtRanges(LINES) { // 2行以上空行の箇所で分断する。
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
*/
