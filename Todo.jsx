import React, { useState, useEffect, useRef } from "react";

const styles = {
  body: {
    backgroundColor: "#fff9db",
    minHeight: "100vh",
    margin: 0,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007acc",
    padding: "1rem 2rem",
    color: "white",
    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
    // Mobile adjustment for padding
    "@media (max-width: 600px)": {
      padding: "0.8rem 1rem",
    },
  },
  appName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    // Mobile adjustment for font size
    "@media (max-width: 600px)": {
      fontSize: "1.2rem",
    },
  },
  navButtons: {
    display: "flex",
    gap: "1rem",
    // Mobile adjustment for gap
    "@media (max-width: 600px)": {
      gap: "0.5rem",
    },
  },
  navButton: {
    backgroundColor: "#b45309",
    border: "none",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#92400e",
    },
    // Mobile adjustment for padding and font size
    "@media (max-width: 600px)": {
      padding: "0.4rem 0.8rem",
      fontSize: "0.85rem",
    },
  },
  tasksContainer: {
    padding: "2rem",
    display: "grid",
    // Default for larger screens: fit multiple cards
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "0.8rem",
    // Mobile adjustment: stack cards in a single column or adjust minmax
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr", // Stack cards vertically
      padding: "1rem", // Less padding on mobile
      justifyItems: "center", // Center cards in the single column
    },
  },
  taskCard: {
    backgroundColor: "#cce4f7",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "200px", // Fixed width
    height: "200px", // Fixed height, making it a square
    overflow: "hidden",
    position: "relative",
    // Mobile adjustment: Make cards take full width but limit height for readability
    "@media (max-width: 600px)": {
      width: "90%", // Take 90% of the parent width
      height: "auto", // Allow height to adjust based on content
      minHeight: "180px", // Ensure a minimum height for all cards
      maxWidth: "300px", // Prevent cards from getting too wide on slightly larger phones
    },
  },
  taskTitle: {
    margin: "0 0 0.4rem 0",
    fontWeight: "700",
    color: "#1a3d7c",
    userSelect: "none",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    // Mobile adjustment for font size
    "@media (max-width: 600px)": {
      fontSize: "1.1rem",
    },
  },
  taskDesc: {
    margin: "0 0 0.6rem 0",
    color: "#2e4f8b",
    fontSize: "0.9rem",
    flexGrow: 1,
    userSelect: "none",
    display: "-webkit-box",
    "-webkit-line-clamp": "3",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    // Mobile adjustment for line clamp (allow more lines since height is auto)
    "@media (max-width: 600px)": {
      "-webkit-line-clamp": "4", // Allow more lines on mobile
    },
  },
  taskInfoSmall: {
    fontSize: "0.8rem",
    fontWeight: "600",
    color: "#27496d",
    marginBottom: "0.2rem",
    userSelect: "none",
    // Mobile adjustment for font size
    "@media (max-width: 600px)": {
      fontSize: "0.75rem",
    },
  },
  buttonsRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "auto",
    paddingTop: "0.5rem",
    borderTop: "1px solid rgba(0, 122, 204, 0.2)",
  },
  cardButton: {
    backgroundColor: "#007acc",
    border: "none",
    color: "white",
    padding: "0.3rem 0.6rem",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.8rem",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#005f99",
    },
    // Mobile adjustment for padding and font size
    "@media (max-width: 600px)": {
      padding: "0.3rem 0.5rem",
      fontSize: "0.75rem",
    },
  },
  cardButtonDelete: {
    backgroundColor: "#d9534f",
    "&:hover": {
      backgroundColor: "#c0392b",
    },
  },
  timerContainer: {
    marginTop: "0.5rem",
    fontWeight: "600",
    color: "#007acc",
    fontFamily: "monospace",
    fontSize: "1rem",
    userSelect: "none",
    textAlign: "center",
    // Mobile adjustment for font size
    "@media (max-width: 600px)": {
      fontSize: "0.9rem",
    },
  },
  editForm: {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
    marginTop: "0.5rem",
  },
  formControl: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.4rem",
    fontWeight: "600",
    color: "#333",
  },
  input: {
    padding: "0.6rem 0.8rem",
    borderRadius: "8px",
    border: "1.5px solid #007acc",
    fontSize: "1rem",
    width: "100%",
    boxSizing: "border-box",
    // Mobile adjustment for padding
    "@media (max-width: 600px)": {
      padding: "0.5rem 0.7rem",
      fontSize: "0.9rem",
    },
  },
  textarea: {
    padding: "0.6rem 0.8rem",
    borderRadius: "8px",
    border: "1.5px solid #007acc",
    fontSize: "1rem",
    resize: "vertical",
    width: "100%",
    boxSizing: "border-box",
    minHeight: "80px",
    // Mobile adjustment for padding and minHeight
    "@media (max-width: 600px)": {
      padding: "0.5rem 0.7rem",
      fontSize: "0.9rem",
      minHeight: "60px",
    },
  },
  select: {
    padding: "0.6rem 0.8rem",
    borderRadius: "8px",
    border: "1.5px solid #007acc",
    fontSize: "1rem",
    width: "100%",
    boxSizing: "border-box",
    // Mobile adjustment for padding
    "@media (max-width: 600px)": {
      padding: "0.5rem 0.7rem",
      fontSize: "0.9rem",
    },
  },
  saveBtn: {
    marginTop: "1.5rem",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "0.8rem 1.5rem",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "1.1rem",
    width: "100%",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#218838",
    },
    // Mobile adjustment for padding and font size
    "@media (max-width: 600px)": {
      padding: "0.6rem 1rem",
      fontSize: "1rem",
    },
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "2.5rem",
    width: "450px",
    maxWidth: "90vw", // Stays good for mobile
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    // Mobile adjustment for width and padding
    "@media (max-width: 600px)": {
      width: "95vw", // Take up more of the viewport width
      padding: "1.5rem", // Less padding
      borderRadius: "8px", // Slightly less rounded
    },
  },
  modalCloseBtn: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    fontSize: "1.8rem",
    fontWeight: "bold",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#888",
    "&:hover": {
      color: "#d9534f",
    },
    // Mobile adjustment for size and position
    "@media (max-width: 600px)": {
      fontSize: "1.5rem",
      top: "0.5rem",
      right: "0.5rem",
    },
  },
  modalHeader: {
    color: "#007acc",
    marginBottom: "1rem",
    textAlign: "center",
    // Mobile adjustment for font size
    "@media (max-width: 600px)": {
      fontSize: "1.3rem",
      marginBottom: "0.8rem",
    },
  },
  timerControls: {
    marginTop: "1rem",
    display: "flex",
    gap: "0.8rem",
    justifyContent: "center",
    // Mobile adjustment for gap
    "@media (max-width: 600px)": {
      gap: "0.5rem",
      flexWrap: "wrap", // Allow buttons to wrap if necessary
    },
  },
};

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEditingTask, setCurrentEditingTask] = useState(null);

  const timerIntervals = useRef({});

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const startTimer = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, timerRunning: true } : task
      )
    );
  };

  const pauseTimer = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, timerRunning: false } : task
      )
    );
  };

  const resetTimer = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, elapsedSeconds: 0, timerRunning: false } : task
      )
    );
  };

  useEffect(() => {
    tasks.forEach((task) => {
      if (task.timerRunning && !timerIntervals.current[task.id]) {
        timerIntervals.current[task.id] = setInterval(() => {
          setTasks((prev) =>
            prev.map((t) =>
              t.id === task.id
                ? { ...t, elapsedSeconds: (t.elapsedSeconds || 0) + 1 }
                : t
            )
          );
        }, 1000);
      } else if (!task.timerRunning && timerIntervals.current[task.id]) {
        clearInterval(timerIntervals.current[task.id]);
        delete timerIntervals.current[task.id];
      }
    });
    return () => {
      Object.values(timerIntervals.current).forEach(clearInterval);
      timerIntervals.current = {};
    };
  }, [tasks]);

  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [priority, setPriority] = useState("");
  const [timerElapsedSeconds, setTimerElapsedSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimerElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning]);

  const openAddModal = () => {
    setAddModalOpen(true);
    setTimerElapsedSeconds(0);
    setTimerRunning(false);
    setTaskName("");
    setTaskDate("");
    setTaskDesc("");
    setPriority("");
  };
  const closeAddModal = () => setAddModalOpen(false);

  const submitTask = (e) => {
    e.preventDefault();
    if (!taskName.trim() || !taskDate || !priority) {
      alert("Please fill all required fields (Task Name, Date, Priority).");
      return;
    }
    const newTask = {
      id: Date.now(),
      name: taskName.trim(),
      date: taskDate,
      description: taskDesc.trim(),
      priority,
      elapsedSeconds: timerElapsedSeconds,
      timerRunning: false,
    };
    setTasks((prev) => [...prev, newTask]);
    closeAddModal();
  };

  const toggleExpand = (id) => {
    if (expandedTaskId === id) setExpandedTaskId(null);
    else setExpandedTaskId(id);
  };

  const [editFormData, setEditFormData] = useState({
    id: null,
    name: "",
    date: "",
    description: "",
    priority: "",
  });

  const openEditModal = (task) => {
    setEditModalOpen(true);
    setCurrentEditingTask(task);
    setEditFormData({
      id: task.id,
      name: task.name,
      date: task.date,
      description: task.description,
      priority: task.priority,
    });
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setCurrentEditingTask(null);
    setEditFormData({ id: null, name: "", date: "", description: "", priority: "" });
  };


  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitEdit = (e) => {
    e.preventDefault();
    if (!editFormData.name.trim() || !editFormData.date || !editFormData.priority) {
      alert("Please fill all required fields.");
      return;
    }
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editFormData.id ? { ...task, ...editFormData } : task
      )
    );
    closeEditModal();
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
      if (expandedTaskId === id) setExpandedTaskId(null);
    }
  };

  return (
    <div style={styles.body}>
      <nav style={styles.nav}>
        <div style={styles.appName}>My Todo App</div>
        <div style={styles.navButtons}>
          <button
            style={styles.navButton}
            onClick={openAddModal}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#92400e")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#b45309")}
          >
            Add Task
          </button>
          <button
            style={styles.navButton}
            onClick={() => alert("Logout clicked! Implement logout")}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#92400e")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#b45309")}
          >
            Logout
          </button>
        </div>
      </nav>

      <section style={styles.tasksContainer}>
        {tasks.length === 0 && <p>No tasks yet. Click Add Task to create one.</p>}
        {tasks.map((task) => (
          <div
            key={task.id}
            style={styles.taskCard}
          >
            <h3 style={styles.taskTitle}>{task.name}</h3>
            <p style={styles.taskDesc}>{task.description || "No description"}</p>
            <p style={styles.taskInfoSmall}>
              Due: {task.date} | Priority: {task.priority}
            </p>

            <div style={styles.buttonsRow} onClick={(e) => e.stopPropagation()}>
              <button
                style={styles.cardButton}
                onClick={() => openEditModal(task)}
              >
                Edit
              </button>
              <button
                style={{ ...styles.cardButton, ...styles.cardButtonDelete }}
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>

            <div
              style={styles.timerContainer}
              onClick={(e) => { e.stopPropagation(); toggleExpand(task.id); }}
            >
              <div>{formatTime(task.elapsedSeconds || 0)}</div>
              {expandedTaskId === task.id && (
                <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                  <button
                    style={styles.cardButton}
                    onClick={(e) => { e.stopPropagation(); startTimer(task.id); }}
                  >
                    Start
                  </button>
                  <button
                    style={styles.cardButton}
                    onClick={(e) => { e.stopPropagation(); pauseTimer(task.id); }}
                  >
                    Pause
                  </button>
                  <button
                    style={{ ...styles.cardButton, backgroundColor: "#d9534f" }}
                    onClick={(e) => { e.stopPropagation(); resetTimer(task.id); }}
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Add Task Modal */}
      {addModalOpen && (
        <div style={styles.modalOverlay} onClick={closeAddModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeAddModal}
              style={styles.modalCloseBtn}
              onMouseOver={(e) => (e.currentTarget.style.color = "#d9534f")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#888")}
            >
              &times;
            </button>

            <h2 style={styles.modalHeader}>Add New Task</h2>
            <form onSubmit={submitTask}>
              <div style={styles.formControl}>
                <label style={styles.label} htmlFor="taskName">
                  Task Name
                </label>
                <input
                  style={styles.input}
                  type="text"
                  id="taskName"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  required
                />
              </div>

              <div style={styles.formControl}>
                <label style={styles.label} htmlFor="taskDate">
                  Date to complete
                </label>
                <input
                  style={styles.input}
                  type="date"
                  id="taskDate"
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
                  required
                />
              </div>

              <div style={styles.formControl}>
                <label style={styles.label} htmlFor="taskDesc">
                  Description (optional)
                </label>
                <textarea
                  style={styles.textarea}
                  id="taskDesc"
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  placeholder="Describe the task..."
                />
              </div>

              <div style={styles.formControl}>
                <label style={styles.label} htmlFor="priority">
                  Priority
                </label>
                <select
                  style={styles.select}
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  required
                >
                  <option value="">Select priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div style={{ ...styles.timerContainer, textAlign: "center" }}>
                Timer: {formatTime(timerElapsedSeconds)}
              </div>
              <div style={styles.timerControls}>
                {!timerRunning ? (
                  <button
                    type="button"
                    style={{ ...styles.cardButton, padding: "0.5rem 1rem" }}
                    onClick={() => setTimerRunning(true)}
                  >
                    Start
                  </button>
                ) : (
                  <button
                    type="button"
                    style={{ ...styles.cardButton, padding: "0.5rem 1rem" }}
                    onClick={() => setTimerRunning(false)}
                  >
                    Pause
                  </button>
                )}
                <button
                  type="button"
                  style={{ ...styles.cardButton, backgroundColor: "#d9534f", padding: "0.5rem 1rem" }}
                  onClick={() => {
                    setTimerElapsedSeconds(0);
                    setTimerRunning(false);
                  }}
                >
                  Reset
                </button>
              </div>

              <button
                type="submit"
                style={styles.saveBtn}
                onClick={(e) => e.stopPropagation()}
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {editModalOpen && currentEditingTask && (
        <div style={styles.modalOverlay} onClick={closeEditModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeEditModal}
              style={styles.modalCloseBtn}
              onMouseOver={(e) => (e.currentTarget.style.color = "#d9534f")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#888")}
            >
              &times;
            </button>

            <h2 style={styles.modalHeader}>Edit Task</h2>
            <form onSubmit={submitEdit}>
              <div style={styles.formControl}>
                <label style={styles.label} htmlFor="editTaskName">
                  Task Name
                </label>
                <input
                  style={styles.input}
                  type="text"
                  id="editTaskName"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div style={styles.formControl}>
                <label style={styles.label} htmlFor="editTaskDate">
                  Date to complete
                </label>
                <input
                  style={styles.input}
                  type="date"
                  id="editTaskDate"
                  name="date"
                  value={editFormData.date}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div style={styles.formControl}>
                <label style={styles.label} htmlFor="editTaskDesc">
                  Description (optional)
                </label>
                <textarea
                  style={styles.textarea}
                  id="editTaskDesc"
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditChange}
                  placeholder="Describe the task..."
                />
              </div>

              <div style={styles.formControl}>
                <label style={styles.label} htmlFor="editPriority">
                  Priority
                </label>
                <select
                  style={styles.select}
                  id="editPriority"
                  name="priority"
                  value={editFormData.priority}
                  onChange={handleEditChange}
                  required
                >
                  <option value="">Select priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <button
                type="submit"
                style={styles.saveBtn}
                onClick={(e) => e.stopPropagation()}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Todo;