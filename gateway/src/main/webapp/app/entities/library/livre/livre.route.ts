import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { Livre } from 'app/shared/model/library/livre.model';
import { LivreService } from './livre.service';
import { LivreComponent } from './livre.component';
import { LivreDetailComponent } from './livre-detail.component';
import { LivreUpdateComponent } from './livre-update.component';
import { LivreDeletePopupComponent } from './livre-delete-dialog.component';

@Injectable()
export class LivreResolve implements Resolve<any> {
    constructor(private service: LivreService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Livre();
    }
}

export const livreRoute: Routes = [
    {
        path: 'livre',
        component: LivreComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Livres'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'livre/:id/view',
        component: LivreDetailComponent,
        resolve: {
            livre: LivreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Livres'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'livre/new',
        component: LivreUpdateComponent,
        resolve: {
            livre: LivreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Livres'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'livre/:id/edit',
        component: LivreUpdateComponent,
        resolve: {
            livre: LivreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Livres'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const livrePopupRoute: Routes = [
    {
        path: 'livre/:id/delete',
        component: LivreDeletePopupComponent,
        resolve: {
            livre: LivreResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Livres'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
