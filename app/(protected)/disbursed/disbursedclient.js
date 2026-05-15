import { Button, Table, Modal } from "antd";

export default function DisbursedClientPage({initialData}){
    const [data] = useState(initialData);
    const columns = [
    { title: "Application ID", dataIndex: "application_id",key: "app_id", fixed:"left",width:130},
    { title: "Case Type", dataIndex: "case_type", key: "case_type", width: 100 },
    { title: "Vertical", dataIndex: "onbording_channel_id", key: "vertical", width: 120 },
    { title: "Full Name", dataIndex: "full_name", key: "name", width: 150 },
    { title: "Date", dataIndex: "created_on", key: "date", width: 120 },
    { title: "Status", dataIndex: "loan_status", key: "status", width: 120 },

    ]
    

return(
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
)
}
 