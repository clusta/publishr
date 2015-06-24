declare module publishr.client {
    class BaseController {
        private $window;
        private $q;
        constructor($window: ng.IWindowService, $q: ng.IQService);
        messages: {
            [key: number]: string;
        };
        status(status: number): void;
        baseAddress: string;
        bearerToken: string;
        buildRequestConfig(): ng.IRequestShortcutConfig;
        prompt(message: string, action: () => void, args: any[]): void;
        confirm(message: string, action: () => void, args: any[]): void;
        keys(obj: any): string[];
    }
}
declare module publishr.client {
    class AuthController extends BaseController {
        scope: AuthScope;
        state: AuthState;
        window: ng.IWindowService;
        location: ng.ILocationService;
        http: ng.IHttpService;
        q: ng.IQService;
        constructor(scope: AuthScope, state: AuthState, window: ng.IWindowService, location: ng.ILocationService, http: ng.IHttpService, q: ng.IQService);
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
    interface AuthScope extends ng.IScope {
        authorize(form?: ng.IFormController): void;
        data: AuthRequest;
    }
    interface AuthState {
        redirect: string;
    }
}
declare module publishr.client {
    class CommentController extends BaseController {
        scope: CommentScope;
        state: CommentState;
        window: ng.IWindowService;
        location: ng.ILocationService;
        http: ng.IHttpService;
        q: ng.IQService;
        constructor(scope: CommentScope, state: CommentState, window: ng.IWindowService, location: ng.ILocationService, http: ng.IHttpService, q: ng.IQService);
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
    interface CommentScope extends ng.IScope {
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
    class CreativeController extends BaseController {
        scope: CreativeScope;
        state: CreativeState;
        window: ng.IWindowService;
        location: ng.ILocationService;
        http: ng.IHttpService;
        q: ng.IQService;
        constructor(scope: CreativeScope, state: CreativeState, window: ng.IWindowService, location: ng.ILocationService, http: ng.IHttpService, q: ng.IQService);
        bind(): void;
        getFileUri(): string;
        getCreativeUri(): string;
        getFileInputs(): NodeList;
        getFileSet(): {};
        buildCreative(fileSet: any): Creative;
        createCreative(form?: ng.IFormController): void;
        private endpoints;
        createFilesSuccess(endpoints: {}): void;
        uploadFile(fileSet: any, fileInputs: NodeList, fileInput: any, fileInfo: any, filePromises: Array<ng.IPromise<{}>>): void;
        createFilesError(data: any, status: number): void;
        createCreativeSuccess(): void;
        static $inject: string[];
    }
    interface CreativeState extends ng.IScope {
        setname: string;
        kind: string;
        path: string;
        redirect: string;
    }
    interface CreativeScope {
        create: any;
        createFiles(): void;
    }
}
declare module publishr.client {
    class InviteController extends BaseController {
        scope: InviteScope;
        state: InviteState;
        window: ng.IWindowService;
        location: ng.ILocationService;
        http: ng.IHttpService;
        q: ng.IQService;
        constructor(scope: InviteScope, state: InviteState, window: ng.IWindowService, location: ng.ILocationService, http: ng.IHttpService, q: ng.IQService);
        bind(): void;
        initialize(): void;
        getInviteUri(): string;
        buildCreateInviteScope(): CreateInviteScope;
        invite(form?: ng.IFormController): void;
        inviteSuccess(token: Token): void;
        inviteError(data: any, status: number): void;
        static $inject: string[];
    }
    interface InviteScope extends ng.IScope {
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
    class PageController extends BaseController {
        scope: PageScope;
        state: PageState;
        window: ng.IWindowService;
        location: ng.ILocationService;
        http: ng.IHttpService;
        q: ng.IQService;
        constructor(scope: PageScope, state: PageState, window: ng.IWindowService, location: ng.ILocationService, http: ng.IHttpService, q: ng.IQService);
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
        buildRegion(name: string): Region;
        addRegion(name: string): void;
        removeRegion(name: string): void;
        buildCard(name: string): Card;
        addCard(name: string): void;
        removeCard(name: string): void;
        addTag(tag: string): void;
        removeTag(tag: string): void;
        moveSectionUp(region: Region, section: Section): void;
        moveSectionDown(region: Region, section: Section): void;
        buildSection(template?: string): Section;
        addSection(template: string, region: Region, index?: number): void;
        removeSection(region: Region, index: number): void;
        moveLinkUp(block: Block, link: Link): void;
        moveLinkDown(block: Block, link: Link): void;
        buildLink(rel: string): Link;
        addLink(rel: string, block: Block, index?: number): void;
        removeLink(block: Block, index: number): void;
        moveInputUp(block: Block, input: Input): void;
        moveInputDown(block: Block, input: Input): void;
        buildInput(type: string): Input;
        addInput(type: string, block: Block, index?: number): void;
        removeInput(block: Block, index: number): void;
        moveMediaUp(block: Block, media: Media): void;
        moveMediaDown(block: Block, media: Media): void;
        buildMedia(format?: string): Media;
        addMedia(format: string, block: Block, index?: number): void;
        removeMedia(block: Block, index: number): void;
        moveCreditUp(credit: Credit): void;
        moveCreditDown(credit: Credit): void;
        buildCredit(): Credit;
        addCredit(index?: number): void;
        removeCredit(index: number): void;
        buildSchedule(): Schedule;
        addSchedule(index?: number): void;
        removeSchedule(index: number): void;
        addProperty(name: string): void;
        removeProperty(name: string): void;
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
    interface PageScope extends ng.IScope {
        resource: Resource<Page>;
        create: CreatePageScope;
        createPage(form?: ng.IFormController): void;
        updatePage(form?: ng.IFormController): void;
        addRegion(name: string): void;
        removeRegion(name: string): void;
        addCard(name: string): void;
        removeCard(name: string): void;
        addTag(tag: string): void;
        removeTag(tag: string): void;
        moveSectionUp(region: Region, section: Section): void;
        moveSectionDown(region: Region, section: Section): void;
        addSection(template: string, region: Region, index?: number): void;
        removeSection(region: Region, index: number): void;
        addBlock(name: string, section: Section): void;
        removeBlock(name: string, section: Section): void;
        moveLinkUp(block: Block, link: Link): void;
        moveLinkDown(block: Block, link: Link): void;
        addLink(type: string, block: Block, index?: number): any;
        removeLink(block: Block, index: number): any;
        moveInputUp(block: Block, input: Input): void;
        moveInputDown(block: Block, input: Input): void;
        addInput(type: string, block: Block, index?: number): any;
        removeInput(block: Block, index: number): any;
        moveMediaUp(block: Block, media: Media): void;
        moveMediaDown(block: Block, media: Media): void;
        addMedia(format: string, block: Block, index?: number): any;
        removeMedia(block: Block, index: number): any;
        moveCreditUp(credit: Credit): void;
        moveCreditDown(credit: Credit): void;
        addCredit(index?: number): void;
        removeCredit(index: number): void;
        addSchedule(index?: number): void;
        removeSchedule(index: number): void;
        addProperty(name: string): void;
        removeProperty(name: string): void;
        submitPage(): void;
        approvePage(): void;
        rejectPage(): void;
        deletePage(): void;
        prompt(message: string, action: () => void, ...params: any[]): void;
        confirm(message: string, action: () => void, ...params: any[]): void;
        keys(obj: Object): string[];
    }
    interface CreatePageScope {
        kind: string;
        path: string;
        data: Page;
    }
    interface PageState {
        id: string;
        kind: string;
        redirect: string;
    }
}
declare module publishr.client {
    class RegisterController extends BaseController {
        scope: RegisterScope;
        state: RegisterState;
        window: ng.IWindowService;
        location: ng.ILocationService;
        http: ng.IHttpService;
        q: ng.IQService;
        constructor(scope: RegisterScope, state: RegisterState, window: ng.IWindowService, location: ng.ILocationService, http: ng.IHttpService, q: ng.IQService);
        bind(): void;
        initialize(): void;
        getRegisterUri(): string;
        buildCreateRegistrationScope(): CreateRegistrationScope;
        register(form?: ng.IFormController): void;
        registerSuccess(): void;
        registerError(data: any, status: number): void;
        static $inject: string[];
    }
    interface RegisterScope extends ng.IScope {
        create: CreateRegistrationScope;
        token: Token;
        state: InviteState;
        register(form?: ng.IFormController): void;
    }
    interface RegisterState {
        token: string;
        email: string;
        redirect: string;
    }
    interface CreateRegistrationScope {
        email: string;
        password: string;
    }
}
declare module publishr.client {
    class SearchController extends BaseController {
        scope: SearchScope;
        state: SearchState;
        window: ng.IWindowService;
        location: ng.ILocationService;
        http: ng.IHttpService;
        q: ng.IQService;
        constructor(scope: SearchScope, state: SearchState, window: ng.IWindowService, location: ng.ILocationService, http: ng.IHttpService, q: ng.IQService);
        bind(): void;
        initialize(): void;
        getSearchUri(): string;
        search(form?: ng.IFormController): void;
        searchSuccess(result: Token): void;
        searchError(data: any, status: number): void;
        static $inject: string[];
    }
    interface SearchScope extends ng.IScope {
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
        properties: {
            [name: string]: any;
        };
    }
}
declare module publishr.client {
    class Block {
        text: string;
        links: Link[];
        inputs: Input[];
        media: Media[];
        properties: {
            [name: string]: any;
        };
    }
}
declare module publishr.client {
    class Card {
        title: string;
        description: string;
        media: Media[];
        properties: {
            [name: string]: any;
        };
    }
}
declare module publishr.client {
    class Comment {
        author: Author;
        text: string;
        properties: {
            [name: string]: any;
        };
    }
}
declare module publishr.client {
    class Continuation {
        next: string;
        previous: string;
    }
}
declare module publishr.client {
    class Creative {
        title: string;
        blocks: {
            [name: string]: Block;
        };
        properties: {
            [name: string]: any;
        };
    }
}
declare module publishr.client {
    class Credit {
        name: string;
        description: string;
        uri: string;
        images: Source[];
        properties: {
            [name: string]: any;
        };
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
        properties: {
            [name: string]: any;
        };
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
        properties: {
            [name: string]: any;
        };
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
        properties: {
            [name: string]: any;
        };
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
        properties: {
            [name: string]: any;
        };
    }
}
declare module publishr.client {
    class Listing {
        id: string;
        meta: Meta;
        cards: {
            [name: string]: Card;
        };
        properties: {
            [name: string]: any;
        };
    }
}
declare module publishr.client {
    class Media {
        format: string;
        caption: string;
        credit: string;
        sources: Source[];
        properties: {
            [name: string]: any;
        };
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
        properties: {
            [name: string]: any;
        };
    }
}
declare module publishr.client {
    class Option {
        text: string;
        value: any;
        properties: {
            [name: string]: any;
        };
    }
}
declare module publishr.client {
    class Page {
        tags: string[];
        cards: {
            [name: string]: Card;
        };
        regions: {
            [name: string]: Region;
        };
        results: {
            [name: string]: Result;
        };
        credits: Credit[];
        schedules: Schedule[];
        properties: {
            [name: string]: any;
        };
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
        properties: {
            [name: string]: any;
        };
    }
}
declare module publishr.client {
    class Resource<T> {
        id: string;
        meta: Meta;
        data: T;
        properties: {
            [name: string]: any;
        };
    }
}
declare module publishr.client {
    class Result {
        items: Array<any>;
        facets: Facet[];
        continuation: Continuation;
        properties: {
            [name: string]: any;
        };
    }
}
declare module publishr.client {
    class Schedule {
        start: Date;
        end: Date;
        properties: {
            [name: string]: any;
        };
    }
}
declare module publishr.client {
    class Section {
        template: string;
        blocks: {
            [name: string]: Block;
        };
        schedules: Schedule[];
        properties: {
            [name: string]: any;
        };
    }
}
declare module publishr.client {
    class Source {
        uri: string;
        dimensions: Dimensions;
        type: string;
        properties: {
            [name: string]: any;
        };
    }
}
declare module publishr.client {
    class Token {
        value: string;
        expiry: Date;
    }
}
