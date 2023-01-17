import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

export default function Product({ product }) {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image.publicUrlTransformed}
        title={product.name}
        alt={product.photo.altText || 'Product Image'}
      />

      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>

      <PriceTag>{formatMoney(product.price / 100)}</PriceTag>
      <p>{product.description}</p>
      {/* TODO Add action buttons */}
    </ItemStyles>
  );
}
