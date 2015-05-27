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
    interface IHttpConfig {
        headers?: IHttpHeaders;
    }
    interface IHttpHeaders {
        Authorization?: string;
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
    class AuthController {
        scope: AuthScope;
        state: AuthState;
        location: ng.ILocationService;
        http: ng.IHttpService;
        api: IApi;
        alert: IAlert;
        constructor(scope: AuthScope, state: AuthState, location: ng.ILocationService, http: ng.IHttpService, api: IApi, alert: IAlert);
        bind(): void;
        initialize(): void;
        getAuthorizeUri(): string;
        authorize(form?: ng.IFormController): void;
        authorizeSuccess(identity: Identity): void;
        authorizeError(data: any, status: number): void;
        static $inject: string[];
    }
    interface AuthRequest {
        email: string;
        password: string;
    }
    interface AuthScope {
        authorize(form?: ng.IFormController): void;
        data: AuthRequest;
    }
    interface AuthState {
        redirect: string;
    }
}
declare module publishr.client {
    class CommentController {
        scope: CommentScope;
        state: CommentState;
        location: ng.ILocationService;
        http: ng.IHttpService;
        api: IApi;
        alert: IAlert;
        constructor(scope: CommentScope, state: CommentState, location: ng.ILocationService, http: ng.IHttpService, api: IApi, alert: IAlert);
        bind(): void;
        initialize(): void;
        getCommentUri(): string;
        list(): void;
        listSuccess(list: Resource<Comment>[]): void;
        listError(data: any, status: number): void;
        buildCreateCommentScope(kind?: string): CreateCommentScope;
        createComment(form?: ng.IFormController): void;
        createCommentSuccess(resource: Resource<Comment>): void;
        createCommentError(data: any, status: number): void;
        static $inject: string[];
    }
    interface CommentScope {
        list: Resource<Comment>[];
        create: CreateCommentScope;
        createComment(form?: ng.IFormController): void;
    }
    interface CreateCommentScope {
        kind: string;
        path: string;
        data: Comment;
    }
    interface CommentState {
        path: string;
    }
}
declare module publishr.client {
    class CreativeController {
        scope: CreativeScope;
        state: CreativeState;
        location: ng.ILocationService;
        http: ng.IHttpService;
        api: IApi;
        alert: IAlert;
        q: ng.IQService;
        constructor(scope: CreativeScope, state: CreativeState, location: ng.ILocationService, http: ng.IHttpService, api: IApi, alert: IAlert, q: ng.IQService);
        bind(): void;
        getFileUri(): string;
        getCreativeUri(): string;
        getFileInputs(): NodeList;
        getFileSet(): {};
        buildCreative(fileSet: any): Creative;
        createCreative(form?: ng.IFormController): void;
        private win;
        private endpoints;
        createFilesSuccess(endpoints: {}): void;
        uploadFile(fileSet: any, fileInputs: NodeList, fileInput: any, fileInfo: any, filePromises: Array<ng.IPromise<{}>>): void;
        createFilesError(data: any, status: number): void;
        createCreativeSuccess(): void;
        static $inject: string[];
    }
    interface CreativeState {
        setname: string;
        kind: string;
        path: string;
    }
    interface CreativeScope {
        create: any;
        createFiles(): void;
    }
}
declare module publishr.client {
    class InviteController {
        scope: InviteScope;
        state: InviteState;
        location: ng.ILocationService;
        http: ng.IHttpService;
        api: IApi;
        alert: IAlert;
        constructor(scope: InviteScope, state: InviteState, location: ng.ILocationService, http: ng.IHttpService, api: IApi, alert: IAlert);
        bind(): void;
        initialize(): void;
        getInviteUri(): string;
        buildCreateInviteScope(): CreateInviteScope;
        invite(form?: ng.IFormController): void;
        inviteSuccess(token: Token): void;
        inviteError(data: any, status: number): void;
        static $inject: string[];
    }
    interface InviteScope {
        create: CreateInviteScope;
        success: SuccessInviteScope;
        state: InviteState;
        invite(form?: ng.IFormController): void;
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
    class PageController {
        scope: PageScope;
        state: PageState;
        location: ng.ILocationService;
        http: ng.IHttpService;
        api: IApi;
        alert: IAlert;
        constructor(scope: PageScope, state: PageState, location: ng.ILocationService, http: ng.IHttpService, api: IApi, alert: IAlert);
        bind(): void;
        initialize(): void;
        getPageUri(id?: string, connection?: string): string;
        getPage(): void;
        getPageSuccess(page: Resource<Page>): void;
        getPageError(data: any, status: number): void;
        buildCreatePageScope(kind?: string): CreatePageScope;
        createPage(form?: ng.IFormController): void;
        createPageSuccess(resource: Resource<Page>): void;
        createPageError(data: any, status: number): void;
        updatePage(form?: ng.IFormController): void;
        updatePageSuccess(): void;
        updatePageError(data: any, status: number): void;
        buildCard(name?: string): Card;
        addCard(name?: string): void;
        removeCard(name: string): void;
        addTag(tag: string): void;
        removeTag(tag: string): void;
        moveSectionUp(region: Region, section: Section): void;
        moveSectionDown(region: Region, section: Section): void;
        buildSection(template?: string): Section;
        addSection(region: Region, index?: number, template?: string): void;
        removeSection(region: Region, index: number): void;
        moveLinkUp(block: Block, link: Link): void;
        moveLinkDown(block: Block, link: Link): void;
        buildLink(rel?: string): Link;
        addLink(block: Block, index?: number, rel?: string): void;
        removeLink(block: Block, index: number): void;
        moveInputUp(block: Block, input: Input): void;
        moveInputDown(block: Block, input: Input): void;
        buildInput(type?: string): Input;
        addInput(block: Block, index?: number, type?: string): void;
        removeInput(block: Block, index: number): void;
        moveMediaUp(block: Block, media: Media): void;
        moveMediaDown(block: Block, media: Media): void;
        buildMedia(format?: string): Media;
        addMedia(block: Block, index?: number, format?: string): void;
        removeMedia(block: Block, index: number): void;
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
        addLink(block: Block, index?: number, type?: string): any;
        removeLink(block: Block, index: number): any;
        moveInputUp(block: Block, input: Input): void;
        moveInputDown(block: Block, input: Input): void;
        addInput(block: Block, index?: number, type?: string): any;
        removeInput(block: Block, index: number): any;
        moveMediaUp(block: Block, media: Media): void;
        moveMediaDown(block: Block, media: Media): void;
        addMedia(block: Block, index?: number, format?: string): any;
        removeMedia(block: Block, index: number): any;
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
        data: Page;
    }
    interface PageState {
        id: string;
    }
}
declare module publishr.client {
    class RegisterController {
        scope: RegisterScope;
        state: RegisterState;
        location: ng.ILocationService;
        http: ng.IHttpService;
        api: IApi;
        alert: IAlert;
        constructor(scope: RegisterScope, state: RegisterState, location: ng.ILocationService, http: ng.IHttpService, api: IApi, alert: IAlert);
        bind(): void;
        initialize(): void;
        getRegisterUri(): string;
        buildCreateRegistrationScope(): CreateRegistrationScope;
        register(form?: ng.IFormController): void;
        registerSuccess(): void;
        registerError(data: any, status: number): void;
        static $inject: string[];
    }
    interface RegisterScope {
        create: CreateRegistrationScope;
        token: Token;
        state: InviteState;
        register(form?: ng.IFormController): void;
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
    class SearchController {
        scope: SearchScope;
        state: SearchState;
        location: ng.ILocationService;
        http: ng.IHttpService;
        api: IApi;
        alert: IAlert;
        constructor(scope: SearchScope, state: SearchState, location: ng.ILocationService, http: ng.IHttpService, api: IApi, alert: IAlert);
        bind(): void;
        initialize(): void;
        getSearchUri(): string;
        search(form?: ng.IFormController): void;
        searchSuccess(result: Token): void;
        searchError(data: any, status: number): void;
        static $inject: string[];
    }
    interface SearchScope {
        result: Token;
        state: SearchState;
        search(form?: ng.IFormController): void;
    }
    interface SearchState {
        kind: string;
        state: string;
        tag: string;
    }
}
declare module publishr.client {
    class ArrayHelpers {
        static moveUp<T>(arry: Array<T>, value: T, by?: number): void;
        static moveDown<T>(arry: Array<T>, value: T, by?: number): void;
        static insert<T>(arry: Array<T>, value: T, index?: number): void;
        static remove<T>(arry: Array<T>, index: number): void;
        static mergeLeft(obj1: any, obj2: any): any;
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
declare module publishr.client {
    class Author {
        alias: string;
        name: string;
        uri: string;
        images: Source[];
        properties: {};
    }
}
declare module publishr.client {
    class Block {
        text: string;
        links: Link[];
        inputs: Input[];
        media: Media[];
        properties: {};
    }
}
declare module publishr.client {
    class Card {
        title: string;
        description: string;
        media: Media[];
        properties: {};
    }
}
declare module publishr.client {
    class Collection {
        listings: Listing[];
        properties: {};
    }
}
declare module publishr.client {
    class Comment {
        author: Author;
        text: string;
        properties: {};
    }
}
declare module publishr.client {
    class Creative {
        title: string;
        blocks: {};
        properties: {};
    }
}
declare module publishr.client {
    class Credit {
        name: string;
        description: string;
        uri: string;
        images: Source[];
        properties: {};
    }
}
declare module publishr.client {
    class Dimensions {
        width: number;
        height: number;
    }
}
declare module publishr.client {
    class Facet {
        category: string;
        name: string;
        value: any;
        count: number;
        properties: {};
    }
}
declare module publishr.client {
    class File {
        uri: string;
        name: string;
        type: string;
    }
}
declare module publishr.client {
    class Identity {
        id: string;
        token: string;
        email: string;
        workspace: string;
        roles: string[];
        properties: {};
    }
}
declare module publishr.client {
    class Input {
        type: string;
        name: string;
        label: string;
        description: string;
        hint: string;
        pattern: string;
        required: boolean;
        range: Range;
        length: Length;
        value: any;
        options: Option[];
        properties: {};
    }
}
declare module publishr.client {
    class Length {
        min: number;
        max: number;
    }
}
declare module publishr.client {
    class Link {
        rel: string;
        type: string;
        uri: string;
        title: string;
        properties: {};
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
        cards: {};
        properties: {};
    }
}
declare module publishr.client {
    class Media {
        format: string;
        caption: string;
        credit: string;
        sources: Source[];
        properties: {};
    }
}
declare module publishr.client {
    class Meta {
        created: Date;
        updated: Date;
        workspace: string;
        kind: string;
        path: string;
        state: string;
        privacy: string;
        owner: string;
        properties: {};
    }
}
declare module publishr.client {
    class Option {
        text: string;
        value: any;
        properties: {};
    }
}
declare module publishr.client {
    class Page {
        tags: string[];
        cards: {};
        regions: {};
        credits: Credit[];
        schedules: Schedule[];
        properties: {};
    }
}
declare module publishr.client {
    class Range {
        min: number;
        max: number;
        step: number;
    }
}
declare module publishr.client {
    class Region {
        sections: Section[];
        properties: {};
    }
}
declare module publishr.client {
    class Resource<T> {
        id: string;
        meta: Meta;
        data: T;
        properties: {};
    }
}
declare module publishr.client {
    class Result {
        items: Array<{}>;
        facets: Facet[];
        continuation: string;
        properties: {};
    }
}
declare module publishr.client {
    class Schedule {
        start: Date;
        end: Date;
        properties: {};
    }
}
declare module publishr.client {
    class Section {
        template: string;
        blocks: {};
        schedules: Schedule[];
        properties: {};
    }
}
declare module publishr.client {
    class Source {
        uri: string;
        dimensions: Dimensions;
        type: string;
        properties: {};
    }
}
declare module publishr.client {
    class Token {
        value: string;
        expiry: Date;
    }
}
