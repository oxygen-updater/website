import Link from 'next/link';
import TimeAgo from 'react-timeago';
import GoogleAdsense from 'src/components/adsense';
import type { Article } from 'src/models/response/article.interface';

interface Props {
	article: Article
	isNew?: boolean
}

export default function NewsItem({ article, isNew }: Props) {
	return article.ad ?
		<GoogleAdsense type="infeed" /> :
		<article className={(isNew ? ' bg-bg-variant' : '')}>
			<Link href={`/article/${article.id}/`}>
				<a title={`Read article #${article.id}`}>
					<header>
						<img
							loading="lazy"
							decoding="async"
							src={article.image}
							alt={`Image for article #${article.id}`}
						/>
						<h2>{article.title_en}</h2>
						<span>{article.subtitle_en}</span>
					</header>
				</a>
			</Link>

			<footer>
				<small>
					<Link href={`/news/${article.author?.replace(/ /g, '-')}/`}>
						<a title={`Browse articles by ${article.author}`}>
							{article.author}
						</a>
					</Link>
					&nbsp;&bull;&nbsp;
					<TimeAgo date={article.editDate || article.publishDate || '0000'} />
				</small>
			</footer>
		</article>;
}
