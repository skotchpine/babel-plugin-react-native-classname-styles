const babel = require('babel-core')
const plugin = require('../')

const examples = [`
  const Styles = {h1: {fontSize: 32}}
  const X = ({name}) => <Text className="h1">name</Text>
`,`
  const Styles = {h1: {fontSize: 32}}
  const X = ({name}) => <Text className="h1" style={{fontSize: 42}}>name</Text>
`,`
  const Styles = {h1: {fontSize: 32}, h2: {fontSize: 24}, 'flex-1': {flex: 1}}
  const X = ({name}) => <Text className="h1 h2 flex-1" style={{fontSize: 42}}>name</Text>
`]

examples.forEach(example => {
  it('injects styles from classNames', () => {
    const {code} = babel.transform(example, {plugins: [plugin], presets: ['@babel/preset-env', '@babel/preset-react']})
    expect(code).toMatchSnapshot()
  })
})
