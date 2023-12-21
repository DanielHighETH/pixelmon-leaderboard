export interface RelicResponse {
    relicsType: string;
    count: number;
}

export interface Pixelmon {
    _id: string;
    nftType: string;
    tokenId: number;
    relicsResponse: RelicResponse[];
    totalCount: number;
    evolution: string;
    imageUrl: string;
    name: string;
    rarity: string;
    tribe: string;
}