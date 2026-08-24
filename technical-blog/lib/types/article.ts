export interface Article {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
    userId: number;
}

export interface ArticlesResponse {
  posts: Article[];
  total: number;
  skip: number;
  limit: number;
}