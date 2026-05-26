"use client";

import { useMemo, useState } from "react";
import { Button, Input, Spin, Table, Alert } from "antd";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { fetchJson } from "@/lib/clientFetch";
import OnePagerPDF from "./OnePagerPDF";

export default function OnePagerClient({ initialData = [], initialError = "" }) {
  const [data] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(initialError);
  const [pdfData, setPdfData] = useState({});
  const [pdfLoadingKey, setPdfLoadingKey] = useState("");

  const filteredData = useMemo(() => {
    if (!searchText) return data;
    const query = searchText.toLowerCase();

    return data.filter((item) =>
      Object.values(item).some((value) =>
        String(value ?? "").toLowerCase().includes(query),
      ),
    );
  }, [data, searchText]);

  async function fetchDataPDF(record) {
    const appId = record?.application_id;
    const msmeId = record?.msme_identifier;

    if (!appId || !msmeId) return;

    setPdfLoadingKey(appId);
    setError("");

    try {
      const response = await fetchJson(
        `/actions/onePagerData?id=${encodeURIComponent(msmeId)}&appId=${encodeURIComponent(appId)}`,
      );
      setPdfData((previous) => ({
        ...previous,
        [appId]: response,
      }));
    } catch (loadError) {
      setError(loadError?.message || "Unable to generate one pager PDF data");
    } finally {
      setPdfLoadingKey("");
    }
  }

  const columns = [
    {
      title: "Application ID",
      width: 140,
      dataIndex: "application_id",
      key: "application_id",
      fixed: "left",
    },
    {
      title: "Full Name",
      width: 160,
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Udyam No",
      width: 150,
      dataIndex: "udhyam_no",
      key: "udhyam_no",
    },
    {
      title: "Mobile Number",
      width: 140,
      dataIndex: "mobile_no",
      key: "mobile_no",
    },
    {
      title: "Business Name",
      width: 170,
      dataIndex: "udyam_name",
      key: "udyam_name",
    },
    {
      title: "PAN Number",
      width: 140,
      dataIndex: "pan_no",
      key: "pan_no",
    },
    {
      title: "Download PDF",
      fixed: "right",
      width: 180,
      render: (_, record) => {
        const pdfEntry = pdfData[record?.application_id];

        if (pdfEntry) {
          return (
            <PDFDownloadLink
              document={
                <OnePagerPDF
                  data={pdfEntry.data}
                  msmedata={pdfEntry.msmedata}
                  bredata={pdfEntry.bredata}
                  google={pdfEntry.google}
                />
              }
              fileName={`${record?.full_name || record?.application_id || "one-pager"}.pdf`}
              className="inline-flex rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              {({ loading: pdfRendering }) =>
                pdfRendering ? "Loading document..." : "Download PDF"
              }
            </PDFDownloadLink>
          );
        }

        return (
          <Button
            onClick={() => fetchDataPDF(record)}
            loading={pdfLoadingKey === record?.application_id}
          >
            Generate PDF
          </Button>
        );
      },
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold uppercase text-orange-500">One Pager Data</h1>
        <Input.Search
          className="max-w-sm"
          allowClear
          placeholder="Search records"
          onSearch={setSearchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>

      {error && (
        <Alert
          className="mb-4"
          type="error"
          title="One pager error"
          description={error}
          showIcon
        />
      )}

      <Spin spinning={false}>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey={(row) => row.msme_identifier || row.application_id}
          bordered
          size="small"
          pagination={{ pageSize: 20 }}
          scroll={{ x: "max-content" }}
        />
      </Spin>
    </div>
  );
}
