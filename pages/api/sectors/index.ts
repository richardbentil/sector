import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    
    if (method != "GET") {
        res.status(401).json({ msg: "Invalid method" })
        return
    }
    try {
        const { db } = await connectToDatabase()

        const sectors = await db.collection("sectors").find().toArray()
         console.log(sectors[0].sectors)
        sectors[0].sectors?.length > 0 ?
            res.status(200).json(sectors[0].sectors) :
            res.status(404).json({ msg: "Data not found" })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({msg: error.message})
    }
}