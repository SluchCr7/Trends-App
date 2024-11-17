import { Inter } from 'next/font/google';
import '../../globals.css';
import LeftsideDash from '@/app/components/LeftsideDash';
import Header from '@/app/components/Header';
const inter = Inter({ subsets: ['latin'] });
export const metadata = {
    title: 'Dashboard',
    description: 'Dashboard page',
} 

export default function DashboardLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} flex flex-col items-center w-full`}>
                {/* <Header /> */}
                <div className='flex flex-col items-center md:flex-row w-full'>
                    <LeftsideDash />
                    {children}
                </div>
            </body>
        </html>
    )
}