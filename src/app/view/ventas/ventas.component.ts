import { Component, OnInit } from '@angular/core';

interface Producto {
  imagenUrl: string;
  categoria: number;
  precio: number;
}

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  productos: Producto[] = [
    { imagenUrl: 'https://i.imgur.com/2DhmtJ4.jpg', categoria: 1, precio: 10 },
    { imagenUrl: 'https://i.imgur.com/2DhmtJ4.jpg', categoria: 2, precio: 20 },
    { imagenUrl: 'https://i.imgur.com/2DhmtJ4.jpg', categoria: 3, precio: 30 },
    { imagenUrl: 'https://i.imgur.com/2DhmtJ4.jpg', categoria: 4, precio: 40 },
    { imagenUrl: 'https://i.imgur.com/2DhmtJ4.jpg', categoria: 5, precio: 50 },
    { imagenUrl: 'https://i.imgur.com/2DhmtJ4.jpg', categoria: 6, precio: 60 },
    { imagenUrl: 'https://i.imgur.com/2DhmtJ4.jpg', categoria: 7, precio: 70 },
    { imagenUrl: 'https://i.imgur.com/2DhmtJ4.jpg', categoria: 8, precio: 80 },
    // Añade más productos según sea necesario
  ];
  carrito: Producto[] = [];
  subtotal = 0;
  iva = 0;
  total = 0;
  metodoPago = '';
  metodosDePago = ['Tarjeta de Crédito', 'PayPal', 'Transferencia Bancaria'];

  ngOnInit(): void {
    this.actualizarTotales();
  }

  agregarProducto(producto: Producto): void {
    this.carrito.push(producto);
    this.actualizarTotales();
  }

  eliminarProducto(index: number): void {
    this.carrito.splice(index, 1);
    this.actualizarTotales();
  }

  actualizarTotales(): void {
    this.subtotal = this.carrito.reduce((sum, producto) => sum + producto.precio, 0);
    this.iva = this.subtotal * 0.16;
    this.total = this.subtotal + this.iva;
  }

  pagar(): void {
    alert(`Pagando con ${this.metodoPago}`);
    // Lógica de pago
  }
}
