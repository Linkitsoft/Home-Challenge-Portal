import React, {useState} from 'react'
import Sidebar from '../../components/Sidebar'
import { RoleData } from '../../utils/RoleData'
import { setRole } from '../../redux/reducers/role'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Roles = ({index}) =>
{
    const [roleName, setRoleName] = useState('')

    const dispatch = useDispatch()
    const { role } = useSelector((data) => data.roles)


    const handleUpdate = () => {
        dispatch(setRole(roleName))
        window.localStorage.setItem("roleId", roleName);
        toast.success("Role updated successfully")
    }
    return (
        <div>
            <div className="mainLayout">
                <Sidebar index={2}/>
                <div className="roles">
                    <label className='roles_title'>Role</label>
                    <div>Your current role is {role}</div>
                    <div className="roles_input">
                        <select name='role' onChange={(e) => setRoleName(e.target.value)}>
                            <option value="" disabled selected>Update role</option>
                            {RoleData.map((role) => (
                                <option key={role.roleId} value={role.name}>{role.name}</option>
                            ))}
                        </select>
                        <div>
                           {roleName && <button className="roles_btn" onClick={handleUpdate}>Update</button>}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Roles