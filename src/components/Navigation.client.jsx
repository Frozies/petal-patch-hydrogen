import {Link} from '@shopify/hydrogen/client';

/**
 * A client component that defines the navigation for a web storefront
 */
export default function Navigation({collections}) {
  return (
      <div className="flex justify-between justify-center align-middle">{/*TODO Fix this font, its weird*/}
          <Link to={'/'} className={'font-sansSerif font-semibold border-2 border-black/0 hover:border-black/100'}>Bouquet of the Day</Link>
          <Link to={'/'}  className={'font-sansSerif font-semibold  border-2 border-black/0 hover:border-black/100'}>Weddings</Link>
          <Link to={'/'}  className={'font-sansSerif font-semibold border-2 border-black/0 hover:border-black/100'}>Holidays</Link>
          <Link to={'/'}  className={'font-sansSerif font-semibold border-2 border-black/0 hover:border-black/100'}>Plants & Succulents</Link>
          <Link to={'/'}  className={'font-sansSerif font-semibold border-2 border-black/0 hover:border-black/100'}>Gifts</Link>
          <Link to={'/'}  className={'font-sansSerif font-semibold border-2 border-black/0 hover:border-black/100'}>Occasions</Link>
          <Link to={'/'}  className={'font-sansSerif font-semibold border-2 border-black/0 hover:border-black/100'}>Contact</Link>
          <Link to={'/'}  className={'font-sansSerif font-semibold border-2 border-black/0 hover:border-black/100'}>About</Link>
      </div>
  );
}
