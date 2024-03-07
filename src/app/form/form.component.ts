import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { TodoStatuses } from '../../models';
import { DataService } from '../data.service';
import { TodoItem } from '../todo-item';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatButtonModule, MatIconModule],
  template: `
    <div class="form-container">
      <h2>Add your todo task:</h2>
      <form [formGroup]="formGroup" #fgDir="ngForm" (ngSubmit)="onSubmit(fgDir)">
        <mat-form-field class="text-field">
          <input matInput maxlength="20" placeholder="Title name" [formControl]="titleControl">
          <mat-label>Title</mat-label>
          @if (titleControl.hasError('required')) {
            <mat-error>Title is required</mat-error>
          }
        </mat-form-field>

        <mat-form-field color="primary">
          <mat-label>Status</mat-label>
          <mat-select [formControl]="statusControl">
            <mat-option value="Pending">Pending</mat-option>
            <mat-option value="In Progress">In Progress</mat-option>
            <mat-option value="Completed">Completed</mat-option>
          </mat-select>
        </mat-form-field>

        <button color="primary" mat-raised-button type="submit" id="btn-add">
          <mat-icon>add</mat-icon>
        </button>
      </form>
    </div>
  `,
  styleUrl: './form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {

  formData = { title: '', status: '' };

  // Definieert validatieregel.
  titleControl = new FormControl('', Validators.required);
  // Definieert validatieregel.
  statusControl = new FormControl<TodoStatuses>('Pending', Validators.required);

  formGroup = this.fb.group({
    title: this.titleControl,
    status: this.statusControl,
  },
    // Validatie activeren wanneer de focus van het veld verdwijnt.
    { updateOn: 'blur' });

  // Injecteert `DataService` en `FormBuilder` in de constructor.
  constructor(
    public dataService: DataService,
    private fb: FormBuilder
  ) { }

  onSubmit(fgDir: FormGroupDirective) {
    // Controleert of het formulier geldig is.
    if (this.formGroup.invalid) {
      return;
    }

    this.dataService.addItem(this.formGroup.value as TodoItem);
    // Reset het formulier.  
    fgDir.resetForm();
    this.formGroup.reset({ title: '', status: 'Pending' });
  }
}
