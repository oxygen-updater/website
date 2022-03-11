import { mkdirSync, rmSync, writeFileSync } from 'fs';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'preact/hooks';
import type { ParsedUrlQuery } from 'querystring';
import TimeAgo from 'react-timeago';
import Accordion from 'src/components/accordion';
import GoogleAdsense from 'src/components/adsense';
import DefaultHead from 'src/components/default-head';
import FcmNotification from 'src/components/fcm-notification';
import NewsItem from 'src/components/news-item';
import type { Article } from 'src/models/response/article.interface';
import type { AuthorInfo } from 'src/models/response/author-info.interface';
import { TITLE } from 'src/pages/_document';
import styles from 'src/styles/NewsList.module.scss';

interface Props {
	author: AuthorInfo
	articles: Article[]
}

interface Query extends ParsedUrlQuery {
	author: string
}

export default function NewsList({ author, articles }: Props) {

	const { query: routerQuery } = useRouter();
	const { author: hyphenatedAuthor } = routerQuery;

	const [newArticleList, setNewArticleList] = useState<Article[]>([]);

	const onNewArticle = (article: Article) => {
		const index = newArticleList.findIndex(existing => existing.id === article.id);
		if (index !== -1) {
			newArticleList[index] = article;
			setNewArticleList([...newArticleList]);
		} else {
			setNewArticleList([article, ...newArticleList]);
		}
	};

	return (
		<>
			<DefaultHead title={`News • ${TITLE}`} />

			<div className={styles.host}>
				<FcmNotification onNewArticle={onNewArticle} />

				{hyphenatedAuthor !== 'all' ?
					<>
						<DefaultHead title={`Articles by ${author.name} • ${TITLE}`} />

						{/* count articles ignoring `ad` entries */}
						<div>{`${author.name} has written ${Math.round(5 * (articles.length / 6) + (1 / 6))} articles so far`}</div>

						{author.top.length > 0 ?
							<Accordion
								summary={`Top ${author.top.length} articles (last 3 months)`}
								openByDefault
							>
								{author.top.map(article =>
									<article
										key={article.id}
										style={{ backgroundImage: `url(${article.image})` }}
									>
										<header>
											<Link href={`/article/${article.id}/`}>
												<a>{article.title_en}</a>
											</Link>
											<small>{article.subtitle_en}</small>
											<span className="flex-auto" />
											<small>
												<TimeAgo date={article.editDate || article.publishDate || '0000'} />
											</small>
										</header>
									</article>
								)}
							</Accordion>
							: ''}
					</> : ''}

				{newArticleList.map(article =>
					<NewsItem
						key={article.id}
						article={article}
						isNew={true}
					/>
				)}

				{articles.map(article =>
					<NewsItem
						key={article.id}
						article={article}
					/>
				)}

				<GoogleAdsense type="display" />
			</div>
		</>
	);
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
	const baseUrl = process.env.API_BASE_URL!;
	const authorList = await (
		await fetch(baseUrl, {
			method: 'POST',
			body: JSON.stringify({
				type: process.env.API_TYPE_AUTHOR_LIST,
			}),
		})
	).json() as string[];

	authorList.unshift('all');

	return {
		paths: authorList.map(author => ({
			params: {
				author: author.replaceAll(' ', '-'),
			} as Query,
		})),
		fallback: false, // 404
	};
};

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
	const baseUrl = process.env.API_BASE_URL!;
	const author = params?.author;
	const authorForApi = author && author !== 'all' ? author : '';
	const newsList = await (
		await fetch(`${baseUrl}?author=${authorForApi}`, {
			method: 'POST',
			body: JSON.stringify({
				type: process.env.API_TYPE_NEWS_LIST,
			}),
		})
	).json() as Article[];

	if (author === 'all') {
		// Must be done before the `for` block to avoid including `ad`s
		createAtomFeed(newsList);
	}

	const articles: Article[] = [];
	newsList.forEach((article, index) => {
		articles.push(article);
		// Insert an ad entry after every 5 elements
		// Note: if changed, update the "count articles ignoring `ad` entries" formula
		if ((index + 1) % 5 === 0) {
			articles.push({
				id: 100001 + index,
				ad: true,
			});
		};
	});

	let authorTopArticles: Article[] | null = null;
	if (authorForApi) {
		authorTopArticles = await (
			await fetch(`${baseUrl}?author=${authorForApi}`, {
				method: 'POST',
				body: JSON.stringify({
					type: process.env.API_TYPE_AUTHOR_TOP_ARTICLES,
				}),
			})
		).json();
	}

	return {
		props: {
			author: {
				name: author?.replaceAll('-', ' ') ?? '',
				top: authorTopArticles ?? [],
			},
			articles,
		},
	};
};

const createAtomFeed = async (newsList: Article[]) => {
	const domainPrefix = process.env.NEXT_PUBLIC_DOMAIN_PREFIX;
	const newsLink = `${domainPrefix}/news/all/`;
	const file = 'all.xml';
	const feedLink = `${domainPrefix}/news/${file}`;
	const copyright = '© Adhiraj S. Chauhan • All rights reserved';
	const defaultImage = `${domainPrefix}/img/favicon/android-chrome-512x512.png?v=1`;

	const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
<id>${newsLink}</id>
<link rel="alternate" href="${newsLink}index.html"/>
<link rel="self" href="${feedLink}"/>
<generator>${TITLE}</generator>
<updated>${new Date().toISOString()}</updated>
<title>News • ${TITLE}</title>
<subtitle>Oxygen Updater is an open-source app for OnePlus devices that allows you to install official OTA (over-the-air) updates ASAP. Ensure your device is up-to-date — it's quick, easy, and free! We regularly publish news articles informing our users about OnePlus-related things, including helpful guides and project updates.</subtitle>
<logo>${domainPrefix}/img/favicon/android-chrome-512x512.png?v=1</logo>
<icon>${domainPrefix}/favicon.ico?v=1</icon>
<rights>${copyright}</rights>
` + newsList.reduce((accumulator, article) => {
		const url = `${domainPrefix}/article/${article.id}/`;
		const hyphenatedAuthor = article.author?.replace(/ /g, '-') ?? 'all';
		const image = article.image ?? defaultImage;
		const split = image.split('.');
		const ext = split[split.length - 1].toLowerCase();
		const imageMimetype = `image/${ext === 'jpg' ? 'jpeg' : ext}`;

		return accumulator + `<entry>
<id>${url}</id>
<link rel="enclosure" title="Image for article #${article.id}" type="${imageMimetype}" href="${image}"/>
<link rel="alternate" href="${url}index.html"/>
<link href="${url}"/>
<published>${new Date(article.publishDate ?? '0000').toISOString()}</published>
<updated>${new Date(article.editDate ?? '0000').toISOString()}</updated>
<title><![CDATA[${article.title_en}]]></title>
<summary><![CDATA[${article.subtitle_en}]]></summary>
<author><name>${article.author}</name><uri>${domainPrefix}/news/${hyphenatedAuthor}/</uri></author>
<category term="${TITLE}" label="${TITLE}"/>
<category term="News" label="News"/>
<category term="OnePlus" label="OnePlus"/>
<rights>${copyright}</rights>
</entry>
`;
	}, '') + '</feed>';

	const dir = 'public/news';
	rmSync(dir, { recursive: true, force: true });
	mkdirSync(dir, { recursive: true });
	writeFileSync(`${dir}/${file}`, xml);
};
