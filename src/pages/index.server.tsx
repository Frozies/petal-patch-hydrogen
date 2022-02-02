import {
  useShopQuery,
  flattenConnection,
  ProductProviderFragment,
  Image,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import {Suspense} from 'react';
import Layout from '../components/Layout.server';
import ProductCardClient from '../components/ProductCard.client';
import Welcome from '../components/Welcome.client';

export default function Index({search, country = {isoCode: 'US'}}: any) {
  const {data}: any = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
    },
  });

  //todo: I can move this to the welcome component
  function Hero() {
    return(
        <div className={"bg-hero-flowers w-full h-full bg-cover bg-center mx-auto absolute"}/>
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
    <Layout hero={<Hero/>} search={search}>
      <div className={"relative mb-64"}>
        <Welcome />
        <Suspense fallback={<BoxFallback />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            {featuredProducts.map((product: any) => (
              <div key={product.id}>
                <ProductCardClient product={product} />
              </div>
            ))}
          </div>
        </Suspense>
      </div>
    </Layout>
  );
}

function BoxFallback() {
    return <div className="bg-white p-12 shadow-xl rounded-xl mb-10 h-40"></div>;
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
