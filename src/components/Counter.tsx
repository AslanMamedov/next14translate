import { useTranslate } from '@/providers/TranslateProvider';

const Counter = () => {
	const t = useTranslate('navigation');

	return <div>{t('about')}</div>;
};
export default Counter;
