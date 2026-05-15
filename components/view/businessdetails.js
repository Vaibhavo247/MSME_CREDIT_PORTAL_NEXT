'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Select, Button, Input, Modal, Image, Carousel } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
// import Cusdetail from "../component/headingPara"; // Adjusted path to align from /components
// import CPVDetails from "./cpvDetails";

// Import custom Next.js server network boundary endpoints using root app structure alias
// import { updateBusinessDetails, fetchExcelBinary } from "@/app/actions/business";
// import { fetchData, getApiHeaderKey } from "../services/request";

// const { Option } = Select;

export default function BusinessDetails({
  person,
  id,
  isBusinessDetailsChecked,
  setIsBusinessDetailsChecked,
}) {
  const router = useRouter();
  
  if (person?.case_type === "NTBVL") {
    return null;
  }

  const [data, setData] = useState([]);
  const [breData, setBreData] = useState([]);
  const [dist, setDist] = useState([]);
  const [dist1, setDist1] = useState([]);
  const [sector, setSector] = useState(person?.sector);
  const [subsector, setSubsector] = useState(person?.subsector);
  const [udyamEntityType, setUdyamEntityType] = useState(person?.udyam_entity_type);
  const [isBusinessModalVisible, setIsBusinessModalVisible] = useState(false);
  const [businessName, setBusinessName] = useState(person?.business_name_byuser);
  const [loading, setLoading] = useState(false);
  const [customerPhoto, setCustomerPhoto] = useState(null);

  const checkboxRef = useRef(null);

//   useEffect(() => {
//     if (checkboxRef.current) {
//       checkboxRef.current.focus();
//     }
//   }, []);

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const [dd, mm, yyyy] = dateString.split("-");
//     return `${yyyy}-${mm}-${dd}`;
//   };

//   const [businessIncorp, setBusinessIncorp] = useState(formatDate(person?.business_incorp_date));
//   const [udyamIncorp, setUdyamIncorp] = useState(formatDate(person?.udyam_incorp_date));

//   const downloadImage = (imageData, index) => {
//     if (!imageData) return;
//     const link = document.createElement("a");
//     link.href = `data:image/jpeg;base64,${imageData}`;
//     link.download = `${person?.first_name || 'customer'}_business_${index}.jpg`;
//     link.click();
//   };

//   const businessImages = [
//     { src: customerPhoto, index: 1 },
//     { src: person?.business_image_1, index: 2 },
//     { src: person?.business_image_2, index: 3 },
//     { src: person?.business_image_3, index: 4 },
//     { src: person?.business_image_4, index: 5 },
//   ].filter((img) => img.src);

//  const breFetch = async () => {
//     try {
//       const resp2 = await fetchData(`get-msme-static-details/${person?.msmeIdentifier}`);
//       if (resp2?.data?.[1]?.[0]) setBreData(resp2.data[1][0]);
//       if (resp2?.data?.[2]?.[0]) setDist(resp2.data[2][0]);
//       if (resp2?.data?.[3]?.[0]) setDist1(resp2.data[3][0]);
//     } catch (error) {
//       console.error("Failed to fetch BRE data:", error);
//     }
//   };

//   const fetchMetaData = async () => {
//     try {
//       const resp = await fetchData("get-sector-subsector");
//       if (Array.isArray(resp?.data)) setData(resp.data);
//     } catch (error) {
//       console.error("Failed to fetch meta data:", error);
//     }
//   };

//   const fetchBusinessPhoto = async () => {
//     try {
//       setLoading(true);
//       const resp = await fetchData(`/webGetBusinessImage/${id}`);
//       setCustomerPhoto(resp?.data?.[0]?.business_image);
//     } catch (err) {
//       console.error("Failed to fetch customer photo:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMetaData();
//     fetchBusinessPhoto();
//     breFetch();
//   }, [id, person?.msmeIdentifier]);

//   const formatDateForSubmit = (dateString) => {
//     if (!dateString) return "";
//     const [yyyy, mm, dd] = dateString.split("-");
//     return `${yyyy}-${mm}-${dd}`;
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     const payload = {
//       id,
//       sector,
//       subsector,
//       udyamEntityType,
//       businessName,
//       business_incorp_date: formatDateForSubmit(businessIncorp),
//       udyam_incorp_date: formatDateForSubmit(udyamIncorp),
//     };

//     const result = await updateBusinessDetails(payload);
//     setLoading(false);
    
//     if (result.success) {
//       setIsBusinessModalVisible(false);
//       router.refresh(); // Tells Next.js to cleanly re-fetch server layout data streams smoothly
//     } else {
//       console.error("Submission failed:", result.error);
//     }
//   };

//   const handleBusinessNameChange = (e) => {
//     const value = e.target.value;
//     if (/^[a-zA-Z0-9\s,_-]*$/.test(value)) {
//       setBusinessName(value);
//     }
//   };

//   const handlePdfDownload = async () => {
//     setLoading(true);
//     const token = localStorage.getItem("authToken");
//     const apiKey = getApiHeaderKey();

//     // const response = await fetchExcelBinary(person?.msme_identifier, token, apiKey);
//     // setLoading(false);

//     if (response.success && response.base64) {
//       const link = document.createElement("a");
//       link.href = `data:application/pdf;base64,${response.base64}`;
//       link.download = `Statement_Report_${person?.msme_identifier}.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } else {
//       console.error("PDF Download process failed:", response.error);
//     }
//   };

//   const filteredSubsectors = data.filter((item) => item.SET === "SUBSECTOR");
//   const sectors = data.filter((item) => item.SET === "SECTOR");

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">

        <h1> view page</h1>
      {/* <Cusdetail heading="Business Profile Information" para="Verify and alter organizational parameters" /> */}
      
      {/* <div className="my-4">
        <Button type="primary" icon={<DownloadOutlined />} loading={loading} onClick={handlePdfDownload}>
          Download Statement PDF
        </Button>
        <Button className="ml-2" onClick={() => setIsBusinessModalVisible(true)}>
          Edit Parameters
        </Button>
      </div> */}

      {/* {businessImages.length > 0 && (
        <div className="w-64 my-4">
          <Carousel autoplay>
            {businessImages.map((img) => (
              <div key={img.index} className="relative group">
                <Image src={`data:image/jpeg;base64,${img.src}`} alt="Business Location Data" fallback="/fallback.png" />
                <Button 
                  size="small" 
                  className="absolute bottom-2 right-2 hidden group-hover:block"
                  onClick={() => downloadImage(img.src, img.index)}
                >
                  Download
                </Button>
              </div>
            ))}
          </Carousel>
        </div>
      )} */}

      {/* <Modal
        title="Edit Business Properties Mapping"
        open={isBusinessModalVisible}
        onOk={handleSubmit}
        confirmLoading={loading}
        onCancel={() => setIsBusinessModalVisible(false)}
      >
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold mb-1">Business Name</label>
            <Input value={businessName} onChange={handleBusinessNameChange} />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Sector Class Alignment</label>
            <Select className="w-full" value={sector} onChange={(val) => setSector(val)}>
              {sectors.map((s) => <Option key={s.VALUE} value={s.VALUE}>{s.LABEL || s.VALUE}</Option>)}
            </Select>
          </div>
        </div>
      </Modal> */}

      {/* <CPVDetails id={id} breData={breData} dist={dist} dist1={dist1} /> */}
    </div>
  );
}
