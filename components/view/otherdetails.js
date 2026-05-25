"use client";

import { Alert, Button,Modal,Input} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import ViewField from "./viewField";

function downloadBase64(base64, fileName, mimeType = "application/pdf") {
  if (!base64) return;

  const href = base64.startsWith("data:")
    ? base64
    : `data:${mimeType};base64,${base64}`;
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName;
  link.click();
}

export default function OtherDetails({ person, docs, docsWarning }) {
  const docRecord = Array.isArray(docs) ? docs[0] : docs;

  return (
    <section className="space-y-5">
      <div className="border-b border-slate-200 pb-3">
        <h3 className="text-base font-semibold text-slate-900">Loan Detail</h3>
        <p className="text-xs text-slate-500">Offer, BRE and document details</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <ViewField label="Approved Loan Amount" value={person?.approved_loan_amount} />
        <ViewField label="Requested Loan Amount" value={person?.final_loan_amount} />
        <ViewField label="BRE Status" value={person?.bre_status || "COMPLETED"} />
        <ViewField label="BRE Remark" value={person?.loan_rejection_reason} />
        <ViewField label="Tenure (Months)" value={person?.loan_total_duration_in_months} />
        <ViewField label="Processing Fee" value={person?.processing_fees} />
        <ViewField label="First EMI Date" value={person?.loan_first_emi_date} />
        <ViewField label="EMI" value={person?.monthly_emi_amount} />
        <ViewField label="Eligibility Criteria" value={person?.eligibility_criteria} />
        <ViewField label="BRE Execution Time" value={person?.bre_executed_on} />
        <ViewField label="CrifReport" value={<Button size="small" type="primary">Open</Button>} />
        
      </div>
      <div className="grid gap-4 md:grid-cols-2">
  {person?.credit_status !== "Approved" &&
    person?.loan_status !== "Rejected" && (
      <>
        <div className="rounded-md border border-slate-200 bg-white p-4">
          <h6 className="mb-3 text-sm font-semibold">
            Upload Udyam Document (PDF)
          </h6>

          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="block w-full rounded-md border border-slate-300 p-2 text-sm"
          />

          {selectedFile && (
            <div className="mt-3 space-y-3">
              <p className="text-sm text-slate-600">
                Selected file: {selectedFile.name}
              </p>

              <Button
                type="primary"
                loading={loading}
                onClick={handleSubmit}
              >
                {loading ? "Uploading..." : "Upload Document"}
              </Button>
            </div>
          )}
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-4">
          <h6 className="mb-3 text-sm font-semibold">
            Update Landmark
          </h6>

          <Button
            type="primary"
            onClick={() => setIsLandmarkModalVisible(true)}
          >
            Update Landmark
          </Button>
        </div>
      </>
    )}
</div>
<Modal
  title="Update Landmark"
  open={isLandmarkModalVisible}
  onCancel={() => setIsLandmarkModalVisible(false)}
  footer={[
    <Button
      key="cancel"
      onClick={() => setIsLandmarkModalVisible(false)}
    >
      Cancel
    </Button>,

    <Button
      key="submit"
      type="primary"
      loading={loading}
      disabled={!landmarkText}
      onClick={handleSubmitLandMark}
    >
      Submit
    </Button>,
  ]}
>
  <Input
    placeholder="Enter landmark details"
    value={landmarkText}
    onChange={(e) => {
      const value = e.target.value;

      const regex = /^[a-zA-Z0-9\s,.\-:_]*$/;

      if (regex.test(value)) {
        setLandmarkText(value);
      }
    }}
  />
</Modal>
      <div>
        <div className="mb-3 rounded-md bg-slate-100 px-3 py-2 text-center text-sm font-semibold text-slate-800">
          KYC Documents
        </div>
        {docsWarning && (
          <Alert
            className="mb-3"
            type="warning"
            title="Case documents unavailable"
            description={docsWarning}
            showIcon
          />
        )}
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-md border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-3 py-2 text-center text-sm font-semibold">
              Aadhaar Photo
            </div>
            <div className="p-3">
              <Button
                block
                icon={<DownloadOutlined />}
                disabled={!person?.aadhar_photo}
                onClick={() =>
                  downloadBase64(
                    person?.aadhar_photo,
                    `${person?.full_name || "customer"}_aadhar.jpg`,
                    "image/jpeg",
                  )
                }
              >
                Download
              </Button>
            </div>
          </div>

          <div className="rounded-md border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-3 py-2 text-center text-sm font-semibold">
              Aadhaar PDF
            </div>
            <div className="p-3">
              <Button
                block
                icon={<DownloadOutlined />}
                disabled={!docRecord?.aadhar_response_code}
                onClick={() =>
                  downloadBase64(docRecord?.aadhar_response_code, "aadhar_file.pdf")
                }
              >
                Download
              </Button>
            </div>
          </div>

          <div className="rounded-md border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-3 py-2 text-center text-sm font-semibold">
              Udyam / Legality Doc
            </div>
            <div className="p-3">
              <Button
                block
                icon={<DownloadOutlined />}
                disabled={!person?.udyam_doc && !person?.leegality_signed_doc}
                onClick={() =>
                  downloadBase64(
                    person?.udyam_doc || person?.leegality_signed_doc,
                    person?.udyam_doc ? "udyam.pdf" : "legality_doc.pdf",
                  )
                }
              >
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
