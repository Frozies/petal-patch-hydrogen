import {Link} from '@shopify/hydrogen/client';

export default function Footer({collection, product}: any) {
  return (
    <footer role="contentinfo">
      <div className="py-6 px-4 md:px-8 bg-gray-50">
        <p className="text-gray-600"><Link to={'http://davinyoung.com/'} target="_blank">© 2021 DAVINYOUNG.COM</Link></p>
      </div>
    </footer>
  );
}
