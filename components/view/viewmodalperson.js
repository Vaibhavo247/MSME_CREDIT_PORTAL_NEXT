"use client";

import { useEffect, useMemo, useState } from "react";
import { Alert, Button, Checkbox, Input, Modal, Spin, Tabs } from "antd";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/UserContext";
import { fetchJson, postJson } from "@/lib/clientFetch";
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

export default function ViewModalPerson({ id, open = true, onActionComplete }) {
  const router = useRouter();
  const user = useUser();
  const [person, setPerson] = useState(null);
  const [docs, setDocs] = useState(null);
  const [docsWarning, setDocsWarning] = useState("");
  const [businessImageData, setBusinessImageData] = useState(null);
  const [businessImageWarning, setBusinessImageWarning] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
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
        const summaryResponse = await fetchJson(`/actions/getSummary?id=${encodeURIComponent(id)}`);
        const [docsResponse, businessImageResponse] = await Promise.all([
          fetchJson(`/actions/getCaseDocs?id=${encodeURIComponent(id)}`).catch((docsError) => ({
            data: [],
            warning: docsError?.message || "Case documents are not available.",
          })),
          fetchJson(`/actions/getBusinessImage?id=${encodeURIComponent(id)}`).catch((imageError) => ({
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
  const canAct =
    user?.role === "CREDIT" &&
    person?.credit_status !== "Approved" &&
    person?.loan_status !== "Rejected";

  function finishAction(title, content) {
    Modal.success({
      title,
      content,
      onOk: () => {
        onActionComplete?.();
        router.refresh();
      },
    });
  }

  async function handleApprove() {
    const allowedUdhyamStatus = [0, 1, 2].includes(Number(person?.isUdhyamDeviated));

    if (!allowedUdhyamStatus) {
      Modal.error({
        title: "Error",
        content: "Invalid Udhyam Deviated status.",
      });
      return;
    }

    setActionLoading(true);
    try {
      await postJson("/actions/approveCase", {
        id,
        approved_by: user?.employeeId,
      });
      finishAction("Success", "Case has been approved successfully.");
    } catch (actionError) {
      Modal.error({
        title: "Error",
        content: actionError?.message || "Failed to approve the case. Please try again.",
      });
    } finally {
      setActionLoading(false);
    }
  }

  function showApproveConfirm() {
    Modal.confirm({
      title: "Warning",
      content: "Are you sure you want to approve?",
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: handleApprove,
    });
  }

  function showPendingConfirm() {
    const reasons = [
      "Re-upload Business Image",
      "Re-upload Business Multiple Images",
      "Update Udyam document and Business details",
      "Update Current Address",
    ];
    let selectedReasons = [];
    let comment = "";

    Modal.confirm({
      title: "Select Pending Reason",
      width: 600,
      content: (
        <div className="space-y-3">
          <Checkbox.Group
            className="flex flex-col gap-2"
            options={reasons}
            onChange={(values) => {
              selectedReasons = values;
            }}
          />
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Additional Comments
            </label>
            <Input.TextArea
              rows={4}
              placeholder="Enter additional comments"
              onChange={(event) => {
                comment = event.target.value;
              }}
            />
          </div>
        </div>
      ),
      okText: "Confirm",
      onOk: async () => {
        if (selectedReasons.length === 0) {
          Modal.error({
            title: "Error",
            content: "Please select at least one reason.",
          });
          return Promise.reject();
        }

        setActionLoading(true);
        try {
          await postJson("/actions/pendingCase", {
            id,
            credit_selective_comment: selectedReasons.join(", "),
            credit_comment: comment.trim(),
            approved_by: user?.employeeId,
          });
          finishAction("Success", "Case has been marked as pending successfully.");
        } catch (actionError) {
          Modal.error({
            title: "Error",
            content: actionError?.message || "Failed to mark the case pending. Please try again.",
          });
          return Promise.reject();
        } finally {
          setActionLoading(false);
        }
      },
    });
  }

  function showCancelConfirm() {
    let reason = "";

    Modal.confirm({
      title: "Are you sure to cancel?",
      content: (
        <Input.TextArea
          rows={4}
          placeholder="Please enter a reason"
          onChange={(event) => {
            reason = event.target.value;
          }}
        />
      ),
      okText: "Confirm",
      cancelText: "Back",
      okButtonProps: { danger: true },
      onOk: async () => {
        if (!reason.trim()) {
          Modal.error({
            title: "Error",
            content: "Reason is required.",
          });
          return Promise.reject();
        }

        setActionLoading(true);
        try {
          await postJson("/actions/cancelCase", {
            id,
            credit_comment: reason.trim(),
            approved_by: user?.employeeId,
          });
          finishAction("Success", "Case has been cancelled successfully.");
        } catch (actionError) {
          Modal.error({
            title: "Error",
            content: actionError?.message || "Failed to cancel the case. Please try again.",
          });
          return Promise.reject();
        } finally {
          setActionLoading(false);
        }
      },
    });
  }

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

      {canAct && (
        <div className="sticky bottom-0 mt-5 flex justify-center gap-3 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur">
          <Button
            type="primary"
            className="bg-green-600"
            loading={actionLoading}
            onClick={showApproveConfirm}
          >
            Approve
          </Button>
          <Button loading={actionLoading} onClick={showPendingConfirm}>
            Pending
          </Button>
          <Button danger loading={actionLoading} onClick={showCancelConfirm}>
            Cancel
          </Button>
        </div>
      )}
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
      <ViewModalPerson id={id} open={open} onActionComplete={onClose} />
    </Modal>
  );
}
