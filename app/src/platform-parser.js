const jsep = require('jsep');

function parse(tokenstring) {
    let ast = jsep(tokenstring);
    console.log(ast);
    // |: flatten left/right
    // &: combine left/right for each
    // !: prefix '!' for each
    // identifier/leaf: return [<identifier>]
    let builder = (tree) => {
        let join = (lr) => {
            return lr.sort(v => v.search(/^((arm)|x)((86)|(64)|(hf))?/)).join('-')
        };

        switch(tree.type) {
            case 'Compound': // not implemented and should only occur on empty/invalid input
                return [];
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
                        var left = builder(tree.left);
                        return [
                            ...new Set(
                                left.reduce((accl, l) => {
                                    accl.push(...right.reduce((accr, r) => {
                                        if(l[0] == '!' && r[0] == '!') {
                                            // if left (deeper parse tree) has a positive, don't add single negative
                                            if(left.filter(v => v[0] != '!').length) {
                                                accr.push(l);
                                            }
                                            else {
                                                accr.push(l, r);
                                            }
                                        }
                                        else if(l[0] != '!' && r[0] != '!') {
                                            accr.push(join([l, r]));
                                        }
                                        else {
                                            if(l[0] != '!') {
                                                accr.push(l);
                                                accr.push('!' + join([l, r.slice(1)]));
                                            }
                                            else {
                                                accr.push(r);
                                                accr.push('!' + join([l.slice(1), r]));
                                            }
                                        }

                                        return accr;
                                    }, []));
                                    return accl;
                                }, [])
                            )
                        ].sort(v => v[0] == '!');
                }
        }
    }

    return builder(ast);
}

module.exports.parse = parse;