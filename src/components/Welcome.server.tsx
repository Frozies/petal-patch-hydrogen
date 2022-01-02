import {useShopQuery, flattenConnection} from '@shopify/hydrogen';
import gql from 'graphql-tag';

export default function Welcome() {
  const {data} = useShopQuery({query: QUERY});
  const products = data && flattenConnection(data.products);
  const collections = data && flattenConnection(data.collections);

  const firstProduct = products && products.length ? products[0].handle : '';
  const totalProducts = products && products.length;
  const firstCollection = collections[0] ? collections[0].handle : '';
  const totalCollections = collections && collections.length;

  return (
    <div className="text-gray-900 pt-16 rounded-[40px] my-16 px-4 xl:px-12 bg-gradient-to-b from-white -mx-4 xl:-mx-12">
      <div className="text-center mb-16">
        <h1 className="font-sansSerif font-semibold mb-4 text-shadow-xl text-white text-5xl">
          This valentine&#39;s Day, get your sweetheart just what they&#39;ve
          wanted (at just the right price).
        </h1>
        <p className="text-lg mb-8">
          Welcome to your custom storefront. Let&rsquo;s get building.
        </p>
      </div>
    </div>
  );
}

const QUERY = gql`
  query welcomeContent {
    shop {
      name
    }
    products(first: 250) {
      edges {
        node {
          handle
        }
      }
    }
    collections(first: 250) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;
