import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    CertificationsService,
    CertificationsComponent,
    CertificationsDetailComponent,
    CertificationsUpdateComponent,
    CertificationsDeletePopupComponent,
    CertificationsDeleteDialogComponent,
    certificationsRoute,
    certificationsPopupRoute,
    CertificationsResolve
} from './';

const ENTITY_STATES = [...certificationsRoute, ...certificationsPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CertificationsComponent,
        CertificationsDetailComponent,
        CertificationsUpdateComponent,
        CertificationsDeleteDialogComponent,
        CertificationsDeletePopupComponent
    ],
    entryComponents: [
        CertificationsComponent,
        CertificationsUpdateComponent,
        CertificationsDeleteDialogComponent,
        CertificationsDeletePopupComponent
    ],
    providers: [CertificationsService, CertificationsResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayCertificationsModule {}
