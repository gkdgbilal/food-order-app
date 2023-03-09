import Category from "@/models/Category";
import dbConnect from "@/utils/middleware/dbConnect";

const handler = async (req, res) => {
    await dbConnect();
    const { method } = req;

    if (method === "GET") {
        try {
            const categories = await Category.find({}); // empty object means all categories
            res.status(200).json({ success: true, data: categories });
        } catch (error) {
            res.status(400).json({ success: false });
        }
    }
    
    if (method === "POST") {
        try {
            const newCategory = await Category.create(req.body);
            res.status(200).json({ success: true, data: newCategory });
        } catch (error) {
            res.status(400).json({ success: false });
        }
    }

};

export default handler;