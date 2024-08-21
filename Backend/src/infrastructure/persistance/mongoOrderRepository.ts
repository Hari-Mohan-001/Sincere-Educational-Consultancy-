import mongoose from "mongoose";
import { OrderDTO } from "../../application/dtos/orderDto";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository";
import orderModel from "../../presentation/models/orderModel";
import { Order } from "../../domain/entities/order";
import { getMatchStage } from "../utils/matchStageForAggregation";

export class mongoOrderRepository implements IOrderRepository {
  public async createOrder(orderDto: OrderDTO): Promise<boolean> {
    try {
      const newOrder = new orderModel({
        user: orderDto.user,
        enrollment: orderDto.enrollment,
        country: orderDto.country,
        totalAmount: orderDto.totalAmount,
        orderStatus: "Complete",
      });
      const saveNewOrder = await newOrder.save();
      

      if (saveNewOrder) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
  public async getAllOrders(countryId: string): Promise<Order[]> {
    try {
      const orders = await orderModel.aggregate([
        {
          $match: {
            country: new mongoose.Types.ObjectId(countryId),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $lookup: {
            from: "enrollments",
            localField: "enrollment",
            foreignField: "_id",
            as: "enrollDetails",
          },
        },
        {
          $unwind: "$userDetails",
        },
        {
          $unwind: "$enrollDetails",
        },
        {
          $project: {
            _id: 1,
            userId: "$userDetails._id",
            userName: "$userDetails.name",
            userEmail: "$userDetails.email",
            enrollType: "$enrollDetails.name",
            enrollImage: "$enrollDetails.image",
            meetingSchedule: 1,
          },
        },
      ]);
      return orders;
    } catch (error) {
      throw error;
    }
  }
  public async updateOrder(
    orderId: string,
    date: string,
    time: string
  ): Promise<boolean> {
    try {
      const updateOrder = await orderModel.findByIdAndUpdate(
        { _id: orderId },
        {
          $set: {
            meetingSchedule: {
              date: date,
              time: time,
            },
          },
        }
      );
      return updateOrder != null;
    } catch (error) {
      throw error;
    }
  }

  public async getTotalOrderValue(timeframe: string): Promise<number | any[]> {
    if (timeframe === "yearly") {
      const year = new Date().getFullYear();
      try {
        const result = await orderModel.aggregate([
          {
            $match: {
              createdAt: {
                $gte: new Date(year, 0, 1),
                $lt: new Date(year + 1, 0, 1),
              },
            },
          },
          {
            $group: {
              _id: { $month: "$createdAt" },
              revenue: {
                $sum: { $toDouble: "$totalAmount" },
              }
            }
          },
          {
            $sort: { _id: 1 }
          },
          {
            $project: {
              _id: 0,
              month: {
                $arrayElemAt: [
                  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                  { $subtract: ["$_id", 1] }
                ]
              },
              revenue: 1
            }
          }
        ]);
        return result;
      } catch (error) {
        throw error;
      }
    } else {
      const matchStage = getMatchStage(timeframe)
      try {
        const result = await orderModel.aggregate([
          matchStage,
          {
            $group: {
              _id: null,
              totalValue: {
                $sum: { $toDouble: "$totalAmount" },
              },
            },
          },
        ]);
        console.log(result.length);
        
        return result.length > 0 ? result[0].totalValue : 0;
      } catch (error) {
        throw error;
      }
    }
  }

   public async getTimeFrameOrders(timeframe: string): Promise<number|any[]> {
    
    if (timeframe === "yearly") {
      const year = new Date().getFullYear();
      try {
        const result = await orderModel.aggregate([
          {
            $match: {
              createdAt: {
                $gte: new Date(year, 0, 1),
                $lt: new Date(year + 1, 0, 1),
              },
            },
          },
          {
            $group: {
              _id: { $month: "$createdAt" },
              orderCount: { $sum: 1 }
            }
          },
          {
            $sort: { _id: 1 }
          },
          {
            $project: {
              _id: 0,
              month: {
                $arrayElemAt: [
                  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                  { $subtract: ["$_id", 1] }
                ]
              },
              orders: "$orderCount"
            }
          }
        ]);
        
        return result;
      } catch (error) {
        throw error;
      }
    } else {
      const matchStage = getMatchStage(timeframe);
      try {
        const result = await orderModel.aggregate([
          matchStage,
          {
            $count: 'orderCount'
          },
        ]);
        return result.length > 0 ? result[0].orderCount : 0;
      } catch (error) {
        throw error;
      }
    }
  
  }
  public async getAllOrdersForAdmin(startDate?:string, endDate?:string): Promise<Order[]> {
    try {
      let dateFilter = {};
      if (startDate && endDate) {
         // Extend endDate to include the entire day
      const end = new Date(endDate);
      end.setUTCHours(23, 59, 59, 999);
        
        dateFilter = {
          createdAt: {
            $gte: new Date(startDate),
            $lte: end
          }
        };
      }

      const orders = await orderModel.aggregate([
        {
            $match: dateFilter
        },
        {
          $lookup:{
            from:'users',
            localField:'user',
            foreignField:'_id',
            as:'userDetails'
          },
        },
        {
          $lookup:{
            from:'enrollments',
            localField:'enrollment',
            foreignField:'_id',
            as:'enrollDetails',
          },
        },
        {
          $lookup:{
            from:'countries',
            localField:'country',
            foreignField:'_id',
            as:'countryDetails'
          },
        },
        {
          $unwind:'$userDetails'
        },
        {
          $unwind:'$enrollDetails',
        },
        {
          $unwind:'$countryDetails'
        },
        {
          $project:{
            _id:1,
            userName: '$userDetails.name',
            userEmail: '$userDetails.email',
            enrollType: '$enrollDetails.name',
            enrollImage: '$enrollDetails.image',
            country:'$countryDetails.name',
            totalAmount:1,
            createdAt:1
          }
        },
        {
          $group: {
            _id: null, // Grouping all documents together
            orders: { $push: "$$ROOT" }, // Push all documents into an array
            grandTotalAmount:{$sum: { $toDouble: "$totalAmount" }} // Sum of totalAmount for all orders
          }
        },
        {
          $project: {
            _id: 0, // Exclude the _id field
            orders: 1,
            grandTotalAmount: 1
          }
        }
      ])
      return orders[0] || { orders: [], grandTotalAmount: 0 };
    } catch (error) {
      throw error
    }
  }

  public async getAllOrdersOfAUserById(userId: string): Promise<Order[]> {
    try {
      const orders = await orderModel.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup:{
            from:'users',
            localField:'user',
            foreignField:'_id',
            as:'userDetails'
          },
        },
        {
          $lookup:{
            from:'enrollments',
            localField:'enrollment',
            foreignField:'_id',
            as:'enrollDetails',
          },
        },
        {
          $lookup:{
            from:'countries',
            localField:'country',
            foreignField:'_id',
            as:'countryDetails'
          },
        },
        {
          $unwind:'$userDetails'
        },
        {
          $unwind:'$enrollDetails',
        },
        {
          $unwind:'$countryDetails'
        },
        {
          $project:{
            _id:1,
            userName: '$userDetails.name',
            userEmail: '$userDetails.email',
            enrollType: '$enrollDetails.name',
            enrollImage: '$enrollDetails.image',
            country:'$countryDetails.name',
            totalAmount:1,
            createdAt:1
          }
        },
      ])
      return orders
    } catch (error) {
      throw error
    }
  }
}
