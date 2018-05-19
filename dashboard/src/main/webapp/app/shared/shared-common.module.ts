import { NgModule } from '@angular/core';

import { DashboardSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [DashboardSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    providers: [],
    exports: [DashboardSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class DashboardSharedCommonModule {}
