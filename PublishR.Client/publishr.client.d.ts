declare module publishr.client {
    class Author {
        name: string;
        uri: string;
        photos: Source[];
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
        cover: Cover;
        listings: Listing[];
        continuation: string;
        properties: any;
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
    class Credit {
        name: string;
        uri: string;
        photos: Source[];
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
        cover: Cover;
        tags: string[];
        metadata: Metadata;
        cards: any;
        sections: Section[];
        credits: Credit[];
        schedule: Schedule;
        properties: any;
    }
}
declare module publishr.client {
    class Schedule {
        start: Date;
        end: Date;
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
    class Source {
        uri: string;
        width: number;
        height: number;
        content_type: string;
        properties: any;
    }
}
