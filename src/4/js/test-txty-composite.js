class UnitTestError extends ExtensibleCustomError {}
class TestTxtyComposite { // 単体テスト（複合テキスト解析）
    test() {
        this.#testBlank()
        this.#test1Block()
        this.#test2Block()
        this.#test2Block2Property()
        this.#test2Block1Tree()
        this.#test1Tree1BlockIndentTab()
    }
    #testBlank() {
        const actual = Txty.composite('')
        console.assert(Array.isArray(actual))
        console.assert(0 === actual.length)
    }
    #testMinimum() {
        const expected = '必須値のみ'
        const actual = Txty.composite(expected)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(1 === actual.length)
        console.assert(Array.isArray(actual[0]))
        console.assert(1 === actual[0].length)
        console.assert(Array.isArray(actual[0][0]))
        console.assert(1 === actual[0][0].length)
        console.assert(actual[0][0][0].hasOwnProperty('name'))
        console.assert(actual[0][0][0].hasOwnProperty('options'))
        console.assert(expected === actual[0][0][0].name)
        console.assert(Array.isArray(actual[0][0][0].options))
        console.assert(0 === actual[0][0][0].options.length)
    }
    #test1Block() {
        const expected = `
必須値のみ
必須値    オプション値
`
        const actual = Txty.composite(expected)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(1 === actual.length)
        console.assert(Array.isArray(actual[0]))
        console.assert(1 === actual[0].length)
        console.assert(Array.isArray(actual[0][0]))
        console.assert(2 === actual[0][0].length)

        console.assert(actual[0][0][0].hasOwnProperty('name'))
        console.assert(actual[0][0][0].hasOwnProperty('options'))
        console.assert('必須値のみ' === actual[0][0][0].name)
        console.assert(Array.isArray(actual[0][0][0].options))
        console.assert(0 === actual[0][0][0].options.length)

        console.assert(actual[0][0][1].hasOwnProperty('name'))
        console.assert(actual[0][0][1].hasOwnProperty('options'))
        console.assert('必須値' === actual[0][0][1].name)
        console.assert(Array.isArray(actual[0][0][1].options))
        console.assert(1 === actual[0][0][1].options.length)
        console.assert('オプション値' === actual[0][0][1].options[0])
    }
    #test2Block() {
        const expected = `
1ブロック目

2ブロック目
`
        const actual = Txty.composite(expected)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(2 === actual.length)
        console.assert(Array.isArray(actual[0]))
        console.assert(Array.isArray(actual[1]))
        console.assert(1 === actual[0].length)

        console.assert(Array.isArray(actual[0][0]))
        console.assert(1 === actual[0][0].length)

        console.assert(actual[0][0][0].hasOwnProperty('name'))
        console.assert(actual[0][0][0].hasOwnProperty('options'))
        console.assert('1ブロック目' === actual[0][0][0].name)
        console.assert(Array.isArray(actual[0][0][0].options))
        console.assert(0 === actual[0][0][0].options.length)

        console.assert(Array.isArray(actual[1][0]))
        console.assert(1 === actual[1][0].length)

        console.assert(actual[1][0][0].hasOwnProperty('name'))
        console.assert(actual[1][0][0].hasOwnProperty('options'))
        console.assert('2ブロック目' === actual[1][0][0].name)
        console.assert(Array.isArray(actual[1][0][0].options))
        console.assert(0 === actual[1][0][0].options.length)
    }
    #test2Block2Property() {
        const expected = `
1ブロック目1プロパティ目
1ブロック目2プロパティ目

2ブロック目
`
        const actual = Txty.composite(expected)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(2 === actual.length)
        console.assert(Array.isArray(actual[0]))
        console.assert(Array.isArray(actual[1]))
        console.assert(1 === actual[0].length)

        console.assert(Array.isArray(actual[0][0]))
        console.assert(2 === actual[0][0].length)

        console.assert(actual[0][0][0].hasOwnProperty('name'))
        console.assert(actual[0][0][0].hasOwnProperty('options'))
        console.assert('1ブロック目1プロパティ目' === actual[0][0][0].name)
        console.assert(Array.isArray(actual[0][0][0].options))
        console.assert(0 === actual[0][0][0].options.length)

        console.assert(actual[0][0][1].hasOwnProperty('name'))
        console.assert(actual[0][0][1].hasOwnProperty('options'))
        console.assert('1ブロック目2プロパティ目' === actual[0][0][1].name)
        console.assert(Array.isArray(actual[0][0][1].options))
        console.assert(0 === actual[0][0][1].options.length)


        console.assert(Array.isArray(actual[1][0]))
        console.assert(1 === actual[1][0].length)

        console.assert(actual[1][0][0].hasOwnProperty('name'))
        console.assert(actual[1][0][0].hasOwnProperty('options'))
        console.assert('2ブロック目' === actual[1][0][0].name)
        console.assert(Array.isArray(actual[1][0][0].options))
        console.assert(0 === actual[1][0][0].options.length)
    }
    #test2Block1Tree() {
        const expected = `
1ブロック目1プロパティ目
1ブロック目2プロパティ目

2ブロック目1プロパティ目    オプション1
2ブロック目2プロパティ目

根
    節    オプション2    オプション3
        葉
`
        const actual = Txty.composite(expected)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(3 === actual.length)
        console.assert(Array.isArray(actual[0]))
        console.assert(Array.isArray(actual[1]))
        console.assert('object' === typeof actual[2])

        console.assert(1 === actual[0].length)
        console.assert(Array.isArray(actual[0][0]))
        console.assert(2 === actual[0][0].length)

        console.assert(actual[0][0][0].hasOwnProperty('name'))
        console.assert(actual[0][0][0].hasOwnProperty('options'))
        console.assert('1ブロック目1プロパティ目' === actual[0][0][0].name)
        console.assert(Array.isArray(actual[0][0][0].options))
        console.assert(0 === actual[0][0][0].options.length)

        console.assert(actual[0][0][1].hasOwnProperty('name'))
        console.assert(actual[0][0][1].hasOwnProperty('options'))
        console.assert('1ブロック目2プロパティ目' === actual[0][0][1].name)
        console.assert(Array.isArray(actual[0][0][1].options))
        console.assert(0 === actual[0][0][1].options.length)

        console.assert(1 === actual[1].length)
        console.assert(Array.isArray(actual[1][0]))
        console.assert(2 === actual[1][0].length)

        console.assert(actual[1][0][0].hasOwnProperty('name'))
        console.assert(actual[1][0][0].hasOwnProperty('options'))
        console.assert('2ブロック目1プロパティ目' === actual[1][0][0].name)
        console.assert(Array.isArray(actual[1][0][0].options))
        console.assert(1 === actual[1][0][0].options.length)
        console.assert('オプション1' === actual[1][0][0].options[0])

        console.assert(actual[1][0][1].hasOwnProperty('name'))
        console.assert(actual[1][0][1].hasOwnProperty('options'))
        console.assert('2ブロック目2プロパティ目' === actual[1][0][1].name)
        console.assert(Array.isArray(actual[1][0][1].options))
        console.assert(0 === actual[1][0][1].options.length)

        actual[2]
        console.assert('object' === typeof actual[2])
        console.assert(!actual[2].hasOwnProperty('name'))
        console.assert(actual[2].hasOwnProperty('nodes'))
        console.assert(actual[2].hasOwnProperty('maxDepth'))
        console.assert(actual[2].hasOwnProperty('indentText'))
        console.assert(Txty.Indent.Space4 === actual[2].indentText)
        console.assert(3 === actual[2].maxDepth)
        console.assert(1 === actual[2].nodes.length)

        console.assert(actual[2].nodes[0].hasOwnProperty('content'))
        console.assert(actual[2].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual[2].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual[2].nodes[0].content.hasOwnProperty('options'))
        console.assert('根' === actual[2].nodes[0].content.name)
        console.assert(Array.isArray(actual[2].nodes[0].content.options))
        console.assert(0 === actual[2].nodes[0].content.options.length)
        console.assert(Array.isArray(actual[2].nodes[0].nodes))
        console.assert(1 === actual[2].nodes[0].nodes.length)

        console.assert(actual[2].nodes[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual[2].nodes[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual[2].nodes[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual[2].nodes[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('節' === actual[2].nodes[0].nodes[0].content.name)
        console.assert(Array.isArray(actual[2].nodes[0].nodes[0].content.options))
        console.assert(2 === actual[2].nodes[0].nodes[0].content.options.length)
        console.assert('オプション2' === actual[2].nodes[0].nodes[0].content.options[0])
        console.assert('オプション3' === actual[2].nodes[0].nodes[0].content.options[1])

        console.assert(actual[2].nodes[0].nodes[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual[2].nodes[0].nodes[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual[2].nodes[0].nodes[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual[2].nodes[0].nodes[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('葉' === actual[2].nodes[0].nodes[0].nodes[0].content.name)
        console.assert(Array.isArray(actual[2].nodes[0].nodes[0].nodes[0].content.options))
        console.assert(0 === actual[2].nodes[0].nodes[0].nodes[0].content.options.length)
    }
    #test1Tree1BlockIndentTab() {
        const expected = `
根
	節	オプション1	オプション2
		葉

1ブロック目1プロパティ目	オプション3	オプション4
1ブロック目2プロパティ目
1ブロック目3プロパティ目
`
        const actual = Txty.composite(expected, Txty.Indent.Tab)
        console.log(actual)
        console.assert(Array.isArray(actual))
        console.assert(2 === actual.length)
        console.assert('object' === typeof actual[0])
        console.assert(Array.isArray(actual[1]))
        console.assert(1 === actual[1].length)
        console.assert(Array.isArray(actual[1][0]))
        console.assert(3 === actual[1][0].length)

        console.log(actual[0])
        console.assert(!actual[0].hasOwnProperty('name'))
        console.assert(actual[0].hasOwnProperty('nodes'))
        console.assert(actual[0].hasOwnProperty('maxDepth'))
        console.assert(actual[0].hasOwnProperty('indentText'))
        console.assert(Txty.Indent.Tab === actual[0].indentText)
        console.assert(3 === actual[0].maxDepth)
        console.assert(1 === actual[0].nodes.length)

        console.assert(actual[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('根' === actual[0].nodes[0].content.name)
        console.assert(Array.isArray(actual[0].nodes[0].content.options))
        console.assert(0 === actual[0].nodes[0].content.options.length)
        console.assert(Array.isArray(actual[0].nodes[0].nodes))
        console.assert(1 === actual[0].nodes[0].nodes.length)

        console.assert(actual[0].nodes[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual[0].nodes[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual[0].nodes[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual[0].nodes[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('節' === actual[0].nodes[0].nodes[0].content.name)
        console.assert(Array.isArray(actual[0].nodes[0].nodes[0].content.options))
        console.assert(2 === actual[0].nodes[0].nodes[0].content.options.length)
        console.assert('オプション1' === actual[0].nodes[0].nodes[0].content.options[0])
        console.assert('オプション2' === actual[0].nodes[0].nodes[0].content.options[1])

        console.assert(actual[0].nodes[0].nodes[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual[0].nodes[0].nodes[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual[0].nodes[0].nodes[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual[0].nodes[0].nodes[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('葉' === actual[0].nodes[0].nodes[0].nodes[0].content.name)
        console.assert(Array.isArray(actual[0].nodes[0].nodes[0].nodes[0].content.options))
        console.assert(0 === actual[0].nodes[0].nodes[0].nodes[0].content.options.length)


        console.log(actual[1][0][0])
        console.assert(actual[1][0][0].hasOwnProperty('name'))
        console.assert(actual[1][0][0].hasOwnProperty('options'))
        console.assert('1ブロック目1プロパティ目' === actual[1][0][0].name)
        console.assert(Array.isArray(actual[1][0][0].options))
        console.assert(2 === actual[1][0][0].options.length)
        console.assert('オプション3' === actual[1][0][0].options[0])
        console.assert('オプション4' === actual[1][0][0].options[1])

        console.assert(actual[1][0][1].hasOwnProperty('name'))
        console.assert(actual[1][0][1].hasOwnProperty('options'))
        console.assert('1ブロック目2プロパティ目' === actual[1][0][1].name)
        console.assert(Array.isArray(actual[1][0][1].options))
        console.assert(0 === actual[1][0][1].options.length)

        console.assert(actual[1][0][2].hasOwnProperty('name'))
        console.assert(actual[1][0][2].hasOwnProperty('options'))
        console.assert('1ブロック目3プロパティ目' === actual[1][0][2].name)
        console.assert(Array.isArray(actual[1][0][2].options))
        console.assert(0 === actual[1][0][2].options.length)
    }
}
