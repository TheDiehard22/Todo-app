import { Component, OnInit, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <h2>Add your first task:</h2>
      <form [formGroup]="formGroup" (ngSubmit)="onSubmit($event)">
        <mat-form-field class="text-field">
          <input matInput #input maxlength="20" placeholder="Title task" [formControl]="titleControl">
          <mat-label>Title</mat-label>
        </mat-form-field>

        <mat-form-field class="text-field">
          <input matInput maxlength="20" placeholder="Title task" [formControl]="titleControl">
          <mat-label>Title</mat-label>
        </mat-form-field>

        <mat-form-field [color]="colorControl.value!">
          <mat-label>Status</mat-label>
          <mat-select [formControl]="colorControl">
            <mat-option value="Pending">Pending</mat-option>
            <mat-option value="In Progress">In Progress</mat-option>
            <mat-option value="Completed">Completed</mat-option>
          </mat-select>
        </mat-form-field>
        
        <button type="submit">Add your task</button>
      </form>
    </div>
  `,
  styleUrl: './form.component.css'
})
export class FormComponent {

  formData = { title: '', status: '' };

  titleControl = new FormControl('', Validators.required);

  formGroup = this.fb.group({
    title: this.titleControl,
    status: new FormControl('todo'),
  });

  // on submit -> title&status naar todoItems[] -> leeg halen

  todoItems = signal([]);
  constructor(public dataService: DataService, private fb: FormBuilder) {}

  onSubmit(formValue: any) {
    console.log(formValue);
    
    this.dataService.addItem(this.formData);
    this.dataService.items2.update(items => { items.push(formValue); return items; });
    this.formData = { title: '', status: '' }; // Clear form data
  }

  colorControl = new FormControl('primary' as ThemePalette);
}
