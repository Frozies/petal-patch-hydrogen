import {Link} from '@shopify/hydrogen/client';

export default function Navigation() {
  return (
    <div className="flex justify-between justify-center align-middle">
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
