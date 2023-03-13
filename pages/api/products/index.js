import dbConnect from "@/utils/middleware/dbConnect";
import Product from "@/models/Product";

const handler = async (req, res) => {
    await dbConnect();
    const { method } = req;

    if (method === "GET") {
        try {
            const products = await Product.find({}); // empty object means all products
            res.status(200).json({ success: true, data: products });
        } catch (error) {
            res.status(400).json({ success: false });
        }
    }
    if (method === "POST") {
        try {
            const newProduct = await Product.create(req.body);
            res.status(201).json({ success: true, data: newProduct });
        } catch (error) {
            res.status(400).json({ success: false });
        }
    }

};

export default handler;