// from Ideal.js (https://github.com/webarthur/ideal.js)
window.location.getQueryParams = function(query) {

    // se o parâmetro query não foi definido pega o parâmetro da URL
    if (!query) {
        query = window.location.search.substring(1)
    }

    var l = query.length
    var q = {} // objeto a ser retornado
    var n = '' // nome
    var v = '' // valor
    var t = false

    // percorre os caracteres da variavel "query"
    for (var i = 0; i < l; i++) {
        // pega o caractere
        var c = query[i]

        // caso o caractere seja = passa a armazenar os caracteres como valor
        if (c === '=') {
            t = true
        }
        // caso o caractere seja & ou seja o último caractere
        else if (c === '&' || i === l - 1) {
            if (i === l - 1) {
                v += (c === '+') ? ' ' : c
            }
            // armazena no objeto de retorno
            q[n] = decodeURIComponent(v)

            // reinicia variáveis
            t = false
            n = ''
            v = ''
        }
        // caso a variável não seja igual a interrogação
        else if (i > 0 || c !== '?') {
            // armazena como valor
            if (t) {
                // redefine caractere "+" como espaço
                v += (c === '+') ? ' ' : c
            }
            // armazena como nome
            else {
                n += c
            }
        }
    }

    // retorna objeto
    return q
} 

 