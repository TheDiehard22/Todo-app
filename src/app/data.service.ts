import { Injectable, effect, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { TodoItem } from './todo-item';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    // items: TodoItem[] = []; // Store items in an array
    // itemAdded = new Subject<TodoItem>(); // Create a Subject for item addition events
    private counter = 1;
    // private idEffect = effect(() => {
    //     const items = this.items2();
    //     console.info('doen we dit wel?');
    //     items.forEach(item => {
    //         if (!item.id) {
    //             item.id = this.counter++;
    //         }
    //         console.info(item);
    //     });
    // });

    items2 = signal([] as TodoItem[]);

    addItem(item: TodoItem) {
        this.items2.update(items => {
            // const ourItem= this.items2().find(it=>it.id===item.id);
            const id = item.id?item.id:this.counter++;
            const newItems = items.concat( {id,...item});
            // items.push(this.formGroup.value as TodoItem);
            return newItems;
          });
    }
}