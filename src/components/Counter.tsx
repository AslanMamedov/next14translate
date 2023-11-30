import { useTranslate } from '@/providers/TranslateProvider';

const Counter = () => {
	const t = useTranslate('about');

	return <div>{t('list.desc_1')}</div>;
};
export default Counter;
