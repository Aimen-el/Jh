import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    InfoconsultantService,
    InfoconsultantComponent,
    InfoconsultantDetailComponent,
    InfoconsultantUpdateComponent,
    InfoconsultantDeletePopupComponent,
    InfoconsultantDeleteDialogComponent,
    infoconsultantRoute,
    infoconsultantPopupRoute,
    InfoconsultantResolve
} from './';

const ENTITY_STATES = [...infoconsultantRoute, ...infoconsultantPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InfoconsultantComponent,
        InfoconsultantDetailComponent,
        InfoconsultantUpdateComponent,
        InfoconsultantDeleteDialogComponent,
        InfoconsultantDeletePopupComponent
    ],
    entryComponents: [
        InfoconsultantComponent,
        InfoconsultantUpdateComponent,
        InfoconsultantDeleteDialogComponent,
        InfoconsultantDeletePopupComponent
    ],
    providers: [InfoconsultantService, InfoconsultantResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayInfoconsultantModule {}
