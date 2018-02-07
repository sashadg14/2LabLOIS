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
            if(r==l)
                st.push('1');
            else st.push('0');
            break;
        case '-':
            if(r==l|r=='1')
                st.push('1');
            else st.push('0');
            break;
        case '|':
            if(l=='1'||r=='1')
            st.push('1');
            else st.push('0');
            break;
        case '&':
            if(l==r&l=='1')
                st.push(l);
            else st.push(r);
            break;
        case '!':
            if(r=='1')
                st.push('0');
            else st.push('1');
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
    if (s == '1' || s == '0') {
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

function isVariable(s) {
    if (s >= 'A' && s <= 'K') {
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

function eval(s){
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
        if(isVariable(str[i])){
            addInSet(str[i])
        }
    }
}

function initVariablesInExpression(str){
    var newStr=str.split("");
    for(i=0;i<str.length;i++){
    for(j=0;j<set.length;j++)
        if(str[i]===set[j]){
            newStr[i]=(i,variables[j]);
        }
    }
    return newStr.join("");
}
/*
createVariavlesSet("A|B|!(C&!D)");
var variables=[0,0,1,1];
alert(set);
alert(initVariablesInExpression("A|B|!(C&!D)"));*/
alert(eval("(1|0)&!0"));
//alert(set);