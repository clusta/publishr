module publishr.client {
    "use strict";

    export class PageController {
        constructor(
            public scope: PageScope,
            public state: PageState,
            public location: ILocationService,
            public http: IHttpService,
            public api: IApi,
            public alert: IAlert)
        {
            this.bind();
            this.initialize();
        }
        
        /* bind */

        bind() {
            this.scope.createPage = form => this.createPage(form);
            this.scope.updateCards = form => this.updateCards(form);
            this.scope.updateProperties = form => this.updateProperties(form);
            this.scope.addTag = tag => this.addTag(tag);
            this.scope.removeTag = tag => this.removeTag(tag);
            this.scope.updateTags = form => this.updateTags(form);
            this.scope.updateMetadata = form => this.updateMetadata(form);
            this.scope.moveSectionUp = section => this.moveSectionUp(section);
            this.scope.moveSectionDown = section => this.moveSectionDown(section);
            this.scope.updateSections = form => this.updateSections(form);
            this.scope.moveCreditUp = credit => this.moveCreditUp(credit);
            this.scope.moveCreditDown = credit => this.moveCreditDown(credit);
            this.scope.updateCredits = form => this.updateCredits(form);
            this.scope.updateSchedules = form => this.updateSchedules(form);
            this.scope.submitPage = () => this.submitPage();
            this.scope.approvePage = () => this.approvePage();
            this.scope.rejectPage = () => this.rejectPage();
            this.scope.deletePage = () => this.deletePage();
        }

        /* initialize */

        initialize() {
            this.scope.create = {
                kind: 'web_page',
                slug: null,
                card: null
            };
        }

        /* get page uri */

        getPageUri(): string {
            return StringHelpers.trimEnd(this.api.baseAddress, '/')
                + '/page/'
                + (this.state.id || '');
        }

        /* get page */

        getPage() {
            this.http
                .get<Page>(this.getPageUri(), this.api.config)
                .success(p => this.getPageSuccess(p))
                .error((d, s) => this.getPageError(d, s)); 
        }   

        getPageSuccess(page: Page) {
            this.scope.data = page;
        }

        getPageError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        /* add page */

        createPage(form?: IFormController) {
            if (form && form.$invalid)
                return;

            this.state.id = null;

            this.http
                .post<Resource>(this.getPageUri(), this.scope.create, this.api.config)
                .success(resource => this.createPageSuccess(resource))
                .error((d, s) => this.createPageError(d, s));
        }

        createPageSuccess(resource: Resource) {
            this.state.id = resource.id;

            this.getPage();
        }

        createPageError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        /* update cards */

        updateCards(form?: IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .put<any>(this.getPageUri() + '/cards', this.scope.data.cards, this.api.config)
                .success(() => this.updateCardsSuccess())
                .error((d, s) => this.updateCardsError(d, s));
        }

        updateCardsSuccess() {
            this.updateSuccess();
        }

        updateCardsError(data: any, status: number) {
            this.updateError(data, status);
        }

        /* update properties */

        updateProperties(form?: IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .put<any>(this.getPageUri() + '/properties', this.scope.data.properties, this.api.config)
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

        addTag(tag: string) {
            if (!tag) return;
            if (tag.length < 1) return;
            if (!this.scope.data.tags) this.scope.data.tags = new Array<string>();

            var index = this.scope.data.tags
                .map(t => {
                    return t.toLowerCase()
                })
                .indexOf(tag.toLowerCase());

            if (index == -1) {
                this.scope.data.tags.push(tag);
            }
        }

        removeTag(tag: string) {
            if (!tag) return;
            if (tag.length < 1) return;

            if (!this.scope.data.tags) {
                this.scope.data.tags = new Array<string>();
                return;
            }

            var index = 0;

            while (index > -1) {
                var index = this.scope.data.tags
                    .map(t => {
                        return t.toLowerCase()
                    })
                    .indexOf(tag.toLowerCase());

                if (index > -1) {
                    this.scope.data.tags.splice(index, 1);
                }
            }
        }

        updateTags(form?: IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .put<any>(this.getPageUri() + '/tags', this.scope.data.tags, this.api.config)
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

        updateMetadata(form?: IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .put<any>(this.getPageUri() + '/metadata', this.scope.data.metadata, this.api.config)
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

        updateSections(form?: IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .put<any>(this.getPageUri() + '/sections', this.scope.data.sections, this.api.config)
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

        updateCredits(form?: IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .put<any>(this.getPageUri() + '/credits', this.scope.data.credits, this.api.config)
                .success(() => this.updateCreditsSuccess())
                .error((d, s) => this.updateCreditsError(d, s));
        }

        updateCreditsSuccess() {
            this.updateSuccess();
        }

        updateCreditsError(data: any, status: number) {
            this.updateError(data, status);
        }

        /* update schedule */

        updateSchedules(form?: IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .put<any>(this.getPageUri() + '/schedules', this.scope.data.schedules, this.api.config)
                .success(() => this.updateSchedulesSuccess())
                .error((d, s) => this.updateSchedulesError(d, s));
        }

        updateSchedulesSuccess() {
            this.updateSuccess();
        }

        updateSchedulesError(data: any, status: number) {
            this.updateError(data, status);
        }

        /* submit */

        submitPage() {
            this.http
                .post<any>(this.getPageUri() + '/submit', null, this.api.config)
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
                .post<any>(this.getPageUri() + '/approve', null, this.api.config)
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
                .post<any>(this.getPageUri() + '/reject', null, this.api.config)
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
                .delete<any>(this.getPageUri(), this.api.config)
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

        static $inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert"];
    }

    export interface PageScope {        
        data: Page;
        create: CreatePageScope;
        createPage(form?: IFormController): void;
        updateCards(form?: IFormController): void;
        updateProperties(form?: IFormController): void;
        addTag(tag: string): void;
        removeTag(tag: string): void;
        updateTags(form?: IFormController): void;
        updateMetadata(form?: IFormController): void;
        moveSectionUp(section: Section): void;
        moveSectionDown(section: Section): void;
        updateSections(form?: IFormController): void;
        moveCreditUp(credit: Credit): void;
        moveCreditDown(credit: Credit): void;
        updateCredits(form?: IFormController): void;
        updateSchedules(form?: IFormController): void;
        submitPage(): void;
        approvePage(): void;
        rejectPage(): void;
        deletePage(): void;
    }

    export interface CreatePageScope {
        kind: string;
        slug: string;
        card: Card;
    }

    export interface PageState {
        id: string;
    }
} 