![image](https://github.com/user-attachments/assets/baf83ab4-8440-47da-8be7-0d300f5a4a71)


# DSA Typing Practice

A modern, interactive web application designed to help developers improve their typing speed while learning Data Structures and Algorithms concepts. This project combines typing practice with technical content to create an engaging learning experience.

##  Learning Objectives

- **Typing Proficiency**: Improve typing speed and accuracy while working with technical content
- **DSA Knowledge**: Learn and reinforce understanding of key Data Structures and Algorithms concepts
- **Problem-Solving Skills**: Practice common problem-solving patterns and techniques
- **System Design Understanding**: Learn fundamental system design concepts and patterns

##  Content Categories

The application includes comprehensive content across four main categories:

### Data Structures (15 Topics)

- Fundamental structures like Hash Tables, Linked Lists, and Stacks
- Advanced structures including AVL Trees, Red-Black Trees, and B-Trees
- Specialized structures like Tries, Segment Trees, and Fenwick Trees

### Algorithms (15 Topics)

- Sorting algorithms (QuickSort, Merge Sort)
- Search algorithms (Binary Search, A\* Search)
- Graph algorithms (Dijkstra's, BFS, DFS)
- Advanced algorithms (Dynamic Programming, Topological Sort)

### System Design (7 Topics)

- Load Balancing and Caching
- Database Indexing and Sharding
- Microservices Architecture
- Message Queues and Rate Limiting

### Problem Solving (7 Topics)

- Common techniques (Sliding Window, Two Pointers)
- Algorithm applications (Binary Search, Greedy Algorithms)
- Advanced patterns (Backtracking, Floyd Cycle Finding)

##  Features

- **Real-time Performance Tracking**

  - Words Per Minute (WPM) calculation
  - Accuracy measurement
  - Error highlighting
  - Progress tracking

- **Customizable Learning Environment**

  - Multiple themes (Light, Dark, Medium)
  - Various font options (Monospace, Sans Serif, Serif)
  - Zen mode for focused practice
  - Lowercase mode for code practice

- **User Experience**
  - Responsive design
  - Keyboard shortcuts
  - Collapsible topic menu
  - Offline support with fallback data

##  Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/dsa-typing-practice.git
   ```

2. Open `index.html` in your browser or use a local server:

   ```bash
   # Using Python
   python -m http.server

   # Using Node.js
   npx serve
   ```

3. Start practicing!

##  Usage

- Use `Ctrl+P` to open settings
- Use `Ctrl+M` to toggle the topic menu
- Click on any topic to start practicing
- Use the "Next Text" button to get a new topic

## 🛠️ Technical Implementation

- Pure HTML, CSS, and JavaScript
- No external dependencies
- Modular code structure
- Offline-first approach with fallback data
- Responsive design for all devices

## Contributing

Contributions are welcome. Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

##  Acknowledgments

- Inspired by [MonkeyType](https://monkeytype.com/)'s clean interface and typing experience
- Built to help developers improve both typing speed and DSA knowledge
- Combines the best of typing practice tools with technical learning
- Special thanks to the open-source community for inspiration and resources

## API Usage

This application fetches typing exercises from the [DSA Typing Practice API](https://dsa-typing-api.onrender.com/api-docs/). As described in the [API's documentation](https://github.com/KohiiTM/DSA-Typing-API), the key endpoints used are:

- `GET /api/topics`: Fetches the full list of available DSA topics.
- `GET /api/topics/random`: Fetches a random topic for practice.
- `GET /api/categories`: Fetches the list of available categories for topics.

The application uses these endpoints to load typing content dynamically.

## Technologies Used

- HTML
- CSS
- JavaScript
- Fetch API for interacting with the backend.
- `localStorage` for saving user preferences (theme, font, modes).

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
