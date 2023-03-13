import Product from "@/models/Product";
import dbConnect from "@/utils/middleware/dbConnect";

const handler = async (req, res) => {
    await dbConnect();
    const {
        method,
        query: { id }
    } = req;

    if (method === "GET") {
        try {
            const product = await Product.findById(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json({ success: false });
        }
    }

    if (method === "DELETE") {
        try {
            const product = await Product.findByIdAndDelete(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json({ success: false });
        }
    }


};

export default handler;