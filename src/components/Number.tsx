import { useTranslate } from '@/providers/TranslateProvider';
import React from 'react';

const Number = () => {
	const t = useTranslate('page');
	return <div>{t('page.home.title')}</div>;
};

export default Number;
