import { getManufacturers, getServices } from "@/services/api";
import Form from "@/app/_components/form"

export default async function Konfigurator() {

	const dataObj = {
		allManufacturers: await getManufacturers(),
		allServices: await getServices()
	}

    return (
        <div>
			<Form data={dataObj}></Form>
        </div>
    );
}
