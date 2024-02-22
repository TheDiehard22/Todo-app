import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { TodoListComponent } from '../todo-list/todo-list.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormComponent, TodoListComponent ],
  template: ` 
    <section>
      <h1>My Todo app</h1>
      <app-form></app-form>
      <app-todo-list></app-todo-list>
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {

}

