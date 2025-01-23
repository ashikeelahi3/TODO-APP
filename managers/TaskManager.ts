export class Task {
  id: number;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High" | "";
  isCompleted: boolean;
  dueDate: Date | null;

  constructor(
    id: number,
    title: string,
    description: string,
    priority: "Low" | "Medium" | "High" | "" = "",
    isCompleted: boolean = false,
    dueDate: Date | null = null
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.isCompleted = isCompleted;
    this.dueDate = dueDate;
  }
}

export class TaskManager {
  private tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  } 

  editTask(taskId: number, updatedProperties: Partial<Task>): void {
    const taskIndex = this.tasks.findIndex((task) => task.id == taskId);
    if(taskIndex !== -1) {
      this.tasks[taskIndex] = {...this.tasks[taskIndex], ...updatedProperties }
    }
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
}