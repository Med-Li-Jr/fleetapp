import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainlayoutComponent } from './layouts/mainlayout/mainlayout.component';
import { LoginComponent } from './layouts/login/login.component';
import { NotfoundComponent } from './layouts/notfound/notfound.component';
import { NotallowedComponent } from './layouts/notallowed/notallowed.component';
import { NavbarMenuComponent } from './layouts/navbar-menu/navbar-menu.component';
import { NavbarProfilComponent } from './layouts/navbar-profil/navbar-profil.component';
import { DataresetComponent } from './layouts/datareset/datareset.component';
import { BtncreateComponent } from './layouts/btns/btncreate/btncreate.component';
import { BtnsdetailComponent } from './layouts/btns/btnsdetail/btnsdetail.component';
import { BtnstableComponent } from './layouts/btns/btnstable/btnstable.component';
import { SmallscreenComponent } from './layouts/smallscreen/smallscreen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarMenuComponent,
    NavbarProfilComponent,
    RoutingComponents,
    MainlayoutComponent,
    LoginComponent,
    NotallowedComponent,
    BtncreateComponent,
    BtnstableComponent,
    BtnsdetailComponent,
    NotfoundComponent,
    DataresetComponent,
    SmallscreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
