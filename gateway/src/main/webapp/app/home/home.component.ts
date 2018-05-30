import { Component, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { IConsultant } from '../shared/model/msconsultant/consultant.model';
import { LoginService, Principal, Account } from 'app/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { ConsultantService } from 'app/entities/msconsultant/consultant/consultant.service';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})

export class HomeComponent implements OnInit {
    account: Account;
    consultant: IConsultant;
    consultants: IConsultant[];

    constructor(private consultantService: ConsultantService, private principal: Principal, private loginService: LoginService, private eventManager: JhiEventManager) {}

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
		this.consultantService.query().subscribe(
		(res: HttpResponse<IConsultant[]>) => { this.consultants = res.body; });
    }
    
    login() {
        this.loginService.login();
    }
}
