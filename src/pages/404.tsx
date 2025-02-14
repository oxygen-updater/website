import { faFaceFrown } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import GoogleAdsense from 'src/components/adsense';
import GoogleCustomSearch from 'src/components/custom-search';
import styles from 'src/styles/404.module.scss';

export default function Custom404() {
	const { asPath } = useRouter();

	return (
		<div className={styles.host}>
			<section>
				<FontAwesomeIcon icon={faFaceFrown} />

				<div>
					<h1>404 &bull; Not Found</h1>

					<p>
						Sorry, the page
						{' '}
						<strong><samp>{asPath}</samp></strong>
						{' '}
						could not be found.
					</p>
					<p>
						Check the URL and try again, or browse
						{' '}
						<Link href="/news/all/">
							<a>our articles</a>
						</Link>
						.
					</p>
				</div>
			</section>

			<section className={styles.gcseContainer}>
				<GoogleCustomSearch />
				<GoogleAdsense type="display" />
			</section>
		</div>
	);
}
