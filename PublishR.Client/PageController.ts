module publishr.client {
    "use strict";

    export class PageController {
        constructor(
            public scope: PageScope,
            public state: PageState,
            public http: IHttpService,
            public api: IApi,
            public alert: IAlert)
        {
            this.baseAddress = StringHelpers.trimEnd(this.api.baseAddress, '/')
                + '/page/'
                + this.state.id;
        }

        private baseAddress: string;
        
        /* get page */

        getPage() {
            this.http
                .get<Page>(this.baseAddress, this.api.config)
                .success(p => this.getPageSuccess(p))
                .error((d, s) => this.getPageError(d, s)); 
        }   

        getPageSuccess(page: Page) {
            this.scope.data = page;
        }

        getPageError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        /* update cover */

        updateCover() {
            this.http
                .put<any>(this.baseAddress + '/cover', this.scope.data.cover, this.api.config)
                .success(() => this.updateSectionsSuccess())
                .error((d, s) => this.updateCoverError(d, s));
        }

        updateCoverSuccess() {
            this.updateSuccess();
        }

        updateCoverError(data: any, status: number) {
            this.updateError(data, status);
        }

        /* update properties */

        updateProperties() {
            this.http
                .put<any>(this.baseAddress + '/properties', this.scope.data.properties, this.api.config)
                .success(() => this.updateSectionsSuccess())
                .error((d, s) => this.updatePropertiesError(d, s));
        }

        updatePropertiesSuccess() {
            this.updateSuccess();
        }

        updatePropertiesError(data: any, status: number) {
            this.updateError(data, status);
        }

        /* update tags */

        updateTags() {
            this.http
                .put<any>(this.baseAddress + '/tags', this.scope.data.tags, this.api.config)
                .success(() => this.updateTagsSuccess())
                .error((d, s) => this.updateTagssError(d, s));
        }

        updateTagsSuccess() {
            this.updateSuccess();
        }

        updateTagssError(data: any, status: number) {
            this.updateError(data, status);
        }

        /* update metadata */

        updateMetadata() {
            this.http
                .put<any>(this.baseAddress + '/metadata', this.scope.data.metadata, this.api.config)
                .success(() => this.updateMetadataSuccess())
                .error((d, s) => this.updateMetadataError(d, s));
        }

        updateMetadataSuccess() {
            this.updateSuccess();
        }

        updateMetadataError(data: any, status: number) {
            this.updateError(data, status);
        }

        /* update sections */

        moveSectionUp(section: Section) {
            ArrayHelpers.moveUp(this.scope.data.sections, section);
        }

        moveSectionDown(section: Section) {
            ArrayHelpers.moveDown(this.scope.data.sections, section);
        }

        updateSections() {
            this.http
                .put<any>(this.baseAddress + '/sections', this.scope.data.sections, this.api.config)
                .success(() => this.updateSectionsSuccess())
                .error((d, s) => this.updateSectionsError(d, s));
        }

        updateSectionsSuccess() {
            this.updateSuccess();
        }

        updateSectionsError(data: any, status: number) {
            this.updateError(data, status);
        }

        /* update credits */

        moveCreditUp(credit: Credit) {
            ArrayHelpers.moveUp(this.scope.data.credits, credit);
        }

        moveCreditDown(credit: Credit) {
            ArrayHelpers.moveDown(this.scope.data.credits, credit);
        }

        updateCredits() {
            this.http
                .put<any>(this.baseAddress + '/credits', this.scope.data.credits, this.api.config)
                .success(() => this.updateCreditsSuccess())
                .error((d, s) => this.updateCreditsError(d, s));
        }

        updateCreditsSuccess() {
            this.updateSuccess();
        }

        updateCreditsError(data: any, status: number) {
            this.updateError(data, status);
        }

        /* update cards */

        updateCards() {
            this.http
                .put<any>(this.baseAddress + '/cards', this.scope.data.cards, this.api.config)
                .success(() => this.updateCardsSuccess())
                .error((d, s) => this.updateCardsError(d, s));
        }

        updateCardsSuccess() {
            this.updateSuccess();
        }

        updateCardsError(data: any, status: number) {
            this.updateError(data, status);
        }

        /* update schedule */

        updateSchedule() {
            this.http
                .put<any>(this.baseAddress + '/schedule', this.scope.data.schedule, this.api.config)
                .success(() => this.updateScheduleSuccess())
                .error((d, s) => this.updateScheduleError(d, s));
        }

        updateScheduleSuccess() {
            this.updateSuccess();
        }

        updateScheduleError(data: any, status: number) {
            this.updateError(data, status);
        }

        /* submit */

        submitPage() {
            this.http
                .post<any>(this.baseAddress + '/submit', null, this.api.config)
                .success(() => this.submitPageSuccess())
                .error((d, s) => this.submitPageError(d, s));
        }

        submitPageSuccess() {
            this.stateSuccess();
        }

        submitPageError(data: any, status: number) {
            this.stateError(data, status);
        }

        /* approve */

        approvePage() {
            this.http
                .post<any>(this.baseAddress + '/approve', null, this.api.config)
                .success(() => this.approvePageSuccess())
                .error((d, s) => this.approvePageError(d, s));
        }

        approvePageSuccess() {
            this.stateSuccess();
        }

        approvePageError(data: any, status: number) {
            this.stateError(data, status);
        }

        /* reject */

        rejectPage() {
            this.http
                .post<any>(this.baseAddress + '/reject', null, this.api.config)
                .success(() => this.rejectPageSuccess())
                .error((d, s) => this.rejectPageError(d, s));
        }

        rejectPageSuccess() {
            this.stateSuccess();
        }

        rejectPageError(data: any, status: number) {
            this.stateError(data, status);
        }

        /* delete */

        deletePage() {
            this.http
                .delete<any>(this.baseAddress, this.api.config)
                .success(() => this.deletePageSuccess())
                .error((d, s) => this.deletePageError(d, s));
        }

        deletePageSuccess() {
            this.stateSuccess();
        }

        deletePageError(data: any, status: number) {
            this.stateError(data, status);
        }

        /* update responce */

        updateSuccess() {

        }

        updateError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        /* state responce */

        stateSuccess() {

        }

        stateError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        static $inject = ["$scope", "$stateParams", "$http", "api", "alert"];
    }

    export interface PageScope {
        data: Page;
    }

    export interface PageState {
        id: string;
    }
} 