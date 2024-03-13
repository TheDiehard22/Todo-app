import { computed, Injectable, signal } from '@angular/core';

import { TodoStatuses } from '../models';
import { TodoItem, UpdateTodoItem } from './todo-item';

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
      const newItems = items.concat({ id, ...item, comments: [] });
      return newItems;
    });
  }

  updateItem(id: number, newItem: UpdateTodoItem) {
    console.log(id, newItem);

    this.items.update(items => {
      const index = items.findIndex(item => item.id === id);
      const { id: _id, status, title } = items[index];
      const { comment, status: newStatus } = newItem;

      if (index === -1) {
        return items;
      }

      const _newItem = {
        ...items[index],
        status: newStatus || items[index].status,
        title: title || items[index].title,
        comments: comment ? items[index].comments.concat(comment) : items[index].comments
      } as TodoItem;

      const newItems = [...items];

      newItems[index] = _newItem;

      return newItems;
    });
  }

  updateComment(id: number, comment: string) {

  }

  updateStatus(status: TodoStatuses) {

  }

}
