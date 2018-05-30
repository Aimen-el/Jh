import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    LivreService,
    LivreComponent,
    LivreDetailComponent,
    LivreUpdateComponent,
    LivreDeletePopupComponent,
    LivreDeleteDialogComponent,
    livreRoute,
    livrePopupRoute,
    LivreResolve
} from './';

const ENTITY_STATES = [...livreRoute, ...livrePopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [LivreComponent, LivreDetailComponent, LivreUpdateComponent, LivreDeleteDialogComponent, LivreDeletePopupComponent],
    entryComponents: [LivreComponent, LivreUpdateComponent, LivreDeleteDialogComponent, LivreDeletePopupComponent],
    providers: [LivreService, LivreResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayLivreModule {}
