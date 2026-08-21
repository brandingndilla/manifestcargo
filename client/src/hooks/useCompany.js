import { useAuth } from '../context/AuthContext';

export function useCompany() {
  const { companyName } = useAuth();
  const storedCompany = localStorage.getItem('companyName');
  return companyName || storedCompany || '';
}

export function useCompanyPhone() {
  const { companyPhone } = useAuth();
  const storedPhone = localStorage.getItem('companyPhone');
  return companyPhone || storedPhone || '';
}