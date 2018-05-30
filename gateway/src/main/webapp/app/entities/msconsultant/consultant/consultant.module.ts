import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    ConsultantService,
    ConsultantComponent,
    ConsultantDetailComponent,
    ConsultantUpdateComponent,
    ConsultantDeletePopupComponent,
    ConsultantDeleteDialogComponent,
    consultantRoute,
    consultantPopupRoute,
    ConsultantResolve
} from './';

const ENTITY_STATES = [...consultantRoute, ...consultantPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ConsultantComponent,
        ConsultantDetailComponent,
        ConsultantUpdateComponent,
        ConsultantDeleteDialogComponent,
        ConsultantDeletePopupComponent
    ],
    entryComponents: [ConsultantComponent, ConsultantUpdateComponent, ConsultantDeleteDialogComponent, ConsultantDeletePopupComponent],
    providers: [ConsultantService, ConsultantResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayConsultantModule {}
