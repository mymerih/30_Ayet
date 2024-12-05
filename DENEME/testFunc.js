export const performanceTest = () => {
    console.time("Arrow Function");
    for (let i = 0; i < 1_000_000; i++) {
        const arrowFn = () => i;
        arrowFn();
    }
    console.timeEnd("Arrow Function");

    console.time("Function Declaration");
    for (let i = 0; i < 1_000_000; i++) {
        function funcDecl() {
            return i;
        }
        funcDecl();
    }
    console.timeEnd("Function Declaration");
};

// Run the performance test
performanceTest();
