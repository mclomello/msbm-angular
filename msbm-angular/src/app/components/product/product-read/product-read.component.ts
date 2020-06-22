import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: Product[]
  displayedColumns = ['id', 'name', 'price', 'action']

  constructor(private serviceProduct: ProductService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchProducts()
  }
  
  fetchProducts() {
    this.serviceProduct.fetch().subscribe(products => {
      this.products = products
    })
  }

  delete(product: Product) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Do you confirm the delete action?'
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.serviceProduct.delete(product).subscribe(() => {
          this.serviceProduct.showMessage('Product deleted successfully!')
          this.fetchProducts()
        })
      }
    })
  }
}
