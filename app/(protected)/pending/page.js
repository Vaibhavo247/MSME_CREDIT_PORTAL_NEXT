"use server"
import PendingClientPage from './pendingclient';
import { getUshyamDeviatedcase } from '@/lib/api';
import CryptoJS from 'crypto-js';

export default async function Page() {
	let resp;
	try {
		resp = await getUshyamDeviatedcase();
	} catch (err) {
		console.error("Error fetching deviated cases:", err);
		return (
			<div className="p-4">
				<h3 className="text-lg font-semibold text-red-600">Unable to load pending cases</h3>
				<p className="text-sm text-gray-700">{String(err?.message || err)}</p>
			</div>
		);
	}

	let initialData = [];
	if (resp?.encryptedResponse) {
		const passphrase = 'ab5a4552-2412-4724-a254-18a05e722e3d';
		const bytes = CryptoJS.AES.decrypt(resp.encryptedResponse, passphrase);
		const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
		initialData = Array.isArray(decryptedData?.data) ? decryptedData.data : [];
        console.log("===========data logs",initialData);
	} else {
		initialData = Array.isArray(resp?.data) ? resp.data : [];
	}

	return (
		<div className="space-y-6">
			<PendingClientPage initialData={initialData} />
		</div>
	);
}

