class UnitTestError extends ExtensibleCustomError {}
class TestTxtyLines { // 単体テスト（複数行テキスト解析）
    test() {
        this.#testBlank()
        this.#testEndBlank()
        this.#testBeginBlank()
        this.#testMinimum()
        this.#testMinimum2()
        this.#testMinimum3()
        this.#testTwo()

        this.#test1Block2Property()
        this.#test2Block1Property()
        this.#test2Block1PropertyOverBlank3()
        this.#test2Block1PropertyOverBlank4()
        this.#test2Block1PropertyOverBlank5()
        this.#test1Block1Property1Option()
        this.#test2Block1Property1Option()
        this.#test2Block2Property()
        this.#test3Block2Property()
        this.#test3Block2PropertyOptions()
    }
    #testBlank() {
        const txt = ``
        const actual = Txty.lines(txt)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(1 === actual.length)
        console.assert(Array.isArray(actual[0]))
        console.assert(0 === actual[0].length)
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
    #testEndBlank() {
        const name = '１ブロック目'
        const txt = `${name}\n\n`
        const actual = Txty.lines(txt)
        console.log(actual)
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
    #testBeginBlank() {
        const name = '１ブロック目'
        const txt = `\n\n${name}`
        const actual = Txty.lines(txt)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(1 === actual.length)
        console.assert(Array.isArray(actual[0]))
        console.assert(1 === actual[0].length)
        console.assert(actual[0][0].hasOwnProperty('name'))
        console.assert(actual[0][0].hasOwnProperty('options'))
        console.assert(name === actual[0][0].name)
        console.assert(Array.isArray(actual[0][0].options))
        console.assert(0 === actual[0][0].options.length)
        console.log(actual)
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
    #test1Block2Property() {
        const txt = `１ブロック目の１行目\n１ブロック目の２行目`
        const actual = Txty.lines(txt)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(1 === actual.length)
        console.assert(Array.isArray(actual[0]))
        console.assert(2 === actual[0].length)

        console.assert(actual[0][0].hasOwnProperty('name'))
        console.assert(actual[0][0].hasOwnProperty('options'))
        console.assert('１ブロック目の１行目' === actual[0][0].name)
        console.assert(Array.isArray(actual[0][0].options))
        console.assert(0 === actual[0][0].options.length)

