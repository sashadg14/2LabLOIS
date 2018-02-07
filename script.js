function isDelim(c) {
    return c == ' ';
}

function isOperator(c) {
    return c == '~' || c == '-' || c == '|' || c == '&' || c == '!';
}

function processOperator(st, op) {
    var r = st.pop();
    if (op != '!') {
    var l = st.pop();
    alert(l + op + r);
    }
    else alert('!'+r);
    switch (op) {
        case '~':
            st.push("("+l + '~' + r+")");
            break;
        case '-':
            st.push("("+l + '-' + r+")");
            break;
        case '|':
            st.push("("+l + '|' + r+")");
            break;
        case '&':
            st.push("("+l + '&' + r+")");
            break;
        case '!':
            st.push("(!" + r+")");
            break;
    }
}
var set=[];
function addInSet(el){
    var bool=true;
    for(var i=0; i<set.length;i++){
        if(set[i]==el) {
            bool = false;
            break;
        }
    }
    if(bool){
        set.push(el)
    }
}

function isLetter(s) {
    if (s >= 'A' && s <= 'K') {
        addInSet(s);
        return true;
    }
    else return false;
}

function addInSetIfVariable(s) {
    if (s >= 'A' && s <= 'K') {
        addInSet(s);
        return true;
    }
    else return false;
}


function priority(op) {
    switch (op) {
        case '~':
            return 1;
        case '-':
            return 2;
        case '|':
            return 3;
        case '&':
            return 4;
        case '!':
            return 5;
        default:
            return -1;
    }
}

function eval(s) {
    var st = [];
    var op = [];
    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (isDelim(c))
            continue;
        if (c == '(')
            op.push('(');
        else if (c == ')') {
            while (op[op.length - 1] != '(')
                processOperator(st, op.pop());
            op.pop();
        } else if (isOperator(c)) {
            while (op.length != 0 && priority(op[op.length - 1]) >= priority(c))
                processOperator(st, op.pop());
            op.push(c);
        } else {
            var operand = "";
            while (i < s.length && (isLetter(s.charAt(i))))
                operand += s.charAt(i++);
            --i;
            st.push(operand);
        }
    }
    while (op.length != 0)
        processOperator(st, op.pop());
    return st[0];
}

function createVariavlesSet(str) {
    for(i=0;i<str.length;i++){
        addInSetIfVariable(str[i])
    }
}
//alert(eval("A|B|!(C&!D)"));
//alert(set);