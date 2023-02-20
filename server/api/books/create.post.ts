import BookModel from "~/server/models/Book.model";
import {BookSchema} from "~/server/validation";
import AuthorModel from "~/server/models/Author.model";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    let {error} = BookSchema.validate(body);
    if (error) {
        throw createError({
            message: error.message.replace(/"/g, ""),
            statusCode: 400,
            fatal: false,
        });
    }

    try {
        let isDuplicate = await BookModel.find({"isbn":body.isbn}).count() > 0;
        if (!isDuplicate) {
            await BookModel.create(body);
        }
        return {
            message: "Book Created",
            isDuplicate: isDuplicate
        }
    } catch(e) {
        throw createError({
            message: e.message,
        });
    }
})