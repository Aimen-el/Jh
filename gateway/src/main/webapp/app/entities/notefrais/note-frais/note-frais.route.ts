import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { NoteFrais } from 'app/shared/model/notefrais/note-frais.model';
import { NoteFraisService } from './note-frais.service';
import { NoteFraisComponent } from './note-frais.component';
import { NoteFraisDetailComponent } from './note-frais-detail.component';
import { NoteFraisUpdateComponent } from './note-frais-update.component';
import { NoteFraisDeletePopupComponent } from './note-frais-delete-dialog.component';

@Injectable()
export class NoteFraisResolve implements Resolve<any> {
    constructor(private service: NoteFraisService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new NoteFrais();
    }
}

export const noteFraisRoute: Routes = [
    {
        path: 'note-frais',
        component: NoteFraisComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NoteFrais'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'note-frais/:id/view',
        component: NoteFraisDetailComponent,
        resolve: {
            noteFrais: NoteFraisResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NoteFrais'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'note-frais/new',
        component: NoteFraisUpdateComponent,
        resolve: {
            noteFrais: NoteFraisResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NoteFrais'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'note-frais/:id/edit',
        component: NoteFraisUpdateComponent,
        resolve: {
            noteFrais: NoteFraisResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NoteFrais'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const noteFraisPopupRoute: Routes = [
    {
        path: 'note-frais/:id/delete',
        component: NoteFraisDeletePopupComponent,
        resolve: {
            noteFrais: NoteFraisResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NoteFrais'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
