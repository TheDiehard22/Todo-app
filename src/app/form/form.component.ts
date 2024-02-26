import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { TodoStatuses } from '../../models';
import { DataService } from '../data.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  template: `
    <div class="form-container">
      <h2>Add your first task:</h2>
      
      <form [formGroup]="formGroup" (ngSubmit)="onSubmit($event)">

        <mat-form-field class="text-field">
          <input matInput maxlength="20" placeholder="Title task" [formControl]="titleControl">
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

        <button color="primary" mat-raised-button type="submit">Toevoegen</button>
      </form>
    </div>
  `,
  styleUrl: './form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {

  formData = { title: '', status: '' };

  titleControl = new FormControl('', Validators.required);
  statusControl = new FormControl<TodoStatuses>('Pending', Validators.required);

  formGroup = this.fb.group({
    title: this.titleControl,
    status: this.statusControl,
  }, { updateOn: 'blur' });

  constructor(
    public dataService: DataService,
    private fb: FormBuilder
  ) { }

  onSubmit() {
    // doe niks als het formulier niet valid is
    if (this.formGroup.invalid) {
      return;
    }

    this.dataService.items2.update(items => { items.push(this.formGroup.value); return items; });
    this.formGroup.reset({ title: '', status: 'Pending' });
  }
}
