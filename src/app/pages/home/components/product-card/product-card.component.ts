import { Component, computed, input } from '@angular/core';
import type { ProductPublicView } from '@/app/core/models/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  readonly product = input.required<ProductPublicView>();

  readonly hasSale = computed(() => {
    const product = this.product();

    return (
      product.salePrice !== null &&
      product.salePrice < product.price
    );
  });

  formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  }
}