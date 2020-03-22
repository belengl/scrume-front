import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutModule } from '@angular/cdk/layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { TeamComponent } from './team/team.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ProjectComponent, NewSprintDialog } from './project/project.component';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CreateProjectComponent } from './create-project/create-project.component';
import { TeamCreateComponent } from './team-create/team-create.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BacklogComponent, NewTaskDialog, EditTaskDialog, SelectSprintBottomSheet } from './backlog/backlog.component';
import { FilterPipe } from './backlog/filter.pipe';
import { SprintComponent, EditSprintDialog } from './sprint/sprint.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { CreateTaskComponent } from './create-task/create-task.component';
import { BoardComponent } from './board/board.component';
import {Component} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { CreateBoardComponent } from './create-board/create-board.component';


@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    WellcomeComponent,
    ProjectComponent,
    CreateProjectComponent,
    TeamComponent,
    TeamCreateComponent,
    NewSprintDialog,
    SprintComponent,
    BacklogComponent,
    FilterPipe,
    SprintComponent,
    EditSprintDialog,
    CreateTaskComponent,
    NewTaskDialog,
    EditTaskDialog,
    BoardComponent,
    CreateBoardComponent,
    SelectSprintBottomSheet
  ],
  imports: [
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatGridListModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    MatExpansionModule,
    MatDialogModule,
    MatNativeDateModule,
    MatBottomSheetModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
