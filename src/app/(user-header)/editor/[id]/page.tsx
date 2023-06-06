import { ReactElement } from 'react';

const ItemPage = ({ params }: { params: { id: string } }): ReactElement => {
	return <div>id: {params.id}</div>;
};

export default ItemPage;
