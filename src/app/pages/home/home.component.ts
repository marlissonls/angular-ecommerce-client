import { Component, OnInit, DestroyRef, inject, signal } from '@angular/core'
import { HttpParams } from '@angular/common/http'
import { catchError, forkJoin, of } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

import { ApiService } from '@/app/core/api/api.service'
import type { ProductPublicView, ProductPagePublicView } from '@/app/core/models/product'
import type { CategoryPublicView } from '@/app/core/models/category'

import { HeroComponent } from './components/hero/hero.component'
import { FeaturedCategoriesComponent } from './components/featured-categories/featured-categories.component'
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component'
import { NewArrivalsComponent } from './components/new-arrivals/new-arrivals.component'
import { StoreBenefitsComponent } from './components/store-benefits/store-benefits.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    FeaturedCategoriesComponent,
    FeaturedProductsComponent,
    NewArrivalsComponent,
    StoreBenefitsComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  private readonly api = inject(ApiService)
  private readonly destroyRef = inject(DestroyRef)

  readonly categories = signal<CategoryPublicView[]>([])
  readonly featuredProducts = signal<ProductPublicView[]>([])
  readonly newArrivals = signal<ProductPublicView[]>([])

  readonly loading = signal({
    categories: true,
    featured: true,
    newArrivals: true,
  })

  ngOnInit(): void {
    this.loadHome()
  }

  private loadHome(): void {
    const categoriesParams = new HttpParams()
      .set('page', 0)
      .set('size', 8)

    const featuredParams = new HttpParams()
      .set('page', 0)
      .set('size', 8)
      .set('featured', true)

    const newArrivalsParams = new HttpParams()
      .set('page', 0)
      .set('size', 8)
      .set('isNew', true)

    forkJoin({
      categories: this.api
        .get<CategoryPublicView[]>('/categories', categoriesParams)
        .pipe(catchError(() => of(null))),

      featured: this.api
        .get<ProductPagePublicView>('/products', featuredParams)
        .pipe(catchError(() => of(null))),

      newArrivals: this.api
        .get<ProductPagePublicView>('/products', newArrivalsParams)
        .pipe(catchError(() => of(null))),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result.categories !== null) {
          this.categories.set(result.categories)
        }

        if (result.featured !== null) {
          this.featuredProducts.set(result.featured.items)
        }

        if (result.newArrivals !== null) {
          this.newArrivals.set(result.newArrivals.items)
        }

        this.loading.set({
          categories: false,
          featured: false,
          newArrivals: false,
        })
      })
  }
}