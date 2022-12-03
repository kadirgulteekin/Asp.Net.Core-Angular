import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShopModule } from './shop/shop.module';
import { HomeModule } from './home/home.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptors';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from './core/core.module';



@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
        ShopModule,
        ToastrModule.forRoot({
            closeButton: true,
            progressBar: true
        }),
        HomeModule,
       
    ]
})
export class AppModule { }
