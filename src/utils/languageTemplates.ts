import { SupportedLanguage } from '@/types/file';

export const languageTemplates: Record<SupportedLanguage, string> = {
  javascript: `// JavaScript Code
console.log("Hello from AyuCompiler!");

function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Developer"));`,

  typescript: `// TypeScript Code
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Developer",
  age: 25
};

console.log(\`Hello, \${user.name}!\`);`,

  python: `# Python Code
def greet(name):
    return f"Hello, {name}!"

def main():
    print("Hello from AyuCompiler!")
    print(greet("Developer"))

if __name__ == "__main__":
    main()`,

  java: `// Java Code
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from AyuCompiler!");
        System.out.println(greet("Developer"));
    }
    
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
}`,

  cpp: `// C++ Code
#include <iostream>
#include <string>

std::string greet(std::string name) {
    return "Hello, " + name + "!";
}

int main() {
    std::cout << "Hello from AyuCompiler!" << std::endl;
    std::cout << greet("Developer") << std::endl;
    return 0;
}`,

  c: `// C Code
#include <stdio.h>

void greet(char* name) {
    printf("Hello, %s!\\n", name);
}

int main() {
    printf("Hello from AyuCompiler!\\n");
    greet("Developer");
    return 0;
}`,

  csharp: `// C# Code
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello from AyuCompiler!");
        Console.WriteLine(Greet("Developer"));
    }
    
    static string Greet(string name) {
        return $"Hello, {name}!";
    }
}`,

  go: `// Go Code
package main

import "fmt"

func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}

func main() {
    fmt.Println("Hello from AyuCompiler!")
    fmt.Println(greet("Developer"))
}`,

  swift: `// Swift Code
func greet(name: String) -> String {
    return "Hello, \\(name)!"
}

print("Hello from AyuCompiler!")
print(greet(name: "Developer"))`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AyuCompiler</title>
</head>
<body>
    <h1>Hello from AyuCompiler!</h1>
    <p>Start building amazing things.</p>
</body>
</html>`,

  css: `/* CSS Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 3rem;
  text-align: center;
}`,

  ruby: `# Ruby Code
def greet(name)
  "Hello, #{name}!"
end

def main
  puts "Hello from AyuCompiler!"
  puts greet("Developer")
end

main`,

  rust: `// Rust Code
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    println!("Hello from AyuCompiler!");
    println!("{}", greet("Developer"));
}`,

  php: `<?php
// PHP Code
function greet($name) {
    return "Hello, $name!";
}

echo "Hello from AyuCompiler!\\n";
echo greet("Developer") . "\\n";
?>`
};

export const getLanguageIcon = (language: SupportedLanguage): string => {
  const icons: Record<SupportedLanguage, string> = {
    javascript: '🟨',
    typescript: '🔷',
    python: '🐍',
    java: '☕',
    cpp: '⚡',
    c: '🔧',
    csharp: '💠',
    go: '🐹',
    swift: '🦅',
    html: '🌐',
    css: '🎨',
    ruby: '💎',
    rust: '🦀',
    php: '🐘'
  };
  return icons[language] || '📄';
};

export const getLanguageDisplayName = (language: SupportedLanguage): string => {
  const names: Record<SupportedLanguage, string> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    python: 'Python',
    java: 'Java',
    cpp: 'C++',
    c: 'C',
    csharp: 'C#',
    go: 'Go',
    swift: 'Swift',
    html: 'HTML',
    css: 'CSS',
    ruby: 'Ruby',
    rust: 'Rust',
    php: 'PHP'
  };
  return names[language] || language;
};


