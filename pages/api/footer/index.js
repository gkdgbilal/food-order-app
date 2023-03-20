import dbConnect from "@/utils/middleware/dbConnect";
import Footer from "@/models/Footer";
import Cors from "cors";

const cors = Cors({
    methods: ["POST", "GET", "HEAD"],
});

const handler = async (req, res) => {
    await dbConnect();
    const { method } = req;

    if (method === "GET") {
        try {
            const footers = await Footer.find({}); // empty object means all footers
            res.status(200).json({ success: true, data: footers });
        } catch (error) {
            res.status(400).json({ success: false });
        }
    }
    if (method === "POST") {
        try {
            const newFooter = await Footer.create(req.body);
            res.status(201).json({ success: true, data: newFooter });
        } catch (error) {
            res.status(400).json({ success: false });
        }
    }

};

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export default async (req, res) => {
    await runMiddleware(req, res, cors);
    handler(req, res);
};