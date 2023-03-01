import dbConnect from "@/utils/middleware/dbConnect";
import User from "@/models/User";

const handler = async (req, res) => {
    await dbConnect();
    const { method } = req;

    if (method === "GET") {
        try {
            const users = await User.find({}); // empty object means all users
            res.status(200).json({ success: true, data: users });
        } catch (error) {
            res.status(400).json({ success: false });
        }
    }
    if (method === "POST") {
        try {
            const newUser = await User.create(req.body);
            res.status(200).json({ success: true, data: newUser });
        } catch (error) {
            res.status(400).json({ success: false });
        }
    }

};

export default handler;