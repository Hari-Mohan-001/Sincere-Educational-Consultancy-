import { Request,Response } from "express"
import { mongoUserRepository } from "../../infrastructure/persistance/mongoUserRepository"
import getAllUsers from "../../application/use-cases/Admin/GetAllStudents"
import { BlockOrUnblockUser } from "../../application/use-cases/User/blockOrUnblockUser"
import { getAUser } from "../../application/use-cases/User/getAUser"
import { sendMail } from "../services/nodeMailer"
import { cloudinaryUpload } from "../services/CloudinaryUpload"
import { userUpdateDTO } from "../../application/dtos/userUpdateDto"
import { updateTheUser } from "../../application/use-cases/User/updateUser"

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

    const getUser= async(req:Request,res:Response)=>{
           try {
            const userId = req.params.userId
              const user = await getAUser(userRepository).execute(userId)
              if(user){
                res.status(200).json({mesage:'success', data:user})
              }
           } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
              } else {
                res.status(400).json({ message: "An unknown error occurred" });
              }
           }
    }

    const sendlink = async (req:Request,res:Response)=>{
      const {userId, roomLink} = req.body
      try {
        const user = await getAUser(userRepository).execute(userId)
        const email = 'hari1111mohan@gmail.com'
        const resetLink = `Hello ${user.name} Please click <a href=${roomLink}>here</a> to join the meet`;
         await sendMail(email, "Meeting", `${resetLink}`);
        console.log('met',user);
        res.status(200).json({message:'success'})
        
      } catch (error) {
        
      }
    }

    const updateUser = async (req:Request,res:Response)=>{
      try {
        
        
        const userId = req.params.userId
        const {image,name,email,password,mobile} = req.body.userData
        console.log(req.body.userData);
        
      
        
        if(image){
         const imageUrl = await cloudinaryUpload(image,'UserImage')
         const userUpdateDto = new userUpdateDTO(name,email,mobile,imageUrl,password)
         const updatedUser = await updateTheUser(userRepository).execute(userId,userUpdateDto)
         res.status(200).json({message:'success',user:updatedUser})
        }else{
          
          const userUpdateDto = new userUpdateDTO(name,email,mobile,image,password) 
        const updatedUser = await updateTheUser(userRepository).execute(userId,userUpdateDto)
        res.status(200).json({message:'success',user:updatedUser})
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
        blockOrUnblockUser,
        getUser,
        sendlink,
        updateUser
    }
}