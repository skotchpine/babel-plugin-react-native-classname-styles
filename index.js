module.exports = function transform({types: t}) {
  var classNamePath = null
  var stylePath = null

  return {
    name: 'babel-plugin-react-native-classname-styles',
    visitor: {
      JSXOpeningElement: {
        exit(path, state) {
          if (classNamePath) {
            const styleNames = classNamePath.node.value.value.split(/[ ]+/)
            const newStyles = styleNames.map(function (styleName) {
              return t.memberExpression(t.identifier("Styles"), t.stringLiteral(styleName), true)
            })

            if (stylePath) {
              const styleValue = stylePath.node.value
              const isArray = (
                t.isJSXExpressionContainer(styleValue) &&
                styleValue.expression.callee &&
                styleValue.expression.callee.property &&
                styleValue.expression.callee.property.name &&
                styleValue.expression.callee.property.name.toLowerCase() === "join" &&
                t.isArrayExpression(styleValue.expression.callee.object)
              )

              if (isArray) {
                stylePath.node.value = t.arrayExpression([...newStyles, ...styleValue.expression])
              } else {
                stylePath.node.value = t.arrayExpression([...newStyles, styleValue.expression])
              }
              classNamePath.remove()

            } else {
              classNamePath.node.name.name = 'style'
              classNamePath.node.value = t.arrayExpression(newStyles)
            }
          }

          classNamePath = null
          stylePath = null
        }
      },

      JSXAttribute: function JSXAttribute(path, state) {
        const name = path.node.name.name;
        if (name === 'className') classNamePath = path
        if (name === 'style') stylePath = path
      },
    },
  }
}
