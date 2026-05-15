import { UserProvider } from '../../components/UserContext';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { getEmployeeRole } from '@/lib/api';
import { extractDataFromResponse } from '@/lib/crypto';
import { redirect } from 'next/navigation'; 
// import { getAgentToken } from '@/lib/getAuthToken';

export default async function ProtectedLayout({ children }) {
  let employeeData = { role: 'EMPLOYEE', employeeId: 'TEMP' };
   

  // try {
    const response = await getEmployeeRole();
    const data = extractDataFromResponse(response)
    const employee = data?.[0];

    console.log('employee.EmployeeId',employee?.EmployeeId)
    if (employee?.EmployeeId ) {
      employeeData = {
        employeeId: employee.EmployeeId ?? employee.employeeId ?? 'Unknown',
        role: employee.Role ?? employee.role ?? 'EMPLOYEE',
      };
    }else{
      redirect('http://localhost:3001/')
    }
  // } catch (error) {
  //   console.error('Failed to fetch employee data:', error);
  // }

  return (
    <UserProvider employeeData={employeeData}>
      <Sidebar role={employeeData.role} />
      <Navbar employeeId={employeeData.employeeId} role={employeeData.role} />
      <div className="pt-16 ml-56">{children}</div>
    </UserProvider>
  );
}
