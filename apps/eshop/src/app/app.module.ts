import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@hikmah-tech/ui';
import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@hikmah-tech/products';
import { CategoriesModule } from '@hikmah-tech/categories';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OrdersModule } from '@hikmah-tech/orders';
import { MessageService } from 'primeng/api';
import { JwtInterceptor, UsersModule } from '@hikmah-tech/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

const routes: Routes = [{ path: '', component: HomeComponent }];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    RouterModule.forRoot(routes),
    UiModule,
    AccordionModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    UsersModule
  ],
  providers: [
    MessageService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : JwtInterceptor, 
      multi : true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
