import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";

import { LoginComponent } from "./login/login.component";
import { EmailComponent } from "./email/email.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthGuard } from "./auth.guard";

// Defining the different routes for the app
const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'login/email',
        component: EmailComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        canDeactivate: ['checkValue']
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {} 
