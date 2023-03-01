import dbConnect from "@/utils/middleware/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
    await dbConnect();

    const body = req.body;
    const user = await User.findOne({ email: body.email });

    if (user) {
        res.status(400).json({ error: "User already exists" });
        return
    }

    try {
        const newUser = await new User(body)
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);

        // create hash
        newUser.password = await bcrypt.hash(newUser.password, salt);
        newUser.confirmPassword = await bcrypt.hash(newUser.confirmPassword, salt);

        await newUser.save();
        res.status(200).json({ success: true, data: newUser });

    } catch (error) {
        res.status(400).json({ error: "Something went wrong" });
    }

};

export default handler;