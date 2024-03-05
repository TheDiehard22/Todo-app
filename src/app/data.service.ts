import { Injectable, signal } from '@angular/core';
import { TodoItem } from './todo-item';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private counter = 1;  // Private variabele voor het genereren van unieke ID's

    items2 = signal([] as TodoItem[]);  // Observable array van TodoItem objecten

    addItem(item: TodoItem) {   // Voegt een nieuw TodoItem toe aan de lijst
        this.items2.update(items => {   // Update de items2 signal met de nieuwe items
            const id = item.id ? item.id : this.counter++;  // Gebruik de item ID of genereer een nieuwe
            const newItems = items.concat({ id, ...item });  // Creëer een nieuwe array met het nieuwe item
            return newItems; // Retourneer de nieuwe items array om de signal te updaten
        });
    }

    deleteItem(id: number) {  // Verwijdert een TodoItem uit de lijst op basis van ID
        this.items2.update(items => items.filter(item => item.id !== id)); // Filter het item met het opgegeven ID
    }
}