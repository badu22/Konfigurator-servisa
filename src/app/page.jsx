import Link from 'next/link'

export default function Home() {
    return (
      	<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pt-[72px] gap-16 font-[family-name:var(--font-satoshi)]">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<div className='container max-w-[600px] mx-auto text-center'>
					<h1 className='text-[32px] font-bold text-blue-800 mb-4'>Konfigurator servisa</h1>
					<p className='text-[18px] mb-5'>Pošaljite upit za servis svog vozila pomoću našeg konfiguratora i naš stručan tim če vam se javiti u najkračem mogućem roku</p>
					<Link className='py-2 px-4 rounded-md bg-blue-800 text-white items-center gap-1 hover:bg-blue-600 grow text-center rounded' href="/konfigurator">Pokreni konfigurator</Link>
				</div>
			</main>
      	</div>
    );
}
 