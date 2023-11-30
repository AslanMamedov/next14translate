'use client';

import Counter from '@/components/Counter';

export default function User() {
	// const t = useTranslate();
	return (
		<section className="py-24">
			<div className="container">
				user <Counter />
			</div>
		</section>
	);
}
