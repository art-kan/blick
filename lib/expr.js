
function isExpr(expr) {
  if (Array.isArray(expr)) {
    return expr.every(isExpr);
  }

  if (expr !== Object(expr)) return true;

  const keys = Object.keys(expr);

  if (keys.length === 1 && keys[0].startsWith('$')) {
    return isExpr(expr[keys[0]]);
  }

  return false;
}

function evalExpr(expr, context) {
  if (expr !== Object(expr)) return expr;

  const op = Object.keys(expr)[0];
  const param = expr[op];

  switch (op) {
    case '$eq': {
      return Array.from(param).every((el) => {
        const a = evalExpr(el, context);
        return a == evalExpr(param[0], context);
      });
    }
    case '$value': {
      return context.answers[param];
    }
    case '$self_value': {
      return context.answers[context.current];
    }
    // ...
    default: throw Error(`Unknown operation: ${op}.`);
  }
}

exports.isExpr = isExpr;
exports.evalExpr = evalExpr;
