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
            // repository
            this.scope.createPage = form => this.createPage(form);
            this.scope.updatePage = form => this.updatePage(form);
            this.scope.submitPage = () => this.submitPage();
            this.scope.approvePage = () => this.approvePage();
            this.scope.rejectPage = () => this.rejectPage();
            this.scope.deletePage = () => this.deletePage();

            // edit
            this.scope.addCard = name => this.addCard(name);
            this.scope.removeCard = name => this.removeCard(name); 
            this.scope.addTag = tag => this.addTag(tag);
            this.scope.removeTag = tag => this.removeTag(tag);
            this.scope.moveSectionUp = section => this.moveSectionUp(section);
            this.scope.moveSectionDown = section => this.moveSectionDown(section);
            this.scope.addSection = (index, layout) => this.addSection(index, layout);
            this.scope.removeSection = index  => this.removeSection(index);
            this.scope.moveLinkUp = (link, section) => this.moveLinkUp(link, section);
            this.scope.moveLinkDown = (link, section) => this.moveLinkDown(link, section);
            this.scope.addLink = (section, index, content_type) => this.addLink(section, index, content_type);
            this.scope.removeLink = (index, section) => this.removeLink(index, section);
            this.scope.moveFieldUp = (field, section) => this.moveFieldUp(field, section);
            this.scope.moveFieldDown = (field, section) => this.moveFieldDown(field, section);
            this.scope.addField = (section, index, input_type) => this.addField(section, index, input_type);
            this.scope.removeField = (index, section) => this.removeField(index, section);
            this.scope.moveMediaUp = (media, section) => this.moveMediaUp(media, section);
            this.scope.moveMediaDown = (media, section) => this.moveMediaDown(media, section);
            this.scope.addMedia = (section, index, content_type) => this.addMedia(section, index, content_type);
            this.scope.removeMedia = (index, section) => this.removeMedia(index, section);
            this.scope.moveCreditUp = credit => this.moveCreditUp(credit);
            this.scope.moveCreditDown = credit => this.moveCreditDown(credit);
        }

        /* initialize */

        initialize() {
            this.scope.create = this.buildCreatePageScope();
        }

        /* get page uri */

        getPageUri(id?: string, connection?: string): string {
            return UriHelpers.join(this.api.baseAddress, 'page', id, connection);
        }

        /* get page */

        getPage() {
            this.http
                .get<Resource<Page>>(this.getPageUri(this.state.id), this.api.config)
                .success(p => this.getPageSuccess(p))
                .error((d, s) => this.getPageError(d, s)); 
        }   

        getPageSuccess(page: Resource<Page>) {
            this.scope.resource = page;

            if (!page.content.tags) page.content.tags = [];
            if (!page.content.sections) page.content.sections = [];
            if (!page.content.credits) page.content.credits = [];
            if (!page.content.schedules) page.content.schedules = [];
        }

        getPageError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        /* create page */

        buildCreatePageScope(kind?: string): CreatePageScope {
            return {
                kind: kind || 'web_page',
                path: null,
                content: {
                    tags: [],
                    cards: {
                        medium: this.buildCard()
                    },
                    sections: [
                        this.buildSection()
                    ],
                    credits: [],
                    schedules: [],
                    properties: {}
                }
            };
        }

        createPage(form?: IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .post<Resource<Page>>(this.getPageUri(), this.scope.create, this.api.config)
                .success(resource => this.createPageSuccess(resource))
                .error((d, s) => this.createPageError(d, s));
        }

        createPageSuccess(resource: Resource<Page>) {
            this.state.id = resource.id;

            this.getPage();
        }

        createPageError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        /* update page */

        updatePage(form?: IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .put<any>(this.getPageUri(this.state.id), this.scope.resource.content, this.api.config)
                .success(() => this.updatePageSuccess())
                .error((d, s) => this.updatePageError(d, s));
        }

        updatePageSuccess() {
            this.updateSuccess();
        }

        updatePageError(data: any, status: number) {
            this.updateError(data, status);
        }

        /* update cards */

        buildCard(name?: string): Card {
            return {
                title: null,
                description: null,
                media: [
                   this.buildMedia() 
                ],
                properties: {}
            };
        }

        addCard(name?: string) {
            this.scope.resource.content.cards[name] = this.buildCard(name);
        }

        removeCard(name: string) {
            delete this.scope.resource.content.cards[name];
        }

        /* update tags */

        addTag(tag: string) {
            if (!tag) return;
            if (tag.length < 1) return;
            if (!this.scope.resource.content.tags) this.scope.resource.content.tags = new Array<string>();

            var index = this.scope.resource.content.tags
                .map(t => {
                    return t.toLowerCase()
                })
                .indexOf(tag.toLowerCase());

            if (index == -1) {
                this.scope.resource.content.tags.push(tag);
            }
        }

        removeTag(tag: string) {
            if (!tag) return;
            if (tag.length < 1) return;

            if (!this.scope.resource.content.tags) {
                this.scope.resource.content.tags = new Array<string>();
                return;
            }

            var index = 0;

            while (index > -1) {
                var index = this.scope.resource.content.tags
                    .map(t => {
                        return t.toLowerCase()
                    })
                    .indexOf(tag.toLowerCase());

                if (index > -1) {
                    this.scope.resource.content.tags.splice(index, 1);
                }
            }
        }

        /* update sections */

        moveSectionUp(section: Section) {
            ArrayHelpers.moveUp(this.scope.resource.content.sections, section);
        }

        moveSectionDown(section: Section) {
            ArrayHelpers.moveDown(this.scope.resource.content.sections, section);
        }

        buildSection(layout?: string): Section {
            return {
                layout: layout,
                region: null,
                blocks: {},
                links: [],
                fields: [],
                media: [],
                schedules: [],
                properties: {}
            };
        }

        addSection(index?: number, layout?: string) {
            ArrayHelpers.insert(this.scope.resource.content.sections, this.buildSection(layout), index);
        }

        removeSection(index: number) {
            ArrayHelpers.remove(this.scope.resource.content.sections, index);
        }

        /* update blocks */

        buildBlock(name: string) {
            return new Block();
        }

        addBlock(name: string, section: Section) {
            section.blocks[name] = this.buildBlock(name);
        }

        removeBlock(name: string, section: Section) {
            delete section.blocks[name];
        }

        /* update links */

        moveLinkUp(link: Link, section: Section) {
            ArrayHelpers.moveUp(section.links, link);
        }

        moveLinkDown(link: Link, section: Section) {
            ArrayHelpers.moveDown(section.links, link);
        }

        buildLink(content_type?: string): Link {
            return {
                uri: null,
                title: null,
                properties: {},
                content_type: content_type
            };
        }

        addLink(section: Section, index?: number, content_type?: string) {
            ArrayHelpers.insert(section.links, this.buildLink(content_type), index);
        }

        removeLink(index: number, section: Section) {
            ArrayHelpers.remove(section.links, index);
        }

        /* update fields */

        moveFieldUp(field: Field, section: Section) {
            ArrayHelpers.moveUp(section.fields, field);
        }

        moveFieldDown(field: Field, section: Section) {
            ArrayHelpers.moveDown(section.fields, field);
        }

        buildField(input_type?: string): Field {
            return {
                input_type: input_type,
                name: null,
                label: null,
                description: null,
                required: false,
                options: [],
                properties: {}
            }
        }

        addField(section: Section, index?: number, input_type?: string) {
            ArrayHelpers.insert(section.fields, this.buildField(input_type), index);
        }

        removeField(index: number, section: Section) {
            ArrayHelpers.remove(section.fields, index);
        }

        /* update media */

        moveMediaUp(media: Media, section: Section) {
            ArrayHelpers.moveUp(section.media, media);
        }

        moveMediaDown(media: Media, section: Section) {
            ArrayHelpers.moveDown(section.media, media);
        }

        buildMedia(content_type?: string): Media {
            return {
                caption: null,
                credit: null,
                sources: [
                    {
                        uri: null,
                        width: null,
                        height: null,
                        content_type: content_type,
                        properties: {}
                    }
                ],
                properties: {}
            };
        }

        addMedia(section: Section, index?: number, content_type?: string) {
            ArrayHelpers.insert(section.media, this.buildMedia(content_type), index);
        }

        removeMedia(index: number, section: Section) {
            ArrayHelpers.remove(section.media, index);
        }

        /* update credits */

        moveCreditUp(credit: Credit) {
            ArrayHelpers.moveUp(this.scope.resource.content.credits, credit);
        }

        moveCreditDown(credit: Credit) {
            ArrayHelpers.moveDown(this.scope.resource.content.credits, credit);
        }

        buildCredit(): Credit {
            return {
                name: null,
                uri: null,
                photos: []
            }
        }

        addCredit(index?: number) {
            ArrayHelpers.insert(this.scope.resource.content.credits, this.buildCredit(), index);
        }

        removeCredit(index: number) {
            ArrayHelpers.remove(this.scope.resource.content.credits, index);
        }

        /* update schedule */

        buildSchedule(): Schedule {
            var schedule = new Schedule();

            schedule.start = new Date();
            schedule.end = new Date(schedule.start.getFullYear() + 10, schedule.start.getMonth(), schedule.start.getDate());

            return schedule;
        }

        addSchedule(index?: number) {
            ArrayHelpers.insert(this.scope.resource.content.schedules, this.buildSchedule(), index);
        }

        removeSchedule(index: number) {
            ArrayHelpers.remove(this.scope.resource.content.schedules, index);
        }

        /* submit */

        submitPage() {
            this.http
                .post<any>(this.getPageUri(this.state.id, 'submit'), null, this.api.config)
                .success(() => this.submitPageSuccess())
                .error((d, s) => this.submitPageError(d, s));
        }

        submitPageSuccess() {
            this.updateSuccess();
        }

        submitPageError(data: any, status: number) {
            this.updateError(data, status);
        }

        /* approve */

        approvePage() {
            this.http
                .post<any>(this.getPageUri(this.state.id, 'approve'), null, this.api.config)
                .success(() => this.approvePageSuccess())
                .error((d, s) => this.approvePageError(d, s));
        }

        approvePageSuccess() {
            this.updateSuccess();
        }

        approvePageError(data: any, status: number) {
            this.updateError(data, status);
        }

        /* reject */

        rejectPage() {
            this.http
                .post<any>(this.getPageUri(this.state.id, 'reject'), null, this.api.config)
                .success(() => this.rejectPageSuccess())
                .error((d, s) => this.rejectPageError(d, s));
        }

        rejectPageSuccess() {
            this.updateSuccess();
        }

        rejectPageError(data: any, status: number) {
            this.updateError(data, status);
        }

        /* delete */

        deletePage() {
            this.http
                .delete<any>(this.getPageUri(this.state.id), this.api.config)
                .success(() => this.deletePageSuccess())
                .error((d, s) => this.deletePageError(d, s));
        }

        deletePageSuccess() {
            this.updateSuccess();
        }

        deletePageError(data: any, status: number) {
            this.updateError(data, status);
        }

        /* update responce */

        updateSuccess() {

        }

        updateError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        static $inject = ["$scope", "$stateParams", "$location", "$http", "api", "alert"];
    }

    export interface PageScope {        
        resource: Resource<Page>;
        create: CreatePageScope;
        createPage(form?: IFormController): void;
        updatePage(form?: IFormController): void;
        addCard(name: string): void;
        removeCard(name: string): void;
        addTag(tag: string): void;
        removeTag(tag: string): void;
        moveSectionUp(section: Section): void;
        moveSectionDown(section: Section): void;
        addSection(index?: number, layout?: string): void;
        removeSection(index: number): void;
        addBlock(name: string, section: Section): void;
        removeBlock(name: string, section: Section): void;
        moveLinkUp(link: Link, section: Section): void;
        moveLinkDown(link: Link, section: Section): void;
        addLink(section: Section, index?: number, content_type?: string);
        removeLink(index: number, section: Section);
        moveFieldUp(field: Field, section: Section): void;
        moveFieldDown(field: Field, section: Section): void;
        addField(section: Section, index?: number, input_type?: string);
        removeField(index: number, section: Section);
        moveMediaUp(media: Media, section: Section): void;
        moveMediaDown(media: Media, section: Section): void;
        addMedia(section: Section, index?: number, content_type?: string);
        removeMedia(index: number, section: Section);
        moveCreditUp(credit: Credit): void;
        moveCreditDown(credit: Credit): void;
        submitPage(): void;
        approvePage(): void;
        rejectPage(): void;
        deletePage(): void;
    }

    export interface CreatePageScope {
        kind: string;
        path: string;
        content: Page;
    }

    export interface PageState {
        id: string;
    }
} 