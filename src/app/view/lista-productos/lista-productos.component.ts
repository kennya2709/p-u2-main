import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { FormProductComponent } from '../form-product/form-product.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {
  productlist!: MatTableDataSource<Producto>;
  columnsHeader = ["date", "name", "price", "amount", "status", "opciones"];

  constructor(private productService: ProductoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.productListMethod();
  }

  productListMethod() {
    this.productService.getProducts().subscribe(
      item => {
        this.productlist = new MatTableDataSource(item);
        console.log(this.productlist.data);
      },
      error => {
        console.log(error);
      }
    );
  }

  editDialog(element: Producto) {
    const dialogRef = this.dialog.open(FormProductComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productListMethod();
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormProductComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productListMethod();
      }
    });
  }

  deleteDialog(id: string) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(id);
      }
    });
  }

  deleteProduct(id: string) {
    this.productService.delete(id).subscribe(
      response => {
        console.log(`Product with id ${id} deleted`, response);
        this.productListMethod(); // Actualiza la lista de productos después de la eliminación
      },
      error => {
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productlist.filter = filterValue.trim().toLowerCase();
  }
}
