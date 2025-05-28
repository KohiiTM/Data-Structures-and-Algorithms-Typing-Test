// Fallback data for when API is unavailable
const FALLBACK_DATA = {
  topics: [
    // Data Structures (15 topics)
    {
      topic: "Hash Table",
      category: "Data Structures",
      content:
        "A hash table is a data structure that implements an associative array abstract data type, a structure that can map keys to values. It uses a hash function to compute an index into an array of buckets or slots from which the desired value can be found.",
    },
    {
      topic: "Linked List",
      category: "Data Structures",
      content:
        "A linked list is a linear data structure where elements are stored in nodes and each node points to the next node in the sequence. Unlike arrays, linked lists don't require contiguous memory allocation, making them more flexible for dynamic data.",
    },
    {
      topic: "Stack",
      category: "Data Structures",
      content:
        "A stack is a linear data structure that follows the Last In First Out (LIFO) principle. The main operations are push (add an element), pop (remove the top element), and peek (view the top element).",
    },
    {
      topic: "Queue",
      category: "Data Structures",
      content:
        "A queue is a linear data structure that follows the First In First Out (FIFO) principle. The main operations are enqueue (add an element) and dequeue (remove an element).",
    },
    {
      topic: "Binary Tree",
      category: "Data Structures",
      content:
        "A binary tree is a hierarchical data structure where each node has at most two children, referred to as the left child and right child. Binary trees are commonly used for searching and sorting operations.",
    },
    {
      topic: "Heap",
      category: "Data Structures",
      content:
        "A heap is a specialized tree-based data structure that satisfies the heap property. In a max heap, the key at root must be maximum among all keys present in the binary tree.",
    },
    {
      topic: "Trie",
      category: "Data Structures",
      content:
        "A trie is a tree-like data structure used to store a dynamic set of strings where the keys are usually strings. Each node represents a common prefix of its children.",
    },
    {
      topic: "Graph",
      category: "Data Structures",
      content:
        "A graph is a non-linear data structure consisting of vertices and edges that connect these vertices. Graphs can be directed or undirected and can have cycles.",
    },
    {
      topic: "AVL Tree",
      category: "Data Structures",
      content:
        "An AVL tree is a self-balancing binary search tree where the heights of the left and right subtrees of any node differ by at most one. This balancing property ensures that the tree remains balanced and operations like search, insert, and delete take O(log n) time.",
    },
    {
      topic: "Red-Black Tree",
      category: "Data Structures",
      content:
        "A red-black tree is a self-balancing binary search tree where each node has an extra bit for denoting the color of the node, either red or black. The tree maintains balance through a set of color properties that ensure the tree remains approximately balanced.",
    },
    {
      topic: "B-Tree",
      category: "Data Structures",
      content:
        "A B-tree is a self-balancing tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time. It is commonly used in databases and file systems where large amounts of data need to be stored and accessed efficiently.",
    },
    {
      topic: "Skip List",
      category: "Data Structures",
      content:
        "A skip list is a probabilistic data structure that allows O(log n) search complexity as well as O(log n) insertion complexity. It uses multiple layers of linked lists with each layer skipping over some elements to provide fast search capabilities.",
    },
    {
      topic: "Segment Tree",
      category: "Data Structures",
      content:
        "A segment tree is a tree data structure used for storing information about intervals or segments. It allows querying which of the stored segments contain a given point and is particularly useful for range queries and range updates.",
    },
    {
      topic: "Fenwick Tree",
      category: "Data Structures",
      content:
        "A Fenwick tree or binary indexed tree is a data structure that can efficiently update elements and calculate prefix sums in a table of numbers. It is particularly useful for cumulative frequency tables and range sum queries.",
    },
    {
      topic: "Binary Search Tree",
      category: "Data Structures",
      content:
        "A binary search tree is a node-based binary tree data structure where each node contains a key greater than all the keys in its left subtree and less than all the keys in its right subtree. This property makes it efficient for searching, inserting, and deleting elements.",
    },

    // Algorithms (15 topics)
    {
      topic: "QuickSort",
      category: "Algorithms",
      content:
        "QuickSort is a highly efficient comparison-based, in-place sorting algorithm. It works by selecting a pivot element and partitioning the array around it, placing smaller elements before the pivot and larger elements after it.",
    },
    {
      topic: "Binary Search",
      category: "Algorithms",
      content:
        "Binary Search is an efficient algorithm for finding an element in a sorted array. It works by repeatedly dividing the search interval in half, making it much faster than linear search for large datasets.",
    },
    {
      topic: "Dijkstra's Algorithm",
      category: "Algorithms",
      content:
        "Dijkstra's algorithm is used to find the shortest path between nodes in a graph. The algorithm maintains a set of unvisited nodes and assigns tentative distances to all nodes.",
    },
    {
      topic: "Dynamic Programming",
      category: "Algorithms",
      content:
        "Dynamic Programming is a method for solving complex problems by breaking them down into simpler subproblems. It is applicable when the subproblems overlap.",
    },
    {
      topic: "Breadth First Search (BFS)",
      category: "Algorithms",
      content:
        "Breadth First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root and explores all nodes at the present depth before moving on to nodes at the next depth level.",
    },
    {
      topic: "Depth First Search (DFS)",
      category: "Algorithms",
      content:
        "Depth First Search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node and explores as far as possible along each branch before backtracking.",
    },
    {
      topic: "Merge Sort",
      category: "Algorithms",
      content:
        "Merge Sort is a divide-and-conquer algorithm that recursively breaks down a problem into two or more subproblems until they become simple enough to solve directly.",
    },
    {
      topic: "Kadane's Algorithm",
      category: "Algorithms",
      content:
        "Kadane's algorithm is used to find the maximum sum of a contiguous subarray in an array of numbers. It maintains the maximum sum ending at each position.",
    },
    {
      topic: "Kruskal's Algorithm",
      category: "Algorithms",
      content:
        "Kruskal's algorithm is a greedy algorithm that finds a minimum spanning tree for a connected weighted graph. It finds a subset of the edges that forms a tree that includes every vertex, where the total weight of all the edges in the tree is minimized.",
    },
    {
      topic: "Prim's Algorithm",
      category: "Algorithms",
      content:
        "Prim's algorithm is a greedy algorithm that finds a minimum spanning tree for a connected weighted undirected graph. It finds a subset of the edges that forms a tree that includes every vertex, where the total weight of all the edges in the tree is minimized.",
    },
    {
      topic: "Bellman-Ford Algorithm",
      category: "Algorithms",
      content:
        "The Bellman-Ford algorithm is an algorithm that computes shortest paths from a single source vertex to all other vertices in a weighted digraph. It is slower than Dijkstra's algorithm but can handle negative edge weights.",
    },
    {
      topic: "Floyd-Warshall Algorithm",
      category: "Algorithms",
      content:
        "The Floyd-Warshall algorithm is an algorithm for finding shortest paths in a weighted graph with positive or negative edge weights but with no negative cycles. It can find the shortest path between all pairs of vertices.",
    },
    {
      topic: "A* Search Algorithm",
      category: "Algorithms",
      content:
        "A* is a pathfinding algorithm that finds the shortest path between two points. It uses a heuristic function to estimate the cost from the current node to the goal and combines this with the actual cost from the start to the current node.",
    },
    {
      topic: "Rabin-Karp Algorithm",
      category: "Algorithms",
      content:
        "The Rabin-Karp algorithm is a string searching algorithm that uses hashing to find patterns in strings. It is particularly efficient for finding multiple patterns in a text.",
    },
    {
      topic: "Topological Sort",
      category: "Algorithms",
      content:
        "Topological sort is an algorithm that orders the vertices of a directed acyclic graph (DAG) such that for every directed edge from vertex A to vertex B, A comes before B in the ordering.",
    },

    // System Design (7 topics)
    {
      topic: "Load Balancing",
      category: "System Design",
      content:
        "Load balancing is a technique used to distribute incoming network traffic across multiple servers to ensure no single server becomes overwhelmed. This improves the reliability and availability of applications.",
    },
    {
      topic: "Caching",
      category: "System Design",
      content:
        "Caching is a technique that stores frequently accessed data in a faster storage medium to improve performance. Common caching strategies include LRU (Least Recently Used) and LFU (Least Frequently Used).",
    },
    {
      topic: "Database Indexing",
      category: "System Design",
      content:
        "Database indexing is a data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space to maintain the index data structure.",
    },
    {
      topic: "Microservices Architecture",
      category: "System Design",
      content:
        "Microservices architecture is a method of developing software applications as a suite of independently deployable, small, modular services where each service runs a unique process.",
    },
    {
      topic: "Message Queues",
      category: "System Design",
      content:
        "Message queues provide an asynchronous communications protocol, meaning that the sender and receiver of the message do not need to interact with the message queue at the same time.",
    },
    {
      topic: "Rate Limiting",
      category: "System Design",
      content:
        "Rate limiting is a strategy used to control the rate of requests a client can make to an API within a specified time period to prevent abuse and ensure fair usage.",
    },
    {
      topic: "Database Sharding",
      category: "System Design",
      content:
        "Database sharding is a type of horizontal partitioning that splits large databases into smaller, faster, more easily managed parts called data shards.",
    },

    // Problem Solving (7 topics)
    {
      topic: "Sliding Window Technique",
      category: "Problem Solving",
      content:
        "The sliding window technique is used to solve problems involving arrays or strings where we need to find or calculate something among all subarrays or substrings of a certain size.",
    },
    {
      topic: "Two Pointer Technique",
      category: "Problem Solving",
      content:
        "Two pointer technique is used to solve problems involving arrays or strings where we need to find a pair of elements that satisfy certain conditions.",
    },
    {
      topic: "Binary Search Applications",
      category: "Problem Solving",
      content:
        "Binary search can be used to find the position of a target value within a sorted array. It compares the target value to the middle element of the array.",
    },
    {
      topic: "Greedy Algorithms",
      category: "Problem Solving",
      content:
        "Greedy algorithms make the locally optimal choice at each stage with the hope of finding a global optimum. They are used when a problem can be solved by making a series of choices.",
    },
    {
      topic: "Backtracking",
      category: "Problem Solving",
      content:
        "Backtracking is a general algorithm for finding all solutions to some computational problems that incrementally builds candidates to the solutions and abandons a candidate as soon as it determines that it cannot possibly be completed.",
    },
    {
      topic: "Floyd Cycle Finding",
      category: "Problem Solving",
      content:
        "The Floyd cycle finding algorithm is used to detect cycles in linked lists. It uses two pointers that move at different speeds through the sequence of values.",
    },
    {
      topic: "Boyer-Moore Voting",
      category: "Problem Solving",
      content:
        "The Boyer-Moore voting algorithm is used to find the majority element in an array. It works by maintaining a count of the current candidate for majority element.",
    },
    // Additional Sorting Algorithms
    {
      topic: "Bubble Sort",
      category: "Algorithms",
      content:
        "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. It has a time complexity of O(n^2) and is not efficient for large lists.",
    },
    {
      topic: "Insertion Sort",
      category: "Algorithms",
      content:
        "Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort, but it has advantages for small data sets.",
    },
    {
      topic: "Selection Sort",
      category: "Algorithms",
      content:
        "Selection Sort is a simple sorting algorithm that divides the input into a sorted and unsorted region, and repeatedly selects the smallest element from the unsorted region to add to the sorted region.",
    },
    {
      topic: "Heap Sort",
      category: "Algorithms",
      content:
        "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides its input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element.",
    },
    {
      topic: "Counting Sort",
      category: "Algorithms",
      content:
        "Counting Sort is a non-comparison-based sorting algorithm that works by counting the occurrences of each element in the input array. It is efficient when the range of input data is not significantly greater than the number of objects to be sorted.",
    },
    {
      topic: "Radix Sort",
      category: "Algorithms",
      content:
        "Radix Sort is a non-comparative sorting algorithm that sorts data with integer keys by grouping keys by the individual digits which share the same significant position and value. It can be applied to data that can be sorted lexicographically.",
    },
    {
      topic: "Bucket Sort",
      category: "Algorithms",
      content:
        "Bucket Sort is a sorting algorithm that works by distributing the elements of an array into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm or recursively applying the bucket sorting algorithm.",
    },
    {
      topic: "Shell Sort",
      category: "Algorithms",
      content:
        "Shell Sort is an optimization of insertion sort that allows the exchange of items that are far apart. It sorts elements at specific intervals and gradually reduces the interval size until it becomes 1, at which point it becomes a regular insertion sort.",
    },
    {
      topic: "Tim Sort",
      category: "Algorithms",
      content:
        "Tim Sort is a hybrid sorting algorithm derived from merge sort and insertion sort. It is designed to perform well on many kinds of real-world data and is the default sorting algorithm in Python and Java.",
    },
    {
      topic: "Cocktail Sort",
      category: "Algorithms",
      content:
        "Cocktail Sort is a variation of bubble sort that sorts in both directions on each pass through the list. It is slightly more efficient than bubble sort for certain types of data, particularly when the list is nearly sorted.",
    },
    {
      topic: "Comb Sort",
      category: "Algorithms",
      content:
        "Comb Sort is an improvement over bubble sort that eliminates small values at the end of the list quickly. It works by comparing elements separated by a gap that shrinks by a factor of 1.3 in each iteration.",
    },
    {
      topic: "Cycle Sort",
      category: "Algorithms",
      content:
        "Cycle Sort is an in-place, unstable sorting algorithm that minimizes the number of writes to the array. It is based on the idea that the permutation to be sorted can be factored into cycles, which can be individually rotated to give a sorted result.",
    },
    {
      topic: "Gnome Sort",
      category: "Algorithms",
      content:
        "Gnome Sort is a sorting algorithm that is similar to insertion sort, except that moving an element to its proper place is accomplished by a series of swaps, as in bubble sort. It is named after the garden gnome's way of sorting flower pots.",
    },
    {
      topic: "Pancake Sort",
      category: "Algorithms",
      content:
        "Pancake Sort is a sorting algorithm that works by repeatedly flipping portions of the array. The goal is to sort the array by performing a series of prefix reversals, similar to how you might sort a stack of pancakes by flipping portions of the stack.",
    },
    {
      topic: "Bogo Sort",
      category: "Algorithms",
      content:
        "Bogo Sort is a highly inefficient sorting algorithm that works by generating random permutations of the input array until it finds one that is sorted. It is primarily used for educational purposes to demonstrate what not to do in sorting.",
    },
  ],
  categories: [
    "Data Structures",
    "Algorithms",
    "System Design",
    "Problem Solving",
  ],
};

// Function to get random topic from fallback data
function getRandomFallbackTopic() {
  const topics = FALLBACK_DATA.topics;
  return topics[Math.floor(Math.random() * topics.length)];
}

// Function to get all topics from fallback data
function getAllFallbackTopics() {
  return FALLBACK_DATA.topics;
}

// Function to get all categories from fallback data
function getAllFallbackCategories() {
  return FALLBACK_DATA.categories;
}

// Export the fallback functions
export {
  getRandomFallbackTopic,
  getAllFallbackTopics,
  getAllFallbackCategories,
};
