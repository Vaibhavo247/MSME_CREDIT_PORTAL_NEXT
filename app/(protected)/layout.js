import { UserProvider } from '../../components/UserContext';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { getEmployeeRole } from '@/lib/api';
import { extractDataFromResponse } from '@/lib/crypto';
import { getAgentToken } from '@/lib/getAuthToken';
import { redirect } from 'next/navigation'; 

function decodeJwtPayload(token) {
  if (!token?.includes(".")) return null;

  try {
    const payload = token.split(".")[1];
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
    return JSON.parse(Buffer.from(padded, "base64").toString("utf8"));
  } catch (error) {
    console.error("Failed to decode agent token payload:", error?.message);
    return null;
  }
}

async function getEmployeeDataFromToken() {
  const token = await getAgentToken();
  const payload = decodeJwtPayload(token);

  if (!payload?.userId && !payload?.Role) return null;

  return {
    employeeId: payload.userId || "Unknown",
    role: payload.Role || payload.role || "EMPLOYEE",
  };
}

export default async function ProtectedLayout({ children }) {
  let employeeData = { role: 'EMPLOYEE', employeeId: 'TEMP' };

  const tokenEmployeeData = await getEmployeeDataFromToken();

  if (tokenEmployeeData) {
    employeeData = tokenEmployeeData;
  } else {
    try {
      const response = await getEmployeeRole();
      const data = extractDataFromResponse(response);
      const employee = data?.[0];

      if (!employee?.EmployeeId) {
        redirect('http://localhost:3001/')
      }

      employeeData = {
        employeeId: employee.EmployeeId ?? employee.employeeId ?? 'Unknown',
        role: employee.Role ?? employee.role ?? 'EMPLOYEE',
      };
    } catch {
      redirect('http://localhost:3001/')
    }
  }

  return (
    <UserProvider employeeData={employeeData}>
      <Sidebar role={employeeData.role} />
      <Navbar employeeId={employeeData.employeeId} role={employeeData.role} />
      <div className="pt-16 ml-56">{children}</div>
    </UserProvider>
  );
}
