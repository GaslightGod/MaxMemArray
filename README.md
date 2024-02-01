# MaxMemArr - Circular Buffer Implementation
MaxMemArr is a JavaScript class that implements a circular buffer. Circular buffers are also known as circular queues or ring buffers. They are data structures that use a fixed-size, cyclically connected array to efficiently manage and store data.

## Definition
A circular buffer first starts out empty and has a set length. In the diagram below is a 7-element buffer: 

<div align="center">
  <img src="[https://en.wikipedia.org/wiki/Circular_buffer#/media/File:Circular_buffer_-_empty.svg](https://cdn.discordapp.com/attachments/1178257853698560021/1202598732919480380/1.png?ex=65ce0a59&is=65bb9559&hm=2cfb3590fc987cb3f7003e22a43d156da9c6aeb0ff675c86dff01079eebef43f&)" alt="Alt Text" width="300">
</div>

Assume that 1 is written in the center of a circular buffer (the exact starting location is not important in a circular buffer): 
<div align="center">
  <img src="" alt="Alt Text" width="400">
</div>
Then assume that two more elements are added to the circular buffer — 2 & 3 — which get put after 1: 
<div align="center">
  <img src="" alt="Alt Text" width="400">
</div>
If two elements are removed, the two oldest values inside of the circular buffer would be removed. Circular buffers use FIFO (first in, first out) logic. In the example, 1 & 2 were the first to enter the circular buffer, they are the first to be removed, leaving 3 inside of the buffer. 
<div align="center">
  <img src="" alt="Alt Text" width="400">
</div>
If the buffer has 7 elements, then it is completely full: 
<div align="center">
  <img src="" alt="Alt Text" width="400">
</div>
A property of the circular buffer is that when it is full and a subsequent write is performed, then it starts overwriting the oldest data. In the current example, two more elements — A & B — are added and they overwrite the 3 & 4: 
<div align="center">
  <img src="" alt="Alt Text" width="400">
</div>
Alternatively, the routines that manage the buffer could prevent overwriting the data and return an error or raise an exception. Whether or not data is overwritten is up to the semantics of the buffer routines or the application using the circular buffer.
<div align="center">
  <img src="" alt="Alt Text" width="400">
</div>
Finally, if two elements are now removed then what would be returned is not 3 & 4 (or rather now A & B) but 5 & 6 because 5 & 6 are now the oldest elements, yielding the buffer with: 
<div align="center">
  <img src="" alt="Alt Text" width="400">
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

## Usage
MaxMemArray, a confluence of cutting-edge design and functionality, is engineered for scenarios necessitating meticulous memory control and fixed-size cyclic storage paradigms. Here's a glimpse into harnessing its formidable capabilities:

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
        Effortlessly orchestrates memory consolidation when the buffer approaches full capacity.

Circular Buffer for Limited Resources:
        A paragon of resource-conscious design, offering continuous storage sans superfluous memory overhead.

Real-time Data Processing:
        Facilitates the processing of real-time data through a fixed-size buffer, ensuring the persistence of the most recent data points.

Sliding Window Operations:
        Empowers sliding window operations with a circular structure, facilitating efficient window management.

Data Buffering in IoT Devices:
        Dons the mantle of a circular buffer for IoT devices, skillfully managing incoming sensor data within the constraints of limited memory.

Continuous Monitoring and Logging:
        An ideal choice for applications demanding uninterrupted monitoring and logging, providing a steadfast memory footprint.

Efficient Queue Operations:
        Pioneers as an efficient queue, offering constant-time removal and addition of elements at the front of the buffer.

Testing and Simulation:
        An invaluable asset for testing scenarios and simulations that demand the orchestration of a cyclic dataset.

## Testing
Verify the reliability of MaxMemArray by running the included Jest tests:

```bash
npm test
```

### Contributing
Feel free to contribute to the project by opening issues or submitting pull requests. Your feedback and contributions are appreciated.
