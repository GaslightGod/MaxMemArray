<div align="center">
  <h1>MaxMemArray - Circular Buffer Implementation</h1>
</div>

MaxMemArr is a JavaScript class that implements a circular buffer. Circular buffers are also known as circular queues or ring buffers. They are data structures that use a fixed-size, cyclically connected array to efficiently manage and store data.

<div align="center">
  <h1>Definition</h1>

A circular buffer first starts out empty and has a set length. In the diagram below is a 7-element buffer: 
<div align="center">
<img src="https://camo.githubusercontent.com/3991d8e6bf6db6ebe92fff97572f8f9e21306252fee1142f7a1d19e506d550f0/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f662f66372f43697263756c61725f6275666665725f2d5f656d7074792e7376672f35303070782d43697263756c61725f6275666665725f2d5f656d7074792e7376672e706e67" alt="" data-canonical-src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Circular_buffer_-_empty.svg/500px-Circular_buffer_-_empty.svg.png" style="max-width: 100%;">
</div>

Assume that 1 is written in the center of a circular buffer (the exact starting location is not important in a circular buffer): 
<div align="center">
<img src="https://camo.githubusercontent.com/ad157adf4667b64dcf89d94762611ee642acb4e225560db6cee67a235f4868bb/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f382f38392f43697263756c61725f6275666665725f2d5f585831585858582e7376672f35303070782d43697263756c61725f6275666665725f2d5f585831585858582e7376672e706e67" alt="" data-canonical-src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Circular_buffer_-_XX1XXXX.svg/500px-Circular_buffer_-_XX1XXXX.svg.png" style="max-width: 100%;">
</div>
Then assume that two more elements are added to the circular buffer — 2 & 3 — which get put after 1: 
<div align="center">
<img src="https://camo.githubusercontent.com/58681f49d9e459ca4472e612a49f066227bfae79aca896b1e375885ab99c1ca5/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f642f64372f43697263756c61725f6275666665725f2d5f585831323358582e7376672f35303070782d43697263756c61725f6275666665725f2d5f585831323358582e7376672e706e67" alt="" data-canonical-src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Circular_buffer_-_XX123XX.svg/500px-Circular_buffer_-_XX123XX.svg.png" style="max-width: 100%;">
</div>
If two elements are removed, the two oldest values inside of the circular buffer would be removed. Circular buffers use FIFO (first in, first out) logic. In the example, 1 & 2 were the first to enter the circular buffer, they are the first to be removed, leaving 3 inside of the buffer. 
<div align="center">
<img src="https://camo.githubusercontent.com/30c86c6ac5650eb25974893a3093431ffabc38eda51e124677456c1d2d9cf614/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f312f31312f43697263756c61725f6275666665725f2d5f585858583358582e7376672f35303070782d43697263756c61725f6275666665725f2d5f585858583358582e7376672e706e67" style="max-width: 100%;">
</div>
If the buffer has 7 elements, then it is completely full: 
<div align="center">
<img src="https://camo.githubusercontent.com/daee6b0eed1ee9f7c2f6c272ffd31c52167b2f977df50075141f41fd64d08814/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f362f36372f43697263756c61725f6275666665725f2d5f363738393334352e7376672f35303070782d43697263756c61725f6275666665725f2d5f363738393334352e7376672e706e67" alt="" data-canonical-src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Circular_buffer_-_6789345.svg/500px-Circular_buffer_-_6789345.svg.png" style="max-width: 100%;">
</div>
A property of the circular buffer is that when it is full and a subsequent write is performed, then it starts overwriting the oldest data. In the current example, two more elements — A & B — are added and they overwrite the 3 & 4: 
<div align="center">
<img src="https://camo.githubusercontent.com/25ad03b920b5dbd32d30900efa21064349a2b6170ab8676ae630768d7c0884a8/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f622f62612f43697263756c61725f6275666665725f2d5f363738394142352e7376672f35303070782d43697263756c61725f6275666665725f2d5f363738394142352e7376672e706e67" alt="" data-canonical-src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Circular_buffer_-_6789AB5.svg/500px-Circular_buffer_-_6789AB5.svg.png" style="max-width: 100%;">
</div>
Alternatively, the routines that manage the buffer could prevent overwriting the data and return an error or raise an exception. Whether or not data is overwritten is up to the semantics of the buffer routines or the application using the circular buffer.
<p> </p>
<p> </p>
Finally, if two elements are now removed then what would be returned is not 3 & 4 (or rather now A & B) but 5 & 6 because 5 & 6 are now the oldest elements, yielding the buffer with: 

