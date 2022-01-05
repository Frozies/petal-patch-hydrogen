import {
  useShopQuery,
  flattenConnection,
  ProductProviderFragment,
  Image,
  Link,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Layout from '../components/Layout.server';
import FeaturedCollection from '../components/FeaturedCollection';
import ProductCard from '../components/ProductCard';
import Welcome from '../components/Welcome.server';

export default function Index({country = {isoCode: 'US'}}) {
  const {data}: any = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
    },
  });

  function Hero() {
    return(
      <div className={'top-0 w-full overflow-hidden'}>
        <div className={"bg-hero-flowers w-full h-full mx-auto absolute bg-center"}/>
      </div>
    )
  }

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredProductsCollection: any = collections[0];
  const featuredProducts: any = featuredProductsCollection
    ? flattenConnection(featuredProductsCollection.products)
    : null;
  const featuredCollection: any =
    collections && collections.length > 1 ? collections[1] : collections[0];

  return (
    <Layout hero={<Hero/>}>
      <div className={"relative mb-64"}>
        <Welcome />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {featuredProducts.map((product: any) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

const QUERY = gql`
  query indexContent(
    $country: CountryCode
    $numCollections: Int = 2
    $numProducts: Int = 5
    $includeReferenceMetafieldDetails: Boolean = false
    $numProductMetafields: Int = 0
    $numProductVariants: Int = 250
    $numProductMedia: Int = 1
    $numProductVariantMetafields: Int = 10
    $numProductVariantSellingPlanAllocations: Int = 0
    $numProductSellingPlanGroups: Int = 0
    $numProductSellingPlans: Int = 0
  ) @inContext(country: $country) {
    collections(first: $numCollections) {
      edges {
        node {
          descriptionHtml
          description
          handle
          id
          title
          image {
            ...ImageFragment
          }
          products(first: $numProducts) {
            edges {
              node {
                ...ProductProviderFragment
              }
            }
          }
        }
      }
    }
  }

  ${ProductProviderFragment}
  ${Image.Fragment}
`;
