module publishr.client {
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
            this.scope.moveSectionUp = section => this.moveSectionUp(section);
            this.scope.moveSectionDown = section => this.moveSectionDown(section);
            this.scope.addSection = (index, layout) => this.addSection(index, layout);
            this.scope.removeSection = index  => this.removeSection(index);
            this.scope.moveLinkUp = (container, link) => this.moveLinkUp(container, link);
            this.scope.moveLinkDown = (link, section) => this.moveLinkDown(link, section);
            this.scope.addLink = (section, index, type) => this.addLink(section, index, type);
            this.scope.removeLink = (container, index) => this.removeLink(container, index);
            this.scope.moveInputUp = (field, section) => this.moveInputUp(field, section);
            this.scope.moveInputDown = (field, section) => this.moveInputDown(field, section);
            this.scope.addInput = (section, index, input_type) => this.addInput(section, index, input_type);
            this.scope.removeInput = (index, section) => this.removeInput(index, section);
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

            if (!page.data.tags) page.data.tags = [];
            if (!page.data.sections) page.data.sections = [];
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
                    template: null,
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

        moveSectionUp(section: Section) {
            ArrayHelpers.moveUp(this.scope.resource.data.sections, section);
        }

        moveSectionDown(section: Section) {
            ArrayHelpers.moveDown(this.scope.resource.data.sections, section);
        }

        buildContainer(layout?: string, region?: string, container?: string): Container {
            return {
                blocks: [
                    this.buildBlock()
                ],
                links: [],
                inputs: [],
                media: []
            };
        }

        buildSection(layout?: string, region?: string): Section {
            return {
                layout: layout,
                region: region,
                containers: {
                    header: this.buildContainer(layout, region, 'header'),
                    content: this.buildContainer(layout, region, 'container'),
                    footer: this.buildContainer(layout, region, 'footer')
                },
                schedules: [],
                properties: {}
            };
        }

        addSection(index?: number, layout?: string, region?: string) {
            ArrayHelpers.insert(this.scope.resource.data.sections, this.buildSection(layout, region), index);
        }

        removeSection(index: number) {
            ArrayHelpers.remove(this.scope.resource.data.sections, index);
        }

        /* update blocks */

        buildBlock(format?: string): Block {
            return {
                format: format,
                body: null
            };
        }

        addBlock(container: Container, format?: string) {
            container.blocks.push(this.buildBlock(format));
        }

        removeBlock(container: Container, index: number) {
            ArrayHelpers.remove(container.blocks, index);
        }

        /* update links */

        moveLinkUp(container: Container, link: Link) {
            ArrayHelpers.moveUp(container.links, link);
        }

        moveLinkDown(container: Container, link: Link) {
            ArrayHelpers.moveDown(container.links, link);
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

        addLink(container: Container, index?: number, rel?: string) {
            ArrayHelpers.insert(container.links, this.buildLink(rel), index);
        }

        removeLink(container: Container, index: number) {
            ArrayHelpers.remove(container.links, index);
        }

        /* update fields */

        moveInputUp(container: Container, input: Input) {
            ArrayHelpers.moveUp(container.inputs, input);
        }

        moveInputDown(container: Container, input: Input) {
            ArrayHelpers.moveDown(container.inputs, input);
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

        addInput(container: Container, index?: number, type?: string) {
            ArrayHelpers.insert(container.inputs, this.buildInput(type), index);
        }

        removeInput(container: Container, index: number) {
            ArrayHelpers.remove(container.inputs, index);
        }

        /* update media */

        moveMediaUp(container: Container, media: Media) {
            ArrayHelpers.moveUp(container.media, media);
        }

        moveMediaDown(container: Container, media: Media) {
            ArrayHelpers.moveDown(container.media, media);
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

        addMedia(container: Container, index?: number, format?: string) {
            ArrayHelpers.insert(container.media, this.buildMedia(format), index);
        }

        removeMedia(container: Container, index: number) {
            ArrayHelpers.remove(container.media, index);
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
        moveSectionUp(section: Section): void;
        moveSectionDown(section: Section): void;
        addSection(index?: number, layout?: string): void;
        removeSection(index: number): void;
        addBlock(name: string, section: Section): void;
        removeBlock(name: string, section: Section): void;
        moveLinkUp(container: Container, link: Link): void;
        moveLinkDown(container: Container, link: Link): void;
        addLink(container: Container, index?: number, type?: string);
        removeLink(container: Container, index: number);
        moveInputUp(container: Container, input: Input): void;
        moveInputDown(container: Container, input: Input): void;
        addInput(container: Container, index?: number, type?: string);
        removeInput(container: Container, index: number);
        moveMediaUp(container: Container, media: Media): void;
        moveMediaDown(container: Container, media: Media): void;
        addMedia(container: Container, index?: number, format?: string);
        removeMedia(container: Container, index: number);
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