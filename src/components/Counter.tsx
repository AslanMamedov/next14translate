import { useTranslate } from '@/providers/TranslateProvider';

const Counter = () => {
	const t = useTranslate('carousel.item');

	return <div>{t('desc')}</div>;
};
export default Counter;
