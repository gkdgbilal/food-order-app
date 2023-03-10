import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 60,
        },
        description: {
            type: String,
            required: true,
            maxLength: 300,
        },
        price: {
            type: [Number],
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        extraOptions: {
            type: [
                {
                    text: { type: String },
                    price: { type: Number },
                }
            ],
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);