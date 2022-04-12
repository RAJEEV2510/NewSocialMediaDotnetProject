import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_gaurd/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PreventUnsavedChangesGuard } from './_gaurd/prevent-unsaved-changes.guard';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminGaurdGuard } from './_gaurd/admin-gaurd.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [{ path: 'members', component: MemberListComponent },
    { path: 'member/edit', component: MemberEditComponent, pathMatch: "full", canDeactivate: [PreventUnsavedChangesGuard] },
    { path: 'member/:username', component: MemberDetailComponent, pathMatch: "full" },

    { path: 'messages', component: MessagesComponent },
    { path: 'admin', component: AdminPanelComponent, canActivate: [AdminGaurdGuard] },
    { path: 'lists', component: ListsComponent }]
  },
  { path: "not-found", component: NotFoundComponent },
  { path: "errors", component: TestErrorsComponent },
  { path: "server-error", component: ServerErrorComponent },
  { path: "**", redirectTo: "/not-found", pathMatch: "full" }

]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
