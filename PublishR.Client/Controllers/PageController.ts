﻿module publishr.client {
    "use strict";

    export class PageController {
        constructor(
            public scope: PageScope,
            public state: PageState,
            public location: ng.ILocationService,
            public http: ng.IHttpService,
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
            this.scope.moveSectionUp = (region, section) => this.moveSectionUp(region, section);
            this.scope.moveSectionDown = (region, section) => this.moveSectionDown(region, section);
            this.scope.addSection = (region, index, template) => this.addSection(region, index, template);
            this.scope.removeSection = (region, index)  => this.removeSection(region, index);
            this.scope.moveLinkUp = (container, link) => this.moveLinkUp(container, link);
            this.scope.moveLinkDown = (link, section) => this.moveLinkDown(link, section);
            this.scope.addLink = (section, index, type) => this.addLink(section, index, type);
            this.scope.removeLink = (container, index) => this.removeLink(container, index);
            this.scope.moveInputUp = (field, section) => this.moveInputUp(field, section);
            this.scope.moveInputDown = (field, section) => this.moveInputDown(field, section);
            this.scope.addInput = (section, index, type) => this.addInput(section, index, type);
            this.scope.removeInput = (index, section) => this.removeInput(index, section);
            this.scope.moveMediaUp = (media, section) => this.moveMediaUp(media, section);
            this.scope.moveMediaDown = (media, section) => this.moveMediaDown(media, section);
            this.scope.addMedia = (section, index, type) => this.addMedia(section, index, type);
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

            if (!page.data.tags) page.data.tags = [];
            if (!page.data.regions) page.data.regions = [];
            if (!page.data.credits) page.data.credits = [];
            if (!page.data.schedules) page.data.schedules = [];
        }

        getPageError(data: any, status: number) {
            this.alert.showAlert(ResponseHelpers.defaults[status]);
        }

        /* create page */

        buildCreatePageScope(kind?: string): CreatePageScope {
            return {
                kind: kind || 'web_page',
                path: null,
                data: {
                    tags: [],
                    cards: {
                        medium: this.buildCard()
                    },
                    regions: {
                        main: {
                            sections: [
                                this.buildSection()
                            ],
                            properties: {}
                        }
                    },
                    credits: [],
                    schedules: [],
                    properties: {}
                }
            };
        }

        createPage(form?: ng.IFormController) {
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

        updatePage(form?: ng.IFormController) {
            if (form && form.$invalid)
                return;

            this.http
                .put<any>(this.getPageUri(this.state.id), this.scope.resource.data, this.api.config)
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
            this.scope.resource.data.cards[name] = this.buildCard(name);
        }

        removeCard(name: string) {
            delete this.scope.resource.data.cards[name];
        }

        /* update tags */

        addTag(tag: string) {
            if (!tag) return;
            if (tag.length < 1) return;
            if (!this.scope.resource.data.tags) this.scope.resource.data.tags = new Array<string>();

            var index = this.scope.resource.data.tags
                .map(t => {
                    return t.toLowerCase()
                })
                .indexOf(tag.toLowerCase());

            if (index == -1) {
                this.scope.resource.data.tags.push(tag);
            }
        }

        removeTag(tag: string) {
            if (!tag) return;
            if (tag.length < 1) return;

            if (!this.scope.resource.data.tags) {
                this.scope.resource.data.tags = new Array<string>();
                return;
            }

            var index = 0;

            while (index > -1) {
                var index = this.scope.resource.data.tags
                    .map(t => {
                        return t.toLowerCase()
                    })
                    .indexOf(tag.toLowerCase());

                if (index > -1) {
                    this.scope.resource.data.tags.splice(index, 1);
                }
            }
        }

        /* update sections */

        moveSectionUp(region: Region, section: Section) {
            ArrayHelpers.moveUp(region.sections, section);
        }

        moveSectionDown(region: Region, section: Section) {
            ArrayHelpers.moveDown(region.sections, section);
        }

        buildSection(template?: string): Section {
            return {
                template: template,
                blocks: {
                    header: null,
                    content: null
                },
                schedules: [],
                properties: {}
            };
        }

        addSection(region: Region, index?: number, template?: string) {
            ArrayHelpers.insert(region.sections, this.buildSection(template), index);
        }

        removeSection(region: Region, index: number) {
            ArrayHelpers.remove(region.sections, index);
        }

        /* update links */

        moveLinkUp(block: Block, link: Link) {
            ArrayHelpers.moveUp(block.links, link);
        }

        moveLinkDown(block: Block, link: Link) {
            ArrayHelpers.moveDown(block.links, link);
        }

        buildLink(rel?: string): Link {
            return {
                type: null,
                rel: rel,
                uri: null,
                title: null,
                properties: {}
            };
        }

        addLink(block: Block, index?: number, rel?: string) {
            ArrayHelpers.insert(block.links, this.buildLink(rel), index);
        }

        removeLink(block: Block, index: number) {
            ArrayHelpers.remove(block.links, index);
        }

        /* update inputs */

        moveInputUp(block: Block, input: Input) {
            ArrayHelpers.moveUp(block.inputs, input);
        }

        moveInputDown(block: Block, input: Input) {
            ArrayHelpers.moveDown(block.inputs, input);
        }

        buildInput(type?: string): Input {
            return {
                type: type,
                name: null,
                label: null,
                hint: null,
                description: null,
                pattern: null,
                required: false,
                range: null,
                length: null,
                value: null,
                options: [],
                properties: {}
            }
        }

        addInput(block: Block, index?: number, type?: string) {
            ArrayHelpers.insert(block.inputs, this.buildInput(type), index);
        }

        removeInput(block: Block, index: number) {
            ArrayHelpers.remove(block.inputs, index);
        }

        /* update media */

        moveMediaUp(block: Block, media: Media) {
            ArrayHelpers.moveUp(block.media, media);
        }

        moveMediaDown(block: Block, media: Media) {
            ArrayHelpers.moveDown(block.media, media);
        }

        buildMedia(format?: string): Media {
            return {
                format: format,
                region: null,
                caption: null,
                credit: null,
                sources: [
                    {
                        uri: null,
                        dimensions: null,
                        type: null,
                        properties: {}
                    }
                ],
                properties: {}
            };
        }

        addMedia(block: Block, index?: number, format?: string) {
            ArrayHelpers.insert(block.media, this.buildMedia(format), index);
        }

        removeMedia(block: Block, index: number) {
            ArrayHelpers.remove(block.media, index);
        }

        /* update credits */

        moveCreditUp(credit: Credit) {
            ArrayHelpers.moveUp(this.scope.resource.data.credits, credit);
        }

        moveCreditDown(credit: Credit) {
            ArrayHelpers.moveDown(this.scope.resource.data.credits, credit);
        }

        buildCredit(): Credit {
            return {
                name: null,
                description: null,
                uri: null,
                images: [],
                properties: null
            }
        }

        addCredit(index?: number) {
            ArrayHelpers.insert(this.scope.resource.data.credits, this.buildCredit(), index);
        }

        removeCredit(index: number) {
            ArrayHelpers.remove(this.scope.resource.data.credits, index);
        }

        /* update schedule */

        buildSchedule(): Schedule {
            var schedule = new Schedule();

            schedule.start = new Date();
            schedule.end = new Date(schedule.start.getFullYear() + 10, schedule.start.getMonth(), schedule.start.getDate());

            return schedule;
        }

        addSchedule(index?: number) {
            ArrayHelpers.insert(this.scope.resource.data.schedules, this.buildSchedule(), index);
        }

        removeSchedule(index: number) {
            ArrayHelpers.remove(this.scope.resource.data.schedules, index);
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
        createPage(form?: ng.IFormController): void;
        updatePage(form?: ng.IFormController): void;
        addCard(name: string): void;
        removeCard(name: string): void;
        addTag(tag: string): void;
        removeTag(tag: string): void;
        moveSectionUp(region: Region, section: Section): void;
        moveSectionDown(region: Region, section: Section): void;
        addSection(region: Region, index?: number, layout?: string): void;
        removeSection(region: Region, index: number): void;
        addBlock(name: string, section: Section): void;
        removeBlock(name: string, section: Section): void;
        moveLinkUp(block: Block, link: Link): void;
        moveLinkDown(block: Block, link: Link): void;
        addLink(block: Block, index?: number, type?: string);
        removeLink(block: Block, index: number);
        moveInputUp(block: Block, input: Input): void;
        moveInputDown(block: Block, input: Input): void;
        addInput(block: Block, index?: number, type?: string);
        removeInput(block: Block, index: number);
        moveMediaUp(block: Block, media: Media): void;
        moveMediaDown(block: Block, media: Media): void;
        addMedia(block: Block, index?: number, format?: string);
        removeMedia(block: Block, index: number);
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
        data: Page;
    }

    export interface PageState {
        id: string;
    }
} 