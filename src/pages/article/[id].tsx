import { faFacebookF, faRedditAlien, faTelegram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCircleExclamation, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'preact/hooks';
import type { ParsedUrlQuery } from 'querystring';
import TimeAgo from 'react-timeago';
import GoogleAdsense from 'src/components/adsense';
import DefaultHead from 'src/components/default-head';
import type { Article } from 'src/models/response/article.interface';
import { TITLE } from 'src/pages/_document';
import styles from 'src/styles/Article.module.scss';
import { pickLocaleField } from 'src/utilities/locale';
import { sanitize } from 'src/utilities/sanitize';

interface Props {
	article: Article
}

interface Query extends ParsedUrlQuery {
	id: string
}

export default function Article({ article }: Props) {

	const { asPath } = useRouter();

	const [showOutdatedNotice, setShowOutdatedNotice] = useState(false);

	const url = process.env.NEXT_PUBLIC_DOMAIN_PREFIX + asPath;
	const { title_en, subtitle_en, author, image } = article;
	const publishDate = article.publishDate || '0000';
	const editDate = article.editDate || '0000';

	const localeTitle = pickLocaleField(article, 'title');
	const localeSubtitle = pickLocaleField(article, 'subtitle');

	const encodedUrl = encodeURIComponent(url);
	const encodedTitle = encodeURIComponent(title_en ?? '');
	const encodedSubtitle = encodeURIComponent(subtitle_en ?? '');

	useEffect(() => {
		const today = new Date();
		today.setMonth(today.getMonth() - 2);
		setShowOutdatedNotice(today > new Date(editDate));
	}, [editDate]);

	return (
		<>
			<DefaultHead title={pickLocaleField(article, 'title') || `News • ${TITLE}`}>
				<meta
					key=".$og:type"
					property="og:type"
					content="article"
				/>
				<meta
					key=".$article:author"
					property="article:author"
					content={author}
				/>
				<meta
					key=".$article:published_time"
					property="article:published_time"
					content={publishDate}
				/>
				<meta
					key=".$article:modified_time"
					property="article:modified_time"
					content={editDate}
				/>

				<meta
					key=".$og:description"
					property="og:description"
					content={localeSubtitle}
				/>
				<meta
					key=".$description"
					name="description"
					content={localeSubtitle}
				/>

				<meta
					key=".$og:image"
					property="og:image"
					content={image}
				/>
				<meta
					key=".$og:url"
					property="og:url"
					content={url}
				/>

				<meta
					key=".$twitter:card"
					name="twitter:card"
					content="summary_large_image"
				/>
				<meta
					key=".$twitter:image"
					name="twitter:image"
					content={image}
				/>

				<meta
					key=".$twitter:label1"
					name="twitter:label1"
					content="Written by"
				/>
				<meta
					key=".$twitter:data1"
					name="twitter:data1"
					content={author}
				/>

				<meta
					key=".$twitter:label2"
					name="twitter:label2"
					content="Updated on"
				/>
				<meta
					key=".$twitter:data2"
					name="twitter:data2"
					content={editDate}
				/>
			</DefaultHead>

			<div className={styles.host}>
				<article>
					<div style={{ backgroundImage: `url(${image})` }}>
						<header>
							<h1>
								<Link href={`/article/${article.id}/`}>
									<a className="!border-b-0">{localeTitle || 'Untitled article'}</a>
								</Link>
							</h1>

							<div>{localeSubtitle}</div>

							<div>
								<button
									className="icon"
									disabled
								>
									<FontAwesomeIcon icon={faUser} />
								</button>

								<div className="flex-auto">
									<Link href={`/news/${author?.replace(/ /g, '-')}/`}>
										<a
											className="!border-b-0 block"
											title={`Browse articles by ${author}`}
										>
											{author || 'Unknown author'}
										</a>
									</Link>
									<small className="text-fg-variant">
										<TimeAgo date={publishDate} />
										<TimeAgo date={editDate} />
									</small>
								</div>

								<div>
									<button
										className="icon"
										title="Facebook"
									>
										<a
											className="!border-b-0"
											href={`https://facebook.com/sharer/sharer.php?u=${encodedUrl}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<FontAwesomeIcon
												icon={faFacebookF}
												color="#1a77f2"
											/>
										</a>
									</button>

									<button
										className="icon"
										title="Twitter"
									>
										<a
											className="!border-b-0"
											href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=OxygenUpdater`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<FontAwesomeIcon
												icon={faTwitter}
												color="#30a4f1"
											/>
										</a>
									</button>

									<button
										className="icon"
										title="Reddit"
									>
										<a
											className="!border-b-0"
											href={`https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<FontAwesomeIcon
												icon={faRedditAlien}
												color="#ff4500"
											/>
										</a>
									</button>

									<button
										className="icon"
										title="Telegram"
									>
										<a
											className="!border-b-0"
											href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<FontAwesomeIcon
												icon={faTelegram}
												color="#25a5e5"
											/>
										</a>
									</button>

									<button
										className="icon"
										title="WhatsApp"
									>
										<a
											className="!border-b-0"
											href={`https://wa.me/?text=${encodedTitle}%3A%20${encodedUrl}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<FontAwesomeIcon
												icon={faWhatsapp}
												color="#27d367"
											/>
										</a>
									</button>

									<button
										className="icon"
										title="Email"
									>
										<a
											className="!border-b-0"
											href={`mailto:?subject=${encodedTitle}&body=${encodedSubtitle}%3A%20${encodedUrl}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<FontAwesomeIcon
												icon={faEnvelope}
											/>
										</a>
									</button>
								</div>
							</div>
						</header>
					</div>

					<GoogleAdsense type="inarticle" />

					{showOutdatedNotice ?
						<section className={styles.notice}>
							<button>
								<FontAwesomeIcon icon={faCircleExclamation} />
								<span>This article has not been edited recently, so some information presented here may be outdated.</span>
							</button>
						</section> : ''}

					{/* eslint-disable-next-line react/no-danger */}
					<section dangerouslySetInnerHTML={{
						/**
						 * We use iframes to embed videos (e.g. YouTube), so we're
						 * adding its tag & attributes to the allowlist. This text
						 * is generated & stored server-side, with multiple layers
						 * of security in-between.
						 */
						__html: sanitize(pickLocaleField(article, 'text') || 'This article has no contents', {
							ADD_TAGS: ['iframe'],
							ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder'],
						}),
					}}
					/>
				</article>

				<GoogleAdsense type="display" />
			</div>

		</>
	);
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
	const baseUrl = process.env.API_BASE_URL!;
	const newsList = await (
		await fetch(baseUrl, {
			method: 'POST',
			body: JSON.stringify({
				type: process.env.API_TYPE_NEWS_LIST,
			}),
		})
	).json() as Article[];

	return {
		paths: newsList.map(article => ({
			params: {
				id: article.id + '',
			} as Query,
		})),
		fallback: false, // 404
	};
};

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
	const baseUrl = process.env.API_BASE_URL!;
	const id = params?.id;
	const article = await (
		await fetch(`${baseUrl}?id=${id}`, {
			method: 'POST',
			body: JSON.stringify({
				type: process.env.API_TYPE_NEWS_ITEM,
			}),
		})
	).json() as Article;

	return {
		props: {
			article,
		},
	};
};
