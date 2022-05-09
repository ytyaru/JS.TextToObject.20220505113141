class UnitTestError extends ExtensibleCustomError {}
class TestTxtyBlockRanges { // 単体テスト（2空行区切り位置配列を返す）
    test() {
        this.#testBlank()
        this.#testMinimum()
        this.#testEndBlank()
        this.#testBeginBlank()
        this.#test1Block2Property()
        this.#test2Block1Property()
        this.#test2Block1PropertyOverBlank3()
        this.#test2Block1PropertyOverBlank4()
        this.#test2Block1PropertyOverBlank5()
        this.#test1Block1Property1Option()
        this.#test2Block1Property1Option()
        this.#test2Block2Property()
        this.#test3Block2Property()
    }
    #testBlank() {
        const LINES = ``.trim().split(/\r\n|\n/)
        const actual = TxtyBlock.ranges(LINES)
        console.assert(Array.isArray(actual))
        console.assert(1 === actual.length)
        console.assert(actual[0].hasOwnProperty('begin'))
        console.assert(actual[0].hasOwnProperty('end'))
        console.assert(0 === actual[0].begin)
        console.assert(1 === actual[0].end)
        console.assert('' === LINES.slice(actual[0].begin, actual[0].end)[0])
        console.assert(0 === LINES.slice(actual[0].begin, actual[0].end).filter(v => v).length)
    }
    #testMinimum() {
        const LINES = `１ブロック目`.trim().split(/\r\n|\n/)
        const actual = TxtyBlock.ranges(LINES)
        console.assert(Array.isArray(actual))
        console.assert(1 === actual.length)
        console.assert(actual[0].hasOwnProperty('begin'))
        console.assert(actual[0].hasOwnProperty('end'))
        console.assert(0 === actual[0].begin)
        console.assert(1 === actual[0].end)
        console.assert('１ブロック目' === LINES.slice(actual[0].begin, actual[0].end)[0])
    }
    #testEndBlank() {
        const LINES = `１ブロック目\n\n`.trim().split(/\r\n|\n/)
        const actual = TxtyBlock.ranges(LINES)
        console.assert(Array.isArray(actual))
        console.assert(1 === actual.length)
        console.assert(actual[0].hasOwnProperty('begin'))
        console.assert(actual[0].hasOwnProperty('end'))
        console.assert(0 === actual[0].begin)
        console.assert(1 === actual[0].end)
    }
    #testBeginBlank() {
        const LINES = `\n\n１ブロック目`.trim().split(/\r\n|\n/)
        const actual = TxtyBlock.ranges(LINES)
        console.assert(Array.isArray(actual))
        console.assert(1 === actual.length)
        console.assert(actual[0].hasOwnProperty('begin'))
        console.assert(actual[0].hasOwnProperty('end'))
        console.assert(0 === actual[0].begin)
        console.assert(1 === actual[0].end)
    }
    #test1Block2Property() {
        const LINES = `１ブロック目の１行目\n１ブロック目の２行目`.trim().split(/\r\n|\n/)
        const actual = TxtyBlock.ranges(LINES)
        console.assert(Array.isArray(actual))
        console.assert(1 === actual.length)
        console.assert(actual[0].hasOwnProperty('begin'))
        console.assert(actual[0].hasOwnProperty('end'))
        console.assert(0 === actual[0].begin)
        console.assert(2 === actual[0].end)
        console.assert('１ブロック目の１行目' === LINES.slice(actual[0].begin, actual[0].end).filter(v => v)[0])
        console.assert('１ブロック目の２行目' === LINES.slice(actual[0].begin, actual[0].end).filter(v => v)[1])
    }
    #test2Block1Property() {
        const LINES = `１ブロック目\n\n２ブロック目`.trim().split(/\r\n|\n/)
        const actual = TxtyBlock.ranges(LINES)
        console.assert(Array.isArray(actual))
        console.assert(2 === actual.length)
        console.assert(actual[0].hasOwnProperty('begin'))
        console.assert(actual[0].hasOwnProperty('end'))
        console.assert(0 === actual[0].begin)
        console.assert(2 === actual[0].end)
        console.assert(2 === actual[1].begin)
        console.assert(3 === actual[1].end)
        console.assert('１ブロック目' === LINES.slice(actual[0].begin, actual[0].end).filter(v => v)[0])
        console.assert('２ブロック目' === LINES.slice(actual[1].begin, actual[1].end).filter(v => v)[0])
    }
    #test2Block1PropertyOverBlank3() {
        const LINES = `１ブロック目\n\n\n２ブロック目`.trim().split(/\r\n|\n/)
        const actual = TxtyBlock.ranges(LINES)
        console.assert(Array.isArray(actual))
        console.assert(2 === actual.length)
        console.assert(actual[0].hasOwnProperty('begin'))
        console.assert(actual[0].hasOwnProperty('end'))
        console.assert(0 === actual[0].begin)
        console.assert(2 === actual[0].end)
        console.assert(3 === actual[1].begin)
        console.assert(4 === actual[1].end)
        console.assert('１ブロック目' === LINES.slice(actual[0].begin, actual[0].end).filter(v => v)[0])
        console.assert('２ブロック目' === LINES.slice(actual[1].begin, actual[1].end).filter(v => v)[0])
    }
    #test2Block1PropertyOverBlank4() {
        const LINES = `１ブロック目\n\n\n\n２ブロック目`.trim().split(/\r\n|\n/)
        const actual = TxtyBlock.ranges(LINES)
        console.assert(Array.isArray(actual))
        console.assert(2 === actual.length)
        console.assert(actual[0].hasOwnProperty('begin'))
        console.assert(actual[0].hasOwnProperty('end'))
        console.assert(0 === actual[0].begin)
        console.assert(2 === actual[0].end)
        console.assert(4 === actual[1].begin)
        console.assert(5 === actual[1].end)
        console.assert('１ブロック目' === LINES.slice(actual[0].begin, actual[0].end).filter(v => v)[0])
        console.assert('２ブロック目' === LINES.slice(actual[1].begin, actual[1].end).filter(v => v)[0])
    }
    #test2Block1PropertyOverBlank5() {
        const LINES = `１ブロック目\n\n\n\n\n２ブロック目`.trim().split(/\r\n|\n/)
        const actual = TxtyBlock.ranges(LINES)
        console.assert(Array.isArray(actual))
        console.assert(2 === actual.length)
        console.assert(actual[0].hasOwnProperty('begin'))
        console.assert(actual[0].hasOwnProperty('end'))
        console.assert(0 === actual[0].begin)
        console.assert(2 === actual[0].end)
        console.assert(5 === actual[1].begin)
        console.assert(6 === actual[1].end)
        console.assert('１ブロック目' === LINES.slice(actual[0].begin, actual[0].end).filter(v => v)[0])
        console.assert('２ブロック目' === LINES.slice(actual[1].begin, actual[1].end).filter(v => v)[0])
    }
    #test1Block1Property1Option() {
        const LINES = `１ブロック目    １ブロック目のオプション１`.trim().split(/\r\n|\n/)
        const actual = TxtyBlock.ranges(LINES)
        console.assert(Array.isArray(actual))
        console.assert(1 === actual.length)
        console.assert(actual[0].hasOwnProperty('begin'))
        console.assert(actual[0].hasOwnProperty('end'))
        console.assert(0 === actual[0].begin)
        console.assert(1 === actual[0].end)
        console.assert('１ブロック目    １ブロック目のオプション１' === LINES.slice(actual[0].begin, actual[0].end).filter(v => v)[0])
    }
    #test2Block1Property1Option() {
        const LINES = `１ブロック目    １ブロック目のオプション１\n\n２ブロック目    ２ブロック目のオプション１`.trim().split(/\r\n|\n/)
        const actual = TxtyBlock.ranges(LINES)
        console.assert(Array.isArray(actual))
        console.assert(2 === actual.length)
        console.assert(actual[0].hasOwnProperty('begin'))
        console.assert(actual[0].hasOwnProperty('end'))
        console.assert(0 === actual[0].begin)
        console.assert(2 === actual[0].end)
        console.assert(2 === actual[1].begin)
        console.assert(3 === actual[1].end)
        console.assert('１ブロック目    １ブロック目のオプション１' === LINES.slice(actual[0].begin, actual[0].end).filter(v => v)[0])
        console.assert('２ブロック目    ２ブロック目のオプション１' === LINES.slice(actual[1].begin, actual[1].end).filter(v => v)[0])
    }
    #test2Block2Property() {
        const LINES = `１ブロック目１プロパティ\n１ブロック目２プロパティ\n\n２ブロック目１プロパティ\n２ブロック目２プロパティ`.trim().split(/\r\n|\n/)
        const actual = TxtyBlock.ranges(LINES)
        console.assert(Array.isArray(actual))
        console.assert(2 === actual.length)
        console.assert(actual[0].hasOwnProperty('begin'))
        console.assert(actual[0].hasOwnProperty('end'))
        console.assert(0 === actual[0].begin)
        console.assert(3 === actual[0].end)
        console.assert(3 === actual[1].begin)
        console.assert(5 === actual[1].end)
        console.assert('１ブロック目１プロパティ' === LINES.slice(actual[0].begin, actual[0].end).filter(v => v)[0])
        console.assert('１ブロック目２プロパティ' === LINES.slice(actual[0].begin, actual[0].end).filter(v => v)[1])
        console.assert('２ブロック目１プロパティ' === LINES.slice(actual[1].begin, actual[1].end).filter(v => v)[0])
        console.assert('２ブロック目２プロパティ' === LINES.slice(actual[1].begin, actual[1].end).filter(v => v)[1])
    }
    #test3Block2Property() {
        const LINES = `
１ブロック目１プロパティ
１ブロック目２プロパティ

２ブロック目１プロパティ
２ブロック目２プロパティ

３ブロック目１プロパティ
３ブロック目２プロパティ
`.trim().split(/\r\n|\n/)
        const actual = TxtyBlock.ranges(LINES)
        console.assert(Array.isArray(actual))
        console.assert(3 === actual.length)
        console.assert(actual[0].hasOwnProperty('begin'))
        console.assert(actual[0].hasOwnProperty('end'))
        console.assert(0 === actual[0].begin)
        console.assert(3 === actual[0].end)
        console.assert(3 === actual[1].begin)
        console.assert(5 === actual[1].end)
        console.assert(6 === actual[2].begin)
        console.assert(8 === actual[2].end)
        console.assert('１ブロック目１プロパティ' === LINES.slice(actual[0].begin, actual[0].end).filter(v => v)[0])
        console.assert('１ブロック目２プロパティ' === LINES.slice(actual[0].begin, actual[0].end).filter(v => v)[1])
        console.assert('２ブロック目１プロパティ' === LINES.slice(actual[1].begin, actual[1].end).filter(v => v)[0])
        console.assert('２ブロック目２プロパティ' === LINES.slice(actual[1].begin, actual[1].end).filter(v => v)[1])
        console.assert('３ブロック目１プロパティ' === LINES.slice(actual[2].begin, actual[2].end).filter(v => v)[0])
        console.assert('３ブロック目２プロパティ' === LINES.slice(actual[2].begin, actual[2].end).filter(v => v)[1])
    }
}
