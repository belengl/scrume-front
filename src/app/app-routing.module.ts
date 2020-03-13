import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WellcomeComponent } from './wellcome/wellcome.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { ProjectComponent } from './project/project.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { SprintComponent } from './sprint/sprint.component';


const routes: Routes = [

  {path: 'bienvenida', component: BienvenidaComponent},
  {path: 'wellcome', component: WellcomeComponent},
  {path: 'project', component: ProjectComponent},
  {path: 'project/create', component: CreateProjectComponent},
  {path: 'sprint', component: SprintComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
