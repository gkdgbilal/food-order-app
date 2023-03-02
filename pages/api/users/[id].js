import dbConnect from "@/utils/middleware/dbConnect";
import User from "@/models/User";

const handler = async (req, res) => {
    await dbConnect();
    const {
        method, query: id
    } = req;

    if (method === "GET") {
        try {
            const user = await User.findById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ success: false });
        }
    }

};

export default handler;