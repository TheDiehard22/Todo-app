import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    items: any[] = []; // Store items in an array
    itemAdded = new Subject<any>(); // Create a Subject for item addition events

    items2 = signal([] as any[]);

    addItem(item: any) {
        this.items.push(item);
        this.itemAdded.next(item); // Emit the added item
    }
}