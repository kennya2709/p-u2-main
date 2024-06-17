import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user'; // Ajusta la ruta según tu estructura
import { UserService } from 'src/app/service/user.service.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User | null,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.formBuilder.group({
      _id: [this.data?._id || ''],
      username: [this.data?.username || '', Validators.required],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      phone: [this.data?.phone || ''],
      password: [this.data?.password || ''], // Incluye el campo password si es necesario
      name: [this.data?.name || ''],
      lastName: [this.data?.lastName || ''],
      role: [this.data?.role || ''],
      deleteDate: [this.data?.deleteDate || ''], // Incluye el campo deleteDate si es necesario
      status: [this.data?.status || false] // Incluye el campo status si es necesario
    });
  }

  save(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      if (this.data && this.data._id) {
        // Editar usuario existente
        this.userService.updateUser(formData._id, formData).subscribe(
          updatedUser => {
            console.log('Usuario actualizado:', updatedUser);
            this.dialogRef.close(true);
          },
          error => {
            console.error('Error al actualizar usuario:', error);
          }
        );
      } else {
        // Crear nuevo usuario
        this.userService.createUser(formData).subscribe(
          newUser => {
            console.log('Usuario creado:', newUser);
            this.dialogRef.close(true);
          },
          error => {
            console.error('Error al crear usuario:', error);
          }
        );
      }
    } else {
      // Marcar los campos del formulario como tocados para mostrar los errores
      this.userForm.markAllAsTouched();
    }
  }
}
