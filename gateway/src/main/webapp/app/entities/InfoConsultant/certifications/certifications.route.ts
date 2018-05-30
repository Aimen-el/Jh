import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { Certifications } from 'app/shared/model/InfoConsultant/certifications.model';
import { CertificationsService } from './certifications.service';
import { CertificationsComponent } from './certifications.component';
import { CertificationsDetailComponent } from './certifications-detail.component';
import { CertificationsUpdateComponent } from './certifications-update.component';
import { CertificationsDeletePopupComponent } from './certifications-delete-dialog.component';

@Injectable()
export class CertificationsResolve implements Resolve<any> {
    constructor(private service: CertificationsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Certifications();
    }
}

export const certificationsRoute: Routes = [
    {
        path: 'certifications',
        component: CertificationsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Certifications'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'certifications/:id/view',
        component: CertificationsDetailComponent,
        resolve: {
            certifications: CertificationsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Certifications'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'certifications/new',
        component: CertificationsUpdateComponent,
        resolve: {
            certifications: CertificationsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Certifications'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'certifications/:id/edit',
        component: CertificationsUpdateComponent,
        resolve: {
            certifications: CertificationsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Certifications'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const certificationsPopupRoute: Routes = [
    {
        path: 'certifications/:id/delete',
        component: CertificationsDeletePopupComponent,
        resolve: {
            certifications: CertificationsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Certifications'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
