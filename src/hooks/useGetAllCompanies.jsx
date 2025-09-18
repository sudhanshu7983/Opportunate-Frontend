import { setCompanies} from '@/redux/companySlice'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    useEffect(()=>{
        const fetchCompanies = async () => {
            if (!user) return; // Don't fetch if not logged in
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                // Handle error silently or log differently if needed
            }
        }
        fetchCompanies();
    },[user])
}

export default useGetAllCompanies