class TxtyError extends ExtensibleCustomError {}
class TxtyLineError extends TxtyError {}
class TxtyLinesError extends TxtyError {}
class TxtyTreeError extends TxtyError {}
class TxtyCompositeError extends TxtyError {}
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
                console.log(begin, end)
            }
        }
        console.log(begin, end, lines.length)
        //if (end < lines.length) {
        /*
        if (begin !== end) {
            end = lines.length
            items.push(lines.slice(begin, end).map(line=>Txty.line(line, indent)))
        }
        */
        items.push(lines.slice(begin-1, end).map(line=>Txty.line(line, indent)))
        //if (0 === items.length && txt.trim()) { items.push(txt); }
        return items
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
