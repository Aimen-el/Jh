/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { GatewayTestModule } from '../../../../test.module';
import { NoteFraisDetailComponent } from 'app/entities/notefrais/note-frais/note-frais-detail.component';
import { NoteFrais } from 'app/shared/model/notefrais/note-frais.model';

describe('Component Tests', () => {
    describe('NoteFrais Management Detail Component', () => {
        let comp: NoteFraisDetailComponent;
        let fixture: ComponentFixture<NoteFraisDetailComponent>;
        const route = ({ data: of({ noteFrais: new NoteFrais(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [NoteFraisDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(NoteFraisDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NoteFraisDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.noteFrais).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
