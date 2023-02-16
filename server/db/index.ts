import mongoose from 'mongoose';
import { nitroApp } from "nitropack/dist/runtime/app";
// import {Nitro} from "nitropack";

export default async (nitroApp) => {
    const config = useRuntimeConfig();
    mongoose
        .connect(config.MONGO_URI)
        .then(() => console.log('connected to DB'))
        .catch((e) => console.log(e));
};