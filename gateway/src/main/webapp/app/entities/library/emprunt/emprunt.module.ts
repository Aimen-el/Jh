import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    EmpruntService,
    EmpruntComponent,
    EmpruntDetailComponent,
    EmpruntUpdateComponent,
    EmpruntDeletePopupComponent,
    EmpruntDeleteDialogComponent,
    empruntRoute,
    empruntPopupRoute,
    EmpruntResolve
} from './';

const ENTITY_STATES = [...empruntRoute, ...empruntPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EmpruntComponent,
        EmpruntDetailComponent,
        EmpruntUpdateComponent,
        EmpruntDeleteDialogComponent,
        EmpruntDeletePopupComponent
    ],
    entryComponents: [EmpruntComponent, EmpruntUpdateComponent, EmpruntDeleteDialogComponent, EmpruntDeletePopupComponent],
    providers: [EmpruntService, EmpruntResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEmpruntModule {}
