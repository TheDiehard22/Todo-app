import { computed, Injectable, signal } from '@angular/core';

import { TodoItem } from './todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  items = signal([] as TodoItem[]);
  currentTodo = computed(() => this.items().find(i => i.id === this.currentTodoID()));
  currentTodoID = signal(0);
  private counter = 1;
  
  constructor() { }

  addItem(item: TodoItem) {
    this.items.update(items => {
      const id = item.id ? item.id : this.counter++;
      const newItems = items.concat({ id, ...item });
      return newItems;
    });
  }

  updateItem(id: number, newItem: Partial<TodoItem>) {
    this.items.update(items => {
      const index = items.findIndex(item => item.id === id);
      if (index === -1) {
        return items;
      }
      const newData = { ...items[index], ...newItem };
      const newItems = [...items];
      newItems[index] = newData;
      return newItems;
    });
  }

}
