import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
  NgxUiLoaderHttpModule,
  NgxUiLoaderRouterModule,
} from "ngx-ui-loader";
import { HttpClientModule } from '@angular/common/http';
import { UserManageComponent } from './users/user-manage/user-manage.component';
import { UsersComponent } from './users/users.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MaterialModule } from './material/material.module';
import { UserNewComponent } from './users/user-new/user-new.component';
import { RgasComponent } from './rgas/rgas.component';
import { RgasManageComponent } from './rgas/rgas-manage/rgas-manage.component';
import { Rgas1Component } from './rgas/rgas1/rgas1.component';
import { Rgas2Component } from './rgas/rgas2/rgas2.component';
import { TitleComponent } from './shared/title/title.component';
import { Form1Component } from './shared/rgas2/form1/form1.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SubTitleComponent } from './shared/sub-title/sub-title.component';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "red",
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.chasingDots, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
  minTime:100
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserManageComponent,
    UsersComponent,
    NotfoundComponent,
    UserNewComponent,
    RgasComponent,
    RgasManageComponent,
    Rgas1Component,
    Rgas2Component,
    TitleComponent,
    Form1Component,
    SubTitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({
      exclude: [
        "/api/not/show/loader",
      ],
    }),
    NgxUiLoaderRouterModule.forRoot({
      exclude: [
        "/login"
      ]
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [

  ]
})
export class AppModule { }
