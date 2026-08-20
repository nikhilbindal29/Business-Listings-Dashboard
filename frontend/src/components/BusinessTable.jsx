import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./BusinessTable.css";


const API = "http://127.0.0.1:8000";


const emptyBusiness = {
  id:"",
  business_name:"",
  category:"",
  city:"",
  address:"",
  phone:"",
  source:""
};



function BusinessTable(){


const [businesses,setBusinesses] = useState([]);

const [loading,setLoading] = useState(false);

const [search,setSearch] = useState("");

const [city,setCity] = useState("");

const [category,setCategory] = useState("");

const [source,setSource] = useState("");


const [page,setPage] = useState(1);

const recordsPerPage = 10;


const [openEdit,setOpenEdit] = useState(false);

const [editData,setEditData] = useState(emptyBusiness);




const loadBusinesses = async()=>{

try{

setLoading(true);

const res = await axios.get(
`${API}/business-list`
);


setBusinesses(res.data);


}
catch(err){

console.log(err);

}
finally{

setLoading(false);

}

};




useEffect(()=>{

loadBusinesses();

},[]);





const filteredData = useMemo(()=>{


return businesses.filter(item=>{


return (

item.business_name
?.toLowerCase()
.includes(search.toLowerCase())


&&

(!city || item.city===city)


&&

(!category || item.category===category)


&&

(!source || item.source===source)

);


});


},[
businesses,
search,
city,
category,
source
]);






const cities =
[
...new Set(
businesses.map(
item=>item.city
)
)
];



const categories =
[
...new Set(
businesses.map(
item=>item.category
)
)
];



const sources =
[
...new Set(
businesses.map(
item=>item.source
)
)
];







const deleteBusiness = async(id)=>{


if(!window.confirm("Delete this business?"))
return;


try{

await axios.delete(
`${API}/delete-business/${id}`
);


loadBusinesses();


}
catch(err){

console.log(err);

}


};







const editBusiness=(item)=>{


setEditData({

id:item.id,

business_name:item.business_name || "",

category:item.category || "",

city:item.city || "",

address:item.address || "",

phone:item.phone || "",

source:item.source || ""

});


setOpenEdit(true);


};







const updateBusiness=async(e)=>{


e.preventDefault();


try{


await axios.put(

`${API}/update-business/${editData.id}`,

editData

);


alert("Business Updated Successfully");


setOpenEdit(false);


loadBusinesses();


}
catch(err){

console.log(err);

alert("Update Failed");

}


};









const exportFile=(type)=>{


const sheet =
XLSX.utils.json_to_sheet(
filteredData
);


const workbook =
XLSX.utils.book_new();


XLSX.utils.book_append_sheet(
workbook,
sheet,
"Businesses"
);


XLSX.writeFile(
workbook,
`Business_List.${type}`
);


};






const totalPages =
Math.ceil(
filteredData.length /
recordsPerPage
);



const currentRecords =
filteredData.slice(
(page-1)*recordsPerPage,
page*recordsPerPage
);








return (

<div className="table-container">



<h2>Business Listings</h2>




<div className="filters">



<input

placeholder="Search business..."

value={search}

onChange={
e=>setSearch(e.target.value)
}

/>




<select onChange={
e=>setCity(e.target.value)
}>

<option value="">
All Cities
</option>

{
cities.map(c=>

<option key={c}>
{c}
</option>

)
}

</select>






<select onChange={
e=>setCategory(e.target.value)
}>

<option value="">
All Categories
</option>


{
categories.map(c=>

<option key={c}>
{c}
</option>

)
}

</select>






<select onChange={
e=>setSource(e.target.value)
}>

<option value="">
All Sources
</option>


{
sources.map(s=>

<option key={s}>
{s}
</option>

)
}

</select>






<button
className="excel-btn"
onClick={()=>exportFile("xlsx")}
>
Export Excel
</button>



<button
className="csv-btn"
onClick={()=>exportFile("csv")}
>
Export CSV
</button>



</div>






{
loading ?

<h3>Loading...</h3>


:

<table>


<thead>

<tr>

<th>Name</th>

<th>Category</th>

<th>City</th>

<th>Phone</th>

<th>Source</th>

<th>Action</th>

</tr>

</thead>




<tbody>


{
currentRecords.map(item=>(


<tr key={item.id}>


<td>{item.business_name}</td>

<td>{item.category}</td>

<td>{item.city}</td>

<td>{item.phone}</td>

<td>{item.source}</td>



<td>


<button

className="edit-btn"

onClick={()=>editBusiness(item)}

>
Edit
</button>




<button

className="delete-btn"

onClick={()=>deleteBusiness(item.id)}

>
Delete
</button>



</td>


</tr>


))
}



</tbody>



</table>

}








<div className="pagination">


<button

disabled={page===1}

onClick={()=>setPage(page-1)}

>
Previous
</button>



<span>
Page {page} of {totalPages}
</span>




<button

disabled={page===totalPages}

onClick={()=>setPage(page+1)}

>
Next
</button>


</div>







{
openEdit &&

<div className="modal">


<div className="modal-box">


<h2>Edit Business</h2>



<form onSubmit={updateBusiness}>


{
[
"business_name",
"category",
"city",
"address",
"phone",
"source"
].map(field=>(


<input

key={field}

value={editData[field]}

placeholder={field.replace("_"," ")}

onChange={
e=>

setEditData({

...editData,

[field]:e.target.value

})

}


/>


))
}





<button

className="save-btn"

type="submit"

>
Update Business
</button>




<button

className="cancel-btn"

type="button"

onClick={()=>
setOpenEdit(false)
}

>
Cancel
</button>




</form>


</div>


</div>

}



</div>


);


}


export default BusinessTable;