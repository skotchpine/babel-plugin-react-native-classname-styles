const babel = require('babel-core')
const plugin = require('../')

const example = `
  const Styles = {h1: {fontSize: 32}}
  const X = ({name}) => <Text className="h1">name</Text>
`

it('injects styles from classNames', () => {
  const {code} = babel.transform(example, {plugins: [plugin], presets: ['@babel/preset-env', '@babel/preset-react']})
  expect(code).toMatchSnapshot()
})
