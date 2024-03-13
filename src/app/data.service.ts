import { Injectable, signal } from '@angular/core';

import { TodoItem } from './todo-item';

/**
 * @deprecated
 */
@Injectable({
    providedIn: 'root'
})
export class DataService {

  private counter = 1;  // Private variabele voor het genereren van unieke ID's
  items2 = signal([] as TodoItem[]);  // Observable array van TodoItem objecten

  pageId = signal(0);

  /**
   * @description asdasdasd
   * @param item
   */
  addItem(item: TodoItem) {   // Voegt een n    // Reset het formulier.ieuw TodoItem toe aan de lijst
    this.items2.update(items => {   // Update de items2 signal met de nieuwe items
      const id = item.id ? item.id : this.counter++;  // Gebruik de item ID of genereer een nieuwe
      const newItems = items.concat({ id, ...item });  // Creëer een nieuwe array met het nieuwe item
      return newItems; // Retourneer de nieuwe items array om de signal te updaten
    });
  }

    updateItem(id: number, newItem: Partial<TodoItem>) {
        const findNewItems = () => {
            const items = this.items2();
            const index = items.findIndex(item => item.id === id);  // Zoek het item met het opgegeven ID
            if (index === -1) {  // Als het item niet gevonden is
                return items;  // Retourneer de originele array
            }
            const newData = { ...items[index], ...newItem };  // Creëer een nieuw object met de nieuwe gegevens
            const newItems = [...items];
            // Maak een kopie van de originele array
            newItems[index] = newData;  // Vervang het item met het nieuwe object

            return items;
        }
        this.items2.set(findNewItems());
    }

    deleteItem(id: number) {  // Verwijdert een TodoItem uit de lijst op basis van ID
        this.items2.update(items => items.filter(item => item.id !== id)); // Filter het item met het opgegeven ID
    }

}
