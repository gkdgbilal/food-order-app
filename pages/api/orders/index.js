import dbConnect from "@/utils/middleware/dbConnect";
import Order from "@/models/Order";

const handler = async (req, res) => {
    await dbConnect();
    const { method } = req;

    if (method === "GET") {
        try {
            const orders = await Order.find({}); // empty object means all orders
            res.status(200).json({ success: true, data: orders });
        } catch (error) {
            res.status(400).json({ success: false });
        }
    }
    if (method === "POST") {
        try {
            const newOrder = await Order.create(req.body);
            res.status(201).json({ success: true, data: newOrder });
        } catch (error) {
            res.status(400).json({ success: false });
        }
    }

};

export default handler;