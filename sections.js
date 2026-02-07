// Content for each section - Fill in the blank format
const sections = {
    os: {
        name: "Operating Systems",
        prompts: [
            {
                topic: "Process Management",
                text: "A ___ stores the state of a process including the ___ counter, CPU registers, and memory limits.",
                answers: ["PCB", "program"]
            },
            {
                topic: "Round Robin Scheduling",
                text: "Round Robin is a ___ scheduling algorithm where each process gets a small unit of CPU time called a ___ quantum.",
                answers: ["preemptive", "time"]
            },
            {
                topic: "Deadlock Conditions",
                text: "The four necessary conditions for deadlock are mutual ___, hold and ___, no preemption, and ___ wait.",
                answers: ["exclusion", "wait", "circular"]
            },
            {
                topic: "Page Replacement",
                text: "LRU page replacement algorithm replaces the page that has not been used for the ___ period of time, while FIFO replaces the ___ page.",
                answers: ["longest", "oldest"]
            },
            {
                topic: "File Systems",
                text: "An ___ is a data structure that stores metadata about a file, including its size, permissions, and ___ to data blocks.",
                answers: ["inode", "pointers"]
            },
            {
                topic: "Semaphores",
                text: "A ___ is a synchronization primitive that uses two atomic operations: ___ to decrement and signal to increment.",
                answers: ["semaphore", "wait"]
            },
            {
                topic: "Thrashing",
                text: "___ occurs when a system spends more time paging than executing, usually due to insufficient ___ memory.",
                answers: ["Thrashing", "physical"]
            },
            {
                topic: "Critical Section",
                text: "A critical section is a code segment where ___ variables are accessed and must be executed ___.",
                answers: ["shared", "atomically"]
            }
        ]
    },
    algorithms: {
        name: "Algorithms",
        prompts: [
            {
                topic: "Bubble Sort",
                text: "Bubble sort repeatedly compares ___ elements and swaps them if they are in wrong order. Time complexity is ___.",
                answers: ["adjacent", "O(n²)"]
            },
            {
                topic: "Binary Search",
                text: "Binary search requires a ___ array and has a time complexity of ___ by dividing search space in half.",
                answers: ["sorted", "O(log n)"]
            },
            {
                topic: "Dynamic Programming",
                text: "Dynamic programming solves problems with ___ substructure and ___ subproblems using memoization or tabulation.",
                answers: ["optimal", "overlapping"]
            },
            {
                topic: "Quick Sort",
                text: "Quick sort uses a ___ element to partition the array. Average case is ___ but worst case is O(n²).",
                answers: ["pivot", "O(n log n)"]
            },
            {
                topic: "Dijkstra's Algorithm",
                text: "Dijkstra's algorithm finds the shortest path from a ___ node to all other nodes using a ___ queue.",
                answers: ["source", "priority"]
            },
            {
                topic: "Merge Sort",
                text: "Merge sort uses ___ and conquer strategy, dividing array into halves and merging them. Time complexity is always ___.",
                answers: ["divide", "O(n log n)"]
            },
            {
                topic: "DFS vs BFS",
                text: "DFS uses a ___ data structure while BFS uses a ___ for graph traversal.",
                answers: ["stack", "queue"]
            },
            {
                topic: "Greedy Algorithms",
                text: "Greedy algorithms make ___ optimal choices at each step, hoping to find a ___ optimum.",
                answers: ["locally", "global"]
            }
        ]
    },
    datastructures: {
        name: "Data Structures",
        prompts: [
            {
                topic: "Stack Operations",
                text: "A stack follows ___ principle where insertion and deletion happen at the ___.",
                answers: ["LIFO", "top"]
            },
            {
                topic: "Binary Search Tree",
                text: "In a BST, left subtree contains values ___ than parent and right subtree contains values ___ than parent.",
                answers: ["less", "greater"]
            },
            {
                topic: "Hash Tables",
                text: "Hash tables use a ___ function to compute an index. Collisions can be resolved using ___ or open addressing.",
                answers: ["hash", "chaining"]
            },
            {
                topic: "Heaps",
                text: "A max heap has the ___ element at the root. Heapify operation takes ___ time.",
                answers: ["largest", "O(log n)"]
            },
            {
                topic: "Linked Lists",
                text: "A ___ linked list has nodes with pointers to both next and ___ nodes.",
                answers: ["doubly", "previous"]
            },
            {
                topic: "Queue Operations",
                text: "A queue follows ___ principle. Elements are added at the ___ and removed from the front.",
                answers: ["FIFO", "rear"]
            },
            {
                topic: "AVL Tree",
                text: "AVL tree is a self-___ binary search tree where the height difference between left and right subtrees is at most ___.",
                answers: ["balancing", "1"]
            },
            {
                topic: "Graph Representation",
                text: "Graphs can be represented using an adjacency ___ with O(V²) space or adjacency ___ with O(V+E) space.",
                answers: ["matrix", "list"]
            }
        ]
    },
    java: {
        name: "Java",
        prompts: [
            {
                topic: "Inheritance",
                text: "In Java, a class can ___ from only one class but can ___ multiple interfaces.",
                answers: ["extend", "implement"]
            },
            {
                topic: "ArrayList vs LinkedList",
                text: "ArrayList provides ___ time random access while LinkedList provides O(1) time ___ and deletion at ends.",
                answers: ["O(1)", "insertion"]
            },
            {
                topic: "Exception Handling",
                text: "___ exceptions must be caught or declared, while ___ exceptions don't need explicit handling.",
                answers: ["Checked", "unchecked"]
            },
            {
                topic: "Thread Synchronization",
                text: "The ___ keyword ensures that only one thread can access a method or block. Use ___ for thread communication.",
                answers: ["synchronized", "wait"]
            },
            {
                topic: "HashMap",
                text: "HashMap uses ___ and equals methods for key comparison. It allows ___ null key.",
                answers: ["hashCode", "one"]
            },
            {
                topic: "Abstract Classes",
                text: "Abstract classes can have both abstract and ___ methods. They cannot be ___.",
                answers: ["concrete", "instantiated"]
            },
            {
                topic: "Stream API",
                text: "Stream operations are divided into ___ operations like filter and map, and ___ operations like collect.",
                answers: ["intermediate", "terminal"]
            },
            {
                topic: "Generics",
                text: "Generics provide compile-time type ___. The wildcard ___ extends for upper bound.",
                answers: ["safety", "?"]
            }
        ]
    },
    c: {
        name: "C Programming",
        prompts: [
            {
                topic: "Pointers",
                text: "The ___ operator gets the address of a variable. The ___ operator accesses the value at a pointer.",
                answers: ["&", "*"]
            },
            {
                topic: "Dynamic Memory",
                text: "___ allocates memory and initializes to zero, while malloc allocates ___ memory.",
                answers: ["calloc", "uninitialized"]
            },
            {
                topic: "Arrays and Pointers",
                text: "Array name is a ___ pointer to the first element. arr[i] is equivalent to ___.",
                answers: ["constant", "*(arr+i)"]
            },
            {
                topic: "Structures",
                text: "The ___ keyword defines a structure. Use ___ operator to access members through a pointer.",
                answers: ["struct", "->"]
            },
            {
                topic: "File Operations",
                text: "___ opens a file and returns a FILE pointer. Use ___ to close the file.",
                answers: ["fopen", "fclose"]
            },
            {
                topic: "Storage Classes",
                text: "___ variables retain their value between function calls. ___ variables are stored in CPU registers.",
                answers: ["static", "register"]
            },
            {
                topic: "Preprocessor",
                text: "The ___ directive includes header files. ___ is used to define constants and macros.",
                answers: ["#include", "#define"]
            },
            {
                topic: "String Functions",
                text: "___ copies a string to destination. ___ returns the length of a string.",
                answers: ["strcpy", "strlen"]
            }
        ]
    },
    cpp: {
        name: "C++",
        prompts: [
            {
                topic: "Constructors",
                text: "A ___ constructor creates a copy of an object. A ___ constructor transfers ownership of resources.",
                answers: ["copy", "move"]
            },
            {
                topic: "Virtual Functions",
                text: "___ functions enable runtime polymorphism. A ___ virtual function has no implementation and makes class abstract.",
                answers: ["Virtual", "pure"]
            },
            {
                topic: "Smart Pointers",
                text: "___ allows only one owner while shared_ptr allows ___ ownership through reference counting.",
                answers: ["unique_ptr", "multiple"]
            },
            {
                topic: "Templates",
                text: "Function templates use ___ or class keyword for type parameters. Template ___ provides specific implementation.",
                answers: ["typename", "specialization"]
            },
            {
                topic: "STL Vector",
                text: "vector provides dynamic array with ___ access. Use ___ to add element at end.",
                answers: ["random", "push_back"]
            },
            {
                topic: "Operator Overloading",
                text: "Operators can be overloaded using ___ keyword. Assignment operator should return a ___ to the object.",
                answers: ["operator", "reference"]
            },
            {
                topic: "Inheritance Types",
                text: "___ inheritance makes public members of base class public in derived. ___ inheritance makes them private.",
                answers: ["Public", "Private"]
            },
            {
                topic: "Lambda Expressions",
                text: "Lambda syntax starts with ___ for capture list. Use ___ to capture all variables by reference.",
                answers: ["[]", "&"]
            }
        ]
    }
};
