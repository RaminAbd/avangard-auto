import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { tokenInterceptor } from './auth/TokenInterceptor';
import { AuthGuard } from './auth/auth.guard';
import { UsersComponent } from './pages/admin/users/users.component';
import { HomeComponent } from './pages/user/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/user/user.component';
import { TableModule } from 'primeng/table';
import { TableComponent } from './components/table/table.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { ManufacturerFordComponent } from './pages/admin/categories/manufacturer-ford/manufacturer-ford.component';
import { ManufacturerMercedesComponent } from './pages/admin/categories/manufacturer-mercedes/manufacturer-mercedes.component';
import { SafeHtmlPipe } from './models/TestPipe';
import { ModelsComponent } from './pages/admin/categories/models/models.component';
import { PartManufacturersComponent } from './pages/admin/part-manufacturers/part-manufacturers.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';
import { AdminProductsUpsertComponent } from './pages/admin/admin-products/admin-products-upsert/admin-products-upsert.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { FilterSearchComponent } from './components/filter-search/filter-search.component';
import { ProductDetailComponent } from './pages/user/product-detail/product-detail.component';
import { StorageModule } from '@ngx-pwa/local-storage';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ShoppingCartComponent } from './pages/user/shopping-cart/shopping-cart.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { StatisticsComponent } from './pages/admin/statistics/statistics.component';
import { StatisticsTableComponent } from './components/statistics-table/statistics-table.component';
import { OrdersAdminComponent } from './pages/admin/orders-admin/orders-admin.component';
import { AdminPendingsComponent } from './pages/admin/orders-admin/admin-pendings/admin-pendings.component';
import { AdminCompletedsComponent } from './pages/admin/orders-admin/admin-completeds/admin-completeds.component';
import { AdminOrderDetailComponent } from './pages/admin/orders-admin/admin-order-detail/admin-order-detail.component';
import { OrderDetailTableComponent } from './components/order-detail-table/order-detail-table.component';
import {CheckboxModule} from 'primeng/checkbox';
import { OrdersUserComponent } from './pages/user/orders-user/orders-user.component';
import { UserPendingsComponent } from './pages/user/orders-user/user-pendings/user-pendings.component';
import { UserCompletedsComponent } from './pages/user/orders-user/user-completeds/user-completeds.component';
import { UserOrderDetailComponent } from './pages/user/orders-user/user-order-detail/user-order-detail.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import {ToastModule} from 'primeng/toast';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { forAdmin: 'true' }, children: [
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { forAdmin: 'true' } },
      {
        path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard], data: { forAdmin: 'true' }, children: [
          { path: 'Ford', component: ManufacturerFordComponent, canActivate: [AuthGuard], data: { forAdmin: 'true' } },
          { path: 'Mercedes', component: ManufacturerMercedesComponent, canActivate: [AuthGuard], data: { forAdmin: 'true' } },
          { path: ':type/:typeId/:manufacturerId', component: ModelsComponent, canActivate: [AuthGuard], data: { forAdmin: 'true' } },
          { path: '', redirectTo: 'Ford', pathMatch: 'full' },
        ]
      },
      { path: 'part-manufacturers', component: PartManufacturersComponent, canActivate: [AuthGuard], data: { forAdmin: 'true' } },
      { path: 'products', component: AdminProductsComponent, canActivate: [AuthGuard], data: { forAdmin: 'true' } },
      { path: 'products/:type', component: AdminProductsUpsertComponent, canActivate: [AuthGuard], data: { forAdmin: 'true' } },
      { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard], data: { forAdmin: 'true' } },
      {
        path: 'orders', component: OrdersAdminComponent, canActivate: [AuthGuard], data: { forAdmin: 'true' }, children: [
          { path: 'pending-orders', component: AdminPendingsComponent, canActivate: [AuthGuard], data: { forAdmin: 'true' } },
          { path: 'completed-orders', component: AdminCompletedsComponent, canActivate: [AuthGuard], data: { forAdmin: 'true' } },
          { path: ':type/:id', component: AdminOrderDetailComponent, canActivate: [AuthGuard], data: { forAdmin: 'true' } },
          { path: '', redirectTo: 'pending-orders', pathMatch: 'full' },
        ]
      },

      { path: '', redirectTo: 'users', pathMatch: 'full' },
    ]
  },
  {
    path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { forAdmin: 'false' }, children: [
      { path: 'products', component: HomeComponent, canActivate: [AuthGuard], data: { forAdmin: 'false' } },
      { path: 'products/:id', component: ProductDetailComponent, canActivate: [AuthGuard], data: { forAdmin: 'false' } },
      { path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuard], data: { forAdmin: 'false' } },
      {
        path: 'orders', component: OrdersUserComponent, canActivate: [AuthGuard], data: { forAdmin: 'false' }, children: [
          { path: 'pending-orders', component: UserPendingsComponent, canActivate: [AuthGuard], data: { forAdmin: 'false' } },
          { path: 'completed-orders', component: UserCompletedsComponent, canActivate: [AuthGuard], data: { forAdmin: 'false' } },
          { path: ':type/:id', component: UserOrderDetailComponent, canActivate: [AuthGuard], data: { forAdmin: 'false' } },
          { path: '', redirectTo: 'pending-orders', pathMatch: 'full' },
        ]
      },
      { path: '', redirectTo: 'products', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'user/products', pathMatch: 'full' },
  { path: '', redirectTo: 'user', pathMatch: 'full' },
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    TableComponent,
    CategoriesComponent,
    SafeHtmlPipe,
    ManufacturerFordComponent,
    ManufacturerMercedesComponent,
    ModelsComponent,
    PartManufacturersComponent,
    AdminProductsComponent,
    AdminProductsUpsertComponent,
    ProductsTableComponent,
    UserHeaderComponent,
    FilterSearchComponent,
    ProductDetailComponent,
    ProductListComponent,
    ShoppingCartComponent,
    OrdersTableComponent,
    StatisticsComponent,
    StatisticsTableComponent,
    OrdersAdminComponent,
    AdminPendingsComponent,
    AdminCompletedsComponent,
    AdminOrderDetailComponent,
    OrderDetailTableComponent,
    OrdersUserComponent,
    UserPendingsComponent,
    UserCompletedsComponent,
    UserOrderDetailComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    ConfirmPopupModule,
    MultiSelectModule,
    HttpClientModule,
    ToastModule,
    CheckboxModule,
    StorageModule,
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },

    })
  ],
  providers: [
    ConfirmationService,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
