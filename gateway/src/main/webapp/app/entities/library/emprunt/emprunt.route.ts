import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { Emprunt } from 'app/shared/model/library/emprunt.model';
import { EmpruntService } from './emprunt.service';
import { EmpruntComponent } from './emprunt.component';
import { EmpruntDetailComponent } from './emprunt-detail.component';
import { EmpruntUpdateComponent } from './emprunt-update.component';
import { EmpruntDeletePopupComponent } from './emprunt-delete-dialog.component';

@Injectable()
export class EmpruntResolve implements Resolve<any> {
    constructor(private service: EmpruntService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Emprunt();
    }
}

export const empruntRoute: Routes = [
    {
        path: 'emprunt',
        component: EmpruntComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Emprunts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'emprunt/:id/view',
        component: EmpruntDetailComponent,
        resolve: {
            emprunt: EmpruntResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Emprunts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'emprunt/new',
        component: EmpruntUpdateComponent,
        resolve: {
            emprunt: EmpruntResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Emprunts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'emprunt/:id/edit',
        component: EmpruntUpdateComponent,
        resolve: {
            emprunt: EmpruntResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Emprunts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const empruntPopupRoute: Routes = [
    {
        path: 'emprunt/:id/delete',
        component: EmpruntDeletePopupComponent,
        resolve: {
            emprunt: EmpruntResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Emprunts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
