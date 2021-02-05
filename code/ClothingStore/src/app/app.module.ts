import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryModule } from 'ng-gallery';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MainAppComponent } from './main-app/main-app.component';
import { AboutTheCompanyComponent } from './about-the-company/about-the-company.component';
import { ShippingInfoComponent } from './shipping-info/shipping-info.component';
import { ReturnsComponent } from './returns/returns.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { CatalogPreviewComponent } from './catalog-preview/catalog-preview.component';
import { LoginComponent } from './login/login.component';
import { CatalogItemComponent } from './catalog-item/catalog-item.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    AboutUsComponent,
    HomeComponent,
    ContactUsComponent,
    MainAppComponent,
    AboutTheCompanyComponent,
    ShippingInfoComponent,
    ReturnsComponent,
    MainCarouselComponent,
    CatalogPreviewComponent,
    LoginComponent,
    CatalogItemComponent,
    ItemPageComponent,
    CatalogPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    GalleryModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
