const factorial = function(n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

console.log(factorial(5))

// 复杂度分析 空间复杂度O(n) 时间复杂度为O(2^n)
// 总时间 = 子问题个数 * 解决一个子问题需要的时间
// 子问题个数即递归树中的节点个数2^n
// 解决一个子问题所需要的时间，只有一个加法操作fib(n-1) + fib(n-2),所以解决一个子问题的时间为O(1)
const fib = function(n) {
    if (n == 0 || n == 1) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}
console.log(fib(6))

// 动态规划解法，递归是自顶向下，动态规划是自底向上，将递归改成迭代。为了减少空间消耗，只存储两个值，这种解法是动态规划的最优解
// 时间复杂度O(n) 空间复杂度O(1)
const dynamicFib = function(n) {
    if (n === 0) {
        return 0;
    }
    let a1 = 0;
    let a2 = 1;
    for(let i = 1; i < n; i++) {
        [a1, a2] = [a2, a1 + a2];
    }
    return a2;
}
console.log('dynamicFib:', dynamicFib(7))

// 黄金分割比通项公式解法
// 时间复杂度O(logn) 空间复杂度O(1)
const divFib = function(n) {
    return (Math.pow((1 + Math.sqrt(5))/2, n) - Math.pow((1 - Math.sqrt(5))/2, n)) / Math.sqrt(5);
}
console.log('divFib:', divFib(5))