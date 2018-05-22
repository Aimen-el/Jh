import { Component, OnInit } from '@angular/core';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { IExtra } from '../shared/model/extra.model';
import { LoginService, Principal, Account } from 'app/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { ExtraService } from 'app/entities/extra/extra.service';
@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    extra: IExtra;
    extras: IExtra[];
    constructor(
        private extraService: ExtraService,
        private principal: Principal,
        private loginService: LoginService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.loadAll();

        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
    loadAll() {
        this.extraService.query().subscribe((res: HttpResponse<IExtra[]>) => {
            this.extras = res.body;
        });
    }
    login() {
        this.loginService.login();
    }
}