        console.assert(actual[0][1].hasOwnProperty('name'))
        console.assert(actual[0][1].hasOwnProperty('options'))
        console.assert('１ブロック目の２行目' === actual[0][1].name)
        console.assert(Array.isArray(actual[0][1].options))
        console.assert(0 === actual[0][1].options.length)
    }
    #test2Block1Property() {
        const txt = `１ブロック目\n\n２ブロック目`
        const actual = Txty.lines(txt)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(2 === actual.length)

        console.assert(Array.isArray(actual[0]))
        console.assert(1 === actual[0].length)
        console.assert(actual[0][0].hasOwnProperty('name'))
        console.assert(actual[0][0].hasOwnProperty('options'))
        console.assert('１ブロック目' === actual[0][0].name)
        console.assert(Array.isArray(actual[0][0].options))
        console.assert(0 === actual[0][0].options.length)

        console.assert(Array.isArray(actual[1]))
        console.assert(1 === actual[1].length)
        console.assert(actual[1][0].hasOwnProperty('name'))
        console.assert(actual[1][0].hasOwnProperty('options'))
        console.assert('２ブロック目' === actual[1][0].name)
        console.assert(Array.isArray(actual[1][0].options))
        console.assert(0 === actual[1][0].options.length)
    }
    #test2Block1PropertyOverBlank3() {
        const txt = `１ブロック目\n\n\n２ブロック目`
        const actual = Txty.lines(txt)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(2 === actual.length)

        console.assert(Array.isArray(actual[0]))
        console.assert(1 === actual[0].length)
        console.assert(actual[0][0].hasOwnProperty('name'))
        console.assert(actual[0][0].hasOwnProperty('options'))
        console.assert('１ブロック目' === actual[0][0].name)
        console.assert(Array.isArray(actual[0][0].options))
        console.assert(0 === actual[0][0].options.length)

        console.assert(Array.isArray(actual[1]))
        console.assert(1 === actual[1].length)
        console.assert(actual[1][0].hasOwnProperty('name'))
        console.assert(actual[1][0].hasOwnProperty('options'))
        console.assert('２ブロック目' === actual[1][0].name)
        console.assert(Array.isArray(actual[1][0].options))
        console.assert(0 === actual[1][0].options.length)
    }
    #test2Block1PropertyOverBlank4() {
        const txt = `１ブロック目\n\n\n\n２ブロック目`
        const actual = Txty.lines(txt)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(2 === actual.length)

        console.assert(Array.isArray(actual[0]))
        console.assert(1 === actual[0].length)
        console.assert(actual[0][0].hasOwnProperty('name'))
        console.assert(actual[0][0].hasOwnProperty('options'))
        console.assert('１ブロック目' === actual[0][0].name)
        console.assert(Array.isArray(actual[0][0].options))
        console.assert(0 === actual[0][0].options.length)

        console.assert(Array.isArray(actual[1]))
        console.assert(1 === actual[1].length)
        console.assert(actual[1][0].hasOwnProperty('name'))
        console.assert(actual[1][0].hasOwnProperty('options'))
        console.assert('２ブロック目' === actual[1][0].name)
        console.assert(Array.isArray(actual[1][0].options))
        console.assert(0 === actual[1][0].options.length)
    }
    #test2Block1PropertyOverBlank5() {
        const txt = `１ブロック目\n\n\n\n\n２ブロック目`
        const actual = Txty.lines(txt)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(2 === actual.length)

        console.assert(Array.isArray(actual[0]))
        console.assert(1 === actual[0].length)
        console.assert(actual[0][0].hasOwnProperty('name'))
        console.assert(actual[0][0].hasOwnProperty('options'))
        console.assert('１ブロック目' === actual[0][0].name)
        console.assert(Array.isArray(actual[0][0].options))
        console.assert(0 === actual[0][0].options.length)

        console.assert(Array.isArray(actual[1]))
        console.assert(1 === actual[1].length)
        console.assert(actual[1][0].hasOwnProperty('name'))
        console.assert(actual[1][0].hasOwnProperty('options'))
        console.assert('２ブロック目' === actual[1][0].name)
        console.assert(Array.isArray(actual[1][0].options))
        console.assert(0 === actual[1][0].options.length)
    }
    #test1Block1Property1Option() {
        const txt = `１ブロック目    １ブロック目のオプション１`
        const actual = Txty.lines(txt)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(1 === actual.length)

        console.assert(Array.isArray(actual[0]))
        console.assert(1 === actual[0].length)
        console.assert(actual[0][0].hasOwnProperty('name'))
        console.assert(actual[0][0].hasOwnProperty('options'))
        console.assert('１ブロック目' === actual[0][0].name)
        console.assert(Array.isArray(actual[0][0].options))
        console.assert(1 === actual[0][0].options.length)
        console.assert('１ブロック目のオプション１' === actual[0][0].options[0])
    }
    #test2Block1Property1Option() {
        const txt = `１ブロック目    １ブロック目のオプション１\n\n２ブロック目    ２ブロック目のオプション１`
        const actual = Txty.lines(txt)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(2 === actual.length)

        console.assert(Array.isArray(actual[0]))
        console.assert(1 === actual[0].length)
        console.assert(actual[0][0].hasOwnProperty('name'))
        console.assert(actual[0][0].hasOwnProperty('options'))
        console.assert('１ブロック目' === actual[0][0].name)
        console.assert(Array.isArray(actual[0][0].options))
        console.assert(1 === actual[0][0].options.length)
        console.assert('１ブロック目のオプション１' === actual[0][0].options[0])

        console.assert(Array.isArray(actual[1]))
        console.assert(1 === actual[1].length)
        console.assert(actual[1][0].hasOwnProperty('name'))
        console.assert(actual[1][0].hasOwnProperty('options'))
        console.assert('２ブロック目' === actual[1][0].name)
        console.assert(Array.isArray(actual[1][0].options))
        console.assert(1 === actual[1][0].options.length)
        console.assert('２ブロック目のオプション１' === actual[1][0].options[0])
    }
    #test2Block2Property() {
        const txt = `１ブロック目１プロパティ\n１ブロック目２プロパティ\n\n２ブロック目１プロパティ\n２ブロック目２プロパティ`.trim()
        const actual = Txty.lines(txt)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(2 === actual.length)

        console.assert(Array.isArray(actual[0]))
        console.assert(2 === actual[0].length)

        console.assert(actual[0][0].hasOwnProperty('name'))
        console.assert(actual[0][0].hasOwnProperty('options'))
        console.assert('１ブロック目１プロパティ' === actual[0][0].name)
        console.assert(Array.isArray(actual[0][0].options))
        console.assert(0 === actual[0][0].options.length)

        console.assert(actual[0][1].hasOwnProperty('name'))
        console.assert(actual[0][1].hasOwnProperty('options'))
        console.assert('１ブロック目２プロパティ' === actual[0][1].name)
        console.assert(Array.isArray(actual[0][1].options))
        console.assert(0 === actual[0][1].options.length)

        console.assert(Array.isArray(actual[1]))
        console.assert(2 === actual[1].length)

        console.assert(actual[1][0].hasOwnProperty('name'))
        console.assert(actual[1][0].hasOwnProperty('options'))
        console.assert('２ブロック目１プロパティ' === actual[1][0].name)
        console.assert(Array.isArray(actual[1][0].options))
        console.assert(0 === actual[1][0].options.length)

        console.assert(actual[1][1].hasOwnProperty('name'))
        console.assert(actual[1][1].hasOwnProperty('options'))
        console.assert('２ブロック目２プロパティ' === actual[1][1].name)
        console.assert(Array.isArray(actual[1][1].options))
        console.assert(0 === actual[1][1].options.length)
    }
    #test3Block2Property() {
        const txt = `
１ブロック目１プロパティ
１ブロック目２プロパティ

２ブロック目１プロパティ
２ブロック目２プロパティ

３ブロック目１プロパティ
３ブロック目２プロパティ`
        const actual = Txty.lines(txt)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(3 === actual.length)

        console.assert(Array.isArray(actual[0]))
        console.assert(2 === actual[0].length)

        console.assert(actual[0][0].hasOwnProperty('name'))
        console.assert(actual[0][0].hasOwnProperty('options'))
        console.assert('１ブロック目１プロパティ' === actual[0][0].name)
        console.assert(Array.isArray(actual[0][0].options))
        console.assert(0 === actual[0][0].options.length)

        console.assert(actual[0][1].hasOwnProperty('name'))
        console.assert(actual[0][1].hasOwnProperty('options'))
        console.assert('１ブロック目２プロパティ' === actual[0][1].name)
        console.assert(Array.isArray(actual[0][1].options))
        console.assert(0 === actual[0][1].options.length)

        console.assert(Array.isArray(actual[1]))
        console.assert(2 === actual[1].length)

        console.assert(actual[1][0].hasOwnProperty('name'))
        console.assert(actual[1][0].hasOwnProperty('options'))
        console.assert('２ブロック目１プロパティ' === actual[1][0].name)
        console.assert(Array.isArray(actual[1][0].options))
        console.assert(0 === actual[1][0].options.length)

        console.assert(actual[1][1].hasOwnProperty('name'))
        console.assert(actual[1][1].hasOwnProperty('options'))
        console.assert('２ブロック目２プロパティ' === actual[1][1].name)
        console.assert(Array.isArray(actual[1][1].options))
        console.assert(0 === actual[1][1].options.length)

        console.assert(Array.isArray(actual[2]))
        console.assert(2 === actual[2].length)

        console.assert(actual[2][0].hasOwnProperty('name'))
        console.assert(actual[2][0].hasOwnProperty('options'))
        console.assert('３ブロック目１プロパティ' === actual[2][0].name)
        console.assert(Array.isArray(actual[2][0].options))
        console.assert(0 === actual[2][0].options.length)

        console.assert(actual[2][1].hasOwnProperty('name'))
        console.assert(actual[2][1].hasOwnProperty('options'))
        console.assert('３ブロック目２プロパティ' === actual[2][1].name)
        console.assert(Array.isArray(actual[2][1].options))
        console.assert(0 === actual[2][1].options.length)
    }

    #test3Block2PropertyOptions() {
        const txt = `
    

１ブロック目１プロパティ
１ブロック目２プロパティ    オプション121

２ブロック目１プロパティ    オプション211    オプション212
２ブロック目２プロパティ



３ブロック目１プロパティ
３ブロック目２プロパティ


    
`
        const actual = Txty.lines(txt)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(3 === actual.length)

        console.assert(Array.isArray(actual[0]))
        console.assert(2 === actual[0].length)

        console.assert(actual[0][0].hasOwnProperty('name'))
        console.assert(actual[0][0].hasOwnProperty('options'))
        console.assert('１ブロック目１プロパティ' === actual[0][0].name)
        console.assert(Array.isArray(actual[0][0].options))
        console.assert(0 === actual[0][0].options.length)

        console.assert(actual[0][1].hasOwnProperty('name'))
        console.assert(actual[0][1].hasOwnProperty('options'))
        console.assert('１ブロック目２プロパティ' === actual[0][1].name)
        console.assert(Array.isArray(actual[0][1].options))
        console.assert(1 === actual[0][1].options.length)
        console.assert('オプション121' === actual[0][1].options[0])

        console.assert(Array.isArray(actual[1]))
        console.assert(2 === actual[1].length)

        console.assert(actual[1][0].hasOwnProperty('name'))
        console.assert(actual[1][0].hasOwnProperty('options'))
        console.assert('２ブロック目１プロパティ' === actual[1][0].name)
        console.assert(Array.isArray(actual[1][0].options))
        console.assert(2 === actual[1][0].options.length)
        console.assert('オプション211' === actual[1][0].options[0])
        console.assert('オプション212' === actual[1][0].options[1])

        console.assert(actual[1][1].hasOwnProperty('name'))
        console.assert(actual[1][1].hasOwnProperty('options'))
        console.assert('２ブロック目２プロパティ' === actual[1][1].name)
        console.assert(Array.isArray(actual[1][1].options))
        console.assert(0 === actual[1][1].options.length)

        console.assert(Array.isArray(actual[2]))
        console.assert(2 === actual[2].length)

        console.assert(actual[2][0].hasOwnProperty('name'))
        console.assert(actual[2][0].hasOwnProperty('options'))
        console.assert('３ブロック目１プロパティ' === actual[2][0].name)
        console.assert(Array.isArray(actual[2][0].options))
        console.assert(0 === actual[2][0].options.length)

        console.assert(actual[2][1].hasOwnProperty('name'))
        console.assert(actual[2][1].hasOwnProperty('options'))
        console.assert('３ブロック目２プロパティ' === actual[2][1].name)
        console.assert(Array.isArray(actual[2][1].options))
        console.assert(0 === actual[2][1].options.length)
    }
}
