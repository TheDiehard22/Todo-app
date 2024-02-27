import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { TodoItem } from './todo-item';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    // items: TodoItem[] = []; // Store items in an array
    // itemAdded = new Subject<TodoItem>(); // Create a Subject for item addition events

    items2 = signal([] as TodoItem[]);

    // addItem(item: TodoItem) {
    //     this.items.push(item);
    //     this.itemAdded.next(item); // Emit the added item
    // }
}