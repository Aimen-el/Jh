import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { Infoconsultant } from 'app/shared/model/InfoConsultant/infoconsultant.model';
import { InfoconsultantService } from './infoconsultant.service';
import { InfoconsultantComponent } from './infoconsultant.component';
import { InfoconsultantDetailComponent } from './infoconsultant-detail.component';
import { InfoconsultantUpdateComponent } from './infoconsultant-update.component';
import { InfoconsultantDeletePopupComponent } from './infoconsultant-delete-dialog.component';

@Injectable()
export class InfoconsultantResolve implements Resolve<any> {
    constructor(private service: InfoconsultantService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Infoconsultant();
    }
}

export const infoconsultantRoute: Routes = [
    {
        path: 'infoconsultant',
        component: InfoconsultantComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Infoconsultants'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'infoconsultant/:id/view',
        component: InfoconsultantDetailComponent,
        resolve: {
            infoconsultant: InfoconsultantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Infoconsultants'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'infoconsultant/new',
        component: InfoconsultantUpdateComponent,
        resolve: {
            infoconsultant: InfoconsultantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Infoconsultants'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'infoconsultant/:id/edit',
        component: InfoconsultantUpdateComponent,
        resolve: {
            infoconsultant: InfoconsultantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Infoconsultants'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const infoconsultantPopupRoute: Routes = [
    {
        path: 'infoconsultant/:id/delete',
        component: InfoconsultantDeletePopupComponent,
        resolve: {
            infoconsultant: InfoconsultantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Infoconsultants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
