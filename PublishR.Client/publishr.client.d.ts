declare module publishr.client {
    class ArrayHelpers {
        static moveUp<T>(arry: Array<T>, value: T, by?: number): void;
        static moveDown<T>(arry: Array<T>, value: T, by?: number): void;
        static insert<T>(arry: Array<T>, value: T, index?: number): void;
        static remove<T>(arry: Array<T>, index: number): void;
    }
}
declare module publishr.client {
    class AuthController {
        scope: AuthScope;
        state: AuthState;
        location: ILocationService;
        http: IHttpService;
        api: IApi;
        alert: IAlert;
        constructor(scope: AuthScope, state: AuthState, location: ILocationService, http: IHttpService, api: IApi, alert: IAlert);
        bind(): void;
        initialize(): void;
        getAuthorizeUri(): string;
        authorize(form?: IFormController): void;
        authorizeSuccess(identity: Identity): void;
        authorizeError(data: any, status: number): void;
        static $inject: string[];
    }
    interface AuthRequest {
        email: string;
        password: string;
    }
    interface AuthScope {
        authorize(form?: IFormController): void;
        data: AuthRequest;
    }
    interface AuthState {
        redirect: string;
    }
}
declare module publishr.client {
    class Author {
        name: string;
        uri: string;
        photos: Source[];
    }
}
declare module publishr.client {
    class Block {
        format: string;
        content: string;
    }
}
declare module publishr.client {
    class Card {
        title: string;
        description: string;
        media: Media[];
        properties: any;
    }
}
declare module publishr.client {
    class Collection {
        kind: string;
        created: Date;
        updated: Date;
        cards: any;
        listings: Listing[];
        facets: Facet[];
        continuation: string;
        properties: any;
    }
}
declare module publishr.client {
    class CollectionController {
        scope: CollectionScope;
        state: CollectionState;
        location: ILocationService;
        http: IHttpService;
        api: IApi;
        alert: IAlert;
        constructor(scope: CollectionScope, state: CollectionState, location: ILocationService, http: IHttpService, api: IApi, alert: IAlert);
        initialize(): void;
        getCollectionUri(id?: string): string;
        getCollection(): void;
        getCollectionSuccess(collection: Collection): void;
        getCollectionError(data: any, status: number): void;
        static $inject: string[];
    }
    interface CollectionScope {
        data: Collection;
    }
    interface CollectionState {
        id: string;
    }
}
declare module publishr.client {
    class Comment {
        author: Author;
        created: Date;
        text: Block;
        properties: any;
    }
}
declare module publishr.client {
    class CommentController {
        scope: CommentScope;
        state: CommentState;
        location: ILocationService;
        http: IHttpService;
        api: IApi;
        alert: IAlert;
        constructor(scope: CommentScope, state: CommentState, location: ILocationService, http: IHttpService, api: IApi, alert: IAlert);
        bind(): void;
        initialize(): void;
        getCommentsUri(): string;
        getComments(): void;
        getCommentsSuccess(comments: Comment[]): void;
        getCommentsError(data: any, status: number): void;
        buildCreateCommentScope(): CreateCommentScope;
        createComment(form?: IFormController): void;
        createCommentSuccess(resource: Resource): void;
        createCommentError(data: any, status: number): void;
        static $inject: string[];
    }
    interface CommentScope {
        data: Comment[];
        create: CreateCommentScope;
        createComment(form?: IFormController): void;
    }
    interface CreateCommentScope {
        uri: string;
        text: Block;
    }
    interface CommentState {
        id: string;
    }
}
declare module publishr.client {
    class Credit {
        name: string;
        uri: string;
        photos: Source[];
    }
}
declare module publishr.client {
    class Facet {
        category: string;
        name: string;
        value: any;
        count: number;
        properties: any;
    }
}
declare module publishr.client {
    class Field {
        input_type: string;
        name: string;
        label: string;
        description: string;
        required: boolean;
        options: Option[];
        properties: any;
    }
}
declare module publishr.client {
    interface IAlert {
        showAlert(message: string): any;
    }
}
declare module publishr.client {
    interface IApi {
        baseAddress: string;
        config?: IHttpConfig;
    }
}
declare module publishr.client {
    class Identity {
        uid: string;
        access_token: string;
        email: string;
        roles: Array<string>;
        parameters: any;
    }
}
declare module publishr.client {
    interface IFormController {
        $invalid: boolean;
    }
}
declare module publishr.client {
    interface IHttpService {
        get<T>(uri: string, IHttpConfig?: any): IHttpPromise<T>;
        post<T>(url: string, data: any, IHttpConfig?: any): IHttpPromise<T>;
        put<T>(url: string, data: any, IHttpConfig?: any): IHttpPromise<T>;
        delete<T>(url: string, IHttpConfig?: any): IHttpPromise<T>;
    }
    interface IHttpPromise<T> {
        success(callback: IHttpPromiseCallback<T>): IHttpPromise<T>;
        error(callback: IHttpPromiseCallback<any>): IHttpPromise<T>;
    }
    interface IHttpPromiseCallback<T> {
        (data: T, status: number, headers: any, config: any): void;
    }
    interface IHttpConfig {
        headers?: IHttpHeaders;
    }
    interface IHttpHeaders {
        Authorization?: string;
    }
}
declare module publishr.client {
    interface ILocationService {
        url(url: string): ILocationService;
    }
}
declare module publishr.client {
    interface IResponse {
        400?: string | boolean | Function;
        401?: string | boolean | Function;
        403?: string | boolean | Function;
        404?: string | boolean | Function;
        500?: string | boolean | Function;
    }
    class ResponseHelpers {
        static defaults: IResponse;
    }
}
declare module publishr.client {
    class Link {
        content_type: string;
        uri: string;
        title: string;
        properties: any;
    }
}
declare module publishr.client {
    class Listing {
        uri: string;
        kind: string;
        category: string;
        author: Author;
        created: Date;
        updated: Date;
        cards: any;
        properties: any;
    }
}
declare module publishr.client {
    class Media {
        caption: string;
        credit: string;
        sources: Source[];
        properties: any;
    }
}
declare module publishr.client {
    class Metadata {
        title: string;
        description: string;
        keywords: string;
        properties: any;
    }
}
declare module publishr.client {
    class Option {
        label: string;
        value: any;
        properties: any;
    }
}
declare module publishr.client {
    class Page {
        kind: string;
        created: Date;
        updated: Date;
        tags: string[];
        metadata: Metadata;
        cards: any;
        sections: Section[];
        credits: Credit[];
        schedules: Schedule[];
        properties: any;
    }
}
declare module publishr.client {
    class PageController {
        scope: PageScope;
        state: PageState;
        location: ILocationService;
        http: IHttpService;
        api: IApi;
        alert: IAlert;
        constructor(scope: PageScope, state: PageState, location: ILocationService, http: IHttpService, api: IApi, alert: IAlert);
        bind(): void;
        initialize(): void;
        getPageUri(id?: string, connection?: string): string;
        getPage(): void;
        getPageSuccess(page: Page): void;
        getPageError(data: any, status: number): void;
        buildCreatePageScope(): CreatePageScope;
        createPage(form?: IFormController): void;
        createPageSuccess(resource: Resource): void;
        createPageError(data: any, status: number): void;
        buildCard(name?: string): Card;
        addCard(name?: string): void;
        removeCard(name: string): void;
        updateCards(form?: IFormController): void;
        updateCardsSuccess(): void;
        updateCardsError(data: any, status: number): void;
        updateProperties(form?: IFormController): void;
        updatePropertiesSuccess(): void;
        updatePropertiesError(data: any, status: number): void;
        addTag(tag: string): void;
        removeTag(tag: string): void;
        updateTags(form?: IFormController): void;
        updateTagsSuccess(): void;
        updateTagssError(data: any, status: number): void;
        updateMetadata(form?: IFormController): void;
        updateMetadataSuccess(): void;
        updateMetadataError(data: any, status: number): void;
        moveSectionUp(section: Section): void;
        moveSectionDown(section: Section): void;
        buildSection(layout?: string): Section;
        addSection(index?: number, layout?: string): void;
        removeSection(index: number): void;
        updateSections(form?: IFormController): void;
        updateSectionsSuccess(): void;
        updateSectionsError(data: any, status: number): void;
        buildBlock(name: string): Block;
        addBlock(name: string, section: Section): void;
        removeBlock(name: string, section: Section): void;
        moveLinkUp(link: Link, section: Section): void;
        moveLinkDown(link: Link, section: Section): void;
        buildLink(content_type?: string): Link;
        addLink(section: Section, index?: number, content_type?: string): void;
        removeLink(index: number, section: Section): void;
        moveFieldUp(field: Field, section: Section): void;
        moveFieldDown(field: Field, section: Section): void;
        buildField(input_type?: string): Field;
        addField(section: Section, index?: number, input_type?: string): void;
        removeField(index: number, section: Section): void;
        moveMediaUp(media: Media, section: Section): void;
        moveMediaDown(media: Media, section: Section): void;
        buildMedia(content_type?: string): Media;
        addMedia(section: Section, index?: number, content_type?: string): void;
        removeMedia(index: number, section: Section): void;
        moveCreditUp(credit: Credit): void;
        moveCreditDown(credit: Credit): void;
        buildCredit(): Credit;
        addCredit(index?: number): void;
        removeCredit(index: number): void;
        updateCredits(form?: IFormController): void;
        updateCreditsSuccess(): void;
        updateCreditsError(data: any, status: number): void;
        buildSchedule(): Schedule;
        addSchedule(index?: number): void;
        removeSchedule(index: number): void;
        updateSchedules(form?: IFormController): void;
        updateSchedulesSuccess(): void;
        updateSchedulesError(data: any, status: number): void;
        submitPage(): void;
        submitPageSuccess(): void;
        submitPageError(data: any, status: number): void;
        approvePage(): void;
        approvePageSuccess(): void;
        approvePageError(data: any, status: number): void;
        rejectPage(): void;
        rejectPageSuccess(): void;
        rejectPageError(data: any, status: number): void;
        deletePage(): void;
        deletePageSuccess(): void;
        deletePageError(data: any, status: number): void;
        updateSuccess(): void;
        updateError(data: any, status: number): void;
        stateSuccess(): void;
        stateError(data: any, status: number): void;
        static $inject: string[];
    }
    interface PageScope {
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
        addLink(section: Section, index?: number, content_type?: string): any;
        removeLink(index: number, section: Section): any;
        moveFieldUp(field: Field, section: Section): void;
        moveFieldDown(field: Field, section: Section): void;
        addField(section: Section, index?: number, input_type?: string): any;
        removeField(index: number, section: Section): any;
        moveMediaUp(media: Media, section: Section): void;
        moveMediaDown(media: Media, section: Section): void;
        addMedia(section: Section, index?: number, content_type?: string): any;
        removeMedia(index: number, section: Section): any;
        moveCreditUp(credit: Credit): void;
        moveCreditDown(credit: Credit): void;
        updateCredits(form?: IFormController): void;
        updateSchedules(form?: IFormController): void;
        submitPage(): void;
        approvePage(): void;
        rejectPage(): void;
        deletePage(): void;
    }
    interface CreatePageScope {
        kind: string;
        slug: string;
        card: Card;
    }
    interface PageState {
        id: string;
    }
}
declare module publishr.client {
    class Resource {
        id: string;
        properties: any;
    }
}
declare module publishr.client {
    class Schedule {
        start: Date;
        end: Date;
        properties: any;
    }
}
declare module publishr.client {
    class SearchController {
        scope: SearchScope;
        state: SearchState;
        location: ILocationService;
        http: IHttpService;
        api: IApi;
        alert: IAlert;
        constructor(scope: SearchScope, state: SearchState, location: ILocationService, http: IHttpService, api: IApi, alert: IAlert);
        bind(): void;
        initialize(): void;
        getSearchUri(): string;
        query(form?: IFormController): void;
        querySuccess(collection: Collection): void;
        queryError(data: any, status: number): void;
        static $inject: string[];
    }
    interface SearchScope {
        data: Collection;
        parameters: any;
        query(form?: IFormController): void;
    }
    interface SearchState {
        kind: string;
    }
}
declare module publishr.client {
    class Section {
        layout: string;
        region: string;
        blocks: any;
        links: Link[];
        fields: Field[];
        media: Media[];
        schedules: Schedule[];
        properties: any;
    }
}
declare module publishr.client {
    class Source {
        uri: string;
        width: number;
        height: number;
        content_type: string;
        properties: any;
    }
}
declare module publishr.client {
    class StringHelpers {
        static trimEnd(text: string, char: string): string;
    }
}
declare module publishr.client {
    class UriHelpers {
        static join(...segments: string[]): string;
    }
}
