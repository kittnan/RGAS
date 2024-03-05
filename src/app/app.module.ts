import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
  PB_DIRECTION,
  POSITION,
  SPINNER,
} from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './shared/login/login.component';
import { SectionHeadComponent } from './pages/section-head/section-head.component';
import { DepartmentHeadComponent } from './pages/department-head/department-head.component';
import { JwtInterceptor } from './auth/jwt.interceptor';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MMM-YY',
  },
  display: {
    dateInput: 'DD-MMM-YY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#178173",
  fgsColor:"#178173",
  bgsPosition: POSITION.bottomRight,
  bgsSize: 40,
  bgsType: SPINNER.chasingDots, // background spinner type
  fgsType: SPINNER.squareJellyBox, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
  minTime: 100
};
@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    LoginComponent,
    SectionHeadComponent,
    DepartmentHeadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
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
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
  exports: [

  ]
})
export class AppModule { }
