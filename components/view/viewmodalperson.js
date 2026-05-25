"use client";

import { useEffect, useMemo, useState } from "react";
import { Alert, Modal, Spin, Tabs } from "antd";
import CustomerDetails from "./customerdetails";
import BusinessDetails from "./businessdetails";
import OtherDetails from "./otherdetails";

function normalizeImage(image) {
  if (!image) return null;
  return image.startsWith("data:") ? image : `data:image/jpeg;base64,${image}`;
}

function normalizeCustomerImage(docs, imageResponse, person) {
  const docRecord = Array.isArray(docs) ? docs[0] : docs;
  const imageRecord = Array.isArray(imageResponse) ? imageResponse[0] : imageResponse;
  const image =
    docRecord?.customer_photo ||
    imageRecord?.customer_photo ||
    person?.customer_photo;

  return normalizeImage(image);
}

function normalizeBusinessImage(imageResponse) {
  const imageRecord = Array.isArray(imageResponse) ? imageResponse[0] : imageResponse;
  const image = imageRecord?.business_image || imageRecord?.ao_business_image;

  return normalizeImage(image);
}

async function getJson(url) {
  const response = await fetch(url);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json?.error || "Request failed");
  }

  return json;
}

export default function ViewModalPerson({ id, open = true }) {
  const [person, setPerson] = useState(null);
  const [docs, setDocs] = useState(null);
  const [docsWarning, setDocsWarning] = useState("");
  const [businessImageData, setBusinessImageData] = useState(null);
  const [businessImageWarning, setBusinessImageWarning] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || !id) return;

    let isActive = true;

    async function loadDetails() {
      setLoading(true);
      setError("");
      setDocsWarning("");
      setBusinessImageWarning("");

      try {
        const summaryResponse = await getJson(`/actions/getSummary?id=${encodeURIComponent(id)}`);
        const [docsResponse, businessImageResponse] = await Promise.all([
          getJson(`/actions/getCaseDocs?id=${encodeURIComponent(id)}`).catch((docsError) => ({
            data: [],
            warning: docsError?.message || "Case documents are not available.",
          })),
          getJson(`/actions/getBusinessImage?id=${encodeURIComponent(id)}`).catch((imageError) => ({
            data: [],
            warning: imageError?.message || "Business image is not available.",
          })),
        ]);

        if (!isActive) return;

        setPerson(summaryResponse?.data?.[0] || {});
        setDocs(docsResponse?.data || {});
        setDocsWarning(docsResponse?.warning || "");
        setBusinessImageData(businessImageResponse?.data || {});
        setBusinessImageWarning(businessImageResponse?.warning || "");
      } catch (loadError) {
        if (!isActive) return;
        setError(loadError?.message || "Unable to load application details");
      } finally {
        if (isActive) setLoading(false);
      }
    }

    loadDetails();

    return () => {
      isActive = false;
    };
  }, [id, open]);

  const customerImage = useMemo(
    () => normalizeCustomerImage(docs, businessImageData, person),
    [docs, businessImageData, person],
  );
  const businessImage = useMemo(
    () => normalizeBusinessImage(businessImageData),
    [businessImageData],
  );

  if (!id) {
    return <Alert type="warning" title="No application selected" showIcon />;
  }

  if (loading) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (error) {
    return <Alert type="error" title="Unable to load details" description={error} showIcon />;
  }

  if (!person) return null;

  return (
    <div className="max-h-[72vh] overflow-y-auto pr-1">
      <div className="mb-4 rounded-md bg-slate-100 px-4 py-3">
        <p className="text-sm font-semibold text-slate-900">
          Application number - {person?.application_id || "N/A"}
        </p>
      </div>

      <Tabs
        defaultActiveKey="customer"
        items={[
          {
            key: "customer",
            label: "Customer Detail",
            children: <CustomerDetails person={person} customerImage={customerImage} />,
          },
          {
            key: "business",
            label: "Business Detail",
            children: (
              <BusinessDetails
                person={person}
                id={id}
                businessImage={businessImage}
                businessImageWarning={businessImageWarning}
              />
            ),
          },
          {
            key: "loan",
            label: "Loan & KYC",
            children: <OtherDetails person={person} docs={docs} docsWarning={docsWarning} />,
          },
          {
            key: "audit",
            label: "Audit Trail",
            children: <div className="p-4 text-sm text-slate-500">Audit trail details will be displayed here.</div>,
          }
        ]}
      />
    </div>
  );
}

export function ViewPersonModal({ id, open, onClose }) {
  return (
    <Modal
      title="Application Details"
      open={open}
      onCancel={onClose}
      width="92%"
      footer={null}
      destroyOnHidden
    >
      <ViewModalPerson id={id} open={open} />
    </Modal>
  );
}
