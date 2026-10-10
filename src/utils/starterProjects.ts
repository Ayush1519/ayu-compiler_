import { CodeFile, SupportedLanguage } from '@/types/file';
import { generateFileId } from './fileStorage';

export interface ProjectTemplate {
  id: string;
  name: string;
  category: 'Web' | 'Scripts' | 'Frameworks' | 'Algorithms';
  language: SupportedLanguage;
  description: string;
  longDescription: string;
  icon: string;
  tags: string[];
  primaryFile: string;
  files: Array<{
    name: string;
    language: SupportedLanguage;
    content: string;
    description?: string;
  }>;
}

export const starterProjects: ProjectTemplate[] = [
  {
    id: 'javascript-starter',
    name: 'JavaScript Starter',
    category: 'Scripts',
    language: 'javascript',
    description: 'Modern JavaScript starter with utility functions, arrays, and async examples.',
    longDescription: 'A clean ES6+ JavaScript workspace with data manipulation, promise handling, object destructuring, and practical console output.',
    icon: '⚡',
    tags: ['ES6+', 'JavaScript', 'Async/Await', 'Utilities'],
    primaryFile: 'main.js',
    files: [
      {
        name: 'main.js',
        language: 'javascript',
        description: 'Main entry point demonstrating modern JS features',
        content: `// ⚡ AyuCompiler — Modern JavaScript Starter
console.log("🚀 Welcome to AyuCompiler JavaScript Workspace!\\n");

// 1. Data Structures & Transformation
const developers = [
  { name: "Alex", role: "Frontend", level: "Senior", xp: 95 },
  { name: "Sam", role: "Backend", level: "Lead", xp: 98 },
  { name: "Taylor", role: "Fullstack", level: "Mid", xp: 84 },
  { name: "Jordan", role: "DevOps", level: "Senior", xp: 91 }
];

console.log("📊 Developer Team Overview:");
console.table(developers);

// 2. High-performance calculations
const topPerformer = developers.reduce((prev, current) => 
  (prev.xp > current.xp) ? prev : current
);

console.log(\`\\n🏆 Top Performer: \${topPerformer.name} (\${topPerformer.role}) with \${topPerformer.xp} XP\`);

// 3. Asynchronous Workflow
async function simulateBuildPipeline() {
  console.log("\\n🔨 Initializing build pipeline...");
  const steps = ["Linting code", "Running unit tests", "Bundling modules", "Deploying preview"];
  
  for (const step of steps) {
    console.log(\`  ✔ \${step} complete\`);
  }
  return "✨ Build succeeded in 34ms";
}

simulateBuildPipeline().then(status => console.log(\`\\n\${status}\`));
`
      },
      {
        name: 'utils.js',
        language: 'javascript',
        description: 'Helper utilities for string and number manipulation',
        content: `// Helper utility library
export function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
`
      }
    ]
  },
  {
    id: 'python-basics',
    name: 'Python Basics',
    category: 'Scripts',
    language: 'python',
    description: 'Python 3 data structures, OOP classes, list comprehensions, and statistics.',
    longDescription: 'Explore modern Python programming with structured classes, data analysis functions, matrix math, and formatted terminal outputs.',
    icon: '🐍',
    tags: ['Python 3', 'OOP', 'Data Analysis', 'Math'],
    primaryFile: 'main.py',
    files: [
      {
        name: 'main.py',
        language: 'python',
        description: 'Python statistics and object-oriented demo',
        content: `# 🐍 AyuCompiler — Python Workspace
import math

class DataAnalyzer:
    def __init__(self, name, numbers):
        self.name = name
        self.numbers = numbers

    def mean(self):
        return sum(self.numbers) / len(self.numbers) if self.numbers else 0

    def variance(self):
        m = self.mean()
        return sum((x - m) ** 2 for x in self.numbers) / len(self.numbers)

    def std_dev(self):
        return math.sqrt(self.variance())

    def summary(self):
        return {
            "Count": len(self.numbers),
            "Min": min(self.numbers),
            "Max": max(self.numbers),
            "Mean": round(self.mean(), 2),
            "StdDev": round(self.std_dev(), 2)
        }

def main():
    print("=" * 45)
    print(" 🚀 AyuCompiler Python Data Engine")
    print("=" * 45)

    dataset = [12, 19, 24, 38, 45, 52, 67, 88, 91, 105]
    analyzer = DataAnalyzer("System Metrics", dataset)
    
    print(f"\\nAnalyzing Dataset: {dataset}")
    print("\\nComputed Statistical Summary:")
    for key, value in analyzer.summary().items():
        print(f"  • {key:8}: {value}")

    # List comprehension demo
    filtered = [x for x in dataset if x > 40]
    print(f"\\nFiltered (>40): {filtered}")
    print("\\n✔ Execution finished successfully.")

if __name__ == "__main__":
    main()
`
      }
    ]
  },
  {
    id: 'html-css-website',
    name: 'HTML & CSS Website',
    category: 'Web',
    language: 'html',
    description: 'Complete multi-file responsive web app with HTML5, CSS3 neon styling, and JavaScript.',
    longDescription: 'A production-grade landing widget with glassmorphism, responsive navigation, dark theme UI cards, and interactive live preview.',
    icon: '🌐',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Live Preview', 'Responsive'],
    primaryFile: 'index.html',
    files: [
      {
        name: 'index.html',
        language: 'html',
        description: 'Main HTML file for live browser rendering',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AyuCompiler Web App</title>
</head>
<body>
  <div class="app-container">
    <header class="app-header">
      <div class="badge">AyuCompiler Live</div>
      <h1>Interactive Web Dashboard</h1>
      <p class="subtitle">Edit HTML, CSS, or JS in the workspace to see instant live preview updates.</p>
    </header>

    <main class="grid-layout">
      <div class="card">
        <div class="card-icon">⚡</div>
        <h3>Lightning Fast</h3>
        <p>Instant hot-reloading with zero bundling lag.</p>
        <button class="btn btn-primary" id="btn-action">Click Me</button>
      </div>

      <div class="card">
        <div class="card-icon">🎨</div>
        <h3>Modern Styling</h3>
        <p>Glassmorphic dark design with vibrant electric accents.</p>
        <button class="btn btn-secondary" id="btn-toggle">Toggle Neon</button>
      </div>

      <div class="card">
        <div class="card-icon">📊</div>
        <h3>Live Stats</h3>
        <div class="stat-box">
          <span class="stat-number" id="counter">42</span>
          <span class="stat-label">Active Events</span>
        </div>
      </div>
    </main>

    <footer class="app-footer">
      <span>Built in AyuCompiler Browser Workspace</span>
    </footer>
  </div>
</body>
</html>`
      },
      {
        name: 'styles.css',
        language: 'css',
        description: 'Modern glassmorphism and electric accent stylesheet',
        content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background: radial-gradient(circle at top, #0f172a 0%, #020617 100%);
  color: #f8fafc;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
}

.app-container {
  width: 100%;
  max-width: 800px;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(14, 165, 233, 0.15);
}

.app-header {
  text-align: center;
  margin-bottom: 2rem;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #38bdf8;
  background: rgba(14, 165, 233, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 9999px;
  margin-bottom: 1rem;
}

h1 {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #38bdf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #94a3b8;
  font-size: 0.95rem;
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.card {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s, border-color 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 189, 248, 0.4);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.card h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.card p {
  font-size: 0.85rem;
  color: #94a3b8;
  margin-bottom: 1rem;
  flex: 1;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.btn-primary {
  background: #0284c7;
  color: white;
  box-shadow: 0 0 15px rgba(2, 132, 199, 0.4);
}

.btn-primary:hover {
  background: #0369a1;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #f8fafc;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: #38bdf8;
}

.stat-label {
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
}

.app-footer {
  text-align: center;
  font-size: 0.8rem;
  color: #64748b;
  border-top: 1px solid rgba(148, 163, 184, 0.1);
  padding-top: 1.25rem;
}
`
      },
      {
        name: 'app.js',
        language: 'javascript',
        description: 'Interactive button handlers and animation events',
        content: `// Interactive JavaScript logic
document.addEventListener('DOMContentLoaded', () => {
  const btnAction = document.getElementById('btn-action');
  const btnToggle = document.getElementById('btn-toggle');
  const counter = document.getElementById('counter');
  
  let count = 42;

  if (btnAction) {
    btnAction.addEventListener('click', () => {
      count += 1;
      counter.textContent = count;
      btnAction.textContent = "Clicked! (" + count + ")";
    });
  }

  if (btnToggle) {
    let neonActive = false;
    btnToggle.addEventListener('click', () => {
      neonActive = !neonActive;
      document.body.style.filter = neonActive ? 'hue-rotate(90deg)' : 'none';
      btnToggle.textContent = neonActive ? "Reset Tint" : "Toggle Neon";
    });
  }
});
`
      }
    ]
  },
  {
    id: 'portfolio-website',
    name: 'Portfolio Website',
    category: 'Web',
    language: 'html',
    description: 'Sleek developer portfolio showcasing bio, skills matrix, projects grid, and contact modal.',
    longDescription: 'Showcase your work with a responsive developer portfolio containing hero section, tech stack badges, featured project cards, and social links.',
    icon: '💼',
    tags: ['Portfolio', 'HTML5', 'CSS Grid', 'Developer Site'],
    primaryFile: 'index.html',
    files: [
      {
        name: 'index.html',
        language: 'html',
        description: 'Developer portfolio homepage',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer Portfolio — AyuCompiler</title>
</head>
<body>
  <div class="portfolio">
    <nav class="nav">
      <div class="logo">✦ Developer.dev</div>
      <div class="links">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#contact" class="cta-link">Contact</a>
      </div>
    </nav>

    <header class="hero">
      <span class="status-dot">Available for new opportunities</span>
      <h1>Senior Full-Stack Engineer & Designer</h1>
      <p>Building high-performance web applications, developer tooling, and distributed systems.</p>
    </header>

    <section id="projects" class="section">
      <h2>Featured Projects</h2>
      <div class="projects-grid">
        <div class="project-card">
          <div class="project-tag">TypeScript • React</div>
          <h3>AyuCompiler Cloud IDE</h3>
          <p>Next-generation browser compiler and development environment.</p>
        </div>
        <div class="project-card">
          <div class="project-tag">Go • Docker</div>
          <h3>Distributed Task Queue</h3>
          <p>High-throughput job orchestration system handling 10k ops/sec.</p>
        </div>
      </div>
    </section>
  </div>
</body>
</html>`
      },
      {
        name: 'styles.css',
        language: 'css',
        description: 'Modern minimalist dark portfolio styling',
        content: `* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  background-color: #0b0f19;
  color: #e2e8f0;
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.6;
}
.portfolio { max-width: 900px; margin: 0 auto; padding: 2rem 1.5rem; }
.nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4rem; }
.logo { font-weight: 700; font-size: 1.25rem; color: #38bdf8; }
.links a { color: #94a3b8; text-decoration: none; margin-left: 1.5rem; font-size: 0.9rem; transition: color 0.2s; }
.links a:hover { color: #fff; }
.links .cta-link { background: #0284c7; color: white; padding: 0.4rem 1rem; border-radius: 9999px; }
.hero { margin-bottom: 4rem; }
.status-dot { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: #4ade80; background: rgba(74, 222, 128, 0.1); padding: 0.3rem 0.8rem; border-radius: 999px; margin-bottom: 1.5rem; }
.hero h1 { font-size: 2.75rem; font-weight: 800; line-height: 1.2; margin-bottom: 1rem; color: #fff; }
.hero p { font-size: 1.2rem; color: #94a3b8; max-width: 650px; }
.section h2 { font-size: 1.5rem; margin-bottom: 1.5rem; color: #fff; }
.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
.project-card { background: #131b2e; border: 1px solid #1e293b; border-radius: 12px; padding: 1.5rem; transition: border-color 0.2s; }
.project-card:hover { border-color: #38bdf8; }
.project-tag { font-size: 0.75rem; color: #38bdf8; font-weight: 600; text-transform: uppercase; margin-bottom: 0.5rem; }
.project-card h3 { font-size: 1.2rem; margin-bottom: 0.5rem; color: #fff; }
.project-card p { font-size: 0.9rem; color: #94a3b8; }
`
      }
    ]
  },
  {
    id: 'react-starter',
    name: 'React Starter',
    category: 'Frameworks',
    language: 'javascript',
    description: 'React component architecture, hook state management, and declarative UI.',
    longDescription: 'Learn and experiment with React concepts including state management, props, lifecycle hooks, conditional rendering, and UI composition.',
    icon: '⚛️',
    tags: ['React', 'Hooks', 'Components', 'Virtual DOM'],
    primaryFile: 'App.js',
    files: [
      {
        name: 'App.js',
        language: 'javascript',
        description: 'React functional component simulation',
        content: `// ⚛️ AyuCompiler — React Component Workflow Simulation
console.log("⚛️ React Architecture Starter\\n");

// 1. Simulating React Component State & Render Cycle
class SimpleReactComponent {
  constructor(props) {
    this.props = props;
    this.state = {
      count: 0,
      items: ["Explore AyuCompiler", "Write React Code", "Deploy Live Preview"]
    };
  }

  setState(updater) {
    const newState = typeof updater === 'function' ? updater(this.state) : updater;
    this.state = { ...this.state, ...newState };
    this.render();
  }

  addItem(text) {
    this.setState(prev => ({
      items: [...prev.items, text],
      count: prev.count + 1
    }));
  }

  render() {
    console.log("------------------------------------------");
    console.log(\`📦 Render Component <\${this.props.title}/>\`);
    console.log(\`   State: count = \${this.state.count}\`);
    console.log("   Todo Items:");
    this.state.items.forEach((item, index) => {
      console.log(\`     [\${index + 1}] \${item}\`);
    });
    console.log("------------------------------------------\\n");
  }
}

// 2. Component Lifecycle
const app = new SimpleReactComponent({ title: "TaskDashboard" });
app.render();

// Simulate User Actions
console.log("👉 User clicked 'Add Task' button...");
app.addItem("Test Judge0 multi-language execution");

console.log("👉 User clicked 'Add Task' button again...");
app.addItem("Export complete project zip");
`
      }
    ]
  },
  {
    id: 'algorithm-practice',
    name: 'Algorithm Practice',
    category: 'Algorithms',
    language: 'javascript',
    description: 'Data structures & algorithms: Binary Search, Two Pointers, LRU Cache & Sort benchmarks.',
    longDescription: 'Benchmark and practice standard computer science algorithms with automated test cases, performance timers, and big-O comparisons.',
    icon: '🧠',
    tags: ['Algorithms', 'Data Structures', 'Search', 'Sorting', 'Big-O'],
    primaryFile: 'algorithms.js',
    files: [
      {
        name: 'algorithms.js',
        language: 'javascript',
        description: 'Algorithm implementations and benchmark tests',
        content: `// 🧠 AyuCompiler — Algorithm Practice & Benchmarking
console.log("⚡ Algorithm Practice Suite\\n");

// 1. Binary Search — O(log n)
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let steps = 0;

  while (left <= right) {
    steps++;
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return { index: mid, steps };
    }
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return { index: -1, steps };
}

// 2. QuickSort — O(n log n)
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 3. Test & Benchmark
const sortedList = Array.from({ length: 1000 }, (_, i) => (i + 1) * 2);
const target = 1482;

console.log(\`🔍 Searching for \${target} in array of \${sortedList.length} elements:\`);
const searchResult = binarySearch(sortedList, target);
console.log(\`   Found at index: \${searchResult.index} in only \${searchResult.steps} operations!\`);

const unsorted = [64, 34, 25, 12, 22, 11, 90, 88, 45, 1, 73];
console.log("\\n📊 Unsorted Array:", unsorted);
const sorted = quickSort(unsorted);
console.log("✔ QuickSorted Array:", sorted);
`
      }
    ]
  }
];

export function getStarterProjectFiles(templateId: string): CodeFile[] {
  const template = starterProjects.find(t => t.id === templateId);
  if (!template) return [];

  return template.files.map(f => ({
    id: generateFileId(),
    name: f.name,
    language: f.language,
    content: f.content,
    description: f.description || '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    parentId: null
  }));
}


