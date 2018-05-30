import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { Consultant } from 'app/shared/model/msconsultant/consultant.model';
import { ConsultantService } from './consultant.service';
import { ConsultantComponent } from './consultant.component';
import { ConsultantDetailComponent } from './consultant-detail.component';
import { ConsultantUpdateComponent } from './consultant-update.component';
import { ConsultantDeletePopupComponent } from './consultant-delete-dialog.component';

@Injectable()
export class ConsultantResolve implements Resolve<any> {
    constructor(private service: ConsultantService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Consultant();
    }
}

export const consultantRoute: Routes = [
    {
        path: 'consultant',
        component: ConsultantComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consultants'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consultant/:id/view',
        component: ConsultantDetailComponent,
        resolve: {
            consultant: ConsultantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consultants'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consultant/new',
        component: ConsultantUpdateComponent,
        resolve: {
            consultant: ConsultantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consultants'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consultant/:id/edit',
        component: ConsultantUpdateComponent,
        resolve: {
            consultant: ConsultantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consultants'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const consultantPopupRoute: Routes = [
    {
        path: 'consultant/:id/delete',
        component: ConsultantDeletePopupComponent,
        resolve: {
            consultant: ConsultantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consultants'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
