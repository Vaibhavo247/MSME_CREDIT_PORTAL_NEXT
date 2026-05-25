"use client";
import React, { useState } from "react";
import { Button, Table, Modal } from "antd";
import { ViewPersonModal } from "@/components/view/viewmodalperson";
// import SearchBar from "./searchBar"; // optional local SearchBar

export default function PedingTableClient({ initialData }) {
  const [data] = useState(initialData || []);
  const [filteredData, setFilteredData] = useState(initialData || []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  const showModal = (record) => {
    setSelectedRecordId(record.msme_identifier);
    setIsModalVisible(true);
  };

  const handleAccess = async (record) => {
    try {
      // Call the internal action routes we added
      const resp = await fetch(`/actions/getActiveAgent?id=${record?.msme_identifier}`);
      const json = await resp.json();
      const d = json?.data || json;

      if (d?.isSameUser) {
        // open view modal or navigate — mirror Approved: open modal
        showModal(record);
        return;
      }

      if (d?.noActiveUser) {
        await fetch(`/actions/getAgentAction?id=${record?.msme_identifier}`);
        showModal(record);
        return;
      }

      Modal.confirm({
        title: "Access Warning",
        content: `This case is already accessed by ${d?.activeUser}. Do you want to continue?`,
        okText: "Yes",
        cancelText: "No",
        onOk: async () => {
          await fetch(`/actions/getAgentAction?id=${record?.msme_identifier}`);
          showModal(record);
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (searchText) => {
    if (!searchText) return setFilteredData(data);
    const filtered = data.filter((item) => {
      const appId = (item.application_id || "").toLowerCase();
      const name = (item.full_name || "").toLowerCase();
      return appId.includes(searchText.toLowerCase()) || name.includes(searchText.toLowerCase());
    });
    setFilteredData(filtered);
  };

  const columns = [
    { title: "Vertical", dataIndex: "BusinessVertical", key: "vertical", width: 100 },
    {title:"CaseType",dataIndex:"case_type",key:"casetype",width:130},
    { title: "Application ID", dataIndex: "application_id", key: "application_id", fixed: "left", width: 130 },
    { title: "Full Name", dataIndex: "full_name", key: "name", width: 150 },
    {title:"MobileNo",dataIndex:"mobile_no",key:"mobile_no",width:150},
    {title:"PanNo",dataIndex:"pan_no",key:"pan_no",width:140},
    {title:"BusinessName",dataIndex:"udyam_name",key:"udhyam_name",width:140},
    { title: "Date", dataIndex: "created_on", key: "date", width: 120 },
    { title: "Loan Amount", dataIndex: "approved_loan_amount", key: "loan", width: 120 },
    {
      title: "VIEW",
      key: "operation",
      fixed: "right",
      width: 120,
      render: (_, record) => (
        <Button type="primary" onClick={() => handleAccess(record)}>
          {record?.credit_status || "VIEW"}
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-bold text-orange-500 uppercase">Pending Applications</h4>
        <div className="w-64">
          {/* <SearchBar onSearch={handleSearch} /> */}
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey={(row) => row.msme_identifier}
        bordered
        size="small"
        scroll={{ x: "max-content" }}
      />

      <ViewPersonModal
        id={selectedRecordId}
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </div>
  );
}
