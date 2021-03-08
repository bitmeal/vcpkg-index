const jsep = require('jsep');

function parse(tokenstring) {
    let ast = jsep(tokenstring);

    // |: flatten left/right
    // &: combine left/right for each
    // !: prefix '!' for each
    // identifier/leaf: return [<identifier>]
    let builder = (tree) => {
        switch(tree.type) {
            case 'Identifier':
                return [tree.name];
            case 'UnaryExpression':
                return builder(tree.argument).map(v => `${tree.operator}${v}`);
            case 'BinaryExpression':
            case 'LogicalExpression':
                switch(tree.operator) {
                    case '||':
                    case '|':
                        return [...builder(tree.left), ...builder(tree.right)];
                    case '&&':
                    case '&':
                        var right = builder(tree.right);
                        return builder(tree.left).reduce((acc, l) => {
                            acc.push(
                                ...right.map(
                                    r => [l, r].sort(v => v.search(/((arm)|x)((86)|(64)|(hf))/)).join('-')
                                )
                            );
                            return acc;
                        }, []);
                }
        }
    }

    return builder(ast);
}

module.exports.parse = parse;