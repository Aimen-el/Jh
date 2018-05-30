import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    MissionsService,
    MissionsComponent,
    MissionsDetailComponent,
    MissionsUpdateComponent,
    MissionsDeletePopupComponent,
    MissionsDeleteDialogComponent,
    missionsRoute,
    missionsPopupRoute,
    MissionsResolve
} from './';

const ENTITY_STATES = [...missionsRoute, ...missionsPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MissionsComponent,
        MissionsDetailComponent,
        MissionsUpdateComponent,
        MissionsDeleteDialogComponent,
        MissionsDeletePopupComponent
    ],
    entryComponents: [MissionsComponent, MissionsUpdateComponent, MissionsDeleteDialogComponent, MissionsDeletePopupComponent],
    providers: [MissionsService, MissionsResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayMissionsModule {}
