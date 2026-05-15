'use client';
import React, { useState } from "react";
import { Button, Table, Modal } from "antd";
import Link from "next/link";
// import SearchBar from "./searchBar"; // Ensure path is correct
// import ViewModalPerson from "../viewperson/indexmodal"; // Ensure path is correct

export default function ApprovedClientPage({ initialData }) {
  const [data] = useState(initialData);
  console.log("=============credit",initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  const handleSearch = (searchText) => {
    const filtered = data.filter((item) => {
      const appId = item.application_id?.toLowerCase() || "";
      const name = item.full_name?.toLowerCase() || "";
      return appId.includes(searchText.toLowerCase()) || name.includes(searchText.toLowerCase());
    });
    setFilteredData(filtered);
  };

  const showModal = (record) => {
    setSelectedRecordId(record.msme_identifier);
    setIsModalVisible(true);
  };

  const columns = [
    { title: "Application ID", dataIndex: "application_id", key: "app_id", fixed: "left", width: 130 },
    { title: "Case Type", dataIndex: "case_type", key: "case_type", width: 100 },
    { title: "Vertical", dataIndex: "onbording_channel_id", key: "vertical", width: 120 },
    { title: "Full Name", dataIndex: "full_name", key: "name", width: 150 },
    { title: "Date", dataIndex: "created_on", key: "date", width: 120 },
    { title: "Status", dataIndex: "loan_status", key: "status", width: 120 },
    {
      title: "VIEW",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Link href={`/view/${record.id}`}    className="bg-green-600 border-none" >
          view
        </Link>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-bold text-orange-500 uppercase">Approved Applications</h4>
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
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
          placement: ["bottomRight"]
        }}
      />

      <Modal
        title="Application Details"
        open={isModalVisible} // AntD 5.x uses 'open' instead of 'visible'
        onCancel={() => setIsModalVisible(false)}
        width="90%"
        footer={null}
        destroyOnHidden
      >
        {/* {selectedRecordId && <ViewModalPerson id={selectedRecordId} />} */}
      </Modal>
    </div>
  );
}
