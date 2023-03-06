import dbConnect from "@/utils/middleware/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
    await dbConnect();
    const {
        method,
        query: { id }
    } = req;

    if (method === "GET") {
        try {
            const user = await User.findById(id);
            console.log('user', user)
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ success: false });
        }
    }

    if (method === "PUT") {
        try {
            if (req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
                req.body.passwordConfirm = await bcrypt.hash(req.body.passwordConfirm, 10);
            }
            const users = await User.findByIdAndUpdate(id, req.body, {
                new: true,
            })
        } catch (error) {
            res.status(400).json({ success: false });
        }
    }

};

export default handler;