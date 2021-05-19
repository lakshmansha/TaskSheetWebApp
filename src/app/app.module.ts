import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '@env/environment';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';

import { AuthModule } from '@app/auth';
import { RegisterModule } from './register/register.module';
import { ShellModule } from './shell/shell.module';

import { HomeModule } from './home/home.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ClientsModule } from './clients/clients.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    CoreModule,
    SharedModule,
    ShellModule,
    DashboardModule,
    HomeModule,
    ClientsModule,
    ProjectsModule,
    TasksModule,
    RegisterModule,
    AuthModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
