import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/angular-material/angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Flex Layout */
import { FlexLayoutModule } from "@angular/flex-layout";

/* Components */
import { LoginComponent } from './components/login/login.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SensorDetailComponent } from './components/sensor-detail/sensor-detail.component';

/* Services */
import { LoginService } from './components/login/login.service';
import { RegisterService } from './components/register/register.service';
import { ProfileService } from './components/profile/profile.service';
import { SensorsService } from './components/main/sensors.service';

/* Third-party */
import { MomentModule } from 'ngx-moment';
import 'moment/locale/es';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as highstock from 'highcharts/modules/stock.src';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolbarComponent,
    LoadingComponent,
    RegisterComponent,
    MainComponent,
    ProfileComponent,
    SensorDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MomentModule,
    ChartModule
  ],
  providers: [
    LoginService,
    RegisterService,
    ProfileService,
    SensorsService,
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ highstock ] }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [LoadingComponent]
})
export class AppModule { }
