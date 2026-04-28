"use client";

import { useState } from "react";

type Task = {
  id: number;
  text: string;
  done: boolean;
};

type Filter = "all" | "active" | "completed";

export default function TodoPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [nextId, setNextId] = useState(1);

  function addTask() {
    const val = input.trim();
    if (!val) return;
    setTasks((prev) => [...prev, { id: nextId, text: val, done: false }]);
    setNextId((n) => n + 1);
    setInput("");
  }

  function toggle(id: number) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }

  function del(id: number) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const filtered = tasks.filter((t) =>
    filter === "all" ? true : filter === "active" ? !t.done : t.done,
  );

  return (
    <div style={styles.body}>
      <div style={styles.card}>
        <h1 style={styles.title}>To-Do list</h1>

        {/* Input row */}
        <div style={styles.inputRow}>
          <input
            style={styles.input}
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button style={styles.btnAdd} onClick={addTask}>
            Add
          </button>
        </div>

        {/* Filter tabs */}
        <div style={styles.filters}>
          {(["all", "active", "completed"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                ...(filter === f ? styles.filterBtnActive : {}),
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Task list */}
        <div style={styles.taskList}>
          {filtered.length === 0 ? (
            <p style={styles.empty}>No tasks yet. Add one above!</p>
          ) : (
            filtered.map((t) => (
              <div key={t.id} style={styles.taskItem}>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggle(t.id)}
                  style={styles.checkbox}
                />
                <span
                  style={{
                    ...styles.taskText,
                    ...(t.done ? styles.taskTextDone : {}),
                  }}
                >
                  {t.text}
                </span>
                <button style={styles.btnDel} onClick={() => del(t.id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          Powered by{" "}
          <a href="#" style={styles.footerLink}>
            Pinecone academy
          </a>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: "#f9f9f9",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  card: {
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
    padding: "2rem 1.75rem 1.5rem",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "1.35rem",
    fontWeight: 700,
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: "1.25rem",
  },
  inputRow: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  input: {
    flex: 1,
    padding: "0.5rem 0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "0.875rem",
    color: "#374151",
    outline: "none",
  },
  btnAdd: {
    padding: "0.5rem 1rem",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "0.875rem",
    fontWeight: 500,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  filters: {
    display: "flex",
    gap: "0.4rem",
    marginBottom: "1rem",
  },
  filterBtn: {
    padding: "0.3rem 0.9rem",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    background: "white",
    fontSize: "0.8rem",
    color: "#374151",
    cursor: "pointer",
  },
  filterBtnActive: {
    background: "#3b82f6",
    borderColor: "#3b82f6",
    color: "white",
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "0.75rem",
  },
  taskItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    padding: "0.55rem 0.75rem",
    background: "#f9fafb",
    borderRadius: "8px",
    border: "1px solid #f3f4f6",
  },
  checkbox: {
    width: "15px",
    height: "15px",
    cursor: "pointer",
    flexShrink: 0,
    accentColor: "#3b82f6",
  },
  taskText: {
    flex: 1,
    fontSize: "0.875rem",
    color: "#374151",
  },
  taskTextDone: {
    textDecoration: "line-through",
    color: "#9ca3af",
  },
  btnDel: {
    padding: "0.25rem 0.65rem",
    background: "#fef2f2",
    color: "#ef4444",
    border: "1px solid #fecaca",
    borderRadius: "6px",
    fontSize: "0.78rem",
    cursor: "pointer",
    flexShrink: 0,
  },
  empty: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: "0.85rem",
    padding: "1.25rem 0",
  },
  footer: {
    textAlign: "center",
    fontSize: "0.75rem",
    color: "#9ca3af",
    marginTop: "1rem",
    paddingTop: "0.75rem",
    borderTop: "1px solid #f3f4f6",
  },
  footerLink: {
    color: "#3b82f6",
    textDecoration: "none",
  },
};
