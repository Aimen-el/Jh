import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    InfoConsultantService,
    InfoConsultantComponent,
    InfoConsultantDetailComponent,
    InfoConsultantUpdateComponent,
    InfoConsultantDeletePopupComponent,
    InfoConsultantDeleteDialogComponent,
    infoConsultantRoute,
    infoConsultantPopupRoute,
    InfoConsultantResolve
} from './';

const ENTITY_STATES = [...infoConsultantRoute, ...infoConsultantPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InfoConsultantComponent,
        InfoConsultantDetailComponent,
        InfoConsultantUpdateComponent,
        InfoConsultantDeleteDialogComponent,
        InfoConsultantDeletePopupComponent
    ],
    entryComponents: [
        InfoConsultantComponent,
        InfoConsultantUpdateComponent,
        InfoConsultantDeleteDialogComponent,
        InfoConsultantDeletePopupComponent
    ],
    providers: [InfoConsultantService, InfoConsultantResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayInfoConsultantModule {}
