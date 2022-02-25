export interface HadithDTO {
    hadithList: HadithList[];
}

export interface HadithList {
    id: number;
    hadithContent: HadithContent[];
}

export interface HadithContent {
    title: string;
    contenu: string;
}
