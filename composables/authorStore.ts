import { defineStore } from "pinia";
import { IAuthor } from "~~/types";
import useToast from "./useToast";

export const useAuthorStore = defineStore("author-store", {
    state: () => ({
        authors: [] as IAuthor[],
        error: false
    }),

    actions: {
        // Get all authors from DB
        async getAll() {
            try {
                let data = await $fetch<IAuthor[]>("/api/authors");
                this.authors = data;
                return data as IAuthor[];
            } catch (e) {
                useToast().error(e.message);
            }
        },
        // Create a new author
        async create(name: string) {
            await $fetch("/api/authors/create", {
                method: "POST",
                body: { name },
            })
                .catch((e) => {
                    this.error = true;
                    useToast().error(e.data.message);
                })
                .then(async () => {
                    if (!this.error) {
                        await this.getAll();
                        useToast().success("Author created");
                    }
                    this.error = false;
                });
        },
        // Update an author
        async update(id: string, name: string) {
            await $fetch(`/api/authors/${id}`, {
                method: "PUT",
                body: { name },
            })
                .catch((e) => {
                    useToast().error(e.data.message);
                })
                .then(async () => {
                    if (!this.error) {
                        await this.getAll();
                        useToast().success("Author updated");
                    }
                    this.error = false;
                });
        },
        // delete an author
        async remove(id: string) {
            await $fetch(`/api/authors/${id}`, {
                method: "DELETE",
            })
                .catch((e) => {
                    useToast().error(e.data.message);
                })
                .then(async () => {
                    await this.getAll();
                    // useToast().success("Author removed");
                });
        },
    },
});
