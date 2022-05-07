class UnitTestError extends ExtensibleCustomError {}
class TestTxtyLines { // 単体テスト（一行テキスト解析）
    test() {
        this.#testTxtBlockRanges()
        this.#testMinimum()
        this.#testMinimum2()
        this.#testMinimum3()
        this.#testTwo()
        /*
        this.#testBlankError()
        this.#testMinimum()
        this.#testMinimumOption1()
        this.#testOption1Tab()
        this.#testOption2Tab()
        this.#testOption3Tab()
        this.#testOption1Space2()
        this.#testOption2Space2()
        this.#testOption3Space2()
        */
    }
    #testTxtBlockRanges() {
        const LINES = `１ブロック目\n\n２ブロック目`.split(/\r\n|\n/)
        const actual = Txty.TxtBlockRanges(LINES)
        console.log(actual)
        console.log(LINES.slice(actual[0].begin, actual[0].end))
        console.log(LINES.slice(actual[1].begin, actual[1].end))
        console.log(LINES.slice(actual[0].begin, actual[0].end).filter(v => v))
        console.log(LINES.slice(actual[1].begin, actual[1].end).filter(v => v))
        console.assert(Array.isArray(actual))
        console.assert(2 === actual.length)
        console.assert(actual[0].hasOwnProperty('begin'))
        console.assert(actual[0].hasOwnProperty('end'))
        console.assert(0 === actual[0].begin)
        console.assert(1 === actual[0].end)
        console.assert(3 === actual[1].begin)
        console.assert(4 === actual[1].end)
    }
    #testMinimum() {
        const name = '一件のみ'
        const actual = Txty.lines(`${name}`)
        console.assert(Array.isArray(actual))
        console.assert(1 === actual.length)
        console.assert(Array.isArray(actual[0]))
        console.assert(1 === actual[0].length)
        console.assert(actual[0][0].hasOwnProperty('name'))
        console.assert(actual[0][0].hasOwnProperty('options'))
        console.assert(name === actual[0][0].name)
        console.assert(Array.isArray(actual[0][0].options))
        console.assert(0 === actual[0][0].options.length)
    }
    #testMinimum2() {
        const actual = Txty.lines('一件目\n二件目')
        console.assert(Array.isArray(actual))
        console.assert(1 === actual.length)
        console.assert(Array.isArray(actual[0]))
        console.assert(2 === actual[0].length)
        console.assert(actual[0][0].hasOwnProperty('name'))
        console.assert(actual[0][0].hasOwnProperty('options'))
        console.assert('一件目' === actual[0][0].name)
        console.assert(Array.isArray(actual[0][0].options))
        console.assert(0 === actual[0][0].options.length)
        console.assert(actual[0][1].hasOwnProperty('name'))
        console.assert(actual[0][1].hasOwnProperty('options'))
        console.assert('二件目' === actual[0][1].name)
        console.assert(Array.isArray(actual[0][1].options))
        console.assert(0 === actual[0][1].options.length)
    }
    #testMinimum3() {
        const actual = Txty.lines('一件目\n二件目\n三件目')
        console.assert(Array.isArray(actual))
        console.assert(1 === actual.length)
        console.assert(Array.isArray(actual[0]))
        console.assert(3 === actual[0].length)
        console.assert(actual[0][0].hasOwnProperty('name'))
        console.assert(actual[0][0].hasOwnProperty('options'))
        console.assert('一件目' === actual[0][0].name)
        console.assert(Array.isArray(actual[0][0].options))
        console.assert(0 === actual[0][0].options.length)
        console.assert(actual[0][1].hasOwnProperty('name'))
        console.assert(actual[0][1].hasOwnProperty('options'))
        console.assert('二件目' === actual[0][1].name)
        console.assert(Array.isArray(actual[0][1].options))
        console.assert(0 === actual[0][1].options.length)
        console.assert(actual[0][2].hasOwnProperty('name'))
        console.assert(actual[0][2].hasOwnProperty('options'))
        console.assert('三件目' === actual[0][2].name)
        console.assert(Array.isArray(actual[0][2].options))
        console.assert(0 === actual[0][2].options.length)
    }
    #testTwo() {
        const name = '一要素目\n\n二要素目'
        const actual = Txty.lines(`${name}`)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(2 === actual.length)

        console.assert(Array.isArray(actual[0]))
        console.assert(1 === actual[0].length)
        console.assert(actual[0][0].hasOwnProperty('name'))
        console.assert(actual[0][0].hasOwnProperty('options'))
        console.assert('一要素目' === actual[0][0].name)
        console.assert(Array.isArray(actual[0][0].options))
        console.assert(0 === actual[0][0].options.length)

        console.assert(Array.isArray(actual[1]))
        console.assert(1 === actual[1].length)
        console.assert(actual[1][0].hasOwnProperty('name'))
        console.assert(actual[1][0].hasOwnProperty('options'))
        console.assert('二要素目' === actual[1][0].name)
        console.assert(Array.isArray(actual[1][0].options))
        console.assert(0 === actual[1][0].options.length)
    }
    /*
    #testBlankError() {
        try { Txty.line(''); }
        catch (e) {
            if (!(e instanceof TxtyLineError)) { throw new UnitTestError(`例外の型が期待値と違います。`);  }
            if (e.message !== `引数lineには空白文字以外の字がひとつ以上必要です。`) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testMinimum() {
        const expected = '必須値のみ'
        const actual = Txty.line(expected)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('options'))
        console.assert(expected === actual.name)
        console.assert(Array.isArray(actual.options))
        console.assert(0 === actual.options.length)
    }
    #testMinimumOption1() {
        const name = '必須値'
        const indent = '    '
        const option = 'オプション値'
        const txt = `${name}${indent}${option}`
        const actual = Txty.line(txt)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('options'))
        console.assert(name === actual.name)
        console.assert(Array.isArray(actual.options))
        console.assert(1 === actual.options.length)
        console.assert(option === actual.options[0])
    }
    #testOption1Tab() {
        const name = '必須値'
        const indent = '\t'
        const option = 'オプション値'
        const txt = `${name}${indent}${option}`
        const actual = Txty.line(txt, indent)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('options'))
        console.assert(name === actual.name)
        console.assert(Array.isArray(actual.options))
        console.assert(1 === actual.options.length)
        console.assert(option === actual.options[0])
    }
    #testOption2Tab() {
        const name = '必須値'
        const indent = '\t'
        const options = ['オプション値1', 'オプション値2']
        const txt = `${name}${indent}${options[0]}${indent}${options[1]}`
        const actual = Txty.line(txt, indent)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('options'))
        console.assert(name === actual.name)
        console.assert(Array.isArray(actual.options))
        console.assert(2 === actual.options.length)
        console.assert(options[0] === actual.options[0])
        console.assert(options[1] === actual.options[1])
    }
    #testOption3Tab() {
        const name = '必須値'
        const indent = '\t'
        const options = ['オプション値1', 'オプション値2', 'オプション値3']
        const txt = `${name}${indent}${options[0]}${indent}${options[1]}${indent}${options[2]}`
        const actual = Txty.line(txt, indent)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('options'))
        console.assert(name === actual.name)
        console.assert(Array.isArray(actual.options))
        console.assert(3 === actual.options.length)
        console.assert(options[0] === actual.options[0])
        console.assert(options[1] === actual.options[1])
        console.assert(options[2] === actual.options[2])
    }
    #testOption1Space2() {
        const name = '必須値'
        const indent = ' '.repeat(2)
        const option = 'オプション値'
        const txt = `${name}${indent}${option}`
        const actual = Txty.line(txt, indent)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('options'))
        console.assert(name === actual.name)
        console.assert(Array.isArray(actual.options))
        console.assert(1 === actual.options.length)
        console.assert(option === actual.options[0])
    }
    #testOption2Space2() {
        const name = '必須値'
        const indent = ' '.repeat(2)
        const options = ['オプション値1', 'オプション値2']
        const txt = `${name}${indent}${options[0]}${indent}${options[1]}`
        const actual = Txty.line(txt, indent)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('options'))
        console.assert(name === actual.name)
        console.assert(Array.isArray(actual.options))
        console.assert(2 === actual.options.length)
        console.assert(options[0] === actual.options[0])
        console.assert(options[1] === actual.options[1])
    }
    #testOption3Space2() {
        const name = '必須値'
        const indent = ' '.repeat(2)
        const options = ['オプション値1', 'オプション値2', 'オプション値3']
        const txt = `${name}${indent}${options[0]}${indent}${options[1]}${indent}${options[2]}`
        const actual = Txty.line(txt, indent)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('options'))
        console.assert(name === actual.name)
        console.assert(Array.isArray(actual.options))
        console.assert(3 === actual.options.length)
        console.assert(options[0] === actual.options[0])
        console.assert(options[1] === actual.options[1])
        console.assert(options[2] === actual.options[2])
    }
    #testOption1Space4() {
        const name = '必須値'
        const indent = ' '.repeat(4)
        const option = 'オプション値'
        const txt = `${name}${indent}${option}`
        const actual = Txty.line(txt, indent)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('options'))
        console.assert(name === actual.name)
        console.assert(Array.isArray(actual.options))
        console.assert(1 === actual.options.length)
        console.assert(option === actual.options[0])
    }
    #testOption2Space4() {
        const name = '必須値'
        const indent = ' '.repeat(4)
        const options = ['オプション値1', 'オプション値2']
        const txt = `${name}${indent}${options[0]}${indent}${options[1]}`
        const actual = Txty.line(txt, indent)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('options'))
        console.assert(name === actual.name)
        console.assert(Array.isArray(actual.options))
        console.assert(2 === actual.options.length)
        console.assert(options[0] === actual.options[0])
        console.assert(options[1] === actual.options[1])
    }
    #testOption3Space4() {
        const name = '必須値'
        const indent = ' '.repeat(4)
        const options = ['オプション値1', 'オプション値2', 'オプション値3']
        const txt = `${name}${indent}${options[0]}${indent}${options[1]}${indent}${options[2]}`
        const actual = Txty.line(txt, indent)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('options'))
        console.assert(name === actual.name)
        console.assert(Array.isArray(actual.options))
        console.assert(3 === actual.options.length)
        console.assert(options[0] === actual.options[0])
        console.assert(options[1] === actual.options[1])
        console.assert(options[2] === actual.options[2])
    }
    */
}
