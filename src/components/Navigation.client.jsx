import {Link} from '@shopify/hydrogen/client';

export default function Navigation() {
  return (
    <div className="flex justify-between items-center">
      <Link>Weddings</Link>
      <Link>Holidays</Link>
      <Link>Plants & Succulents</Link>
      <Link>Gifts</Link>
      <Link>Occasions</Link>
      <Link>Contact</Link>
      <Link>About</Link>
    </div>
  );
}
