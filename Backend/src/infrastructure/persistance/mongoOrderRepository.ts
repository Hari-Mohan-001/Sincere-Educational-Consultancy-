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
      console.log("order", saveNewOrder);

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

  public async getTotalOrderValue(timeframe: string): Promise<number> {
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
   public async getTimeFrameOrders(timeframe: string): Promise<number> {
    const matchStage = getMatchStage(timeframe)
    try {
      const result = await orderModel.aggregate([
        matchStage,
        {
        $count:'orderCount'
        },
      ])
      return result.length>0 ? result[0].orderCount :0
    } catch (error) {
      throw error
    }
  }
}
