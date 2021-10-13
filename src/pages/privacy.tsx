import type { GetStaticProps } from 'next';
import DefaultHead from 'src/components/default-head';
import ExternalLink from 'src/components/external-link';
import type { PrivacyCategory } from 'src/models/response/privacy.interface';
import { TITLE } from 'src/pages/_document';
import styles from 'src/styles/Privacy.module.scss';
import { sanitize } from 'src/utilities/sanitize';

interface Props {
	version: string // x.y
	updated: string // timestamp
	body: string    // HTML
	desc: string    // non-HTML version of `body`
	list: PrivacyCategory[]
}

export default function Privacy({ version, updated, body, desc, list }: Props) {
	return (
		<>
			<DefaultHead title={`Privacy • ${TITLE}`}>
				<meta
					key=".$og:description"
					property="og:description"
					content={desc}
				/>
				<meta
					key=".$description"
					name="description"
					content={desc}
				/>
			</DefaultHead>

			<h1 className="pt-4 mb-0">
				Privacy Policy (v
				{version}
				)
			</h1>

			<p className="text-xs text-fg-variant">
				Last updated:
				{' '}
				<time
					title={updated}
					dateTime={updated}
				>
					{new Date(updated).toLocaleString()}
				</time>
			</p>

			{/* eslint-disable-next-line react/no-danger */}
			<span dangerouslySetInnerHTML={{
				__html: sanitize(body),
			}}
			/>

			{list.map(category =>
				<>
					<h2 className={styles.category}>{category.title}</h2>
					<ul>
						{category.items.map(item =>
							<li key={`item-${item.id}`}>
								<h3>{item.title + (item.req ? ' *' : '')}</h3>

								{/* eslint-disable-next-line react/no-danger */}
								<span dangerouslySetInnerHTML={{
									__html: sanitize(item.body),
								}}
								/>

								{!item.pii ?
									<>
										{' '}
										None of this information is
										{' '}
										<ExternalLink href="https://en.wikipedia.org/wiki/Personal_data">
											personally-identifiable
										</ExternalLink>
										.
									</> : ''}
							</li>
						)}
					</ul>
				</>
			)}
		</>
	);
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const baseUrl = process.env.API_BASE_URL!;
	const props = await (
		await fetch(baseUrl, {
			method: 'POST',
			body: JSON.stringify({
				type: process.env.API_TYPE_PRIVACY_POLICY,
			}),
		})
	).json() as Props;

	return { props };
};
