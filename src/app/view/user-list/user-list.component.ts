import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model/user';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserService } from 'src/app/service/user.service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userList: User[] = [];
  displayedColumns: string[] = ['_id', 'username', 'email', 'phone', 'name', 'lastName', 'role', 'status', 'actions'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      users => {
        this.userList = users;
        this.dataSource = new MatTableDataSource(this.userList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log('Error fetching users:', error);
      }
    );
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px' // Ajusta el ancho según tus necesidades
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadUsers(); // Actualizar la lista después de agregar un usuario
      }
    });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px', // Ajusta el ancho según tus necesidades
      data: user // Pasar los datos del usuario al formulario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadUsers(); // Actualizar la lista después de editar un usuario
      }
    });
  }

  deleteUser(id: string) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      data: {
        title: 'Confirmación',
        message: '¿Estás seguro de que quieres eliminar este usuario?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id).subscribe(
          () => {
            console.log('User deleted successfully.');
            this.loadUsers(); // Actualizar la lista después de eliminar
          },
          error => {
            console.log('Error deleting user:', error);
          }
        );
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
