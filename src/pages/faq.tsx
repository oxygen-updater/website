import type { GetStaticProps } from 'next';
import Accordion from 'src/components/accordion';
import DefaultHead from 'src/components/default-head';
import FaqBody from 'src/components/faq-body';
import type { FaqCategory } from 'src/models/response/faq.interface';
import { TITLE } from 'src/pages/_document';
import styles from 'src/styles/Faq.module.scss';
import { pickLocaleField } from 'src/utilities/locale';

interface Props {
	list: FaqCategory[]
}

export default function Faq({ list }: Props) {
	return (
		<>
			<DefaultHead title={`FAQ • ${TITLE}`} />

			{list.map(category =>
				<>
					<h2
						key={`category-${category.id}`}
						className={styles.category}
					>
						{pickLocaleField(category, 'title')}
					</h2>
					{category.items.map(item =>
						<Accordion
							key={`item-${item.id}`}
							summary={pickLocaleField(item, 'title')}
							summaryClassName={item.imp ? 'text-primary' : ''}
							contentClassName={styles.itemBody}
						>
							<FaqBody body={pickLocaleField(item, 'body')} />
						</Accordion>
					)}
				</>
			)}
		</>
	);
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const baseUrl = process.env.API_BASE_URL!;
	const list = await (
		await fetch(baseUrl, {
			method: 'POST',
			body: JSON.stringify({
				type: process.env.API_TYPE_FAQ_FLATTENED,
			}),
		})
	).json() as FaqCategory[];

	return {
		props: {
			list,
		},
	};
};
