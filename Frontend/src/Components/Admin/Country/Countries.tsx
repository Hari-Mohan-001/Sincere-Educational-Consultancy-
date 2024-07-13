
import { Box, Button } from "@mui/material"
import TableComponent from "../../Layout/Table"
import { useNavigate } from "react-router-dom"


const Countries = () => {
  const navigate = useNavigate()

  const handleClick = ()=>{
      navigate("/admin/add-country")
  }

 const column=[
    {id:'no' ,label:'No', minWidth: 50},
    {id:'name' ,label:'Name', minWidth: 100},
    {id: 'image', label: 'Image', minWidth: 100, render: (row: any) => <img src={row.image} alt={row.name} style={{ width: 50, height: 50 }} /> },
  ]

  const data=[{no:1, name:"India", image:"https://media.istockphoto.com/id/1409466493/vector/india-flag-design-waving-indian-flag-made-of-satin-or-silk-fabric-vector-illustration.jpg?s=612x612&w=0&k=20&c=rTLIf6BF0WRnzCFHQYjJSjknue725U7gcBd_f94W3fM="}]
  return (
    
   <>
   
   <TableComponent title="Countries" columns={column} data={data} />
   <div className="mt-4 mr-2">

   <Button onClick={handleClick} variant="contained">Add</Button>
   </div>
   </>
    
   
    
    
  )
}

export default Countries