"use client";

import { useState } from "react";
import { Button, Table } from "antd";
import { ViewPersonModal } from "@/components/view/viewmodalperson";

export default function DisbursedClientPage({initialData}){
    const [data] = useState(initialData || []);
    const [filteredData] = useState(initialData || []);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRecordId, setSelectedRecordId] = useState(null);

    const showModal = (record) => {
      setSelectedRecordId(record.msme_identifier || record.id);
      setIsModalVisible(true);
    };

    const columns = [
    { title: "Application ID", dataIndex: "application_id",key: "app_id", fixed:"left",width:130},
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
        <Button type="primary" onClick={() => showModal(record)}>
          View
        </Button>
      ),
    },

    ]
    

return(
  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow-md">
    <div className="flex justify-between items-center mb-6">
      <h4 className="text-xl font-bold text-orange-500 uppercase">Disbursed Applications</h4>
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
              position: ["bottomRight"]
            }}
          />

      <ViewPersonModal
        id={selectedRecordId}
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
  </div>
)
}
 
