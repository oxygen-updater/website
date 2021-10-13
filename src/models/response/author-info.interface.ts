import type { Article } from 'src/models/response/article.interface';

export interface AuthorInfo {
	name: string
	top: Article[]
}
