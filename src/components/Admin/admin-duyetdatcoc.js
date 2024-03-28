import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate từ react-router-dom
import CallApi from '../CallApi';
import Adminmenu from "./admin-menu";
import UserAdmin from '../../list/userIAdmin';

export default function AdminDuyetdatcoc() {
    const userLoginBasicInformationDto = JSON.parse(localStorage.getItem('userLoginBasicInformationDto'));
    const [realEstatesWithPerimeter, setRealEstatesWithPerimeter] = useState([]);
    const [realEstates, setRealEstates] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const navigate = useNavigate(); // Sử dụng hook useNavigate

    useEffect(() => {
        const fetchRealEstate = async () => {
            try {
                const allRealEstateResponse = await CallApi.getAllRealEstate();
                const realEstatesWithPerimeter = allRealEstateResponse.filter(re => re.perimeter && (re.status === 3 || re.status === 5));
                setRealEstatesWithPerimeter(realEstatesWithPerimeter);
                
                const callDataRealEstateData = await CallApi.getAllRealEstate();
                setRealEstates(callDataRealEstateData);
                const callDataAllAccount = await CallApi.getAllAccount();
                setAccounts(callDataAllAccount);
            } catch (error) {
                console.error('Error fetching real estate data:', error);
            }
        };

        fetchRealEstate();
    }, []);
    const getRealEstateNameById = (realEstateId) => {
        const realEstate = realEstates.find(item => item.id === realEstateId);
        return realEstate ? realEstate.realestateName : 'Dữ liệu đang tải';
    };

    const getUsernameByCustomerId = (customerId) => {
        const account = accounts.find(item => item.id === customerId);
        return account ? account.username : 'Dữ liệu đang tải';
    };
    // Hàm xử lý chuyển hướng khi nhấp vào tên real estate
    const handleRealEstateClick = (realEstateId) => {
        navigate(`/real-estate/${realEstateId}`);
    };

    return (
        <div className="admin-all-account">
            <div>
            <Adminmenu
                userLoginBasicInformationDto={userLoginBasicInformationDto}
                UserMenu={UserAdmin}
            />
            </div>
            <div className='box-allaccount'>
                {/* <h2>Admin duyệt đặt cọc (hoặc bán)</h2> */}
                <h2 style={{textAlign:'center'}}> Admin duyệt đặt cọc (hoặc bán)</h2>
                {/* <hr style={{margin:'50px'}}></hr> */}
                
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>ID</th>
                            <th>Tên khách hàng</th>
                            <th>Agency</th>
                            <th>Ngày cọc</th>
                        </tr>
                    </thead>
                    <tbody>
                        {realEstatesWithPerimeter.map((realEstate,index) => (
                            <tr key={realEstate.id}>
                                <td>{index+1}</td>
                                <td>{getRealEstateNameById(realEstate.id)}</td>
                                <td onClick={() => handleRealEstateClick(realEstate.id)} style={{ cursor: 'pointer' }}>{getUsernameByCustomerId(parseInt(realEstate.perimeter))}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
