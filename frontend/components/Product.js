import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import AddToCart from './AddToCart';

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
      <div className="buttonList">
        <Link
          href={{
            pathname: `/update`,
            query: {
              id: product.id
            }
          }}
        >
          Edit
        </Link>
        <AddToCart id={product.id} />
        <DeleteProduct id={product.id}>Delete</DeleteProduct>
      </div>
    </ItemStyles>
  );
}
