const mongoose = require("mongoose");
const CodeBlock = require("./models/CodeBlock");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Insert initial data to the database
const initialData = [
  {
    name: "Async/Await",
    initialTemplate: `
    // Async/Await exercise
    function asyncOperation1() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Asynchronous Operation 1');
          resolve();
        }, 1000);
      });
    }
    
    function asyncOperation2() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Asynchronous Operation 2');
          resolve();
        }, 2000);
      });
    }
    
    function asyncOperation3() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Asynchronous Operation 3');
          resolve();
        }, 1500);
      });
    }
    
    async function performOperations() {
      try {
          // Add code here to perform the operations sequentially
  
        console.log('All operations completed');
      } catch (error) {
        console.log('Error:', error.message);
      }
    }
    
    performOperations();
    `,
    code: `
    // Async/Await exercise
    function asyncOperation1() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Asynchronous Operation 1');
          resolve();
        }, 1000);
      });
    }
    
    function asyncOperation2() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Asynchronous Operation 2');
          resolve();
        }, 2000);
      });
    }
    
    function asyncOperation3() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Asynchronous Operation 3');
          resolve();
        }, 1500);
      });
    }
    
    async function performOperations() {
      try {
          // Add code here to perform the operations sequentially
  
        console.log('All operations completed');
      } catch (error) {
        console.log('Error:', error.message);
      }
    }
    
    performOperations();
    `,
    role: "mentor",
    solution: `
    // Async/Await exercise
    function asyncOperation1() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Asynchronous Operation 1');
          resolve();
        }, 1000);
      });
    }
    
    function asyncOperation2() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Asynchronous Operation 2');
          resolve();
        }, 2000);
      });
    }
    
    function asyncOperation3() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Asynchronous Operation 3');
          resolve();
        }, 1500);
      });
    }
    
    async function performOperations() {
      try {
          await asyncOperation1();
          await asyncOperation2();
          await asyncOperation3();
  
        console.log('All operations completed');
      } catch (error) {
        console.log('Error:', error.message);
      }
    }
    
    performOperations();
    `,
  },
  {
    name: "Callback",
    initialTemplate: `
    // Use a callback to transform an array of numbers to their squares
    function transformArray(numbers, callback) {
        const results = [];
        // Add code here to transform the array 
    
    
        return results;
    }
    
    const numbers = [1, 2, 3, 4];
    const squares = transformArray(numbers, (n) => n * n); 
    console.log(squares); // Should output [1, 4, 9, 16]
    `,
    code: `
    // Use a callback to transform an array of numbers to their squares
    function transformArray(numbers, callback) {
        const results = [];
        // Add code here to transform the array 
    
    
        return results;
    }
    
    const numbers = [1, 2, 3, 4];
    const squares = transformArray(numbers, (n) => n * n); 
    console.log(squares); // Should output [1, 4, 9, 16]
    `,
    role: "mentor",
    solution: `
    // Use a callback to transform an array of numbers to their squares
    function transformArray(numbers, callback) {
        const results = [];
        for (let number of numbers) {
            results.push(callback(number)); // Solution: apply the callback to each number and push the result
        }
        return results;
    }
    
    const numbers = [1, 2, 3, 4];
    const squares = transformArray(numbers, (n) => n * n); 
    console.log(squares); // Should output [1, 4, 9, 16]
    `,
  },
  {
    name: "Promises",
    initialTemplate: `
    // Simple Promise example to fetch user data
    function fetchUserData(userId) {
        // Add code here to create and return a new Promise
    }
    
    fetchUserData(1)
        .then((user) => {
            console.log('User found:', user.name); // Should output "User found: Itamar"
        })
        .catch((error) => {
            console.log('Error:', error.message); // Should output "User not found"
        });
    `,
    code: `
    // Simple Promise example to fetch user data
    function fetchUserData(userId) {
        // Add code here to create and return a new Promise
    }
    
    fetchUserData(1)
        .then((user) => {
            console.log('User found:', user.name); // Should output "User found: Itamar"
        })
        .catch((error) => {
            console.log('Error:', error.message); // Should output "User not found"
        });
    `,
    role: "mentor",
    solution: `
    // Simple Promise example to fetch user data
    function fetchUserData(userId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (userId === 1) {
                    resolve({ id: 1, name: 'Itamar' });
                } else {
                    reject(new Error('User not found'));
                }
            }, 1000);
        });
    }
    
    fetchUserData(1)
        .then((user) => {
            console.log('User found:', user.name); // Should output "User found: Itamar"
        })
        .catch((error) => {
            console.log('Error:', error.message); // Should output "User not found"
        });
    `,
  },
  {
    name: "Event Loop",
    initialTemplate: `
    // Understand the JavaScript Event Loop
    console.log('Start');
    
    setTimeout(() => {
        console.log('Timeout');
    }, 0);
    
    Promise.resolve().then(() => {
        console.log('Promise');
    });
    
    console.log('End');
    
    // Complete the output of the program:
    `,
    code: `
    // Understand the JavaScript Event Loop
    console.log('Start');
    
    setTimeout(() => {
        console.log('Timeout');
    }, 0);
    
    Promise.resolve().then(() => {
        console.log('Promise');
    });
    
    console.log('End');
    
    // Complete the output of the program:
    `,
    role: "mentor",
    solution: `
    // Understand the JavaScript Event Loop
    console.log('Start');
    
    setTimeout(() => {
        console.log('Timeout');
    }, 0);
    
    Promise.resolve().then(() => {
        console.log('Promise');
    });
    
    console.log('End');
    
    // Complete the output of the program:
    Start
    End
    Promise
    Timeout
    `,
  },
  {
    name: "Hoisting and Scope",
    initialTemplate: `
    // A function that demonstrates the use of variables hoisting and block scope in JavaScript
    function testScopeAndHoisting() {
        console.log(x);
        console.log(y);
        if (true) {
            var x = 10;
            let y = 20;
            console.log(x);
            console.log(y);
        }
        console.log(x);
        console.log(y);
    }
    
    testScopeAndHoisting();
    // Complete the output of the function above [20, 10, undefined, reference error] for each console.log statement
    `,
    code: `
    // A function that demonstrates the use of variables hoisting and block scope in JavaScript
    function testScopeAndHoisting() {
        console.log(x);
        console.log(y);
        if (true) {
            var x = 10;
            let y = 20;
            console.log(x);
            console.log(y);
        }
        console.log(x);
        console.log(y);
    }
    
    testScopeAndHoisting();
    // Complete the output of the function above [20, 10, undefined, reference error] for each console.log statement
    `,
    role: "mentor",
    solution: `
    // A function that demonstrates the use of variables hoisting and block scope in JavaScript
    function testScopeAndHoisting() {
        console.log(x);
        console.log(y);
        if (true) {
            var x = 10;
            let y = 20;
            console.log(x);
            console.log(y);
        }
        console.log(x);
        console.log(y);
    }
    
    testScopeAndHoisting();
    // Complete the output of the function above [20, 10, undefined, reference error] for each console.log statement
    undefined
    reference error
    10
    20
    10
    reference error
    `,
  },
];

CodeBlock.insertMany(initialData)
  .then(() => {
    console.log("Initial data inserted");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error inserting initial data:", err);
    mongoose.connection.close();
  });
