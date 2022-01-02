import {Link} from '@shopify/hydrogen/client';

export default function Navigation() {
  return (
    <div className="flex justify-between justify-center align-middle">
      <Link className={'font-sansSerif font-semibold'}>Bouquet of the Day</Link>
      <Link className={'font-sansSerif font-semibold'}>Weddings</Link>
      <Link className={'font-sansSerif font-semibold'}>Holidays</Link>
      <Link className={'font-sansSerif font-semibold'}>Plants & Succulents</Link>
      <Link className={'font-sansSerif font-semibold'}>Gifts</Link>
      <Link className={'font-sansSerif font-semibold'}>Occasions</Link>
      <Link className={'font-sansSerif font-semibold'}>Contact</Link>
      <Link className={'font-sansSerif font-semibold'}>About</Link>
    </div>
  );
}
