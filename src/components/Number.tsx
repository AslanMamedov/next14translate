import { useTranslate } from '@/providers/TranslateProvider';
import React from 'react';

const Number = () => {
	const t = useTranslate();
	return <div>{t('number.one')}</div>;
};

export default Number;
