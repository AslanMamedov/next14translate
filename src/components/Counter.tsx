import { useTranslate } from '@/providers/TranslateProvider';

const Title = () => {
	const t = useTranslate('navigation');

	return <div>{t('home')}</div>;
};
export default Title;
