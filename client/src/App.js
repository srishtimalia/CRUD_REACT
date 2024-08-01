import React,{ useEffect, useState } from "react";
import "./App.css";
import { MdClose } from "react-icons/md";
import axios from "axios";
import Form from "./component/Form";

axios.defaults.baseURL = "http://localhost:8080/";
const App = () => {

  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: ""
});
const [formDataEdit, setFormDataEdit] = useState({
  name: "",
  email: "",
  mobile: "",
  _id: "",
});

const handleOnChange = (e) => {
  const{value, name} = e.target
  setFormData((preve) => {
    return {
      ...preve,
      [name] : value
    }
  })
}


  const handleSubmit = async(e) => {
    e.preventDefault()
    const data = await axios.post("/create", formData)
    console.log(formData);
    if(data.data.success){
      setAddSection(false)
      alert(data.data.message)
      setFormData({name:"", email:"", mobile:""});
      getData();
    }
  }

  // Fetch Data From Server

  const getData = async () =>{
    const data = await axios.get("/");
    console.log(data);
    if (data.data.success){
      setDataList(data.data.data);
    }
  };

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);

    if (data.data.success) {
      getData();
      alert(data.data.message);
    }
  };

  useEffect(() => {
    getData();
  },[]);
  console.log(dataList);


  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update/", formDataEdit);
    if (data.data.success) {
      getData();
      alert(data.data.message);
      setEditSection(false);
    }
  };


  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };
 
 


  return (
    <div className='App-container'>
      <button className='btn btn-add' onClick={()  => setAddSection(true)}>
        Add Record
      </button>
    {
      addSection &&( 

        <Form
        handleSubmit={handleSubmit}
        handleOnChange={handleOnChange}
        handleClose={() => setAddSection(false)}
        rest={formData}
      />
    )}
    {editSection && (
      <Form
        handleSubmit={handleUpdate}
        handleOnChange={handleEditOnChange}
        handleClose={() => setEditSection(false)}
        rest={formDataEdit}
      />
    )}
      {/* //   <div className='addContainer'>
      
      //   <form action="" onSubmit={handleSubmit}>
      //   <div className='close-btn' onClick={()  => setAddSection(false)}><MdClose />
      //   </div>
      //     <label htmlFor="">Name</label>
      //     <input type="text" name="name" id="name" onChange={handleOnChange} value={formData.name}/> 
      //     <label htmlFor="">E-mail</label>
      //     <input type="email" name="email" id="email" onChange={handleOnChange} value={formData.email}/>
      //     <label htmlFor="">Phone No.</label>
      //     <input type="number" name="mobile" id="mobile" onChange={handleOnChange} value={formData.mobile}/>
      //     <button className='btn'>Submit</button>
      //     </form> 

      // </div> */}
      

    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dataList[0] ? (
            dataList.map((el) => {
              return(
                <tr>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.mobile}</td>
                  <td><button className="btn btn-edit"
                  onClick={() => handleEdit(el)}>Edit</button></td>
                  <td><button className="btn btn-delete"
                  onClick={() => handleDelete(el._id)}>Delete</button></td>
                </tr>
              )
            })
          ):(
            <p style={{textAlign: "center"}}>No Data Available</p>
          )}
        </tbody>
      </table>
    </div>
    
    </div>
  )
}

export default App