import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query, body } = req
    
    try {
        const { db } = await connectToDatabase()
        console.log(body)

        switch (method) {
            case "PUT":
                const updateUser = await db.collection("users").updateOne({ id: req?.query?.id }, { $set: {name: body?.name, sector: body?.sector} })
                console.log(updateUser)
                updateUser?.modifiedCount ? res.status(201).json({
                    msg: "Success",
                    user: { id: req?.query?.id, name: body?.name, sector: body?.sector }
                }) : res.status(401).json({ msg: "User not found" })
                break;
            
            case "GET":
                const id: any = query?.id
                const user = await db.collection("users").findOne({ _id: new ObjectId(id) })
                user?._id ? res.status(200).json(user) : res.status(404).json({ msg: "User not found" })
                break;
        
            default: res.status(401).json({ msg: "Invalid method" })
                break;
        }
    } catch (error: any) {
        res.status(500).json({msg: error.message})
    }
}