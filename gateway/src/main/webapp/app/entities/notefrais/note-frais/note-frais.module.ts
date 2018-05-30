import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    NoteFraisService,
    NoteFraisComponent,
    NoteFraisDetailComponent,
    NoteFraisUpdateComponent,
    NoteFraisDeletePopupComponent,
    NoteFraisDeleteDialogComponent,
    noteFraisRoute,
    noteFraisPopupRoute,
    NoteFraisResolve
} from './';

const ENTITY_STATES = [...noteFraisRoute, ...noteFraisPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NoteFraisComponent,
        NoteFraisDetailComponent,
        NoteFraisUpdateComponent,
        NoteFraisDeleteDialogComponent,
        NoteFraisDeletePopupComponent
    ],
    entryComponents: [NoteFraisComponent, NoteFraisUpdateComponent, NoteFraisDeleteDialogComponent, NoteFraisDeletePopupComponent],
    providers: [NoteFraisService, NoteFraisResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayNoteFraisModule {}
