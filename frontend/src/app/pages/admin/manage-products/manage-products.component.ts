import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
})
export class ManageProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm = '';
  categoryFilter = '';
  sortBy = 'name';
  currentPage = 1;
  itemsPerPage = 10;
  allSelected = false;
  showEditModal = false;
  editingProduct: any = {};

  constructor() {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    // Sample data - Replace with API call
    this.products = [
      {
        id: 1,
        name: 'Laptop Pro',
        price: 54999,
        category: 'Electronics',
        stock: 15,
        imageUrl: 'laptop.jpg',
        active: true,
        description: 'High performance laptop',
      },
      {
        id: 2,
        name: 'Wireless Mouse',
        price: 999,
        category: 'Electronics',
        stock: 50,
        imageUrl: 'mouse.jpg',
        active: true,
        description: 'Ergonomic wireless mouse',
      },
      {
        id: 3,
        name: 'Mechanical Keyboard',
        price: 2499,
        category: 'Electronics',
        stock: 0,
        imageUrl: 'keyboard.jpg',
        active: true,
        description: 'RGB mechanical keyboard',
      },
    ];
    this.filteredProducts = [...this.products];
  }

  filterProducts(): void {
    let filtered = [...this.products];

    if (this.searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
      );
    }

    if (this.categoryFilter) {
      filtered = filtered.filter((p) => p.category === this.categoryFilter);
    }

    // Sorting
    if (this.sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === 'priceAsc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'priceDesc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    this.filteredProducts = filtered;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  selectAll(): void {
    this.filteredProducts.forEach((p) => (p.selected = this.allSelected));
  }

  hasSelectedProducts(): boolean {
    return this.filteredProducts.some((p) => p.selected);
  }

  getSelectedCount(): number {
    return this.filteredProducts.filter((p) => p.selected).length;
  }

  editProduct(product: any): void {
    this.editingProduct = { ...product };
    this.showEditModal = true;
  }

  saveProduct(): void {
    const index = this.products.findIndex(
      (p) => p.id === this.editingProduct.id,
    );
    if (index !== -1) {
      this.products[index] = { ...this.editingProduct };
      this.filterProducts();
    }
    this.closeModal();
    alert('Product updated successfully!');
  }

  deleteProduct(product: any): void {
    if (confirm(`Delete ${product.name}?`)) {
      this.products = this.products.filter((p) => p.id !== product.id);
      this.filterProducts();
      alert('Product deleted!');
    }
  }

  bulkDelete(): void {
    if (confirm('Delete selected products?')) {
      this.products = this.products.filter((p) => !p.selected);
      this.filterProducts();
      alert('Products deleted!');
    }
  }

  bulkActivate(): void {
    this.products.forEach((p) => {
      if (p.selected) p.active = true;
    });
    this.filterProducts();
    alert('Products activated!');
  }

  bulkDeactivate(): void {
    this.products.forEach((p) => {
      if (p.selected) p.active = false;
    });
    this.filterProducts();
    alert('Products deactivated!');
  }

  viewProduct(product: any): void {
    alert(`Viewing ${product.name}`);
  }

  closeModal(): void {
    this.showEditModal = false;
    this.editingProduct = {};
  }

  getImageUrl(imageUrl: string): string {
    return 'http://localhost:8080/api/user/items/images/' + imageUrl;
  }

  formatPrice(price: number): string {
    return price.toLocaleString('en-IN');
  }
}
