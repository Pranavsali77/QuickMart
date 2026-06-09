import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  name: string = '';
  description: string = '';
  price: number = 0;
  stock: number = 0;
  image: File | null = null;
  imagePreview: string | null = null;
  loading: boolean = false;
  isDragging: boolean = false;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) this.setImage(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer?.files[0];
    if (file && file.type.startsWith('image/')) this.setImage(file);
  }

  setImage(file: File) {
    this.image = file;
    const reader = new FileReader();
    reader.onload = (e: any) => (this.imagePreview = e.target.result);
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (!this.image) {
      alert('Please select an image.');
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('stock', this.stock.toString());
    formData.append('image', this.image);

    this.http.post('http://localhost:8080/api/items', formData).subscribe({
      next: () => {
        this.loading = false;
        alert('Product added successfully!');
        this.resetForm();
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert('Error adding product.');
      },
    });
  }

  resetForm() {
    this.name = '';
    this.description = '';
    this.price = 0;
    this.stock = 0;
    this.image = null;
    this.imagePreview = null;
  }
}
