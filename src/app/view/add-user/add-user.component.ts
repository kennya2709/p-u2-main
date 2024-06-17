// src/app/view/add-user/add-user.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      name: [''],
      lastName: [''],
      role: ['', Validators.required],
      status: [true, Validators.required],
      idClient: [''],
      deleteDate: [null]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      this.userService.createUser(userData).subscribe(
        response => {
          this.snackBar.open('User added successfully', 'Close', {
            duration: 2000,
          });
          this.router.navigate(['/users']); // Redirigir a la lista de usuarios o donde sea necesario
        },
        error => {
          console.error('Error adding user:', error);
          this.snackBar.open('Error adding user', 'Close', {
            duration: 2000,
          });
        }
      );
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
