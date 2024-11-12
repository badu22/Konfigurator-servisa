import localFont from "next/font/local";
import "@/app/globals.css";

const satoshi = localFont({
    src: [
        {
            path: './fonts/Satoshi-Regular.woff',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/Satoshi-Medium.woff',
            weight: '500',
            style: 'normal',
        },
        {
            path: './fonts/Satoshi-Bold.woff',
            weight: '700',
            style: 'normal',
        },
    ],
});

export const metadata = {
	title: "Konfigurator servisa",
	description: "Izračunajte trošak servisa",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
		<body
			className={`${satoshi.variable} antialiased`}
		>
			<header className="p-[15px_50px] w-full flex fixed items-center top-0 font-[family-name:var(--font-satoshi)] bg-blue-800 text-white ">
                <h1 className="flex-1 text-[32px] font-medium">Konfigurator servisa</h1>
                <p className="flex-1 text-right">Izračunajte trošak servisa</p>
            </header>
			{children}
		</body>
		</html>
	);
}
 