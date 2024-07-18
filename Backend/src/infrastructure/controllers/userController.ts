import { Request,Response } from "express"
import { mongoUserRepository } from "../../infrastructure/persistance/mongoUserRepository"
import getAllUsers from "../../application/use-cases/Admin/GetAllStudents"
import { BlockOrUnblockUser } from "../../application/use-cases/User/blockOrUnblockUser"

const userRepository = new mongoUserRepository()

export const userController =()=>{

    const getUsers = async(req:Request,res:Response)=>{
        try {
            const users =await getAllUsers(userRepository).execute() 
            if(users){
                const Usersdata = users.map(user=>{
                    const{password, ...Usersdata} = user
                    return Usersdata
                }) 
                console.log(Usersdata);
                
                res.status(200).json({message:"success", userData: Usersdata })
            } else{
                throw new Error("Unable to fetch users");
                
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
              } else {
                res.status(400).json({ message: "An unknown error occurred" });
              }
        }
       
    }

    const blockOrUnblockUser = async(req:Request,res:Response)=>{
        const userId = req.params.userId
        console.log(userId);
        
       try {
         const blockOrUnblock = await BlockOrUnblockUser(userRepository).execute(userId)
            if(blockOrUnblock){
                res.status(200).json({message:"Success"})
            }
       } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
          } else {
            res.status(400).json({ message: "An unknown error occurred" });
          }
       }
    }

    return{
        getUsers,
        blockOrUnblockUser
    }
}