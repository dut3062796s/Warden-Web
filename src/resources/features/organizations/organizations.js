import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import OrganizationService from 'resources/services/organization-service';

@inject(Router, OrganizationService)
export class Organizations {
    constructor(router, organizationService) {
        this.router = router;
        this.organizationService = organizationService;
    }

    async activate(){
        this.organizations = await this.organizationService.getAll();
    }
}
