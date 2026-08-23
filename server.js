// --- COMPLETE 80-QUESTION DSA QUIZ DATASET ---

const quizQuestions = {
  // Quiz 1: Big-O Notation & Complexity Analysis
  1: [
    {
      id: 1,
      question: "What is the time complexity of accessing an element in an array by its index?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      answer: 0
    },
    {
      id: 2,
      question: "Which Big-O notation represents the worst-case scenario for binary search?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      answer: 2
    },
    {
      id: 3,
      question: "What is the time complexity of two nested loops running up to 'n' times?",
      options: ["O(2n)", "O(n)", "O(n²)", "O(2^n)"],
      answer: 2
    },
    {
      id: 4,
      question: "Which complexity grows the slowest as input size 'n' increases?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
      answer: 1
    },
    {
      id: 5,
      question: "What is the space complexity of an algorithm that creates an n x n 2D array?",
      options: ["O(1)", "O(n)", "O(n²)", "O(2^n)"],
      answer: 2
    },
    {
      id: 6,
      question: "What is the average time complexity of Merge Sort?",
      options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
      answer: 1
    },
    {
      id: 7,
      question: "In Big-O analysis, what do we do with lower-order terms and constants?",
      options: ["Keep them", "Drop them", "Multiply them by n", "Square them"],
      answer: 1
    },
    {
      id: 8,
      question: "What is the best-case time complexity of Linear Search?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      answer: 0
    },
    {
      id: 9,
      question: "Which Big-O class represents exponential time complexity?",
      options: ["O(n!)", "O(2^n)", "O(n^3)", "O(n log n)"],
      answer: 1
    },
    {
      id: 10,
      question: "Space complexity measures which resource consumed by an algorithm?",
      options: ["Execution Time", "Memory Usage", "Disk Storage", "Network Bandwidth"],
      answer: 1
    }
  ],

  // Quiz 2: Arrays & String Operations
  2: [
    {
      id: 1,
      question: "Elements in an array are stored in which type of memory locations?",
      options: ["Non-contiguous", "Contiguous", "Random", "Linked"],
      answer: 1
    },
    {
      id: 2,
      question: "What is the time complexity to insert an element at the beginning of an array of size n?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      answer: 1
    },
    {
      id: 3,
      question: "Which technique uses two pointers moving from opposite ends toward the middle?",
      options: ["Sliding Window", "Two-Pointer Approach", "Binary Search", "Divide and Conquer"],
      answer: 1
    },
    {
      id: 4,
      question: "What is an Anagram of a string?",
      options: ["A reversed string", "A string with same characters in different order", "A substring", "A palindrome"],
      answer: 1
    },
    {
      id: 5,
      question: "The Sliding Window technique is optimal for solving which type of array problems?",
      options: ["Sorting", "Subarray/Substring problems", "Searching in 2D array", "Matrix multiplication"],
      answer: 1
    },
    {
      id: 6,
      question: "What is the worst-case time complexity of searching an element in an unsorted array?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      answer: 2
    },
    {
      id: 7,
      question: "Strings are generally considered immutable in which programming language?",
      options: ["C", "C++", "Java", "Assembly"],
      answer: 2
    },
    {
      id: 8,
      question: "How do you check if a string is a Palindrome?",
      options: ["Compare it with its reverse", "Sort characters", "Check length", "Count vowels"],
      answer: 0
    },
    {
      id: 9,
      question: "What is the prefix sum array used for?",
      options: ["Sorting arrays", "Range sum queries in O(1)", "Reversing arrays", "Finding duplicates"],
      answer: 1
    },
    {
      id: 10,
      question: "What is the space complexity of reversing an array in-place?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      answer: 0
    }
  ],

  // Quiz 3: Linked Lists & Pointer Manipulation
  3: [
    {
      id: 1,
      question: "What does a node in a Singly Linked List contain?",
      options: ["Data only", "Data and Next pointer", "Data, Next, and Prev pointers", "Array of pointers"],
      answer: 1
    },
    {
      id: 2,
      question: "What is the main advantage of a Linked List over an Array?",
      options: ["Random access", "Dynamic size allocation", "Less memory usage", "Faster indexing"],
      answer: 1
    },
    {
      id: 3,
      question: "What is the time complexity to insert a node at the head of a linked list?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      answer: 0
    },
    {
      id: 4,
      question: "Which algorithm is used to detect cycles in a Linked List?",
      options: ["Kadane's Algorithm", "Floyd's Cycle Finding Algorithm", "Dijkstra's Algorithm", "Kruskal's Algorithm"],
      answer: 1
    },
    {
      id: 5,
      question: "In a Doubly Linked List, what pointer does the head node's 'previous' point to?",
      options: ["Tail", "Self", "Null / undefined", "Second node"],
      answer: 2
    },
    {
      id: 6,
      question: "What is the time complexity to search for an element in a Linked List?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      answer: 2
    },
    {
      id: 7,
      question: "What characterises a Circular Linked List?",
      options: ["Head node points to null", "Last node points to head node", "Nodes have 3 pointers", "Size is fixed"],
      answer: 1
    },
    {
      id: 8,
      question: "How do you reverse a Singly Linked List iteratively?",
      options: ["Using 1 pointer", "Using 3 pointers (prev, curr, next)", "Using sorting", "Using binary search"],
      answer: 1
    },
    {
      id: 9,
      question: "What happens if you do not free dynamic memory allocated for a deleted linked list node?",
      options: ["Segmentation Fault", "Memory Leak", "Buffer Overflow", "Stack Overflow"],
      answer: 1
    },
    {
      id: 10,
      question: "To delete the last node in a Singly Linked List, which node do you need to traverse to?",
      options: ["Head", "Middle node", "Second-to-last node", "Last node directly"],
      answer: 2
    }
  ],

  // Quiz 4: Stacks & Queues Implementation
  4: [
    {
      id: 1,
      question: "Which principle governs the Stack data structure?",
      options: ["FIFO", "LIFO", "LILO", "Random"],
      answer: 1
    },
    {
      id: 2,
      question: "Which principle governs the Queue data structure?",
      options: ["FIFO", "LIFO", "FILO", "Priority ordering"],
      answer: 0
    },
    {
      id: 3,
      question: "Which operation adds an item to the top of a Stack?",
      options: ["Pop", "Push", "Enqueue", "Dequeue"],
      answer: 1
    },
    {
      id: 4,
      question: "Which operation removes an item from the front of a Queue?",
      options: ["Pop", "Push", "Enqueue", "Dequeue"],
      answer: 3
    },
    {
      id: 5,
      question: "What condition occurs when attempting to pop from an empty stack?",
      options: ["Overflow", "Underflow", "Deadlock", "Segmentation Fault"],
      answer: 1
    },
    {
      id: 6,
      question: "What is the call stack used for during execution?",
      options: ["Managing database queries", "Tracking function calls and recursion", "Sorting arrays", "Storing global variables"],
      answer: 1
    },
    {
      id: 7,
      question: "Which data structure is ideal for checking balanced parentheses?",
      options: ["Queue", "Stack", "Tree", "Graph"],
      answer: 1
    },
    {
      id: 8,
      question: "How can a Queue be implemented using Stacks?",
      options: ["Using 1 stack", "Using 2 stacks", "Using 3 stacks", "It is impossible"],
      answer: 1
    },
    {
      id: 9,
      question: "In a Circular Queue implementation, how is the next index calculated?",
      options: ["(index + 1) / size", "(index + 1) % capacity", "index + 1", "index * 2"],
      answer: 1
    },
    {
      id: 10,
      question: "What is the time complexity of Push and Pop operations in a Stack?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      answer: 0
    }
  ],

  // Quiz 5: Trees & BST Traversals
  5: [
    {
      id: 1,
      question: "What is the maximum number of children a binary tree node can have?",
      options: ["1", "2", "3", "Unlimited"],
      answer: 1
    },
    {
      id: 2,
      question: "In a Binary Search Tree (BST), values in the left subtree are always:",
      options: ["Greater than root", "Equal to root", "Smaller than root", "Random"],
      answer: 2
    },
    {
      id: 3,
      question: "Which tree traversal yields elements in sorted order for a BST?",
      options: ["Pre-Order", "In-Order", "Post-Order", "Level-Order"],
      answer: 1
    },
    {
      id: 4,
      question: "What is the sequence of visiting nodes in Pre-Order traversal?",
      options: ["Left -> Root -> Right", "Root -> Left -> Right", "Left -> Right -> Root", "Root -> Right -> Left"],
      answer: 1
    },
    {
      id: 5,
      question: "What is the sequence of visiting nodes in Post-Order traversal?",
      options: ["Left -> Root -> Right", "Root -> Left -> Right", "Left -> Right -> Root", "Right -> Left -> Root"],
      answer: 2
    },
    {
      id: 6,
      question: "What is the worst-case time complexity of searching in an unbalanced BST?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      answer: 2
    },
    {
      id: 7,
      question: "What is the height of a balanced Binary Search Tree with n nodes?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      answer: 1
    },
    {
      id: 8,
      question: "Which traversal uses a Queue to traverse level by level?",
      options: ["Depth-First Search", "Breadth-First Search (Level-Order)", "Pre-Order", "In-Order"],
      answer: 1
    },
    {
      id: 9,
      question: "What is a Full Binary Tree?",
      options: ["Every node has 0 or 2 children", "All leaf nodes are at same level", "Nodes are sorted", "Balanced height"],
      answer: 0
    },
    {
      id: 10,
      question: "An AVL Tree is an example of a:",
      options: ["Heap", "Self-Balancing BST", "B-Tree", "Trie"],
      answer: 1
    }
  ],

  // Quiz 6: Heaps & Priority Queue Operations
  6: [
    {
      id: 1,
      question: "In a Max-Heap, the root node always contains:",
      options: ["The smallest element", "The largest element", "The average element", "A null value"],
      answer: 1
    },
    {
      id: 2,
      question: "A Binary Heap is typically represented using which underlying data structure?",
      options: ["Linked List", "Array", "Graph", "Matrix"],
      answer: 1
    },
    {
      id: 3,
      question: "In an array representation of a heap, for a node at 0-indexed position 'i', what is the left child index?",
      options: ["2i + 1", "2i + 2", "i / 2", "i + 1"],
      answer: 0
    },
    {
      id: 4,
      question: "What is the time complexity to insert an element into a Min-Heap?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      answer: 1
    },
    {
      id: 5,
      question: "What is the time complexity to extract the min/max element from a Heap?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      answer: 1
    },
    {
      id: 6,
      question: "What is the operation called to restore heap properties after inserting or deleting?",
      options: ["Heapify", "Balance", "Traverse", "Rotate"],
      answer: 0
    },
    {
      id: 7,
      question: "Which sorting algorithm relies directly on a Max-Heap?",
      options: ["Merge Sort", "Quick Sort", "Heap Sort", "Bubble Sort"],
      answer: 2
    },
    {
      id: 8,
      question: "What is the time complexity to build a Heap from an unorganized array of n elements?",
      options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
      answer: 2
    },
    {
      id: 9,
      question: "Which abstract data type is commonly implemented using a Heap?",
      options: ["Stack", "Priority Queue", "Deque", "Map"],
      answer: 1
    },
    {
      id: 10,
      question: "In a 0-indexed heap array, what is the parent node index for a child at index 'i'?",
      options: ["(i - 1) / 2", "i / 2", "2i - 1", "i - 2"],
      answer: 0
    }
  ],

  // Quiz 7: Graph Search Algorithms (BFS & DFS)
  7: [
    {
      id: 1,
      question: "Which data structure is typically used to implement Breadth-First Search (BFS)?",
      options: ["Stack", "Queue", "Heap", "Tree"],
      answer: 1
    },
    {
      id: 2,
      question: "Which data structure (or mechanism) is used to implement Depth-First Search (DFS)?",
      options: ["Queue", "Stack (or Recursion)", "Heap", "Array"],
      answer: 1
    },
    {
      id: 3,
      question: "What is the time complexity of BFS/DFS on a graph with V vertices and E edges using Adjacency List?",
      options: ["O(V)", "O(E)", "O(V + E)", "O(V * E)"],
      answer: 2
    },
    {
      id: 4,
      question: "Which search algorithm guarantees finding the shortest path in an unweighted graph?",
      options: ["DFS", "BFS", "Pre-Order", "A*"],
      answer: 1
    },
    {
      id: 5,
      question: "How do we prevent infinite loops in graph traversals when cycles are present?",
      options: ["Limit depth", "Track visited vertices", "Use sorting", "Use Max-Heap"],
      answer: 1
    },
    {
      id: 6,
      question: "An Adjacency Matrix representation of a graph with V vertices requires how much space?",
      options: ["O(V)", "O(E)", "O(V²)", "O(V + E)"],
      answer: 2
    },
    {
      id: 7,
      question: "Topological Sorting applies to which type of graph?",
      options: ["Undirected Cyclic Graph", "Directed Acyclic Graph (DAG)", "Complete Graph", "Bipartite Graph"],
      answer: 1
    },
    {
      id: 8,
      question: "Which algorithm finds the single-source shortest paths in a weighted graph with non-negative edge weights?",
      options: ["Dijkstra's Algorithm", "Kruskal's Algorithm", "Prim's Algorithm", "KMP Algorithm"],
      answer: 0
    },
    {
      id: 9,
      question: "What is a Spanning Tree of a connected graph?",
      options: ["A subgraph that includes all edges", "A subgraph that includes all vertices with no cycles", "A tree with maximum depth", "A directed graph"],
      answer: 1
    },
    {
      id: 10,
      question: "Which algorithm uses a greedy approach to find the Minimum Spanning Tree (MST)?",
      options: ["Bellman-Ford", "Kruskal's / Prim's Algorithm", "Floyd-Warshall", "DFS"],
      answer: 1
    }
  ],

  // Quiz 8: Sorting & Searching Mastery
  8: [
    {
      id: 1,
      question: "What condition MUST be met before applying Binary Search on an array?",
      options: ["Array must be empty", "Array must be sorted", "Array length must be even", "Array elements must be unique"],
      answer: 1
    },
    {
      id: 2,
      question: "What is the average time complexity of Quick Sort?",
      options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
      answer: 1
    },
    {
      id: 3,
      question: "What is the worst-case time complexity of Quick Sort?",
      options: ["O(n log n)", "O(n²)", "O(n)", "O(2^n)"],
      answer: 1
    },
    {
      id: 4,
      question: "Which sorting algorithm is a Divide and Conquer algorithm that guarantees O(n log n) worst-case time?",
      options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
      answer: 2
    },
    {
      id: 5,
      question: "Which sorting algorithm performs best on small or nearly sorted arrays?",
      options: ["Quick Sort", "Merge Sort", "Insertion Sort", "Heap Sort"],
      answer: 2
    },
    {
      id: 6,
      question: "What does it mean for a sorting algorithm to be 'Stable'?",
      options: ["It uses O(1) extra space", "It retains the relative order of equal elements", "It never crashes", "It runs in O(n) time"],
      answer: 1
    },
    {
      id: 7,
      question: "What is the space complexity of Merge Sort?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      answer: 1
    },
    {
      id: 8,
      question: "In Binary Search, if target > midElement, where do you search next?",
      options: ["Left sub-array", "Right sub-array", "Whole array again", "Stop search"],
      answer: 1
    },
    {
      id: 9,
      question: "Which non-comparison sorting algorithm runs in O(n + k) time?",
      options: ["Counting Sort", "Quick Sort", "Merge Sort", "Selection Sort"],
      answer: 0
    },
    {
      id: 10,
      question: "What is the worst-case number of swaps required in Bubble Sort for size 'n'?",
      options: ["n", "n - 1", "n(n - 1) / 2", "n log n"],
      answer: 2
    }
  ]
};

// Express Route to serve questions by Quiz ID
app.get('/api/quizzes/:id/questions', (req, res) => {
  const quizId = parseInt(req.params.id, 10);
  const questions = quizQuestions[quizId];

  if (!questions) {
    return res.status(404).json({ error: 'Quiz questions not found' });
  }

  res.json(questions);
});
