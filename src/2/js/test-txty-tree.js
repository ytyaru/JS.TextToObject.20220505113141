class UnitTestError extends ExtensibleCustomError {}
class TestTxtyTree { // 単体テスト（木構造テキスト解析）
    test() {
        this.#testBlank()
        this.#testMinimum()
        this.#testEndBlank()
        this.#testBeginBlank()

        this.#testBeginIndent()
        this.#testTop2()
        this.#testTop3()
        this.#testChild()
        this.#testChild2()
        this.#testGrandChild()
        this.#testGrandChild2()

        this.#testDepthDiff1_1_2()
        this.#testDepthDiff1_2_1()
        this.#testDepthDiff1_1_3()
        this.#testDepthDiff1_3_1()

        this.#testMiddleBlankError()

        this.#testSameDepth2_3()
        this.#testComplex1()
    }
    #testBlank() {
        const txt = ``
        const actual = Txty.tree(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('nodes'))
        console.assert(actual.hasOwnProperty('maxDepth'))
    }
    #testMinimum() {
        const name = '一件のみ'
        const actual = Txty.tree(`${name}`)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('nodes'))
        console.assert(actual.hasOwnProperty('maxDepth'))
        console.assert(actual.hasOwnProperty('indentText'))
        console.assert(Txty.Indent.Space4 === actual.indentText)
        console.assert(1 === actual.maxDepth)
        console.assert(1 === actual.nodes.length)

        console.assert(actual.nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].content.hasOwnProperty('options'))
        console.assert(name === actual.nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].content.options))
        console.assert(0 === actual.nodes[0].content.options.length)
    }
    #testEndBlank() {
        const name = '１ブロック目'
        const txt = `${name}\n\n`
        const actual = Txty.tree(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('nodes'))
        console.assert(actual.hasOwnProperty('maxDepth'))
        console.assert(actual.hasOwnProperty('indentText'))
        console.assert(Txty.Indent.Space4 === actual.indentText)
        console.assert(1 === actual.maxDepth)
        console.assert(1 === actual.nodes.length)

        console.assert(actual.nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].content.hasOwnProperty('options'))
        console.assert(name === actual.nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].content.options))
        console.assert(0 === actual.nodes[0].content.options.length)
    }
    #testBeginBlank() {
        const name = '１ブロック目'
        const txt = `\n\n${name}`
        const actual = Txty.tree(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('nodes'))
        console.assert(actual.hasOwnProperty('maxDepth'))
        console.assert(actual.hasOwnProperty('indentText'))
        console.assert(Txty.Indent.Space4 === actual.indentText)
        console.assert(1 === actual.maxDepth)
        console.assert(1 === actual.nodes.length)

        console.assert(actual.nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].content.hasOwnProperty('options'))
        console.assert(name === actual.nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].content.options))
        console.assert(0 === actual.nodes[0].content.options.length)
    }
    #testBeginIndent() {
        const name = '最初にインデントがあっても無視される'
        const actual = Txty.tree(`${Txty.Indent.Space4}${name}`)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('nodes'))
        console.assert(actual.hasOwnProperty('maxDepth'))
        console.assert(actual.hasOwnProperty('indentText'))
        console.assert(Txty.Indent.Space4 === actual.indentText)
        console.assert(1 === actual.maxDepth)
        console.assert(1 === actual.nodes.length)

        console.assert(actual.nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].content.hasOwnProperty('options'))
        console.assert(name === actual.nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].content.options))
        console.assert(0 === actual.nodes[0].content.options.length)
    }
    #testTop2() {
        const actual = Txty.tree('一件目\n二件目')
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('nodes'))
        console.assert(actual.hasOwnProperty('maxDepth'))
        console.assert(actual.hasOwnProperty('indentText'))
        console.assert(Txty.Indent.Space4 === actual.indentText)
        console.assert(1 === actual.maxDepth)
        console.assert(2 === actual.nodes.length)

        console.assert(actual.nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].content.hasOwnProperty('options'))
        console.assert('一件目' === actual.nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].content.options))
        console.assert(0 === actual.nodes[0].content.options.length)

        console.assert(actual.nodes[1].hasOwnProperty('content'))
        console.assert(actual.nodes[1].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].content.hasOwnProperty('options'))
        console.assert('二件目' === actual.nodes[1].content.name)
        console.assert(Array.isArray(actual.nodes[1].content.options))
        console.assert(0 === actual.nodes[1].content.options.length)
    }
    #testTop3() {
        const actual = Txty.tree('一件目\n二件目\n三件目')
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('nodes'))
        console.assert(actual.hasOwnProperty('maxDepth'))
        console.assert(actual.hasOwnProperty('indentText'))
        console.assert(Txty.Indent.Space4 === actual.indentText)
        console.assert(1 === actual.maxDepth)
        console.assert(3 === actual.nodes.length)

        console.assert(actual.nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].content.hasOwnProperty('options'))
        console.assert('一件目' === actual.nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].content.options))
        console.assert(0 === actual.nodes[0].content.options.length)

        console.assert(actual.nodes[1].hasOwnProperty('content'))
        console.assert(actual.nodes[1].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].content.hasOwnProperty('options'))
        console.assert('二件目' === actual.nodes[1].content.name)
        console.assert(Array.isArray(actual.nodes[1].content.options))
        console.assert(0 === actual.nodes[1].content.options.length)

        console.assert(actual.nodes[2].hasOwnProperty('content'))
        console.assert(actual.nodes[2].hasOwnProperty('nodes'))
        console.assert(actual.nodes[2].content.hasOwnProperty('name'))
        console.assert(actual.nodes[2].content.hasOwnProperty('options'))
        console.assert('三件目' === actual.nodes[2].content.name)
        console.assert(Array.isArray(actual.nodes[2].content.options))
        console.assert(0 === actual.nodes[2].content.options.length)
    }

    #testChild2() {
        const txt = `
親1
    子1
親2
    子2
`
        const actual = Txty.tree(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('nodes'))
        console.assert(actual.hasOwnProperty('maxDepth'))
        console.assert(actual.hasOwnProperty('indentText'))
        console.assert(Txty.Indent.Space4 === actual.indentText)
        console.assert(2 === actual.maxDepth)
        console.assert(2 === actual.nodes.length)

        console.assert(actual.nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].content.hasOwnProperty('options'))
        console.assert('親1' === actual.nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].content.options))
        console.assert(0 === actual.nodes[0].content.options.length)
        console.assert(Array.isArray(actual.nodes[0].nodes))
        console.assert(1 === actual.nodes[0].nodes.length)

        console.assert(actual.nodes[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('子1' === actual.nodes[0].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].nodes[0].content.options))
        console.assert(0 === actual.nodes[0].nodes[0].content.options.length)

        console.assert(actual.nodes[1].hasOwnProperty('content'))
        console.assert(actual.nodes[1].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].content.hasOwnProperty('options'))
        console.assert('親2' === actual.nodes[1].content.name)
        console.assert(Array.isArray(actual.nodes[1].content.options))
        console.assert(0 === actual.nodes[1].content.options.length)
        console.assert(Array.isArray(actual.nodes[1].nodes))
        console.assert(1 === actual.nodes[1].nodes.length)

        console.assert(actual.nodes[1].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[1].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].nodes[0].content.hasOwnProperty('options'))
        console.assert('子2' === actual.nodes[1].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[1].nodes[0].content.options))
        console.assert(0 === actual.nodes[1].nodes[0].content.options.length)
    }

    #testChild() {
        const txt = `
親
    子
`
        const actual = Txty.tree(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('nodes'))
        console.assert(actual.hasOwnProperty('maxDepth'))
        console.assert(actual.hasOwnProperty('indentText'))
        console.assert(Txty.Indent.Space4 === actual.indentText)
        console.assert(2 === actual.maxDepth)
        console.assert(1 === actual.nodes.length)

        console.assert(actual.nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].content.hasOwnProperty('options'))
        console.assert('親' === actual.nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].content.options))
        console.assert(0 === actual.nodes[0].content.options.length)
        console.assert(Array.isArray(actual.nodes[0].nodes))
        console.assert(1 === actual.nodes[0].nodes.length)

        console.assert(actual.nodes[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('子' === actual.nodes[0].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].nodes[0].content.options))
        console.assert(0 === actual.nodes[0].nodes[0].content.options.length)
    }

    #testGrandChild() {
        const txt = `
親
    子
        孫
`
        const actual = Txty.tree(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('nodes'))
        console.assert(actual.hasOwnProperty('maxDepth'))
        console.assert(actual.hasOwnProperty('indentText'))
        console.assert(Txty.Indent.Space4 === actual.indentText)
        console.assert(3 === actual.maxDepth)
        console.assert(1 === actual.nodes.length)

        console.assert(actual.nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].content.hasOwnProperty('options'))
        console.assert('親' === actual.nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].content.options))
        console.assert(0 === actual.nodes[0].content.options.length)
        console.assert(Array.isArray(actual.nodes[0].nodes))
        console.assert(1 === actual.nodes[0].nodes.length)

        console.assert(actual.nodes[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('子' === actual.nodes[0].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].nodes[0].content.options))
        console.assert(0 === actual.nodes[0].nodes[0].content.options.length)

        console.assert(actual.nodes[0].nodes[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].nodes[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].nodes[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].nodes[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('孫' === actual.nodes[0].nodes[0].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].nodes[0].nodes[0].content.options))
        console.assert(0 === actual.nodes[0].nodes[0].nodes[0].content.options.length)

    }
    #testGrandChild2() {
        const txt = `
親1
    子1
        孫1
親2
    子2
        孫2
`
        const actual = Txty.tree(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('nodes'))
        console.assert(actual.hasOwnProperty('maxDepth'))
        console.assert(actual.hasOwnProperty('indentText'))
        console.assert(Txty.Indent.Space4 === actual.indentText)
        console.assert(3 === actual.maxDepth)
        console.assert(2 === actual.nodes.length)

        console.assert(actual.nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].content.hasOwnProperty('options'))
        console.assert('親1' === actual.nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].content.options))
        console.assert(0 === actual.nodes[0].content.options.length)
        console.assert(Array.isArray(actual.nodes[0].nodes))
        console.assert(1 === actual.nodes[0].nodes.length)

        console.assert(actual.nodes[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('子1' === actual.nodes[0].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].nodes[0].content.options))
        console.assert(0 === actual.nodes[0].nodes[0].content.options.length)

        console.assert(actual.nodes[0].nodes[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].nodes[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].nodes[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].nodes[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('孫1' === actual.nodes[0].nodes[0].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].nodes[0].nodes[0].content.options))
        console.assert(0 === actual.nodes[0].nodes[0].nodes[0].content.options.length)

        console.assert(actual.nodes[1].hasOwnProperty('content'))
        console.assert(actual.nodes[1].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].content.hasOwnProperty('options'))
        console.assert('親2' === actual.nodes[1].content.name)
        console.assert(Array.isArray(actual.nodes[1].content.options))
        console.assert(0 === actual.nodes[1].content.options.length)
        console.assert(Array.isArray(actual.nodes[1].nodes))
        console.assert(1 === actual.nodes[1].nodes.length)

        console.assert(actual.nodes[1].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[1].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].nodes[0].content.hasOwnProperty('options'))
        console.assert('子2' === actual.nodes[1].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[1].nodes[0].content.options))
        console.assert(0 === actual.nodes[1].nodes[0].content.options.length)

        console.assert(actual.nodes[1].nodes[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[1].nodes[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].nodes[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].nodes[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('孫2' === actual.nodes[1].nodes[0].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[1].nodes[0].nodes[0].content.options))
        console.assert(0 === actual.nodes[1].nodes[0].nodes[0].content.options.length)
    }
    #testDepthDiff1_1_2() { // 階層差1(maxDepthが正しいこと)
        const txt = `
先頭
親
    子
`
        const actual = Txty.tree(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('nodes'))
        console.assert(actual.hasOwnProperty('maxDepth'))
        console.assert(actual.hasOwnProperty('indentText'))
        console.assert(Txty.Indent.Space4 === actual.indentText)
        console.assert(2 === actual.maxDepth)
        console.assert(2 === actual.nodes.length)

        console.assert(actual.nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].content.hasOwnProperty('options'))
        console.assert('先頭' === actual.nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].content.options))
        console.assert(0 === actual.nodes[0].content.options.length)
        console.assert(Array.isArray(actual.nodes[0].nodes))
        console.assert(0 === actual.nodes[0].nodes.length)

        console.assert(actual.nodes[1].hasOwnProperty('content'))
        console.assert(actual.nodes[1].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].content.hasOwnProperty('options'))
        console.assert('親' === actual.nodes[1].content.name)
        console.assert(Array.isArray(actual.nodes[1].content.options))
        console.assert(0 === actual.nodes[1].content.options.length)
        console.assert(Array.isArray(actual.nodes[1].nodes))
        console.assert(1 === actual.nodes[1].nodes.length)

        console.assert(actual.nodes[1].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[1].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].nodes[0].content.hasOwnProperty('options'))
        console.assert('子' === actual.nodes[1].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[1].nodes[0].content.options))
        console.assert(0 === actual.nodes[1].nodes[0].content.options.length)
    }
    #testDepthDiff1_2_1() { // 階層差1(maxDepthが正しいこと)
        const txt = `
親
    子
末尾
`
        const actual = Txty.tree(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('nodes'))
        console.assert(actual.hasOwnProperty('maxDepth'))
        console.assert(actual.hasOwnProperty('indentText'))
        console.assert(Txty.Indent.Space4 === actual.indentText)
        console.assert(2 === actual.maxDepth)
        console.assert(2 === actual.nodes.length)

        console.assert(actual.nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].content.hasOwnProperty('options'))
        console.assert('親' === actual.nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].content.options))
        console.assert(0 === actual.nodes[0].content.options.length)
        console.assert(Array.isArray(actual.nodes[0].nodes))
        console.assert(1 === actual.nodes[0].nodes.length)

        console.assert(actual.nodes[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('子' === actual.nodes[0].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].nodes[0].content.options))
        console.assert(0 === actual.nodes[0].nodes[0].content.options.length)

        console.assert(actual.nodes[1].hasOwnProperty('content'))
        console.assert(actual.nodes[1].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].content.hasOwnProperty('options'))
        console.assert('末尾' === actual.nodes[1].content.name)
        console.assert(Array.isArray(actual.nodes[1].content.options))
        console.assert(0 === actual.nodes[1].content.options.length)
        console.assert(Array.isArray(actual.nodes[1].nodes))
        console.assert(0 === actual.nodes[1].nodes.length)
    }
    #testDepthDiff1_1_3() { // 階層差1(maxDepthが正しいこと)
        const txt = `
先頭
親
    子
        孫
`
        const actual = Txty.tree(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('nodes'))
        console.assert(actual.hasOwnProperty('maxDepth'))
        console.assert(actual.hasOwnProperty('indentText'))
        console.assert(Txty.Indent.Space4 === actual.indentText)
        console.assert(3 === actual.maxDepth)
        console.assert(2 === actual.nodes.length)

        console.assert(actual.nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].content.hasOwnProperty('options'))
        console.assert('先頭' === actual.nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].content.options))
        console.assert(0 === actual.nodes[0].content.options.length)
        console.assert(Array.isArray(actual.nodes[0].nodes))
        console.assert(0 === actual.nodes[0].nodes.length)

        console.assert(actual.nodes[1].hasOwnProperty('content'))
        console.assert(actual.nodes[1].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].content.hasOwnProperty('options'))
        console.assert('親' === actual.nodes[1].content.name)
        console.assert(Array.isArray(actual.nodes[1].content.options))
        console.assert(0 === actual.nodes[1].content.options.length)
        console.assert(Array.isArray(actual.nodes[1].nodes))
        console.assert(1 === actual.nodes[1].nodes.length)

        console.assert(actual.nodes[1].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[1].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].nodes[0].content.hasOwnProperty('options'))
        console.assert('子' === actual.nodes[1].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[1].nodes[0].content.options))
        console.assert(0 === actual.nodes[1].nodes[0].content.options.length)

        console.assert(actual.nodes[1].nodes[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[1].nodes[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].nodes[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].nodes[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('孫' === actual.nodes[1].nodes[0].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[1].nodes[0].nodes[0].content.options))
        console.assert(0 === actual.nodes[1].nodes[0].nodes[0].content.options.length)
    }
    #testDepthDiff1_3_1() { // 階層差1(maxDepthが正しいこと)
        const txt = `
親
    子
        孫
末尾
`
        const actual = Txty.tree(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('nodes'))
        console.assert(actual.hasOwnProperty('maxDepth'))
        console.assert(actual.hasOwnProperty('indentText'))
        console.assert(Txty.Indent.Space4 === actual.indentText)
        console.assert(3 === actual.maxDepth)
        console.assert(2 === actual.nodes.length)

        console.assert(actual.nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].content.hasOwnProperty('options'))
        console.assert('親' === actual.nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].content.options))
        console.assert(0 === actual.nodes[0].content.options.length)
        console.assert(Array.isArray(actual.nodes[0].nodes))
        console.assert(1 === actual.nodes[0].nodes.length)

        console.assert(actual.nodes[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('子' === actual.nodes[0].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].nodes[0].content.options))
        console.assert(0 === actual.nodes[0].nodes[0].content.options.length)

        console.assert(actual.nodes[0].nodes[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].nodes[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].nodes[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].nodes[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('孫' === actual.nodes[0].nodes[0].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].nodes[0].nodes[0].content.options))
        console.assert(0 === actual.nodes[0].nodes[0].nodes[0].content.options.length)

        console.assert(actual.nodes[1].hasOwnProperty('content'))
        console.assert(actual.nodes[1].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].content.hasOwnProperty('options'))
        console.assert('末尾' === actual.nodes[1].content.name)
        console.assert(Array.isArray(actual.nodes[1].content.options))
        console.assert(0 === actual.nodes[1].content.options.length)
        console.assert(Array.isArray(actual.nodes[1].nodes))
        console.assert(0 === actual.nodes[1].nodes.length)
    }

    #testMiddleBlankError() {
        const txt = `
親
    子
        孫

途中に空行があるとエラー
`
        try { Txty.tree(txt); }
        catch(e) {
            if (!(e instanceof TxtyTreeError)) { throw new UnitTestError(`例外の型が期待値と異なります。`); }
            if (e.message !== `途中に空行があってはなりません。`) { throw new UnitTestError(`例外メッセージが期待値と異なります。`); }
        }
    }
    #testSameDepth2_3() { // 同一階層が2連続で続くのが3階層分続く
        const txt = `
先頭
親
    子1
    子2
        孫21
        孫22
`
        const actual = Txty.tree(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('nodes'))
        console.assert(actual.hasOwnProperty('maxDepth'))
        console.assert(actual.hasOwnProperty('indentText'))
        console.assert(Txty.Indent.Space4 === actual.indentText)
        console.assert(3 === actual.maxDepth)
        console.assert(2 === actual.nodes.length)

        console.assert(actual.nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].content.hasOwnProperty('options'))
        console.assert('先頭' === actual.nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].content.options))
        console.assert(0 === actual.nodes[0].content.options.length)
        console.assert(Array.isArray(actual.nodes[0].nodes))
        console.assert(0 === actual.nodes[0].nodes.length)

        console.assert(actual.nodes[1].hasOwnProperty('content'))
        console.assert(actual.nodes[1].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].content.hasOwnProperty('options'))
        console.assert('親' === actual.nodes[1].content.name)
        console.assert(Array.isArray(actual.nodes[1].content.options))
        console.assert(0 === actual.nodes[1].content.options.length)
        console.assert(Array.isArray(actual.nodes[1].nodes))
        console.assert(2 === actual.nodes[1].nodes.length)

        console.assert(actual.nodes[1].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[1].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].nodes[0].content.hasOwnProperty('options'))
        console.assert('子1' === actual.nodes[1].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[1].nodes[0].content.options))
        console.assert(0 === actual.nodes[1].nodes[0].content.options.length)

        console.assert(actual.nodes[1].nodes[1].hasOwnProperty('content'))
        console.assert(actual.nodes[1].nodes[1].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].nodes[1].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].nodes[1].content.hasOwnProperty('options'))
        console.assert('子2' === actual.nodes[1].nodes[1].content.name)
        console.assert(Array.isArray(actual.nodes[1].nodes[1].content.options))
        console.assert(0 === actual.nodes[1].nodes[1].content.options.length)

        console.assert(actual.nodes[1].nodes[1].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[1].nodes[1].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].nodes[1].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].nodes[1].nodes[0].content.hasOwnProperty('options'))
        console.assert('孫21' === actual.nodes[1].nodes[1].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[1].nodes[1].nodes[0].content.options))
        console.assert(0 === actual.nodes[1].nodes[1].nodes[0].content.options.length)

        console.assert(actual.nodes[1].nodes[1].nodes[1].hasOwnProperty('content'))
        console.assert(actual.nodes[1].nodes[1].nodes[1].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].nodes[1].nodes[1].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].nodes[1].nodes[1].content.hasOwnProperty('options'))
        console.assert('孫22' === actual.nodes[1].nodes[1].nodes[1].content.name)
        console.assert(Array.isArray(actual.nodes[1].nodes[1].nodes[1].content.options))
        console.assert(0 === actual.nodes[1].nodes[1].nodes[1].content.options.length)
    }
    #testComplex1() { // 複雑形
        const txt = `
親1    オプション1.1
    子11
        孫111    オプション111.1    オプション111.2
            ひ孫1111
    子12
    子13
        孫131
        孫132
            ひ孫1321    オプション1321.1
        孫133
親2
    子21
        孫211
            ひ孫2111
親3
`
        const actual = Txty.tree(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('nodes'))
        console.assert(actual.hasOwnProperty('maxDepth'))
        console.assert(actual.hasOwnProperty('indentText'))
        console.assert(Txty.Indent.Space4 === actual.indentText)
        console.assert(4 === actual.maxDepth)
        console.assert(3 === actual.nodes.length)

        console.assert(actual.nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].content.hasOwnProperty('options'))
        console.assert('親1' === actual.nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].content.options))
        console.assert(1 === actual.nodes[0].content.options.length)
        console.assert('オプション1.1' === actual.nodes[0].content.options[0])
        console.assert(Array.isArray(actual.nodes[0].nodes))
        console.assert(3 === actual.nodes[0].nodes.length)

        console.assert(actual.nodes[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('子11' === actual.nodes[0].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].nodes[0].content.options))
        console.assert(0 === actual.nodes[0].nodes[0].content.options.length)
        console.assert(1 === actual.nodes[0].nodes[0].nodes.length)

        console.assert(actual.nodes[0].nodes[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].nodes[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].nodes[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].nodes[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('孫111' === actual.nodes[0].nodes[0].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].nodes[0].nodes[0].content.options))
        console.assert(2 === actual.nodes[0].nodes[0].nodes[0].content.options.length)
        console.assert('オプション111.1' === actual.nodes[0].nodes[0].nodes[0].content.options[0])
        console.assert('オプション111.2' === actual.nodes[0].nodes[0].nodes[0].content.options[1])
        console.assert(1 === actual.nodes[0].nodes[0].nodes[0].nodes.length)

        console.assert(actual.nodes[0].nodes[0].nodes[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].nodes[0].nodes[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].nodes[0].nodes[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].nodes[0].nodes[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('ひ孫1111' === actual.nodes[0].nodes[0].nodes[0].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].nodes[0].nodes[0].nodes[0].content.options))
        console.assert(0 === actual.nodes[0].nodes[0].nodes[0].nodes[0].content.options.length)
        console.assert(0 === actual.nodes[0].nodes[0].nodes[0].nodes[0].nodes.length)

        console.assert(actual.nodes[0].nodes[1].hasOwnProperty('content'))
        console.assert(actual.nodes[0].nodes[1].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].nodes[1].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].nodes[1].content.hasOwnProperty('options'))
        console.assert('子12' === actual.nodes[0].nodes[1].content.name)
        console.assert(Array.isArray(actual.nodes[0].nodes[1].content.options))
        console.assert(0 === actual.nodes[0].nodes[1].content.options.length)
        console.assert(0 === actual.nodes[0].nodes[1].nodes.length)

        console.assert(actual.nodes[0].nodes[2].hasOwnProperty('content'))
        console.assert(actual.nodes[0].nodes[2].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].nodes[2].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].nodes[2].content.hasOwnProperty('options'))
        console.assert('子13' === actual.nodes[0].nodes[2].content.name)
        console.assert(Array.isArray(actual.nodes[0].nodes[2].content.options))
        console.assert(0 === actual.nodes[0].nodes[2].content.options.length)
        console.assert(3 === actual.nodes[0].nodes[2].nodes.length)

        console.assert(actual.nodes[0].nodes[2].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].nodes[2].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].nodes[2].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].nodes[2].nodes[0].content.hasOwnProperty('options'))
        console.assert('孫131' === actual.nodes[0].nodes[2].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].nodes[2].nodes[0].content.options))
        console.assert(0 === actual.nodes[0].nodes[2].nodes[0].content.options.length)
        console.assert(0 === actual.nodes[0].nodes[2].nodes[0].nodes.length)

        console.assert(actual.nodes[0].nodes[2].nodes[1].hasOwnProperty('content'))
        console.assert(actual.nodes[0].nodes[2].nodes[1].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].nodes[2].nodes[1].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].nodes[2].nodes[1].content.hasOwnProperty('options'))
        console.assert('孫132' === actual.nodes[0].nodes[2].nodes[1].content.name)
        console.assert(Array.isArray(actual.nodes[0].nodes[2].nodes[1].content.options))
        console.assert(0 === actual.nodes[0].nodes[2].nodes[1].content.options.length)
        console.assert(1 === actual.nodes[0].nodes[2].nodes[1].nodes.length)

        console.assert(actual.nodes[0].nodes[2].nodes[1].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[0].nodes[2].nodes[1].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].nodes[2].nodes[1].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].nodes[2].nodes[1].nodes[0].content.hasOwnProperty('options'))
        console.assert('ひ孫1321' === actual.nodes[0].nodes[2].nodes[1].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[0].nodes[2].nodes[1].nodes[0].content.options))
        console.assert(1 === actual.nodes[0].nodes[2].nodes[1].nodes[0].content.options.length)
        console.assert('オプション1321.1' === actual.nodes[0].nodes[2].nodes[1].nodes[0].content.options[0])
        console.assert(0 === actual.nodes[0].nodes[2].nodes[1].nodes[0].nodes.length)

        console.assert(actual.nodes[0].nodes[2].nodes[2].hasOwnProperty('content'))
        console.assert(actual.nodes[0].nodes[2].nodes[2].hasOwnProperty('nodes'))
        console.assert(actual.nodes[0].nodes[2].nodes[2].content.hasOwnProperty('name'))
        console.assert(actual.nodes[0].nodes[2].nodes[2].content.hasOwnProperty('options'))
        console.assert('孫133' === actual.nodes[0].nodes[2].nodes[2].content.name)
        console.assert(Array.isArray(actual.nodes[0].nodes[2].nodes[2].content.options))
        console.assert(0 === actual.nodes[0].nodes[2].nodes[2].content.options.length)
        console.assert(0 === actual.nodes[0].nodes[2].nodes[2].content.options.length)



        console.assert(actual.nodes[1].hasOwnProperty('content'))
        console.assert(actual.nodes[1].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].content.hasOwnProperty('options'))
        console.assert('親2' === actual.nodes[1].content.name)
        console.assert(Array.isArray(actual.nodes[1].content.options))
        console.assert(0 === actual.nodes[1].content.options.length)
        console.assert(Array.isArray(actual.nodes[1].nodes))
        console.assert(1 === actual.nodes[1].nodes.length)

        console.assert(actual.nodes[1].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[1].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].nodes[0].content.hasOwnProperty('options'))
        console.assert('子21' === actual.nodes[1].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[1].nodes[0].content.options))
        console.assert(0 === actual.nodes[1].nodes[0].content.options.length)
        console.assert(1 === actual.nodes[1].nodes[0].nodes.length)

        console.assert(actual.nodes[1].nodes[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[1].nodes[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].nodes[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].nodes[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('孫211' === actual.nodes[1].nodes[0].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[1].nodes[0].nodes[0].content.options))
        console.assert(0 === actual.nodes[1].nodes[0].nodes[0].content.options.length)
        console.assert(1 === actual.nodes[1].nodes[0].nodes[0].nodes.length)

        console.assert(actual.nodes[1].nodes[0].nodes[0].nodes[0].hasOwnProperty('content'))
        console.assert(actual.nodes[1].nodes[0].nodes[0].nodes[0].hasOwnProperty('nodes'))
        console.assert(actual.nodes[1].nodes[0].nodes[0].nodes[0].content.hasOwnProperty('name'))
        console.assert(actual.nodes[1].nodes[0].nodes[0].nodes[0].content.hasOwnProperty('options'))
        console.assert('ひ孫2111' === actual.nodes[1].nodes[0].nodes[0].nodes[0].content.name)
        console.assert(Array.isArray(actual.nodes[1].nodes[0].nodes[0].nodes[0].content.options))
        console.assert(0 === actual.nodes[1].nodes[0].nodes[0].nodes[0].content.options.length)
        console.assert(0 === actual.nodes[1].nodes[0].nodes[0].nodes[0].nodes.length)


        console.assert(actual.nodes[2].hasOwnProperty('content'))
        console.assert(actual.nodes[2].hasOwnProperty('nodes'))
        console.assert(actual.nodes[2].content.hasOwnProperty('name'))
        console.assert(actual.nodes[2].content.hasOwnProperty('options'))
        console.assert('親3' === actual.nodes[2].content.name)
        console.assert(Array.isArray(actual.nodes[2].content.options))
        console.assert(0 === actual.nodes[2].content.options.length)
        console.assert(Array.isArray(actual.nodes[2].nodes))
        console.assert(0 === actual.nodes[2].nodes.length)
    }
}
