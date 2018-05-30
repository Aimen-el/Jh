import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    BibleoService,
    BibleoComponent,
    BibleoDetailComponent,
    BibleoUpdateComponent,
    BibleoDeletePopupComponent,
    BibleoDeleteDialogComponent,
    bibleoRoute,
    bibleoPopupRoute,
    BibleoResolve
} from './';

const ENTITY_STATES = [...bibleoRoute, ...bibleoPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [BibleoComponent, BibleoDetailComponent, BibleoUpdateComponent, BibleoDeleteDialogComponent, BibleoDeletePopupComponent],
    entryComponents: [BibleoComponent, BibleoUpdateComponent, BibleoDeleteDialogComponent, BibleoDeletePopupComponent],
    providers: [BibleoService, BibleoResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayBibleoModule {}
