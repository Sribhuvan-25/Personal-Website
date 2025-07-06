```javascript
// Importing the assert module for testing
const assert = require('assert');

// A simple function to test
function addNumbers(a, b) {
    return a + b;
}

// Test case
describe('addNumbers', function() {
    it('should return the sum of two numbers', function() {
        assert.equal(addNumbers(1, 2), 3);
    });
});
```