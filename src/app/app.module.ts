import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';

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
import { ProfileModule } from './profile/profile.module';

import { ClientEntryModule } from './client-entry/client-entry.module';
import { ProjectEntryModule } from './project-entry/project-entry.module';
import { TaskEntryModule } from './task-entry/task-entry.module';

import { TrackersModule } from './trackers/trackers.module';
import { TrackerEntryModule } from './tracker-entry/tracker-entry.module';

import { ReportsModule } from './reports/reports.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    BlockUIModule.forRoot({
      message: 'Loading...',
    }), // Import BlockUIModule
    BlockUIHttpModule.forRoot({
      blockAllRequestsInProgress: true,
    }), // Import Block UI Http Module
    NgbModule,
    CoreModule,
    SharedModule,
    ShellModule,
    RegisterModule,
    AuthModule,
    DashboardModule,
    HomeModule,
    ProfileModule,
    ClientsModule,
    ClientEntryModule,
    ProjectsModule,
    ProjectEntryModule,
    TasksModule,
    TaskEntryModule,
    TrackersModule,
    TrackerEntryModule,
    ReportsModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
