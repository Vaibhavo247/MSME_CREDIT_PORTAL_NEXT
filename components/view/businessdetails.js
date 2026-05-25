"use client";

import { Alert, Button, Image } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import ViewField from "./viewField";

function normalizeImage(image) {
  if (!image) return null;
  return image.startsWith("data:") ? image : `data:image/jpeg;base64,${image}`;
}

function downloadDataUrl(dataUrl, fileName) {
  if (!dataUrl) return;

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = fileName.replace(/\s+/g, "_");
  link.click();
}

export default function BusinessDetails({ person, businessImage, businessImageWarning }) {
  const isNtbvl = person?.case_type === "NTBVL";
  const image =
    businessImage ||
    normalizeImage(person?.business_image) ||
    normalizeImage(person?.business_image_1) ||
    normalizeImage(person?.business_image_2) ||
    normalizeImage(person?.business_image_3) ||
    normalizeImage(person?.business_image_4);

  return (
    <section className="space-y-4">
      <div className="border-b border-slate-200 pb-3">
        <h3 className="text-base font-semibold text-slate-900">
          {isNtbvl ? "Additional Details" : "Business Profile Information"}
        </h3>
        <p className="text-xs text-slate-500">
          Sector, Udyam and business mapping details
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="grid gap-3 md:grid-cols-2">
          {isNtbvl && (
            <>
              <ViewField label="Prefix" value={person?.prefix} />
              <ViewField label="Gender" value={person?.gender} />
              <ViewField label="Father Name" value={person?.father_name} />
              <ViewField label="Mother Name" value={person?.mother_name} />
              <ViewField label="Marital Status" value={person?.marital_status} />
              <ViewField label="Occupation" value={person?.occupation} />
              <ViewField label="Education" value={person?.qualification} />
              <ViewField label="Annual Income" value={person?.annual_income} />
              <ViewField label="Purpose Of Loan" value={person?.purpose_of_loan} />
              <ViewField label="Employment Status" value={person?.employment_status} />
            </>
          )}
          <ViewField label="Udyam Number" value={person?.udyam_no} />
          <ViewField
            label="Business Name"
            value={person?.business_name_byuser || person?.udyam_name}
          />
          <ViewField label="Udyam Incorporation Date" value={person?.udyam_incorp_date} />
          <ViewField label=" Date Of Registraion" value={person?.business_incorp_date} />
          <ViewField label=" Entity Type" value={person?.udyam_entity_type} />
          <ViewField label="Business Mobile Number" value={person?.udyam_major_activity} />
          <ViewField label="Business Email" value={person?.udyam_nature_of_business} />
          <ViewField
            label="Business Address"
            value={`${person?.business_address || ""}, ${person?.business_city || ""}, ${person?.business_state || ""}, ${person?.business_pincode || ""}`}
            wide
          />          
          <ViewField label="Business State" value={person?.business_pan} />
          <ViewField label="Business Pincode" value={person?.business_pan} />
          <ViewField label="Distance to the Nearest branch (KM)" value={person?.business_pan} />
          <ViewField label="Nerest Branch Name" value={person?.business_pan} />
           <ViewField label="Sector" value={person?.sector} />
           <ViewField label="Subsector" value={person?.subsector} />
          <ViewField label="Business Name(By User)" value={person?.business_pan} />
          <ViewField label="Udyam Entity" value={person?.business_gst} />

          <ViewField label="Case Type" value={person?.case_type} />
          <ViewField label="Google Business Name" value={person?.business_vintage} />
          <ViewField label="Google Business Address" value={person?.gst_no} />
          <ViewField label="Google Phone Number" value={person?.business_pan} />
          <ViewField label="Google Business Status" value={person?.shop_ownership} />
          <ViewField label="Google Overall Rating" value={person?.business_type} />
          <ViewField label="Number Of Application Using Same Mobile No" value={person?.monthly_turnover} />
          <ViewField label="Number Of Application In 100 M LAT Long" value={person?.business_lat} />          
        </div>

        <div className="rounded-md border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-3 py-2 text-center text-sm font-semibold">
            Business Image
          </div>
          <div className="space-y-3 p-3 text-center">
            {businessImageWarning && !image && (
              <Alert
                type="warning"
                title="Business image unavailable"
                description={businessImageWarning}
                showIcon
              />
            )}

            {image ? (
              <Image src={image} alt="Business" className="max-h-72 object-contain" />
            ) : (
              <div className="flex h-48 items-center justify-center rounded-md bg-slate-50 text-sm text-slate-500">
                No image available
              </div>
            )}

            <div className="flex justify-between gap-3 text-xs font-medium text-slate-700">
              <span>Lat: {person?.business_lat || "N/A"}</span>
              <span>Long: {person?.business_long || "N/A"}</span>
            </div>

            <Button
              block
              icon={<DownloadOutlined />}
              disabled={!image}
              onClick={() =>
                downloadDataUrl(
                  image,
                  `${person?.business_name_byuser || person?.full_name || "business"}_image.jpg`,
                )
              }
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
