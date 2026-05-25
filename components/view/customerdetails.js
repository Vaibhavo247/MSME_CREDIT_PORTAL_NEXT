"use client";

import { Button, Image } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import ViewField from "./viewField";

function buildAddress(person, prefix) {
  const parts = [
    person?.[`${prefix}_address_line1`],
    person?.[`${prefix}_address_line2`],
    person?.[`${prefix}_address_line3`],
    person?.[`${prefix}_address_city`],
    person?.[`${prefix}_address_state`],
  ].filter(Boolean);

  const pincode = person?.[`${prefix}_address_pincode`];
  return `${parts.join(" ")}${pincode ? ` PIN CODE - ${pincode}` : ""}`.trim();
}

function downloadDataUrl(dataUrl, fileName) {
  if (!dataUrl) return;

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = fileName.replace(/\s+/g, "_");
  link.click();
}

export default function CustomerDetails({ person, customerImage }) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Customer Detail</h3>
          <p className="text-xs text-slate-500">
            Application number: {person?.application_id || "N/A"}
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="grid gap-3 md:grid-cols-2">
          <ViewField label="Full Name" value={person?.full_name} />
          <ViewField label="Date of Birth" value={person?.dob} />
          <ViewField label="Mobile Number" value={person?.mobile_no} />
          <ViewField label="Email Address" value={person?.email_address} />
          <ViewField label="PAN Number" value={person?.pan_no} />
          <ViewField label="Aadhaar Number" value={person?.aadhar_no} />
          <ViewField label="Aadhaar Reference Number" value={person?.aadhar_reference_no} />
          <ViewField label="Customer ID" value={person?.customer_id} />
          <ViewField
            label="Agent ID / Agent Name"
            value={`${person?.agent_id || "N/A"}, ${person?.FirstName || ""} ${person?.LastName || ""}`.trim()}
          />
          <ViewField label="Agent Mobile Number" value={person?.MobileNo} />
          <ViewField label="Current Address" value={buildAddress(person, "c")} wide />
          <ViewField label="Permanent Address" value={buildAddress(person, "a")} wide />
          <ViewField label="Landmark" value={person?.landmark_by_agent} />
          <ViewField label="Branch Code" value={person?.Branch} />
          <ViewField
            label="Business Address"
            value={`${person?.business_address || ""}, ${person?.business_city || ""}, ${person?.business_state || ""}, ${person?.business_pincode || ""}`}
            wide
          />
          <ViewField label="Application Status" value={person?.loan_status} />
          <ViewField label="Credit Comment" value={person?.credit_comment} />
          <ViewField label="Agent Comment" value={person?.agent_comment} />
          <ViewField label="Web Lead" value={person?.is_web ? "TRUE" : "FALSE"} />
        </div>

        <div className="rounded-md border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-3 py-2 text-center text-sm font-semibold">
            Customer Photo
          </div>
          <div className="space-y-3 p-3 text-center">
            {customerImage ? (
              <Image src={customerImage} alt="Customer" className="max-h-72 object-contain" />
            ) : (
              <div className="flex h-48 items-center justify-center rounded-md bg-slate-50 text-sm text-slate-500">
                No photo available
              </div>
            )}

            <div className="flex justify-between gap-3 text-xs font-medium text-slate-700">
              <span>Lat: {person?.latitude || "N/A"}</span>
              <span>Long: {person?.longitude || "N/A"}</span>
            </div>

            <Button
              block
              icon={<DownloadOutlined />}
              disabled={!customerImage}
              onClick={() =>
                downloadDataUrl(
                  customerImage,
                  `${person?.full_name || "customer"}_photo.jpg`,
                )
              }
            >
              Download
            </Button>
          </div>
          <div className="border-t border-slate-200 px-3 py-2 text-center">
            <p className="text-xs font-semibold text-slate-500">LOCATION</p>
            <p className="mt-1 text-xs text-slate-700">
              {person?.customerLatLong?.display_name || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
