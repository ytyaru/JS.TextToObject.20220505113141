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
}
class TxtyIndent {
    static get Tab() { return '\t'; }
    static get Space2() { return ' '.repeat(2); }
    static get Space4() { return ' '.repeat(4); }
    static get Space8() { return ' '.repeat(8); }
}
class TxtyParser {
    constructor(indent=TxtyIndent.Space4) { this.LINES = null; this.INDENT = indent; }
    generate(txt) { this.LINES = txt.trim().split(/\r\n|\n/); }
    setIndent(indent) { this.INDENT = indent || this.INDENT || TxtyIndent.Space4; }
    guessIndentText() { // テキスト内のインデント文字を推測する（最初に見つかった所定のインデント文字がそれとする。以降それをインデント文字として使われることを期待する）
        const INDENTS = ['\t'].concat([2,4,8].map((i)=>' '.repeat(i)))
        for (const line of this.LINES) {
            return INDENTS.find(indent=>line.startsWith(indent))
        }
        throw new TxtyTreeError(`インデント文字の推測に失敗しました。入力テキストのうち少なくともひとつの行の先頭にTABまたは半角スペース2,4,8のいずれかを含めてください。`)
    }
}
class TxtyLineParser extends TxtyParser {
    generate(line, indent=null) {
        super.setIndent(indent)
        if (!line.trim()) { throw new TxtyLineError('引数lineには空白文字以外の字がひとつ以上必要です。'); }
        const obj = {}
        const values = line.split(this.INDENT)
        obj.name = values[0]
        obj.options = (1 < values.length) ? values.slice(1) : []
        return obj
    }
}
class TxtyLinesParser extends TxtyParser {
    generate(txt, indent=null) {
        super.generate(txt)
        return this.generateFromLines(this.LINES)
    }
    generateFromLines(lines, indent=null) {
        super.setIndent(indent)
        const list = []
        const blocks = TxtyBlock.blocks(lines)
        for (const block of TxtyBlock.blocks(lines)) {
            const nodes = []
            for (const line of block) {
                nodes.push(Txty.line(line, this.INDENT))
            }
            list.push(nodes)
        }
        return list
    }
}
class TxtyTreeParser extends TxtyParser { // ツリー（木構造）オブジェクトを返す
    generate(txt, indent=null) {
        super.generate(txt)
        return this.generateFromLines(this.LINES, indent)
    }
    generateFromLines(lines, indent=null) {
        if (indent) { this.INDENT = indent; }
        if (!indent && !this.INDENT) { this.INDENT = super.guessIndentText(); }
        const root = this.#makeRoot()
        if (1 === lines.length && !lines[0]) { return root; }
        let [depth, preDepth] = [1, 1]
        const parents = [root]
        for (const line of lines) {
            if (!line) { throw new TxtyTreeError(`途中に空行があってはなりません。`); }
            depth = this.#getDepth(line, root.indentText)
            this.#validDepth(depth, preDepth)
            const node = {content:Txty.line(line.trim(), this.INDENT), nodes:[]}
            const parent = this.#getParent(parents, depth, preDepth)
            if (root.maxDepth < parents.length) { root.maxDepth = parents.length; }
            parent.nodes.push(node);
            preDepth = depth
            parents.push(node)
        }
        return root
    }
    #makeRoot() { return {
        indentText: this.INDENT,
        maxDepth: 1,
        nodes: [],
    }}
    #getParent(parents, depth, preDepth) {
        if (1 < parents.length) {
            if (preDepth === depth) { parents.pop(); }
            else if (preDepth < depth) { }
            else if (depth < preDepth) { [...Array(preDepth - depth + 1)].map(() => parents.pop()); }
        }
        return parents[parents.length-1]
    }
    #validDepth(depth, preDepth) {
        if (depth < 1) { throw new TxtyTreeError(`テキストツリーの階層が不正です。depthは1以上であるべきです。${depth}`); }
        if (preDepth < depth && preDepth+1 < depth) {
            throw new TxtyTreeError(`テキストの階層が不正です。前の行より2階層以上深いインデントです。深くするなら1層深くするだけにしてください。${depth}, ${preDepth}`)
        }
    }
    #getDepth(line, indent) {
        let depth = 1;
        while (line.startsWith(indent.repeat(depth))) { depth++ }
        return depth
    }
}
class TxtyCompositeParser extends TxtyParser {
    generate(txt, indent=null) {
        super.setIndent(indent)
        const list = []
        super.generate(txt)
        if (1 === this.LINES.length && !this.LINES[0]) { return list; }
        const blocks = TxtyBlock.blocks(this.LINES)
        for (const block of TxtyBlock.blocks(this.LINES)) {
            const parser = (this.isTree(block)) ? new TxtyTreeParser() : new TxtyLinesParser()
            list.push(parser.generateFromLines(block, this.INDENT))
        }
        return list
    }
    isTree(block) { return block.some(line=>line.startsWith(this.INDENT)); }
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

