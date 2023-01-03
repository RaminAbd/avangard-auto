import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { tokenInterceptor } from './auth/TokenInterceptor';
import { AuthGuard } from './auth/auth.guard';
import { UsersComponent } from './pages/admin/users/users.component';
import { HomeComponent } from './pages/user/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/user/user.component';
import {TableModule} from 'primeng/table';
import { TableComponent } from './components/table/table.component';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService} from 'primeng/api';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { ManufacturerFordComponent } from './pages/admin/categories/manufacturer-ford/manufacturer-ford.component';
import { ManufacturerMercedesComponent } from './pages/admin/categories/manufacturer-mercedes/manufacturer-mercedes.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { forAdmin: 'true' }, children: [
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: { forAdmin: 'true' } },
      { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard], data: { forAdmin: 'true' }, children:[
        { path: 'Ford', component:ManufacturerFordComponent, canActivate: [AuthGuard], data: { forAdmin: 'true' } },
        { path: 'Mercedes', component: ManufacturerMercedesComponent, canActivate: [AuthGuard], data: { forAdmin: 'true' } },
        { path: '', redirectTo: 'Ford', pathMatch: 'full' },
      ] },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
    ]
  },
  {
    path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { forAdmin: 'false' }, children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { forAdmin: 'false' } },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
    ]
  },
  // { path: '**', redirectTo: 'user/home', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
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
    ManufacturerFordComponent,
    ManufacturerMercedesComponent
  ],
  imports: [
    BrowserModule,
    ConfirmPopupModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    })
  ],
  providers: [
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
