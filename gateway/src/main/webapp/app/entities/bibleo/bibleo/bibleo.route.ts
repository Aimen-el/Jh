import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { Bibleo } from 'app/shared/model/bibleo/bibleo.model';
import { BibleoService } from './bibleo.service';
import { BibleoComponent } from './bibleo.component';
import { BibleoDetailComponent } from './bibleo-detail.component';
import { BibleoUpdateComponent } from './bibleo-update.component';
import { BibleoDeletePopupComponent } from './bibleo-delete-dialog.component';

@Injectable()
export class BibleoResolve implements Resolve<any> {
    constructor(private service: BibleoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Bibleo();
    }
}

export const bibleoRoute: Routes = [
    {
        path: 'bibleo',
        component: BibleoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bibleos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bibleo/:id/view',
        component: BibleoDetailComponent,
        resolve: {
            bibleo: BibleoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bibleos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bibleo/new',
        component: BibleoUpdateComponent,
        resolve: {
            bibleo: BibleoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bibleos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'bibleo/:id/edit',
        component: BibleoUpdateComponent,
        resolve: {
            bibleo: BibleoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bibleos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bibleoPopupRoute: Routes = [
    {
        path: 'bibleo/:id/delete',
        component: BibleoDeletePopupComponent,
        resolve: {
            bibleo: BibleoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bibleos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
