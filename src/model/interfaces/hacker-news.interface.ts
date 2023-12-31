// Generated by https://quicktype.io

export interface HackerNewsResponse {
    exhaustive: Exhaustive;
    exhaustiveNbHits: boolean;
    exhaustiveTypo: boolean;
    hits: Hit[];
    hitsPerPage: number;
    nbHits: number;
    nbPages: number;
    page: number;
    params: string;
    processingTimeMS: number;
    query: Query;
    serverTimeMS: number;
}

export interface Exhaustive {
    nbHits: boolean;
    typo: boolean;
}

export interface Hit {
    _highlightResult: HighlightResult;
    _tags: string[];
    author: string;
    comment_text: string;
    created_at: string;
    created_at_i: number;
    objectID: string;
    parent_id: number;
    story_id: number;
    story_title: string;
    story_url: string;
    updated_at: string;
    children: number[];
}

export interface HighlightResult {
    author?: Author;
    comment_text?: Author;
    story_title?: Author;
    story_url?: Author;
}

export interface Author {
    matchLevel: MatchLevel;
    matchedWords: Query[];
    value: string;
    fullyHighlighted?: boolean;
}

export enum MatchLevel {
    Full = 'full',
    None = 'none',
}

export enum Query {
    Mobile = 'mobile',
}
