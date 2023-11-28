import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white p-8">
      <div className="container mx-auto flex justify-between max-w-[800px]">
				{/* Column 1 */}
				<div className="flex flex-col">
					<h2 className="text-lg font-bold mb-2">Shop</h2>
					<Link href="/checklist" passHref><p className="cursor-pointer">Checklists</p></Link>
					<Link href="/audit" passHref><p className="cursor-pointer">Audits</p></Link>
					<Link href="/history" passHref><p className="cursor-pointer">History</p></Link>
				</div>

				{/* Column 2 */}
				<div className="flex flex-col">
					<h2 className="text-lg font-bold mb-2">Information</h2>
					<Link href="/about" passHref><p className="cursor-pointer">About Us</p></Link>
					<Link href="/contact" passHref><p className="cursor-pointer">Contact</p></Link>
					<Link href="/faqs" passHref><p className="cursor-pointer">FAQs</p></Link>
				</div>

				{/* Column 3 */}
				<div className="flex flex-col">
					<h2 className="text-lg font-bold mb-2">Connect With Us</h2>
					<Link href="https://www.facebook.com" passHref><p className="cursor-pointer">Facebook</p></Link>
					<Link href="https://www.instagram.com" passHref><p className="cursor-pointer">Instagram</p></Link>
					<Link href="https://www.twitter.com" passHref><p className="cursor-pointer">Twitter</p></Link>
				</div>
			</div>

			<p className="text-center p-4">&copy; 2023 Audit QMS. All rights reserved.</p>
    </footer>
  );
};

export default Footer;