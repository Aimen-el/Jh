import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardSharedModule } from 'app/shared';
import { DashboardAdminModule } from 'app/admin/admin.module';
import {
    ExtraService,
    ExtraComponent,
    ExtraDetailComponent,
    ExtraUpdateComponent,
    ExtraDeletePopupComponent,
    ExtraDeleteDialogComponent,
    extraRoute,
    extraPopupRoute,
    ExtraResolve
} from './';

const ENTITY_STATES = [...extraRoute, ...extraPopupRoute];

@NgModule({
    imports: [DashboardSharedModule, DashboardAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ExtraComponent, ExtraDetailComponent, ExtraUpdateComponent, ExtraDeleteDialogComponent, ExtraDeletePopupComponent],
    entryComponents: [ExtraComponent, ExtraUpdateComponent, ExtraDeleteDialogComponent, ExtraDeletePopupComponent],
    providers: [ExtraService, ExtraResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardExtraModule {}
