import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product, ProductDeleteInfo } from '../../model/product-model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from 'src/app/shared/add-dialog/add-dialog.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { EditDialogComponent } from 'src/app/shared/edit-dialog/edit-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements AfterViewInit {
  deleteinfo: ProductDeleteInfo = {
    msg: '',
  };
  productList: Product[] = [];
  columnsToDisplay: string[] = ['name', 'price', 'createAT', 'action'];
  tableDataSource = new MatTableDataSource(this.productList);
  searchedText:string = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _productService: ProductService,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) {}


  ngAfterViewInit() {
    this.fetchProduct();
  }

  fetchProduct() {
    this._productService.getProductList().subscribe((res) => {
      this.tableDataSource = new MatTableDataSource(res);
      this.tableDataSource.paginator = this.paginator;
      this.tableDataSource.sort = this.sort;
    });
  }

  search() {
    this.tableDataSource.filter = this.searchedText;
  }

  openDetails(id: string) {
    console.log(id);
    this.router.navigate(['/product', id]);
  }

  openDeleteDialog(id: string) {
    const ref = this.dialog.open(ConfirmDialogComponent);
    ref.afterClosed().subscribe(() => {
      if (ref.componentInstance.confirm) {
        this.deleteProduct(id);
      }
    });
  }

  deleteProduct(id: string) {
    this._productService.deleteProduct(id).subscribe((res) => {
      this.deleteinfo = res;
      console.log(this.deleteinfo);
      this.toastr.success('Deleted Sucessfully');
      this.fetchProduct();
    });
  }

  openAddDialog() {
    const ref = this.dialog.open(AddDialogComponent);

    ref.afterClosed().subscribe(() => {
      if(!ref.componentInstance.isAdd) return;
      const data = ref.componentInstance.formData;
      this._productService.sendFormData(data).subscribe((res) => {
        console.log(res);
        this.toastr.success("Product Added Successfully")
        this.fetchProduct();
      })
     
    });
  }

  openEditDialog(id: string) {
    const ref = this.dialog.open(EditDialogComponent);
    this._productService.getProductDetails(id).subscribe((res) => {
      const { name, company, price } = res;
      ref.componentInstance.data.name = name;
      ref.componentInstance.data.company = company;
      ref.componentInstance.data.price = price;
    });
    ref.afterClosed().subscribe(() => {
      if (ref.componentInstance.edit) {
        this._productService
          .updateProduct(id, ref.componentInstance.formData)
          .subscribe((res) => {
            console.log(res);
            this.toastr.success('Edited Successfully');
            this.fetchProduct();
          });
      }
    });
  }
}
