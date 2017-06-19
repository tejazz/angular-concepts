import { Routes } from '@angular/router';
import { AppComponent } from "app/app.component";
import { SearchComponent } from "app/search/search.component";
import { DetailComponent } from "app/detail/detail.component";

// Defining paths for routes used
export const appRoutes: Routes = [
    { 
        path: "", 
        redirectTo: "/search",
        pathMatch: "full" 
    },
    {
        path: "search",
        component: SearchComponent
    },
    {
        path: "detail/:isbn", 
        component: DetailComponent
    }
]