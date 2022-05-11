class UnitTestError extends ExtensibleCustomError {}
class TestTxtyStore { // 単体テスト（複数行テキスト解析）
    test() {
        this.#testBlank()
        this.#testMiddleBlank()
        this.#testEndBlank()
        this.#testBeginBlank()
        this.#testMinimum()
        this.#testMinimum2()
        this.#testMinimum3()
        this.#test1Block2Property()
        this.#test1Block1Property1Option()
    }
    #testBlank() {
        try { Txty.store(''); }
        catch (e) {
            if (!(e instanceof TxtyStoreError)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== `引数linesは空白文字以外が1字以上ある文字列の要素が1つ以上必要です。`) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testMiddleBlank() {
        try { Txty.store('一件目\n\n二件目'); }
        catch (e) {
            if (!(e instanceof TxtyStoreError)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== `途中に空行を含めることはできません。`) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testMinimum() {
        const name = '一件のみ'
        const actual = Txty.store(`${name}`)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(1 === actual.length)
        console.assert(actual[0].hasOwnProperty('name'))
        console.assert(actual[0].hasOwnProperty('options'))
        console.assert(name === actual[0].name)
        console.assert(Array.isArray(actual[0].options))
        console.assert(0 === actual[0].options.length)
    }
    #testEndBlank() {
        const name = '１ブロック目'
        const txt = `${name}\n\n`
        const actual = Txty.store(txt)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(1 === actual.length)
        console.assert(actual[0].hasOwnProperty('name'))
        console.assert(actual[0].hasOwnProperty('options'))
        console.assert(name === actual[0].name)
        console.assert(Array.isArray(actual[0].options))
        console.assert(0 === actual[0].options.length)
    }
    #testBeginBlank() {
        const name = '１ブロック目'
        const txt = `\n\n${name}`
        const actual = Txty.store(txt)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(1 === actual.length)
        console.assert(actual[0].hasOwnProperty('name'))
        console.assert(actual[0].hasOwnProperty('options'))
        console.assert(name === actual[0].name)
        console.assert(Array.isArray(actual[0].options))
        console.assert(0 === actual[0].options.length)
        console.log(actual)
    }

    #testMinimum2() {
        const actual = Txty.store('一件目\n二件目')
        console.assert(Array.isArray(actual))
        console.assert(2 === actual.length)
        console.assert(actual[0].hasOwnProperty('name'))
        console.assert(actual[0].hasOwnProperty('options'))
        console.assert('一件目' === actual[0].name)
        console.assert(Array.isArray(actual[0].options))
        console.assert(0 === actual[0].options.length)
        console.assert(actual[1].hasOwnProperty('name'))
        console.assert(actual[1].hasOwnProperty('options'))
        console.assert('二件目' === actual[1].name)
        console.assert(Array.isArray(actual[1].options))
        console.assert(0 === actual[1].options.length)
    }
    #testMinimum3() {
        const actual = Txty.store('一件目\n二件目\n三件目')
        console.assert(Array.isArray(actual))
        console.assert(3 === actual.length)
        console.assert(actual[0].hasOwnProperty('name'))
        console.assert(actual[0].hasOwnProperty('options'))
        console.assert('一件目' === actual[0].name)
        console.assert(Array.isArray(actual[0].options))
        console.assert(0 === actual[0].options.length)
        console.assert(actual[1].hasOwnProperty('name'))
        console.assert(actual[1].hasOwnProperty('options'))
        console.assert('二件目' === actual[1].name)
        console.assert(Array.isArray(actual[1].options))
        console.assert(0 === actual[1].options.length)
        console.assert(actual[2].hasOwnProperty('name'))
        console.assert(actual[2].hasOwnProperty('options'))
        console.assert('三件目' === actual[2].name)
        console.assert(Array.isArray(actual[2].options))
        console.assert(0 === actual[2].options.length)
    }
    #test1Block2Property() {
        const txt = `１ブロック目の１行目\n１ブロック目の２行目`
        const actual = Txty.store(txt)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(2 === actual.length)

        console.assert(actual[0].hasOwnProperty('name'))
        console.assert(actual[0].hasOwnProperty('options'))
        console.assert('１ブロック目の１行目' === actual[0].name)
        console.assert(Array.isArray(actual[0].options))
        console.assert(0 === actual[0].options.length)

        console.assert(actual[1].hasOwnProperty('name'))
        console.assert(actual[1].hasOwnProperty('options'))
        console.assert('１ブロック目の２行目' === actual[1].name)
        console.assert(Array.isArray(actual[1].options))
        console.assert(0 === actual[1].options.length)
    }
    #test1Block1Property1Option() {
        const txt = `１ブロック目    １ブロック目のオプション１`
        const actual = Txty.store(txt)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(1 === actual.length)

        console.assert(actual[0].hasOwnProperty('name'))
        console.assert(actual[0].hasOwnProperty('options'))
        console.assert('１ブロック目' === actual[0].name)
        console.assert(Array.isArray(actual[0].options))
        console.assert(1 === actual[0].options.length)
        console.assert('１ブロック目のオプション１' === actual[0].options[0])
    }
}
