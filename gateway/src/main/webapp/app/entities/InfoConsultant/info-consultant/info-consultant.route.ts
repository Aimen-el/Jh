import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { InfoConsultant } from 'app/shared/model/InfoConsultant/info-consultant.model';
import { InfoConsultantService } from './info-consultant.service';
import { InfoConsultantComponent } from './info-consultant.component';
import { InfoConsultantDetailComponent } from './info-consultant-detail.component';
import { InfoConsultantUpdateComponent } from './info-consultant-update.component';
import { InfoConsultantDeletePopupComponent } from './info-consultant-delete-dialog.component';

@Injectable()
export class InfoConsultantResolve implements Resolve<any> {
    constructor(private service: InfoConsultantService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new InfoConsultant();
    }
}

export const infoConsultantRoute: Routes = [
    {
        path: 'info-consultant',
        component: InfoConsultantComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InfoConsultants'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'info-consultant/:id/view',
        component: InfoConsultantDetailComponent,
        resolve: {
            infoConsultant: InfoConsultantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InfoConsultants'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'info-consultant/new',
        component: InfoConsultantUpdateComponent,
        resolve: {
            infoConsultant: InfoConsultantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InfoConsultants'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'info-consultant/:id/edit',
        component: InfoConsultantUpdateComponent,
        resolve: {
            infoConsultant: InfoConsultantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InfoConsultants'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const infoConsultantPopupRoute: Routes = [
    {
        path: 'info-consultant/:id/delete',
        component: InfoConsultantDeletePopupComponent,
        resolve: {
            infoConsultant: InfoConsultantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InfoConsultants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