<div align="center">
<img src="https://camo.githubusercontent.com/efdb75fe077d826b8300d900521d860a07255ef2cc75751ac8c38f8f4c7182cd/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f342f34332f43697263756c61725f6275666665725f2d5f583738394142582e7376672f35303070782d43697263756c61725f6275666665725f2d5f583738394142582e7376672e706e67" alt="" data-canonical-src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Circular_buffer_-_X789ABX.svg/500px-Circular_buffer_-_X789ABX.svg.png" style="max-width: 100%;">
</div>
</div>



## Installation

Before running test cases, make sure you have Node.js installed. If not, you can download it [here](https://nodejs.org/).

Next, install Jest using the following command:

```bash
npm install --save-dev jest
```

## Methods

### push(element): Add an element to the end of the circular buffer.
        pop(): Remove and return the last element from the circular buffer.
        
        get(index): Get the element at the specified index in the circular buffer.
        
        set(index, value): Set the element at the specified index in the circular buffer.
        
        consolidate(): Remove old elements from the beginning of the circular buffer to maintain its length.

        slice(): Return a shallow copy of the circular buffer's elements.
        
        shift(): Remove and return the first element from the circular buffer.
        
        unshift(element): Add an element to the beginning of the circular buffer.
        
        splice(start, deleteCount, ...items): Remove elements from the circular buffer and insert new elements at the specified position.
```js
// Import the MaxMemArray class from the file
const MaxMemArray = require('./MaxMemArr');

// Function to print the current state of the MaxMemArray instance
function printState(maxMemArray) {
    const currentState = maxMemArray.slice(); // Print only valid elements within buffer
    console.log('Current State:', currentState);
  }

// Example usage and testing of MaxMemArray class
const maxMemArray = new MaxMemArray(5);

// Push elements
maxMemArray.push('A');
maxMemArray.push('B');
maxMemArray.push('C');
maxMemArray.push('D');
maxMemArray.push('E');
printState(maxMemArray); // Output: ['A', 'B', 'C', 'D', 'E']

// Pop element
const poppedElement = maxMemArray.pop();
console.log('Popped Element:', poppedElement); // Output: 'E'
printState(maxMemArray); // Output: ['A', 'B', 'C', 'D']

// Get and set elements
const elementAtIndex2 = maxMemArray.get(2);
console.log('Element at Index 2:', elementAtIndex2); // Output: 'C'

maxMemArray.set(1, 'X');
printState(maxMemArray); // Output: ['A', 'X', 'C', 'D']

// Consolidate
maxMemArray.consolidate();
printState(maxMemArray); // Output: ['C', 'D']

// Shift elements to the left
maxMemArray.shift();
printState(maxMemArray); // Output: ['D']

// Unshift elements to the right
maxMemArray.unshift('Z');
printState(maxMemArray); // Output: ['Z', 'D']

// Splice elements
const removedElements = maxMemArray.splice(1, 1, 'X', 'Y');
console.log('Removed Elements:', removedElements); // Output: ['D']
printState(maxMemArray); // Output: ['Z', 'X', 'Y']

// Test with Proxy (if TRIVIAL environment variable is set)
if (process.env.TRIVIAL) {
  console.log('Using Proxy (Numeric Indices):', maxMemArray.q[1]); // Output: 'X'
  maxMemArray.q[2] = 'W';
  printState(maxMemArray); // Output: ['Z', 'X', 'W']
}

// Additional testing can be added based on your specific requirements
```

## Advanced Use Cases
Memory Optimization:
        Memory consolidation when the buffer approaches full capacity.

Circular Buffer for Limited Resources:
        resource-conscious design, offering continuous storage memory overhead.

Real-time Data Processing:
        Facilitates the processing of real-time data through a fixed-size buffer, ensuring the persistence of the most recent data points.

Sliding Window Operations:
        sliding window operations with a circular structure, facilitating efficient window management.

Data Buffering in IoT Devices:
       circular buffer for IoT devices, skillfully managing incoming sensor data within the constraints of limited memory.

Continuous Monitoring and Logging:
        An ideal choice for applications demanding uninterrupted monitoring and logging, providing a steadfast memory footprint.

## Testing
Verify the reliability of MaxMemArray by running the included Jest tests:

```bash
npm test
```

### Contributing
Feel free to contribute to the project by opening issues or submitting pull requests. Your feedback and contributions are appreciated.


