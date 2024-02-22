import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    items: any[] = []; // Store items in an array
    itemAdded = new Subject<any>(); // Create a Subject for item addition events

    addItem(item: any) {
        this.items.push(item);
        this.itemAdded.next(item); // Emit the added item
    }
}