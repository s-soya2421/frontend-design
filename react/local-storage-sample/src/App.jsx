import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "library-crud-items-v1";
const STATUS_OPTIONS = [
  { value: "unread", label: "Unread" },
  { value: "reading", label: "Reading" },
  { value: "done", label: "Finished" },
];

const freshDraft = () => ({
  title: "",
  author: "",
  status: "unread",
});

const labelForStatus = (status) => {
  const match = STATUS_OPTIONS.find((option) => option.value === status);
  return match ? match.label : "Unknown";
};

const formatDate = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const makeId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const loadItems = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

export default function App() {
  const [items, setItems] = useState(loadItems);
  const [draft, setDraft] = useState(freshDraft);
  const [editingId, setEditingId] = useState(null);
  const [editingDraft, setEditingDraft] = useState(freshDraft);
  const [query, setQuery] = useState("");
  const [addError, setAddError] = useState("");
  const [editError, setEditError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      // If storage is blocked, keep state in memory only.
    }
  }, [items]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const lowered = query.toLowerCase();
    return items.filter((item) => {
      return (
        item.title.toLowerCase().includes(lowered) ||
        item.author.toLowerCase().includes(lowered)
      );
    });
  }, [items, query]);

  const stats = useMemo(() => {
    const total = items.length;
    const reading = items.filter((item) => item.status === "reading").length;
    const finished = items.filter((item) => item.status === "done").length;
    return { total, reading, finished };
  }, [items]);

  const handleAdd = (event) => {
    event.preventDefault();
    const title = draft.title.trim();
    if (!title) {
      setAddError("Title is required.");
      return;
    }
    const nextItem = {
      id: makeId(),
      title,
      author: draft.author.trim(),
      status: draft.status,
      createdAt: new Date().toISOString(),
    };
    setItems((prev) => [nextItem, ...prev]);
    setDraft(freshDraft());
    setAddError("");
  };

  const handleDelete = (id) => {
    const target = items.find((item) => item.id === id);
    if (!target) return;
    const ok = window.confirm(`Delete "${target.title}"?`);
    if (!ok) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditingDraft(freshDraft());
      setEditError("");
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditingDraft({
      title: item.title,
      author: item.author,
      status: item.status,
    });
    setEditError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingDraft(freshDraft());
    setEditError("");
  };

  const saveEdit = (id) => {
    const title = editingDraft.title.trim();
    if (!title) {
      setEditError("Title is required.");
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              title,
              author: editingDraft.author.trim(),
              status: editingDraft.status,
            }
          : item
      )
    );
    cancelEdit();
  };

  const clearLibrary = () => {
    if (!items.length) return;
    const ok = window.confirm("Clear the entire library?");
    if (!ok) return;
    setItems([]);
    cancelEdit();
  };

  return (
    <div className="page">
      <header className="hero">
        <div>
          <div className="badge">Local Storage</div>
          <h1>Local Library</h1>
          <p>
            A lightweight CRUD sample built with React and browser localStorage.
            Add, edit, and track the books you want to remember.
          </p>
        </div>
        <div className="stat">
          <span>Stored books</span>
          <strong>{stats.total}</strong>
        </div>
      </header>

      <main className="grid">
        <section className="panel">
          <h2>Add a book</h2>
          <form className="form" onSubmit={handleAdd}>
            <label>
              Title
              <input
                type="text"
                value={draft.title}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, title: event.target.value }))
                }
                placeholder="The Name of the Rose"
              />
            </label>
            <label>
              Author
              <input
                type="text"
                value={draft.author}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, author: event.target.value }))
                }
                placeholder="Umberto Eco"
              />
            </label>
            <label>
              Status
              <select
                value={draft.status}
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, status: event.target.value }))
                }
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            {addError ? <p className="error">{addError}</p> : null}
            <div className="actions">
              <button className="primary" type="submit">
                Add book
              </button>
              <button
                className="ghost"
                type="button"
                onClick={() => setDraft(freshDraft())}
              >
                Reset
              </button>
            </div>
          </form>

          <div className="subpanel">
            <h3>Library stats</h3>
            <div className="stats">
              <div className="stat">
                <span>Total</span>
                <strong>{stats.total}</strong>
              </div>
              <div className="stat">
                <span>Reading</span>
                <strong>{stats.reading}</strong>
              </div>
              <div className="stat">
                <span>Finished</span>
                <strong>{stats.finished}</strong>
              </div>
            </div>
            <button
              className="danger"
              type="button"
              onClick={clearLibrary}
              disabled={!items.length}
            >
              Clear library
            </button>
          </div>
        </section>

        <section className="panel list-panel">
          <div className="list-header">
            <h2>Catalog</h2>
            <input
              className="search"
              type="search"
              placeholder="Search title or author"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="list">
            {filteredItems.length ? (
              filteredItems.map((item) => {
                const isEditing = editingId === item.id;
                return (
                  <article
                    key={item.id}
                    className={`card ${isEditing ? "editing" : ""}`}
                  >
                    <div className="card-meta">
                      <span className={`chip ${item.status}`}>
                        {labelForStatus(item.status)}
                      </span>
                      <span>{formatDate(item.createdAt)}</span>
                    </div>
                    {isEditing ? (
                      <div className="form">
                        <label>
                          Title
                          <input
                            type="text"
                            value={editingDraft.title}
                            onChange={(event) =>
                              setEditingDraft((prev) => ({
                                ...prev,
                                title: event.target.value,
                              }))
                            }
                          />
                        </label>
                        <label>
                          Author
                          <input
                            type="text"
                            value={editingDraft.author}
                            onChange={(event) =>
                              setEditingDraft((prev) => ({
                                ...prev,
                                author: event.target.value,
                              }))
                            }
                          />
                        </label>
                        <label>
                          Status
                          <select
                            value={editingDraft.status}
                            onChange={(event) =>
                              setEditingDraft((prev) => ({
                                ...prev,
                                status: event.target.value,
                              }))
                            }
                          >
                            {STATUS_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </label>
                        {editError ? <p className="error">{editError}</p> : null}
                      </div>
                    ) : (
                      <div>
                        <h3>{item.title}</h3>
                        <p className="muted">
                          {item.author ? item.author : "Unknown author"}
                        </p>
                      </div>
                    )}
                    <div className="card-actions">
                      {isEditing ? (
                        <>
                          <button
                            className="primary"
                            type="button"
                            onClick={() => saveEdit(item.id)}
                          >
                            Save
                          </button>
                          <button
                            className="ghost"
                            type="button"
                            onClick={cancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="ghost"
                            type="button"
                            onClick={() => startEdit(item)}
                          >
                            Edit
                          </button>
                          <button
                            className="danger"
                            type="button"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="empty">
                No books yet. Add your first one to get started.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
