"use client";

import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    backgroundColor: "#f8f9fa",
    fontFamily: "Helvetica",
  },
  heading: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 10,
    textAlign: "center",
    textTransform: "uppercase",
  },
  section: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#d9dee7",
    borderRadius: 4,
    backgroundColor: "#ffffff",
  },
  subheading: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#334155",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#d9dee7",
    padding: 5,
  },
  labelValueRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#edf0f4",
  },
  label: {
    fontSize: 9,
    color: "#334155",
    width: "34%",
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#edf0f4",
    fontWeight: "bold",
  },
  value: {
    fontSize: 9,
    color: "#334155",
    width: "66%",
    padding: 5,
  },
  table: {
    borderWidth: 1,
    borderColor: "#d9dee7",
    margin: 6,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "16.66%",
    borderWidth: 1,
    borderColor: "#edf0f4",
  },
  tableCell: {
    padding: 4,
    fontSize: 7,
    color: "#334155",
  },
  image: {
    width: 150,
    height: 150,
    objectFit: "contain",
    marginVertical: 8,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#d9dee7",
  },
  coordinates: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
  coordinateText: {
    fontSize: 8,
    color: "#334155",
    marginHorizontal: 5,
  },
  footer: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 9,
    color: "#64748b",
  },
});

function valueOrNA(value) {
  return value === null || value === undefined || value === "" ? "N/A" : String(value);
}

