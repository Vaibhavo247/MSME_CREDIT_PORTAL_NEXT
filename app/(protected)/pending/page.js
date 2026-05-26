"use server"
import PendingClientPage from './pendingclient';
import { getUshyamDeviatedcase } from '@/lib/api';
import { extractDataFromResponse } from '@/lib/crypto';
import ErrorState from '@/components/ErrorState';
import { getDisplayError } from '@/lib/errors/apiError';

export default async function Page() {
	let resp;
	try {
		resp = await getUshyamDeviatedcase();
	} catch (err) {
		return <ErrorState title="Unable to load pending cases" message={getDisplayError(err)} />;
	}

	const initialData = extractDataFromResponse(resp);

	return (
		<div className="space-y-6">
			<PendingClientPage initialData={initialData} />
		</div>
	);
}

