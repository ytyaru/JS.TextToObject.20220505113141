class UnitTestError extends ExtensibleCustomError {}
class TestTxtyLine { // 単体テスト（一行テキスト解析）
    test() {
        this.#testBlankError()
        this.#testMinimum()
        this.#testMinimumOption1()
        this.#testOption1Tab()
        this.#testOption2Tab()
        this.#testOption3Tab()
        this.#testOption1Space2()
        this.#testOption2Space2()
        this.#testOption3Space2()
    }
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
}
