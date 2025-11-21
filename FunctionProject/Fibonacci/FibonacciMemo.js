const bigInt = require("big-integer");

// Cache global para la memoization
let memo = {
    0: bigInt.zero,
    1: bigInt.one
};

function fib(n) {
    if (memo[n] !== undefined) {
        return memo[n];
    }

    // Recursión + memo
    memo[n] = fib(n - 1).add(fib(n - 2));
    return memo[n];
}

module.exports = async function (context, req) {
    context.log("Fibonacci recursivo con memoization (JS)");

    const nth = req.body?.nth;

    if (nth === undefined || nth < 0) {
        context.res = {
            status: 400,
            body: { error: "Debe enviar un número válido. Ej: { \"nth\": 10 }" }
        };
        return;
    }

    const result = fib(nth);

    context.res = {
        headers: { "Content-Type": "application/json" },
        body: {
            nth: nth,
            result: result.toString()
        }
    };
};
