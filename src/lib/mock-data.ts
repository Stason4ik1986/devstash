export const currentUser = {
  id: "user_1",
  name: "John Doe",
  email: "john@example.com",
  image: null,
  isPro: false,
};

export const itemTypes = [
  { id: "type_snippet", name: "Snippets", icon: "Code", color: "#3b82f6", isSystem: true, count: 24 },
  { id: "type_prompt", name: "Prompts", icon: "Sparkles", color: "#8b5cf6", isSystem: true, count: 18 },
  { id: "type_command", name: "Commands", icon: "Terminal", color: "#f97316", isSystem: true, count: 15 },
  { id: "type_note", name: "Notes", icon: "StickyNote", color: "#fde047", isSystem: true, count: 12 },
  { id: "type_file", name: "Files", icon: "File", color: "#6b7280", isSystem: true, count: 5 },
  { id: "type_image", name: "Images", icon: "Image", color: "#ec4899", isSystem: true, count: 3 },
  { id: "type_link", name: "Links", icon: "Link", color: "#10b981", isSystem: true, count: 8 },
];

export const collections = [
  {
    id: "col_react",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    isFavorite: true,
    itemCount: 12,
    typeIds: ["type_snippet", "type_note", "type_link"],
  },
  {
    id: "col_python",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    isFavorite: false,
    itemCount: 8,
    typeIds: ["type_snippet", "type_note"],
  },
  {
    id: "col_context",
    name: "Context Files",
    description: "AI context files for projects",
    isFavorite: true,
    itemCount: 5,
    typeIds: ["type_file", "type_note"],
  },
  {
    id: "col_interview",
    name: "Interview Prep",
    description: "Technical interview preparation",
    isFavorite: false,
    itemCount: 24,
    typeIds: ["type_note", "type_snippet", "type_link", "type_prompt"],
  },
  {
    id: "col_git",
    name: "Git Commands",
    description: "Frequently used git commands",
    isFavorite: true,
    itemCount: 15,
    typeIds: ["type_command", "type_note"],
  },
  {
    id: "col_ai",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    isFavorite: false,
    itemCount: 18,
    typeIds: ["type_prompt", "type_snippet", "type_note"],
  },
];

export const items = [
  {
    id: "item_1",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    typeId: "type_snippet",
    collectionId: "col_react",
    language: "typescript",
    content: `import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}`,
    tags: ["react", "auth", "hooks"],
    isFavorite: true,
    isPinned: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "item_2",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    typeId: "type_snippet",
    collectionId: "col_react",
    language: "typescript",
    content: `export async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url)
      if (res.ok) return res
    } catch {}
    await new Promise((r) => setTimeout(r, 2 ** i * 1000))
  }
  throw new Error('Request failed after retries')
}`,
    tags: ["fetch", "error-handling", "api"],
    isFavorite: false,
    isPinned: true,
    createdAt: "2024-01-12T10:00:00Z",
    updatedAt: "2024-01-12T10:00:00Z",
  },
  {
    id: "item_3",
    title: "Undo last commit",
    description: "Undo the last commit but keep the changes staged",
    typeId: "type_command",
    collectionId: "col_git",
    language: "bash",
    content: "git reset --soft HEAD~1",
    tags: ["git"],
    isFavorite: true,
    isPinned: false,
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
  },
  {
    id: "item_4",
    title: "Code Review Prompt",
    description: "Prompt for a thorough AI code review",
    typeId: "type_prompt",
    collectionId: "col_ai",
    language: null,
    content:
      "Review the following code for bugs, security issues and performance problems. Suggest concrete fixes.",
    tags: ["ai", "review"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2024-01-08T10:00:00Z",
    updatedAt: "2024-01-08T10:00:00Z",
  },
  {
    id: "item_5",
    title: "List comprehension examples",
    description: "Common Python list comprehension patterns",
    typeId: "type_snippet",
    collectionId: "col_python",
    language: "python",
    content: `squares = [x ** 2 for x in range(10)]
evens = [x for x in nums if x % 2 == 0]
pairs = [(a, b) for a in xs for b in ys]`,
    tags: ["python", "lists"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2024-01-05T10:00:00Z",
    updatedAt: "2024-01-05T10:00:00Z",
  },
  {
    id: "item_6",
    title: "React Docs",
    description: "Official React documentation",
    typeId: "type_link",
    collectionId: "col_interview",
    language: null,
    content: "https://react.dev",
    tags: ["react", "docs"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2024-01-03T10:00:00Z",
    updatedAt: "2024-01-03T10:00:00Z",
  },
];
