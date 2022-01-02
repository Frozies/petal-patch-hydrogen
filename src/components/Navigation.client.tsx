import {Link} from '@shopify/hydrogen/client';

export default function Navigation() {
  return (
    <div className="flex justify-between justify-center align-middle">
      <Link to={'/'} className={'font-sansSerif font-semibold'}>Bouquet of the Day</Link>
      <Link to={'/'}  className={'font-sansSerif font-semibold'}>Weddings</Link>
      <Link to={'/'}  className={'font-sansSerif font-semibold'}>Holidays</Link>
      <Link to={'/'}  className={'font-sansSerif font-semibold'}>Plants & Succulents</Link>
      <Link to={'/'}  className={'font-sansSerif font-semibold'}>Gifts</Link>
      <Link to={'/'}  className={'font-sansSerif font-semibold'}>Occasions</Link>
      <Link to={'/'}  className={'font-sansSerif font-semibold'}>Contact</Link>
      <Link to={'/'}  className={'font-sansSerif font-semibold'}>About</Link>
    </div>
  );
}