function Row({ label, value }) {
  return (
    <View style={styles.labelValueRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{valueOrNA(value)}</Text>
    </View>
  );
}

function address(parts) {
  return parts.filter(Boolean).join(", ") || "N/A";
}

function formatNestedObject(obj) {
  if (!obj || typeof obj !== "object") return "N/A";
  const inner = Object.values(obj)[0];
  if (!inner || typeof inner !== "object") return String(inner || "N/A");

  return Object.entries(inner)
    .map(([month, info]) => {
      if (info && typeof info === "object") {
        return `${month}: Credit=${info.NumCreditTrx || 0}, Debit=${info.NumDebitTrx || 0}`;
      }
      return `${month}: ${info}`;
    })
    .join(" | ");
}

function normalizeImage(base64) {
  if (!base64) return "";
  return base64.startsWith("data:") ? base64 : `data:image/jpeg;base64,${base64}`;
}

function BreTable({ msmedata }) {
  const cols = msmedata?.MULTI_COLUMN_FETCH;

  if (!cols || Object.keys(cols).length === 0) {
    return (
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>No BRE data available</Text>
          </View>
        </View>
      </View>
    );
  }

  const colNames = Object.keys(cols);
  const firstCol = cols[colNames[0]];
  const rowCount = Array.isArray(firstCol) ? firstCol.length : 0;
  const rows = [];

  for (let i = 0; i < rowCount; i += 1) {
    const row = {};
    colNames.forEach((col) => {
      row[col] = cols[col]?.[i];
    });
    rows.push(row);
  }

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        {["Type of loan", "Loan Date", "Loan Amount", "POS", "Account Status", "Loan Vintage"].map((head) => (
          <View style={styles.tableCol} key={head}>
            <Text style={styles.tableCell}>{head}</Text>
          </View>
        ))}
      </View>
      {rows.map((item, index) => (
        <View style={styles.tableRow} key={`${item.ACCOUNT_OPENED_DATE || "row"}-${index}`}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{valueOrNA(item.ACCOUNT_TYPE_AGG)}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{valueOrNA(item.ACCOUNT_OPENED_DATE)}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{valueOrNA(item.CREDIT_MIX)}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{valueOrNA(item.CURRENT_OUTSTANDING)}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{valueOrNA(item.ACCOUNT_STATUS)}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{valueOrNA(item.ACCOUNT_AGE || item.TENURE)}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export default function OnePagerPDF({ data = {}, msmedata = {}, google = {} }) {
  const customerImage = normalizeImage(data?.customer_image);
  const businessImage = normalizeImage(data?.business_image);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.heading}>
          MSME Loan Application - {data?.application_id || "N/A"}
        </Text>

        <View style={styles.section}>
          <Text style={styles.subheading}>Customer Information</Text>
          <Row label="Customer Name" value={data?.full_name} />
          <Row label="Aadhaar Name" value={data?.full_name} />
          <Row label="UDYAM Name" value={data?.udyam_name} />
          <Row label="Mobile Number" value={data?.mobile_no} />
          <Row label="Own Property" value="NO" />
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>Addresses</Text>
          <Row
            label="Permanent Address"
            value={address([
              data?.a_address_line1,
              data?.a_address_line2,
              data?.a_address_line3,
              data?.a_address_city,
              data?.a_address_state,
              data?.a_address_pincode && `PIN Code - ${data.a_address_pincode}`,
            ])}
          />
          <Row
            label="Current Address"
            value={address([
              data?.c_address_line1,
              data?.c_address_line2,
              data?.c_address_line3,
              data?.c_address_city,
              data?.c_address_state,
              data?.c_address_pincode && `PIN Code - ${data.c_address_pincode}`,
            ])}
          />
          <Row
            label="Business Address"
            value={address([
              data?.business_address,
              data?.business_city,
              data?.business_state,
              data?.business_pincode && `PIN Code - ${data.business_pincode}`,
            ])}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>Business Information</Text>
          <Row label="UDYAM Number" value={data?.udhyam_no || data?.udyam_no} />
          <Row label="Entity Type" value={data?.udyam_entity_type} />
          <Row label="Incorporation Date" value={data?.udyam_incorp_date} />
          <Row label="Date Created" value={data?.created_on} />
          <Row label="Business Name User" value={data?.udyam_name} />
          <Row label="Final Loan Amount (Rs)" value={data?.final_loan_amount} />
          <Row label="Loan Duration (months)" value={data?.loan_total_duration_in_months} />
          <Row label="Interest Rate (%)" value={data?.loan_interest_rate} />
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>BRE Information</Text>
          <Row label="Eligibility Criteria" value={msmedata?.ELIGIBILITY_CRITERIA} />
          <Row label="CRIF Score" value={msmedata?.SCORE_VALUE} />
          <Row label="Bureau Vintage" value={msmedata?.BUREAU_VINTAGE} />
          <Row label="Total Loans Taken" value={msmedata?.TOTAL_LOANS_TAKEN} />
          <Row label="Total Active Loans" value={msmedata?.TOTAL_ACTIVE_LOAN} />
          <Row label="Total Loan Amount (Rs)" value={msmedata?.TOTAL_LOAN_AMOUNT_RS} />
          <Row label="Current Outstanding Amount (Rs)" value={msmedata?.CURRENT_OUTSTANDING_RS} />
          <Row
            label="Highest Loan / Disbursed Date / POS"
            value={`${valueOrNA(msmedata?.HIGHEST_LOAN)} / ${valueOrNA(msmedata?.DISBURSED_DATE_OF_HIGHEST_LOAN)} / ${valueOrNA(msmedata?.CURRENT_BALANCE_OF_HIGHEST_LOAN)}`}
          />
          <Row label="Account Type of Highest Loan" value={msmedata?.ACCOUNT_TYPE_OF_HIGHEST_LOAN} />
          <Row label="Status of Highest Loan" value={msmedata?.ACCOUNT_STATUS_OF_HIGHEST_LOAN} />
          <Row label="Distance to nearest branch (KM)" value={data?.DISTANCE_TO_NEAREST_BRANCH_KM} />
          <Row label="Nearest Branch Name" value={data?.NEAREST_BRANCH_NAME} />
          <Row label="Number Of Application In 100 M LAT Long" value={data?.NEARBY_APP_COUNT} />
          <Row label="Credit Comment" value={data?.credit_comment} />
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>Google Review Section</Text>
          <Row label="Google Business Name" value={google?.GOOGLE_BUSINESS_NAME} />
          <Row label="Google Business Address" value={google?.GOOGLE_BUSINESS_ADDRESS} />
          <Row label="Google Phone Number" value={google?.GOOGLE_PHONE_NUMBER} />
          <Row label="Google Business Status" value={google?.BUSINESS_STATUS} />
          <Row label="Google Rating" value={google?.GOOGLE_OVERALL_REVIEW_RATING} />
          <Row label="Google Review Count" value={google?.USER_RATING_TOTAL} />
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>Account Aggregator Info Section</Text>
          <Row label="AA Eligible Amount" value={data?.AA_ELIGIBLE_AMOUNT} />
          <Row label="EMI bounces in last 6 months" value={data?.NUMBER_OF_EMI_BOUNCES} />
          <Row label="Turnover to UBL POS" value={data?.TURNOVER_RATIO_PERCENT} />
          <Row label="Inward cheque returns" value={data?.["INWARD_CHEQUE_RETURN_LESSTHAN_3%"]} />
          <Row label="Credit / Debit Transactions" value={formatNestedObject(data?.["2_DEBIT_AND_2_CREDIT_IN_6MONTH"])} />
          <Row label="Average Bank Balance" value={formatNestedObject(data?.ACCT_WISE_MONTHLY_BALANCE_DATA)} />
          <Row label="6 Months Bank Statement Available" value={data?.MINIMUM_TRX_HISTORY_6MONTH_TAG} />
          <Row label="Monthly Average Credit of Last Six Months" value={formatNestedObject(data?.MINIMUM_AVERAGE_CREDIT_TRX_VALUE)} />
          <Row label="Annual Turnover to Loan Amount" value={data?.ANNUAL_TURNOVER_AMT} />
          <Row label="Loan RTR" value={data?.CLEAN_TARGAET_LOAN} />
          <Row label="Bureau Obligation" value={data?.SUM_ACTIVE_OBLIGATIONS_BUREAU} />
          <Row label="Obligation Paid from ABB" value={data?.SUM_ACTIVE_OBLIGATIONS_BUREAU} />
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>BRE DATA</Text>
          <BreTable msmedata={msmedata} />
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>Images</Text>
          <View style={styles.labelValueRow}>
            <Text style={styles.label}>Customer Image</Text>
            <View style={styles.value}>
              {customerImage ? <Image style={styles.image} src={customerImage} alt="Customer" /> : <Text>No Customer Image</Text>}
              <View style={styles.coordinates}>
                <Text style={styles.coordinateText}>Lat: {data?.latitude || "N/A"}</Text>
                <Text style={styles.coordinateText}>Long: {data?.longitude || "N/A"}</Text>
              </View>
            </View>
          </View>
          <View style={styles.labelValueRow}>
            <Text style={styles.label}>Business Image</Text>
            <View style={styles.value}>
              {businessImage ? <Image style={styles.image} src={businessImage} alt="Business" /> : <Text>No Business Image</Text>}
              <View style={styles.coordinates}>
                <Text style={styles.coordinateText}>Lat: {data?.business_lat || "N/A"}</Text>
                <Text style={styles.coordinateText}>Long: {data?.business_long || "N/A"}</Text>
              </View>
            </View>
          </View>
          {[1, 2, 3, 4].map((index) => {
            const image = normalizeImage(data?.[`business_image_${index}`]);
            if (!image) return null;
            return (
              <View style={styles.labelValueRow} key={index}>
                <Text style={styles.label}>Business Image {index}</Text>
                <View style={styles.value}>
                  <Image style={styles.image} src={image} alt={`Business ${index}`} />
                </View>
              </View>
            );
          })}
        </View>

        <Text style={styles.footer}>Suryoday Small Finance Bank Ltd</Text>
        <Text style={styles.footer}>A Bank of Smiles</Text>
      </Page>
    </Document>
  );
}
