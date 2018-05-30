import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayBibleoModule as BibleoBibleoModule } from './bibleo/bibleo/bibleo.module';
import { GatewayConsultantModule as MsconsultantConsultantModule } from './msconsultant/consultant/consultant.module';
import { GatewayNoteFraisModule as NotefraisNoteFraisModule } from './notefrais/note-frais/note-frais.module';
import { GatewayLivreModule as LibraryLivreModule } from './library/livre/livre.module';
import { GatewayEmpruntModule as LibraryEmpruntModule } from './library/emprunt/emprunt.module';
import { GatewayMissionsModule as InfoConsultantMissionsModule } from './InfoConsultant/missions/missions.module';
import { GatewayCertificationsModule as InfoConsultantCertificationsModule } from './InfoConsultant/certifications/certifications.module';
import { GatewayInfoConsultantModule as InfoConsultantInfoConsultantModule } from './InfoConsultant/info-consultant/info-consultant.module';
import { GatewayInfoconsultantModule as InfoConsultantInfoconsultantModule } from './InfoConsultant/infoconsultant/infoconsultant.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        BibleoBibleoModule,
        MsconsultantConsultantModule,
        NotefraisNoteFraisModule,
        LibraryLivreModule,
        LibraryEmpruntModule,
        InfoConsultantMissionsModule,
        InfoConsultantCertificationsModule,
        InfoConsultantInfoConsultantModule,
        InfoConsultantInfoconsultantModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
