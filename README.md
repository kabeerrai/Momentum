# 📝 Momentum A To-Do List App

A sleek, customizable to-do list. Built with HTML, CSS, and JavaScript. It includes filters, task persistence with localStorage, light/dark mode, and subtle animations for an enjoyable user experience.

---

## 🚀 Features

### ✅ Core Functionality
- Add new tasks via input
- Delete individual tasks
- Mark tasks as completed or active
- Responsive and mobile-friendly layout

### 🎯 Intermediate
- Filter tasks: All / Active / Completed
- Persist tasks in localStorage
- Dynamic task counter

### 💎 Advanced Features
- Light/Dark mode toggle with theme persistence
- Smooth CSS animations 

---

## 🧠 Pseudo Code

### Initial Setup:
1. Create `input` field and an "Add" button.
2. Add three filter buttons: **All**, **Active**, **Completed**.
3. Create a container `<div>` to hold the task list.
4. Design layout with responsive styling.

### JavaScript Logic:
5. Initialize an empty `tasks[]` array.
6. On "Add" click:
   - Push new task object into `tasks[]`.
   - Save to localStorage.
   - Re-render tasks.
7. `renderTasks()` function:
   - Clear container.
   - Loop through `tasks[]` and dynamically create:
     - Task element
     - Complete button
     - Delete button
8. Event listeners:
   - Complete → toggle `task.completed`
   - Delete → `splice()` from array
9. Filters:
   - `filterCompleted()`: `tasks.filter(t => t.completed)`
   - `filterActive()`: `tasks.filter(t => !t.completed)`
   - `renderTasks()` reflects current filter
10. Theme:
    - Toggle `dark-mode` class
    - Save theme to `localStorage`
    - Load theme on page load

---

## 🛠️ Tech Stack

- HTML5
- CSS3 (Flexbox + Transitions)
- JavaScript (ES6+)
- localStorage API

---