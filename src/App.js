import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskList from "./pages/taskListComponent";
import TaskForm from "./pages/taskFormComponent";
function App() {
  const [showForm, setShowForm] = useState(false);
  const [isIncludeInactive, setFilter] = useState(true);
  return (
    <div className="container pt-3">
      <h1 className="mt-5 mb-4 text-center">Task Management App</h1>
      {!showForm ?
        <>
          <button className="btn btn-success mb-4 btn-sm" onClick={() => setShowForm(true)}>Add Task</button>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" checked={isIncludeInactive} id="is-include-inactive" onChange={({ target }) => setFilter(target.checked)} />
            <label class="form-check-label" for="is-include-inactive">
              Is include in-completed
            </label>
          </div>
          <TaskList openForm={() => setShowForm(true)} isIncludeInactive={isIncludeInactive} />
        </>
        :
        <TaskForm
          onSubmit={() => setShowForm(false)}
        />
      }
    </div>
  );
}
export default App;