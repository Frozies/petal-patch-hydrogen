import {
  useShopQuery,
  flattenConnection,
  Link,
  Seo,
  CacheDays,
  Image,
  LocalizationProvider,
} from '@shopify/hydrogen';

import gql from 'graphql-tag';

import FeaturedCollection from '../components/FeaturedCollection';
import ProductCard from '../components/ProductCard';
import {Suspense} from 'react';
import Welcome from '../components/Welcome.server';
import BannerProductCardClient from '../components/BannerProductCard.client';
import Footer from '../components/Footer.server';
import Header from '../components/Header.client';
import Cart from '../components/Cart.client';

export default function Index({country = {isoCode: 'US'}}) {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      tags: 'lilies',
      country: country.isoCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredProductsCollection = collections[0];
  const featuredProducts = featuredProductsCollection
    ? flattenConnection(featuredProductsCollection.products)
    : null;

  const storeName = 'Petal Patch';
  const products = data ? flattenConnection(data.products) : null;

  return (
    <LocalizationProvider>
      <div className="max-w-screen min-h-screen  text-gray-700 font-sans relative">
        {/*Header*/}
        <Suspense fallback={null}>
          <SeoForHomepage />
          <Header collections={collections} storeName={storeName} />
          <Cart />
        </Suspense>

        <main role="main" id="mainContent" className="relative bg-gray-50">
          <div
            className={
              'bg-hero-flowers w-full h-full bg-cover bg-center mx-auto absolute'
            }
          />
          <div className="mx-auto max-w-7xl px-4 pt-4 pb-36 ">
            <div
              className={
                'relative mb-64 items-center justify-center align-middle'
              }
            >
              <Welcome />
              <Suspense fallback={<BoxFallback />}>
                {/*@ts-ignore*/}
                <BannerProductCardClient featuredProducts={featuredProducts} />
              </Suspense>
            </div>
          </div>
        </main>

        {/*About us*/}
        <div className={'relative w-full h-full bg-white flex justify-center'}>
          <div className={'w-2/3 pt-12'}>
            <h1 className={'font-roboto text-2xl'}>
              {' '}
              {/*TODO Fix this font, its weird*/}
              We here at <p className={'inline font-bold'}>
                The Petal Patch
              </p>{' '}
              are more than just a<p className={'inline font-bold'}> florist</p>
              , we are <p className={'inline font-bold'}>family</p>. We
              <p className={'inline font-bold'}> love</p> what we do here
              everyday and this is our happy place. Our arrangements are made
              with smiles and love. With more then{' '}
              <p className={'inline font-bold'}>25 years of floral design </p>{' '}
              let us <p className={'inline font-bold'}>design</p> the perfect
              bouquet for you! Whether it be an{' '}
              <p className={'inline font-bold'}>
                anniversary, birthday, get well, event, holiday, thinking of
                you, new baby, new home, wedding or sympathy
              </p>{' '}
              arrangement we got you covered! Our staff is polite, super
              talented and we always{' '}
              <p className={'inline font-bold'}>deliver with a smile.</p>
            </h1>
          </div>
        </div>

        <div className={' w-full h-full bg-white flex justify-center'}>
          <div className={'w-2/3 h-full py-12'}>
            <Image
              className="
                      h-[600px]
                      bg-white
                      bg-center
                      bg-cover
                      w-full
                      h-auto
                      object-center
                      object-contain
                      p-2"
              width={864}
              height={648}
              src={'/bandit.jpg'}
            />
          </div>
        </div>
      </div>
      {/*Footer*/}
      <Footer collection={collections[0]} product={products[0]} />
    </LocalizationProvider>
  );
}

function SeoForHomepage() {
  const {
    data: {
      shop: {title, description},
    },
  } = useShopQuery({
    query: SEO_QUERY,
    cache: CacheDays(),
    preload: true,
  });

  return (
    <Seo
      type="homepage"
      data={{
        title,
        description,
      }}
    />
  );
}

/*Loading box for when waiting for products*/
function BoxFallback() {
  return <div className="bg-white p-12 shadow-xl rounded-xl mb-10 h-40"></div>;
}

function FeaturedProductsBox({country}) {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredProductsCollection = collections[0];
  const featuredProducts = featuredProductsCollection
    ? flattenConnection(featuredProductsCollection.products)
    : null;

  return (
    <div className="bg-white p-12 shadow-xl rounded-xl mb-10">
      {featuredProductsCollection ? (
        <>
          <div className="flex justify-between items-center mb-8 text-md font-medium">
            <span className="text-black uppercase">
              {featuredProductsCollection.title}
            </span>
            <span className="hidden md:inline-flex">
              <Link
                to={`/collections/${featuredProductsCollection.handle}`}
                className="text-blue-600 hover:underline"
              >
                Shop all
              </Link>
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="md:hidden text-center">
            <Link
              to={`/collections/${featuredProductsCollection.handle}`}
              className="text-blue-600"
            >
              Shop all
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}

function FeaturedCollectionBox({country}) {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredCollection =
    collections && collections.length > 1 ? collections[1] : collections[0];

  return <FeaturedCollection collection={featuredCollection} />;
}

const SEO_QUERY = gql`
  query homeShopInfo {
    shop {
      description
    }
  }
`;

const QUERY = gql`
  query indexContent(
    $country: CountryCode
    $numCollections: Int = 2
    $numProducts: Int = 10
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
            id
            url
            altText
            width
            height
          }
          products(first: $numProducts) {
            edges {
              node {
                handle
                id
                title
                variants(first: 1) {
                  edges {
                    node {
                      id
                      title
                      availableForSale
                      image {
                        id
                        url
                        altText
                        width
                        height
                      }
                      priceV2 {
                        currencyCode
                        amount
                      }
                      compareAtPriceV2 {
                        currencyCode
                        amount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    shop {
      name
    }
    products(first: 1) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;
