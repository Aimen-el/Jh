import { Component, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { IInfoconsultant } from '../shared/model/InfoConsultant/infoconsultant.model';
import { LoginService, Principal, Account } from 'app/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { InfoconsultantService } from 'app/entities/InfoConsultant/infoconsultant/infoconsultant.service';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})

export class HomeComponent implements OnInit {
    account: Account;
    infoconsultants: IInfoconsultant[];

    constructor(private infoconsultantService: InfoconsultantService, private principal: Principal, private loginService: LoginService, private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.loadAll();   
        this.principal.identity().then(account => { this.account = account; });
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
		this.infoconsultantService.query().subscribe(
		(res: HttpResponse<IInfoconsultant[]>) => { this.infoconsultants = res.body; });
    }
    
    login() {
        this.loginService.login();
    }
}
