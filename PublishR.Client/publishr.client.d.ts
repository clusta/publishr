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
        properties: any;
    }
}
declare module publishr.client {
    class Block {
        format: string;
        body: string;
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
        listings: Listing[];
        properties: any;
    }
}
declare module publishr.client {
    class Comment {
        author: Author;
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
        getCommentUri(): string;
        list(): void;
        listSuccess(list: Resource<Comment>[]): void;
        listError(data: any, status: number): void;
        buildCreateCommentScope(kind?: string): CreateCommentScope;
        createComment(form?: IFormController): void;
        createCommentSuccess(resource: Resource<Comment>): void;
        createCommentError(data: any, status: number): void;
        static $inject: string[];
    }
    interface CommentScope {
        list: Resource<Comment>[];
        create: CreateCommentScope;
        createComment(form?: IFormController): void;
    }
    interface CreateCommentScope {
        kind: string;
        path: string;
        content: Comment;
    }
    interface CommentState {
        path: string;
    }
}
declare module publishr.client {
    class Credit {
        name: string;
        description: string;
        uri: string;
        photos: Source[];
        properties: any;
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
        input: string;
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
        accesstoken: string;
        email: string;
        workspace: string;
        roles: Array<string>;
        properties: any;
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
    class InviteController {
        scope: InviteScope;
        state: InviteState;
        location: ILocationService;
        http: IHttpService;
        api: IApi;
        alert: IAlert;
        constructor(scope: InviteScope, state: InviteState, location: ILocationService, http: IHttpService, api: IApi, alert: IAlert);
        bind(): void;
        initialize(): void;
        getInviteUri(): string;
        buildCreateInviteScope(): CreateInviteScope;
        invite(form?: IFormController): void;
        inviteSuccess(token: Token): void;
        inviteError(data: any, status: number): void;
        static $inject: string[];
    }
    interface InviteScope {
        create: CreateInviteScope;
        success: SuccessInviteScope;
        state: InviteState;
        invite(form?: IFormController): void;
    }
    interface InviteState {
    }
    interface CreateInviteScope {
        email: string;
        roles: Array<string>;
    }
    interface SuccessInviteScope {
        email: string;
        token: Token;
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
        rel: string;
        uri: string;
        title: string;
        properties: any;
    }
}
declare module publishr.client {
    class Listing {
        id: string;
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
        created: Date;
        updated: Date;
        workspace: string;
        kind: string;
        path: string;
        state: string;
        privacy: string;
        owner: string;
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
        tags: string[];
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
        getPageSuccess(page: Resource<Page>): void;
        getPageError(data: any, status: number): void;
        buildCreatePageScope(kind?: string): CreatePageScope;
        createPage(form?: IFormController): void;
        createPageSuccess(resource: Resource<Page>): void;
        createPageError(data: any, status: number): void;
        updatePage(form?: IFormController): void;
        updatePageSuccess(): void;
        updatePageError(data: any, status: number): void;
        buildCard(name?: string): Card;
        addCard(name?: string): void;
        removeCard(name: string): void;
        addTag(tag: string): void;
        removeTag(tag: string): void;
        moveSectionUp(section: Section): void;
        moveSectionDown(section: Section): void;
        buildSection(layout?: string): Section;
        addSection(index?: number, layout?: string): void;
        removeSection(index: number): void;
        buildBlock(name: string): Block;
        addBlock(name: string, section: Section): void;
        removeBlock(name: string, section: Section): void;
        moveLinkUp(link: Link, section: Section): void;
        moveLinkDown(link: Link, section: Section): void;
        buildLink(rel?: string): Link;
        addLink(section: Section, index?: number, content_type?: string): void;
        removeLink(index: number, section: Section): void;
        moveFieldUp(field: Field, section: Section): void;
        moveFieldDown(field: Field, section: Section): void;
        buildField(input?: string): Field;
        addField(section: Section, index?: number, input_type?: string): void;
        removeField(index: number, section: Section): void;
        moveMediaUp(media: Media, section: Section): void;
        moveMediaDown(media: Media, section: Section): void;
        buildMedia(mimetype?: string): Media;
        addMedia(section: Section, index?: number, content_type?: string): void;
        removeMedia(index: number, section: Section): void;
        moveCreditUp(credit: Credit): void;
        moveCreditDown(credit: Credit): void;
        buildCredit(): Credit;
        addCredit(index?: number): void;
        removeCredit(index: number): void;
        buildSchedule(): Schedule;
        addSchedule(index?: number): void;
        removeSchedule(index: number): void;
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
        static $inject: string[];
    }
    interface PageScope {
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
        submitPage(): void;
        approvePage(): void;
        rejectPage(): void;
        deletePage(): void;
    }
    interface CreatePageScope {
        kind: string;
        path: string;
        content: Page;
    }
    interface PageState {
        id: string;
    }
}
declare module publishr.client {
    class RegisterController {
        scope: RegisterScope;
        state: RegisterState;
        location: ILocationService;
        http: IHttpService;
        api: IApi;
        alert: IAlert;
        constructor(scope: RegisterScope, state: RegisterState, location: ILocationService, http: IHttpService, api: IApi, alert: IAlert);
        bind(): void;
        initialize(): void;
        getRegisterUri(): string;
        buildCreateRegistrationScope(): CreateRegistrationScope;
        register(form?: IFormController): void;
        registerSuccess(): void;
        registerError(data: any, status: number): void;
        static $inject: string[];
    }
    interface RegisterScope {
        create: CreateRegistrationScope;
        token: Token;
        state: InviteState;
        register(form?: IFormController): void;
    }
    interface RegisterState {
        token: string;
        email: string;
    }
    interface CreateRegistrationScope {
        email: string;
        password: string;
    }
}
declare module publishr.client {
    class Resource<T> {
        id: string;
        metadata: Metadata;
        content: T;
        properties: any;
    }
}
declare module publishr.client {
    class Result {
        listings: Listing[];
        facets: Facet[];
        continuation: string;
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
        search(form?: IFormController): void;
        searchSuccess(result: Token): void;
        searchError(data: any, status: number): void;
        static $inject: string[];
    }
    interface SearchScope {
        result: Token;
        state: SearchState;
        search(form?: IFormController): void;
    }
    interface SearchState {
        kind: string;
        state: string;
        tag: string;
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
        mimetype: string;
        properties: any;
    }
}
declare module publishr.client {
    class StringHelpers {
        static trimEnd(text: string, char: string): string;
    }
}
declare module publishr.client {
    class Token {
        value: string;
        expiry: Date;
    }
}
declare module publishr.client {
    class UriHelpers {
        static join(...segments: string[]): string;
    }
}
