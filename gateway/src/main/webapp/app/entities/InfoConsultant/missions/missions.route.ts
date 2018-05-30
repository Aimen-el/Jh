import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { Missions } from 'app/shared/model/InfoConsultant/missions.model';
import { MissionsService } from './missions.service';
import { MissionsComponent } from './missions.component';
import { MissionsDetailComponent } from './missions-detail.component';
import { MissionsUpdateComponent } from './missions-update.component';
import { MissionsDeletePopupComponent } from './missions-delete-dialog.component';

@Injectable()
export class MissionsResolve implements Resolve<any> {
    constructor(private service: MissionsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Missions();
    }
}

export const missionsRoute: Routes = [
    {
        path: 'missions',
        component: MissionsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Missions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'missions/:id/view',
        component: MissionsDetailComponent,
        resolve: {
            missions: MissionsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Missions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'missions/new',
        component: MissionsUpdateComponent,
        resolve: {
            missions: MissionsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Missions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'missions/:id/edit',
        component: MissionsUpdateComponent,
        resolve: {
            missions: MissionsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Missions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const missionsPopupRoute: Routes = [
    {
        path: 'missions/:id/delete',
        component: MissionsDeletePopupComponent,
        resolve: {
            missions: MissionsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Missions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
