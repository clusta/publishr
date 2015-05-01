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
            this.scope.addCard = name => this.addCard(name);
            this.scope.removeCard = name => this.removeCard(name); 
            this.scope.updateCards = form => this.updateCards(form);
            this.scope.updateProperties = form => this.updateProperties(form);
            this.scope.addTag = tag => this.addTag(tag);
            this.scope.removeTag = tag => this.removeTag(tag);
            this.scope.updateTags = form => this.updateTags(form);
            this.scope.updateMetadata = form => this.updateMetadata(form);
            this.scope.moveSectionUp = section => this.moveSectionUp(section);
            this.scope.moveSectionDown = section => this.moveSectionDown(section);
            this.scope.addSection = (index, layout) => this.addSection(index, layout);
            this.scope.removeSection = index  => this.removeSection(index);
            this.scope.updateSections = form => this.updateSections(form);
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

            if (!page.sections) page.sections = [];
            if (!page.credits) page.credits = [];
            if (!page.schedules) page.schedules = [];
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

        createCard(name: string): Card {
            return new Card();
        }

        addCard(name: string) {
            this.scope.data.cards[name] = this.createCard(name);
        }

        removeCard(name: string) {
            delete this.scope.data.cards[name];
        }

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

        createSection(layout?: string): Section {
            return {
                layout: layout,
                region: null,
                blocks: [],
                links: [],
                fields: [],
                media: [],
                schedules: [],
                properties: null
            };
        }

        addSection(index?: number, layout?: string) {
            ArrayHelpers.insert(this.scope.data.sections, this.createSection(layout), index);
        }

        removeSection(index: number) {
            ArrayHelpers.remove(this.scope.data.sections, index);
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

        /* update blocks */

        createBlock(name: string) {
            return new Block();
        }

        addBlock(name: string, section: Section) {
            section.blocks[name] = this.createBlock(name);
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

        createLink(content_type: string) {
            var link = new Link();

            link.content_type = content_type;

            return link;
        }

        addLink(section: Section, index?: number, content_type?: string) {
            ArrayHelpers.insert(section.links, this.createLink(content_type), index);
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

        createField(input_type: string) {
            var field = new Field();

            field.input_type = input_type;

            return field;
        }

        addField(section: Section, index?: number, field_type?: string) {
            ArrayHelpers.insert(section.fields, this.createField(field_type), index);
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

        createMedia(content_type?: string) {
            var media = new Media();
            var source = new Source();

            source.content_type = content_type;

            media.sources = [
                source
            ];

            return media;
        }

        addMedia(section: Section, index?: number, content_type?: string) {
            ArrayHelpers.insert(section.media, this.createMedia(content_type), index);
        }

        removeMedia(index: number, section: Section) {
            ArrayHelpers.remove(section.media, index);
        }

        /* update credits */

        moveCreditUp(credit: Credit) {
            ArrayHelpers.moveUp(this.scope.data.credits, credit);
        }

        moveCreditDown(credit: Credit) {
            ArrayHelpers.moveDown(this.scope.data.credits, credit);
        }

        createCredit(): Credit {
            return new Credit();
        }

        addCredit(index?: number) {
            ArrayHelpers.insert(this.scope.data.credits, this.createCredit(), index);
        }

        removeCredit(index: number) {
            ArrayHelpers.remove(this.scope.data.credits, index);
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

        createSchedule(): Schedule {
            var schedule = new Schedule();

            schedule.start = new Date();
            schedule.end = new Date(schedule.start.getFullYear() + 10, schedule.start.getMonth(), schedule.start.getDate());

            return schedule;
        }

        addSchedule(index?: number) {
            ArrayHelpers.insert(this.scope.data.schedules, this.createSchedule(), index);
        }

        removeSchedule(index: number) {
            ArrayHelpers.remove(this.scope.data.schedules, index);
        }

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
        addCard(name: string): void;
        removeCard(name: string): void;
        updateCards(form?: IFormController): void;
        updateProperties(form?: IFormController): void;
        addTag(tag: string): void;
        removeTag(tag: string): void;
        updateTags(form?: IFormController): void;
        updateMetadata(form?: IFormController): void;
        moveSectionUp(section: Section): void;
        moveSectionDown(section: Section): void;
        addSection(index?: number, layout?: string): void;
        removeSection(index: number): void;
        updateSections(form?: IFormController): void;
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