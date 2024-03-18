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

    // it would probably be better to use a .set() method on the signal instead of .update()
    // update is meant to be used when you want to return a new value based on the old value

    // excersise: refactor this to use .set() instead of .update()
    this.items.update(items => {
      const index = items.findIndex(item => item.id === id);

      if (index === -1) { // could not find the item to update
        return items;
      }

      const existingItem = items[index]; // grab copy of existing item
      const { comment, status: newStatus } = newItem; // grab new status and comment

      // create a new item with the updated status and comments
      const updatedItem = {
        ...existingItem,
        status: newStatus || existingItem.status, // use the new status or fall back to the existing status
        comments: comment ? [...existingItem.comments, comment] : existingItem.comments // add the new comment to the existing comments or keep the existing comments
      } as TodoItem;

      const updatedItems = [...items]; // create a shallow copy of the items array
      updatedItems[index] = updatedItem; // replace the existing item with the updated item

      return updatedItems;

      // this does not work (previous implementation)

      // items[index] = updatedItem;
      // return items;

      // It does not work because we are mutating the original array and not returning a new array
    });
  }

  updateComment(id: number, comment: string) {

  }

  updateStatus(status: TodoStatuses) {

  }

}
