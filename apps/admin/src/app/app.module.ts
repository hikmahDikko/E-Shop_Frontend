import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button'
import { InputTextareaModule } from 'primeng/inputtextarea';;
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesService } from '@hikmah-tech/categories';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'categories',
        component: CategoriesListComponent,
      },
      {
        path: 'categories/form',
        component: CategoriesFormComponent,
      },
      {
        path: 'categories/form/:id',
        component: CategoriesFormComponent,
      },
      {
        path: 'products',
        component: ProductsListComponent,
      },
      {
        path: 'products/form',
        component: ProductsFormComponent,
      },
      {
        path: 'products/form/:id',
        component: ProductsFormComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    ProductsListComponent,
    ProductsFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    ColorPickerModule,
    InputNumberModule,
    InputTextareaModule,
    InputSwitchModule,
    DropdownModule,
    EditorModule,
  ],
  providers: [CategoriesService, MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
