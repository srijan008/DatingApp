import Sidebar from "../../components/Sidebar"
import UsersPanel from "./Userspanel"

const AdminPage = ()=>{
    return(
        <div>
            <Sidebar Children={UsersPanel}/>
        </div>
    )
}

export default AdminPage