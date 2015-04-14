declare module publishr.client {
    class ArrayHelpers {
        static moveUp<T>(arry: Array<T>, value: T, by?: number): void;
        static moveDown<T>(arry: Array<T>, value: T, by?: number): void;
    }
}
declare module publishr.client {
    class CollectionController {
        scope: CollectionScope;
        state: CollectionState;
        http: IHttpService;
        api: IApi;
        alert: IAlert;
        constructor(scope: CollectionScope, state: CollectionState, http: IHttpService, api: IApi, alert: IAlert);
        private baseAddress;
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
    interface IApi {
        baseAddress: string;
    }
}
declare module publishr.client {
    interface IAlert {
        showAlert(message: string): any;
    }
}
declare module publishr.client {
    class CommentController {
        scope: CommentScope;
        state: CommentState;
        http: IHttpService;
        api: IApi;
        alert: IAlert;
        constructor(scope: CommentScope, state: CommentState, http: IHttpService, api: IApi, alert: IAlert);
        private baseAddress;
        getComments(): void;
        getCommentsSuccess(comments: Comment[]): void;
        getCommentsError(data: any, status: number): void;
        static $inject: string[];
    }
    interface CommentScope {
        data: Comment[];
    }
    interface CommentState {
        id: string;
    }
}
declare module publishr.client {
    class StringHelpers {
        static trimEnd(text: string, char: string): string;
    }
}
declare module publishr.client {
    interface IHttpService {
        get<T>(uri: string, config?: any): IHttpPromise<T>;
        post<T>(url: string, data: any, config?: any): IHttpPromise<T>;
        put<T>(url: string, data: any, config?: any): IHttpPromise<T>;
        delete<T>(url: string, config?: any): IHttpPromise<T>;
    }
    interface IHttpPromise<T> {
        success(callback: IHttpPromiseCallback<T>): IHttpPromise<T>;
        error(callback: IHttpPromiseCallback<any>): IHttpPromise<T>;
    }
    interface IHttpPromiseCallback<T> {
        (data: T, status: number, headers: any, config: any): void;
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
    class Facet {
        uri: string;
        category: string;
        name: string;
        count: number;
        properties: any;
    }
}
declare module publishr.client {
    class CardSet {
        small: Card;
        medium: Card;
        large: Card;
        facebook: Card;
        twitter: Card;
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
    class Link {
        uri: string;
    }
}
declare module publishr.client {
    class PageController {
        scope: PageScope;
        state: PageState;
        http: IHttpService;
        api: IApi;
        alert: IAlert;
        constructor(scope: PageScope, state: PageState, http: IHttpService, api: IApi, alert: IAlert);
        private baseAddress;
        getPage(): void;
        getPageSuccess(page: Page): void;
        getPageError(data: any, status: number): void;
        updateCover(): void;
        updateCoverSuccess(): void;
        updateCoverError(data: any, status: number): void;
        updateProperties(): void;
        updatePropertiesSuccess(): void;
        updatePropertiesError(data: any, status: number): void;
        updateTags(): void;
        updateTagsSuccess(): void;
        updateTagssError(data: any, status: number): void;
        updateMetadata(): void;
        updateMetadataSuccess(): void;
        updateMetadataError(data: any, status: number): void;
        moveSectionUp(section: Section): void;
        moveSectionDown(section: Section): void;
        updateSections(): void;
        updateSectionsSuccess(): void;
        updateSectionsError(data: any, status: number): void;
        moveCreditUp(credit: Credit): void;
        moveCreditDown(credit: Credit): void;
        updateCredits(): void;
        updateCreditsSuccess(): void;
        updateCreditsError(data: any, status: number): void;
        updateCards(): void;
        updateCardsSuccess(): void;
        updateCardsError(data: any, status: number): void;
        updateSchedule(): void;
        updateScheduleSuccess(): void;
        updateScheduleError(data: any, status: number): void;
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
    }
    interface PageState {
        id: string;
    }
}
declare module publishr.client {
    class Schedule {
        start: Date;
        end: Date;
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
    class Section {
        format: string;
        heading: string;
        content: string;
        links: Link[];
        fields: Field[];
        media: Media[];
        schedule: Schedule;
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
    class Page {
        kind: string;
        created: Date;
        updated: Date;
        cover: Cover;
        tags: string[];
        metadata: Metadata;
        cards: CardSet;
        sections: Section[];
        credits: Credit[];
        schedule: Schedule;
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
    class Card {
        title: string;
        description: string;
        media: Media[];
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
        cards: CardSet;
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
    class Author {
        name: string;
        uri: string;
        photos: Source[];
    }
}
declare module publishr.client {
    class Cover {
        category: string;
        title: string;
        description: string;
        author: Author;
        photos: Source[];
        properties: any;
    }
}
declare module publishr.client {
    class Collection {
        kind: string;
        created: Date;
        updated: Date;
        cover: Cover;
        listings: Listing[];
        facets: Facet[];
        continuation: string;
        properties: any;
    }
}
