export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pt-[72px] gap-16 font-[family-name:var(--font-satoshi)]">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<div className='container max-w-[600px] mx-auto text-center'>
					<h1 className='text-[32px] font-bold text-blue-800 mb-4'>Vaša prijava je uspiješno poslana</h1>
					<p className='text-[18px] mb-5'>Vaša prijava je uspješno poslana i zaprimljena. Kontaktirat ćemo vas u najkraćem mogućem roku. <br />
                    Hvala vam!</p>
				</div>
			</main>
      	</div>
    );
}
 