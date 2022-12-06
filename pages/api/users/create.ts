import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req
    
    if (method != "POST") {
        res.status(401).json({ msg: "Invalid method" })
        return
    }
    
    try {
        const { db } = await connectToDatabase()

        const user = await db.collection("users").insert(body)
        console.log(user)
        user.acknowledged ?
            res.status(201).json({msg: "Success", user: {id: body?.id, name: body?.name, sector: body?.sector}}) :
            res.status(401).json({ msg: "Failed" })
    } catch (error: any) {
        res.status(500).json({msg: error.message})
    }
}