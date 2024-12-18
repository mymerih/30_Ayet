// Arrow Function with export const
export const arrowFunctionExample = () => {
    console.log("Arrow Function: ", this); // 'this' points to the parent context
};

// Function Declaration with export function
export function functionDeclarationExample() {
    console.log("Function Declaration: ", this); // 'this' is scoped to the function itself
}

// Test Scenario: Call in different contexts
const testObject = {
    name: "Test Object",
    arrowFn: arrowFunctionExample,
    functionDecl: functionDeclarationExample,
};

// Execution
console.log("Global Context:");
arrowFunctionExample(); // In global, 'this' is undefined in strict mode or window in non-strict mode
functionDeclarationExample(); // 'this' is undefined in strict mode or window in non-strict mode

console.log("\nObject Context:");
testObject.arrowFn(); // Arrow function: 'this' still refers to the outer (global) context
testObject.functionDecl(); // Function declaration: 'this' refers to 'testObject'
